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

import subprocess

import os
import os.path
import shutil # for removing directory

import json
import string

import uuid

from itertools import * # for skipping lines in a file

hosted_data = "/home/awright/git/PGMLab/data/reactome_template/";

class AppSession(ApplicationSession):

    log = Logger()

    @inlineCallbacks
    def onJoin(self, details):

        def system_call(command):
             p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
             return p.stdout.read()
        
        def getFolders():
             directories = os.listdir(hosted_data)
             return directories

        def getFolder(pathwayId):
             f = open(hosted_data+"folder_to_reactome_id.txt");
             for line in f:
                 kv = line.split("\t")
                 if kv[0] == pathwayId:
                     return kv[1]
             return None

        # SUBSCRIBE to a topic and receive events
        #
        def getPathway(pathwayId):
             folders = getFolders()
             folder = getFolder(pathwayId).strip()
             filePath = hosted_data + folder + "/" + folder + ".pi"
             json_data = system_call("perl "+hosted_data +"../../bin/convert_pi_to_json.pl " + filePath + " " + hosted_data +"../../bin/db_id_to_name_mappingnew.txt")
             pathway = json.loads(json_data)
             return pathway

        yield self.register(getPathway, 'pgmlab.pathway.get')
        self.log.info("procedure getPathway(pathwayId) registered")

        # REGISTER a procedure for remote calling
        #
        def getPathwayList():
            self.log.info("getPathwayList")
            json_data = open(hosted_data +"pathways.json").read()
            pathwayList = json.loads(json_data)
            return pathwayList

        yield self.register(getPathwayList, 'pgmlab.pathways.list')
        self.log.info("procedure getPathwayList() registered")

        def createPairwiseInteractionFile(runPath, pathway):
            filePath = runPath + "/pathway.pi";
            numberOfNodes = len(pathway)
            
            pi = open(filePath, "w")

            pi.write(str(numberOfNodes)+"\n\n")
            
            for interaction in pathway:
                pi.write(str(interaction["source"]) + "\t")
                pi.write(str(interaction["target"]) + "\t")
                pi.write(str(interaction["value"])  + "\t")
                pi.write(str(interaction["logic"])  + "\n")
      
            pi.close()

            return numberOfNodes

        def createObservationFile(runPath, observations):
            filePath = runPath + "/inference.obs";
            numberOfObs = len(observations)
            
            obs = open(filePath, "w")

            obs.write("1\n"+str(numberOfObs)+"\n")
            
            for observation in observations:
                obs.write(str(observation["name"]) + "\t" + str(observation["state"]) + "\n")
      
            obs.close()

            return numberOfObs

        def generateFactorgraph(runPath):
            system_call("pgmlab --generate-factorgraph --pairwise-interaction-file=" + str(runPath) + "/pathway.pi --logical-factorgraph-file=" + str(runPath) + "/logical.fg --number-of-states 3")


        def inferenceCommand(runPath):
            system_call("pgmlab --inference --pairwise-interaction-file=" + str(runPath) + "/pathway.pi --inference-factorgraph-file=" + str(runPath) + "/logical.fg --inference-observed-data-file=" + str(runPath) + "/inference.obs --posterior-probability-file=" + str(runPath) + "/pathway.pp --number-of-states 3")

        def readPosteriorProbabilityFile(runPath):
            filepath = runPath + "/pathway.pp"
            pp = dict()
            with open(filepath, "r") as fh:
                for line in fh:
                    if line.startswith("---"):
                        return pp
                    values = line.strip().split("\t")
                    if not values[0] in pp.keys():
                        pp[values[0]] = list()
                    pp[values[0]].append(values[1])

        def runInference(pathway, observations, options):
            self.log.info("running inference")
            runID = str(uuid.uuid4())
            cwd = os.getcwd()
            tmpPath = cwd + "/../tmp/"
            runPath = tmpPath + runID
            os.mkdir(runPath);
            numberOfNodes = createPairwiseInteractionFile(runPath, pathway)
            generateFactorgraph(runPath);
            numberOfObs = createObservationFile(runPath, observations)         
            inferenceCommand(runPath)
            pp = readPosteriorProbabilityFile(runPath);
            #shutil.rmtree(runPath);
            return {'run': runID, 'posteriorProbabilities':pp} 

        yield self.register(runInference, 'pgmlab.inference.run')
        self.log.info("subscribed to topic 'pgmlab.infence.run'")

