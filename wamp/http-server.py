import re
from klein import run, route
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

@route('/runlearning/submit')
def runlearning_submit(request):
    runID = str(uuid.uuid4())
    runPath = tmpDir + runID + "/"
    os.mkdir(runPath)

    piFilepath = runPath + "pathway.pi"
    learningPairwiseInteractionFile = request.args.get("pairwiseInteractionFile", ["filename"])[0]
    piFh = open(piFilepath, "w")
    piFh.write(learningPairwiseInteractionFile)
    piFh.close()

    generateFactorgraph(runPath)

    obsFilepath = runPath + "learning.obs"
    learningObservationFile = request.args.get("observationFile", ["filename"])[0]
    obsFh = open(obsFilepath, "w")
    obsFh.write(learningObservationFile)
    obsFh.close()

    numberOfStates = int(request.args.get("numberOfStatesLearning", [0]) [0])
    logLikelihoodChangeLimit = request.args.get("logLikelihoodChangeLimit", [0])[0]
    emMaxIterations = request.args.get("emMaxIterations", [0])[0]
    numberOfTrainingSamples = request.args.get("numberOfTrainingSamples", [0])[0]

    #shutil.rmtree(runPath)
    return ("Run {} completed".format(runID))

@route('/runinference/submit')
def runinference_submit(request):
    runID = str(uuid.uuid4())
    runPath = tmpDir + runID + "/"
    os.mkdir(runPath)

    piFilepath = runPath + "pathway.pi"
    piFile = request.args["pairwiseInteractionFile"][0]
    piFh = open(piFilepath, "w")
    piFh.write(piFile)
    piFh.close()

    generateFactorgraph(runPath)

    obsFilepath = runPath + "inference.obs"
    observationFile = request.args.get("observationFile", ["filename"])[0]
    obsFh = open(obsFilepath, "w")
    obsFh.write(observationFile)
    obsFh.close()

    numberOfStates = int(request.args.get("numberOfStates", [0]) [0])

    inferenceCommand(runPath, numberOfStates)
    
    ppFilepath = runPath + "pathway.pp"
    ppFh = open(ppFilepath)
    ppFile = ppFh.read()
    ppFh.close()

    #shutil.rmtree(runPath)
    return (ppFile)

def runinference_submit(request):
    return request

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    return p.stdout.read()

def generateFactorgraph(runPath):
    system_call("pgmlab --generate-factorgraph --pairwise-interaction-file=" + str(runPath) + "pathway.pi --logical-factorgraph-file=" + str(runPath) + "logical.fg --number-of-states 3")

def inferenceCommand(runPath, numberOfStates):
    system_call("pgmlab --inference --pairwise-interaction-file=" + str(runPath) + "pathway.pi --inference-factorgraph-file=" + str(runPath) + "logical.fg --inference-observed-data-file=" + str(runPath) + "inference.obs --posterior-probability-file=" + str(runPath) + "pathway.pp --number-of-states " + str(numberOfStates))

def learningCommand(runPath):
    system_call("pgmlab --learning --pairwise-interaction-file=" + str(runPath) + "pathway.pi --learning-factorgraph-file=" + str(runPath) + "logical.fg --inference-observed-data-file=" + str(runPath) + "learning.obs --posterior-probability-file=" + str(runPath) + "pathway.pp --number-of-states 3")

run("localhost", 9001)
