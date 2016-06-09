###############################################################################
#
# Copyright (C) 2014, Tavendo GmbH and/or collaborators. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
#
###############################################################################


from twisted.internet.defer import inlineCallbacks
from twisted.logger import Logger

from autobahn.twisted.util import sleep
from autobahn.twisted.wamp import ApplicationSession
from autobahn.wamp.exception import ApplicationError

from itertools import * # for skipping lines in a file

import sys, os, os.path, shutil, subprocess, json, string, uuid

# sys.path.append("/usr/local/lib/python2.7/site-packages")
# sys.path.append("/Library/Python/2.7/site-packages")

# import inchlib_clust

cwd = os.getcwd()
print cwd
hosted_data = cwd + "/../../data/reactome_template/"


class AppSession(ApplicationSession):

    log = Logger()

    @inlineCallbacks
    def onJoin(self, details):

        def system_call(command):
            self.log.info("system_call")
            p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
            return p.stdout.read()

        def getFolders():
            self.log.info("getFolders")
            directories = os.listdir(hosted_data)
            return directories

        def getFolder(pathwayId):
            self.log.info("getFolder")
            f = open(hosted_data+"folder_to_reactome_id.txt");
            for line in f:
             kv = line.split("\t")
             if kv[0] == pathwayId:
                 return kv[1]
            return None

        # SUBSCRIBE to a topic and receive events
        #
        def getPathway(pathwayId):
            self.log.info("getPathway")
            folders = getFolders()
            folder = getFolder(pathwayId).strip()
            filePath = hosted_data + folder + "/" + folder + ".pi"
            json_data = system_call("perl "+ cwd +"/../../bin/convert_pi_to_json.pl " + filePath + " " + hosted_data +"db_id_to_name_mapping.txt")
            pathway = json.loads(json_data)
            return pathway

        yield self.register(getPathway, 'pgmlab.pathway.get')
        # self.log.info("procedure getPathway(pathwayId) registered")

        # REGISTER a procedure for remote calling
        #
        def getPathwayList():
            self.log.info("getPathwayList")
            json_data = open(hosted_data +"pathways.json").read()
            pathwayList = json.loads(json_data)
            return pathwayList

        yield self.register(getPathwayList, 'pgmlab.pathways.list')
        # self.log.info("procedure getPathwayList() registered")

        def createPairwiseInteractionFile(runPath, pathway):
            self.log.info("createPairwiseInteractionFile")
            filePath = runPath + "/pathway.pi";
            pi = open(filePath, "w")
            numberOfNodes = len(pathway)
            pi.write(str(numberOfNodes)+"\n\n")
            for interaction in pathway:
                pi.write(str(interaction["source"]) + "\t")
                pi.write(str(interaction["target"]) + "\t")
                pi.write(str(interaction["value"])  + "\t")
                pi.write(str(interaction["logic"])  + "\n")
            pi.close()
            return numberOfNodes

        def createObservationFile(runPath, observationSet):
            self.log.info("createObservationFile")
            filePath = runPath + "/inference.obs"
            obs = open(filePath, "w")

            observations = observationSet["observations"]
            numberObs = len(observations)
            obs.write(str(numberObs)+"\n")
            # print("numberObs", numberObs)
            for observation in observations:
                # print("observation", observation)
                numberNodes = len(observation)
                obs.write(str(numberNodes)+"\n")
                for node in observation:
                    # print("node", node)
                    obs.write(str(node["name"])+"\t"+str(node["state"])+"\n")
            obs.close()
            return numberObs

        def generateFactorgraph(runPath):
            self.log.info("generateFactorgraph")
            system_call(str(cwd)+"/../../bin/pgmlab --generate-factorgraph --pairwise-interaction-file=" + str(runPath) + "/pathway.pi --logical-factorgraph-file=" + str(runPath) + "/logical.fg --number-of-states 3")

        def inferenceCommand(runPath):
            self.log.info("inferenceCommand")
            system_call("pgmlab --inference --pairwise-interaction-file=" + str(runPath) + "/pathway.pi --inference-factorgraph-file=" + str(runPath) + "/logical.fg --inference-observed-data-file=" + str(runPath) + "/inference.obs --posterior-probability-file=" + str(runPath) + "/pathway.pp --number-of-states 3")

        def readPosteriorProbabilityFile(runPath):
            self.log.info("readPosteriorProbabilityFile")
            filepath = runPath + "/pathway.pp"
            ppfile = open(filepath, "r")
            posteriorprobabilities = list()
            pp = dict()
            for line in ppfile:
                if line.startswith("---"):
                    posteriorprobabilities.append(pp);
                    pp = dict()
                    continue
                line = line.strip().split("\t")
                nodename = line[0]
                nodestateprob = line[1]
                if nodename not in pp.keys():
                    pp[nodename] = list()
                pp[nodename].append(nodestateprob)
            return posteriorprobabilities

        def runInference(pathway, observationSet, pathways, options):
            self.log.info("runInference")
            runID = str(uuid.uuid4())
            cwd = os.getcwd()
            tmpPath = cwd + "/../../tmp/"
            runPath = tmpPath + runID
            os.mkdir(runPath)

            posteriorProbabilities = {}
            for id,pathway in pathways.items():
                if "pairwiseInteractions" in pathway:
                    links = pathway["pairwiseInteractions"]["links"]
                    print "links", links
                else:
                    reactomePathway = getPathway(id)
                    links = reactomePathway["links"]
                    print 'reactome', reactomePathway
                numberOfNodes = createPairwiseInteractionFile(runPath, links)
                generateFactorgraph(runPath)
                numberOfObs = createObservationFile(runPath, observationSet)
                inferenceCommand(runPath)
                posteriorProbabilitiesSet = readPosteriorProbabilityFile(runPath)
                # Load into response object
                posteriorProbabilities[id] = posteriorProbabilitiesSet

            # shutil.rmtree(runPath)
            return {
                "runID":runID,
                "submitDateTime":options["submitDateTime"],
                "posteriorProbabilities":posteriorProbabilities,
                "posteriorProbabilitiesSet":posteriorProbabilitiesSet,
                "observationSet":observationSet,
                "selectedPathways":pathways
            }

        yield self.register(runInference, 'pgmlab.inference.run')
        # self.log.info("subscribed to topic 'pgmlab.inference.run'")

        # InCHlib clustering returns formatted JSON data to pass to js library
        # Expects array of posterior probability sets {nodeID: [s1,s2,s3] ...}
        def inchlibCSV(runPath, fileName, stateData, obsCount):
            filePath = runPath+"/"+fileName+".csv"
            csv = open(filePath, "w")
            csv.write(reduce(lambda prev,curr: prev+",Observation "+str(curr), range(obsCount), "id"))
            csv.write("\n")
            for nodeID, obsStates in stateData.items():
                csv.write((
                    str(nodeID)+
                    reduce(lambda prev,curr: prev+","+str(curr),obsStates,"")+
                    "\n"))
            csv.close()
        def sortHeatmapData(heatmapData):
            state1 = {}
            state2 = {}
            state3 = {}
            stateD = {}
            for obsIdx, observation in enumerate(posteriorProbsData):
                for nodeID,states in observation.items():
                    if nodeID in state1:
                        state1[nodeID].append(states[0])
                    else:
                        # May not need [False]*obsIdx assuming PGMLab results filter out extraneous nodes
                        state1[nodeID] = [False]*obsIdx + [states[0]]
                    if nodeID in state2:
                        state2[nodeID].append(states[1])
                    else:
                        state2[nodeID] = [False]*obsIdx + [states[1]]
                    if nodeID in state3:
                        state3[nodeID].append(states[2])
                    else:
                        state3[nodeID] = [False]*obsIdx + [states[2]]
                    if nodeID in stateD:
                        stateD[nodeID].append('SOMEMAX')
                    else:
                        stateD[nodeID] = [False]*obsIdx + ["SOMEMAX"]
            return {"state1":state1, "state2":state2, "state3":state3, "stateD":stateD}
        def inchlibCluster(heatmapData):
            self.log.info("inchlibCluster")
            # Group into state1,state2,state3,stateDominant
            states = sortHeatmapData(heatmapData)

            cwd = os.getcwd()
            tempID = str(uuid.uuid4())
            tempPath = cwd + "/../../tmp/"
            runPath = tempPath + tempID
            os.mkdir(runPath)

            obsCount = len(posteriorProbsData)
            for filename, stateData in states.items():
                inchlibCSV(runPath, filename, stateData, obsCount)
                # c = inchlib_clust.Cluster()

            return {}
        yield self.register(inchlibCluster, "inchlib.cluster")
