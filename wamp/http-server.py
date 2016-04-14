import re
from klein import Klein
import json
import pprint

import os
import os.path
import shutil # for removing directory

import json
import string

import cgi
import uuid

from itertools import * # for skipping lines in a file
import subprocess

cwd = os.getcwd()
pp = pprint.PrettyPrinter(indent=4)
tmpDir = cwd + "/tmp/";

app = Klein()

@app.route('/runlearning/submit')
def runlearning_submit(request):
    runID = str(uuid.uuid4())
    runPath = tmpDir + runID + "/"
    os.mkdir(runPath)

    pp.pprint(request.args)
    return
    piFilepath = runPath + "pathway.pi"
    piFile = request.args["pairwiseInteractionFile"][0]
    piFh = open(piFilepath, "w")
    piFh.write(piFile)
    piFh.close()

    returnCode = generateFactorgraph(runPath)
    if returnCode != "0":
        #shutil.rmtree(runPath)
        request.setResponseCode(500)
        return "Could not generate Factorgraph from Pairwise Interaction File"

    obsFilepath = runPath + "learning.obs"
    learningObservationFile = request.args.get("observationFile", ["filename"])[0]
    obsFh = open(obsFilepath, "w")
    obsFh.write(learningObservationFile)
    obsFh.close()

    numberOfStates = int(request.args.get("numberOfStates", [0]) [0])
    logLikelihoodChangeLimit = request.args.get("logLikelihoodChangeLimit", [0])[0]
    emMaxIterations = request.args.get("emMaxIterations", [0])[0]

    returnCode = runLearning(runPath, numberOfStates, logLikelihoodChangeLimit, emMaxIteractions)
    if returnCode != "0":
        shutil.rmtree(runPath)
        request.setResponseCode(500)
        return "Could not run learning with provided parameters"

    logicalfgFilepath = runPath + "logical.fg"
    logicalfgFh = open(logicalfgFilepath)
    logicalfgFile = logicalfgFh.read()
    logicalfgFh.close()

    shutil.rmtree(runPath)
    return (logicalfgFile)

@app.route('/runinference/submit')
def runinference_submit(request):
    runID = str(uuid.uuid4())
    runPath = tmpDir + runID + "/"
    os.mkdir(runPath)

    numberOfStates = int(request.args.get("numberOfStates", [0]) [0])

    piFilepath = runPath + "pathway.pi"
    piFile = request.args["pairwiseInteractionFile"][0]
    piFh = open(piFilepath, "w")
    piFh.write(piFile)
    piFh.close()

    obsFilepath = runPath + "inference.obs"
    observationFile = request.args.get("observationFile", ["filename"])[0]
    obsFh = open(obsFilepath, "w")
    obsFh.write(observationFile)
    obsFh.close()
    returnCode = generateFactorgraph(runPath)
    if returnCode != "0":
        shutil.rmtree(runPath)
        request.setResponseCode(500)
        return "Could not generate Factorgraph from Pairwise Interaction File"

    learntfgFilename = request.args["learntFactorgraphFilename"]
    if learntfgFilename[0] != "":
        learntfgFilepath = runPath + "learnt.fg"
        learnfgFh = open(learnfgFilepath, "w")
        learnfgFile = request.args.get("learntFactorgraphFile", ["filename"])[0]
        learnfgFh.write(learntfgFile)
        learntfgFh.close()
        returncode = inferenceCommand(runPath, numberOfStates, "learnt.fg")
    else:
        returnCode = inferenceCommand(runPath, numberOfStates)

    if returnCode == None:
        shutil.rmtree(runPath)
        request.setResponseCode(500)
        return "Error while running inference"

    ppFilepath = runPath + "pathway.pp"
    ppFh = open(ppFilepath)
    ppFile = ppFh.read()
    ppFh.close()

    shutil.rmtree(runPath)
    return (ppFile)

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return str(p.returncode)

def generateFactorgraph(runPath):
    return system_call("pgmlab --generate-factorgraph --pairwise-interaction-file=" + str(runPath) + "pathway.pi --logical-factorgraph-file=" + str(runPath) + "logical.fg --number-of-states 3")

def inferenceCommand(runPath, numberOfStates, fg="logical.fg"):
    return system_call("pgmlab --inference --pairwise-interaction-file=" + str(runPath) + "pathway.pi --inference-factorgraph-file=" + str(runPath) + fg + " --inference-observed-data-file=" + str(runPath) + "inference.obs --posterior-probability-file=" + str(runPath) + "pathway.pp --number-of-states " + str(numberOfStates))

def learningCommand(runPath, numberOfStates, logLikelihoodChangeLimit, emMaxIteractions):
    return system_call("pgmlab --learning --pairwise-interaction-file=" + str(runPath) + "pathway.pi --learning-factorgraph-file=" + str(runPath) + "logical.fg --inference-observed-data-file=" + str(runPath) + "learning.obs --posterior-probability-file=" + str(runPath) + "pathway.pp --number-of-states " + str(numberOfStates) +" --log-likelihood-change-limit=" + logLikelihoodChangeLimit + " --em-max-iterations=" + emMaxIterations)

app.run("localhost", 9001)
