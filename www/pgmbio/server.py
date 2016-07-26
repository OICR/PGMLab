import os
import subprocess
import shutil
import json
import string
import uuid


from twisted.internet.defer import inlineCallbacks
from autobahn.twisted.wamp import Application
from twisted.logger import Logger

import inchlib_clust
print inchlib_clust

#
from twisted.web.static import File
from klein import Klein
klein = Klein()
resource = klein.resource

# HOST HTML (127.0.0.1:4433)
@klein.route("/pgmbio.html")
def home(request):
    return File("../pgmbio.html")
# HOST JS
@klein.route("/", branch=True)
def js(request):
    return File("../js/")



app = Application()
log = Logger()

cwd = os.getcwd()
hosted_data = cwd+"/../../data/reactome_template/"

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    return p.stdout.read()


def getReactomeFolder(pathwayID):
    f = open(hosted_data+"folder_to_reactome_id.txt")
    for line in f:
        kv = line.split("\t")
        if kv[0] == pathwayID:
            return kv[1]
    return None

# REACTOME
@app.register("reactome.pathway.get")
def getPathway(pathwayID):
    log.info("getPathway")
    folders = os.listdir(hosted_data)
    folder = getReactomeFolder(pathwayID).strip()
    filePath = hosted_data+folder+"/"+folder+".pi"
    jsonData = system_call("perl "+cwd+"/../../bin/convert_pi_to_json.pl " + filePath + " " + hosted_data +"db_id_to_name_mapping.txt")
    pathway = json.loads(jsonData)
    return pathway

@app.register("reactome.pathwaylist.get")
def getPathwayList():
    jsonData = open(hosted_data+"pathways.json").read()
    pathwayList = json.loads(jsonData)
    return pathwayList


# PGMLab
def createPairwiseInteractionFile(runPath, pathway):
    filePath = runPath + "/pathway.pi"
    pi = open(filePath, "w")
    nodeCount = len(pathway)
    pi.write(str(nodeCount)+"\n\n")
    for interaction in pathway:
        pi.write(str(interaction["source"]) + "\t")
        pi.write(str(interaction["target"]) + "\t")
        pi.write(str(interaction["value"])  + "\t")
        pi.write(str(interaction["logic"])  + "\n")
    pi.close()
    return nodeCount
def createObservationFile(runPath, observationSet):
    filePath = runPath + "/inference.obs"
    obs = open(filePath, "w")
    observations = observationSet["observations"]
    obsCount = len(observations)
    obs.write(str(obsCount)+"\n")
    for observation in observations:
        nodeCount = len(observation)
        obs.write(str(nodeCount)+"\n")
        for node in observation:
            obs.write(str(node["name"])+"\t"+str(node["state"])+"\n")
    obs.close()
    return obsCount
def generateFactorgraph(runPath):
    system_call(cwd+"/../../bin/pgmlab --generate-factorgraph --pairwise-interaction-file="+runPath+"/pathway.pi --logical-factorgraph-file="+runPath+"/logical.fg --number-of-states 3")
def inference(runPath):
    system_call("pgmlab --inference --pairwise-interaction-file="+runPath+"/pathway.pi --inference-factorgraph-file="+runPath+"/logical.fg --inference-observed-data-file="+runPath+"/inference.obs --posterior-probability-file="+runPath+"/pathway.pp --number-of-states 3")
def readPosteriorProbabilityFile(runPath):
    filePath = runPath + "/pathway.pp"
    postProbsFile = open(filePath, "r")
    postProbs = list()
    pp = dict()
    for line in postProbsFile:
        if line.startswith("---"):
            postProbs.append(pp);
            pp = dict()
            continue
        line = line.strip().split("\t")
        nodeName = line[0]
        nodeStateProb = line[1]
        if nodeName not in pp.keys():
            pp[nodeName] = list()
        pp[nodeName].append(nodeStateProb)
    return postProbs

@app.register("pgmlab.inference.run")
def runInference(pathway, observationSet, pathwaySet, options):
    runID = str(uuid.uuid4())
    cwd = os.getcwd()
    tmpPath = cwd + "/../../tmp/"
    runPath = tmpPath + runID
    os.mkdir(runPath)

    posteriorProbabilities = {}
    for id,pathway in pathwaySet.items():
        if "pairwiseInteractions" in pathway:
            links = pathway["pairwiseInteractions"]["links"]
            # print "links", links
            print "pathway.pairwiseInteractions.links"
        else:
            reactomePathway = getPathway(id)
            links = reactomePathway["links"]
            print "reactome pathway"
            # print 'reactome', reactomePathway
        createPairwiseInteractionFile(runPath, links)
        generateFactorgraph(runPath)
        createObservationFile(runPath, observationSet)
        inference(runPath)
        posteriorProbabilitiesSet = readPosteriorProbabilityFile(runPath)
        # Load into response object
        posteriorProbabilities[id] = posteriorProbabilitiesSet

    # shutil.rmtree(runPath)
    return {
        "runID":runID,
        "submitDateTime":options["submitDateTime"],
        "posteriorProbabilities":posteriorProbabilities,
        "observationSet":observationSet,
        "pathwaySet":pathwaySet
    }

# InCHlib
# InCHlib clustering returns formatted JSON data to pass to js library
# Expects array of posterior probability sets {nodeID: [s1,s2,s3] ...}
def sortHeatmapData(heatmapData):
    state1 = {}
    state2 = {}
    state3 = {}
    stateD = {}
    # print heatmapData["posteriorProbsData"]["posteriorProbabilitiesSet"]
    for obsIdx, observation in enumerate(heatmapData["posteriorProbsData"]["posteriorProbabilitiesSet"]):
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
                stateD[nodeID].append(states.index(max(states)))
            else:
                states = [float(x) for x in states]
                stateD[nodeID] = [False]*obsIdx + [states.index(max(states))]
    return {"state1":state1, "state2":state2, "state3":state3, "stateD":stateD}
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

@app.register("inchlib.cluster")
def inchlibCluster(heatmapData):
    obsCount = len(heatmapData["posteriorProbsData"]["posteriorProbabilitiesSet"])
    # Group into state1,state2,state3,stateDominant
    states = sortHeatmapData(heatmapData)

    cwd = os.getcwd()
    tempID = str(uuid.uuid4())
    tempPath = cwd + "/../../tmp/"
    runPath = tempPath + tempID
    os.mkdir(runPath)

    c = inchlib_clust.Cluster()
    clustered = {}
    for filename, stateData in states.items():
        inchlibCSV(runPath, filename, stateData, obsCount)
        # c = inchlib_clust.Cluster()
        filePath = runPath+"/"+filename+".csv"
        outputPath = runPath+"/"+filename+".json"
        system_call("python inchlib_clust.py "+filePath+"-o "+runPath+"/"+filename+".json -dh")
        with open(outputPath) as clustOutput:
            inchlibJSON = json.load(clustOutput)
        clustered[filename] = inchlibJSON
        # c.read_csv(filePath, ",", True, False, "numeric")
        # # c.read_csv(filePath, ",", True, False)
        # c.normalize_data((0,1), False)
        # c.cluster_data("euclidean", "single", "row", "euclidean", "ward")
        # print c
        # d = inchlib_clust.Dendrogram(c)
        # print d
        # clustered[filename] = d
    return clustered

# Start
# if __name__ == "__main__":
#     url = "ws://localhost:9000/ws"
#     realm = "realm1"
#     app.run(url.decode("unicode-escape"), realm.decode("unicode-escape"))
