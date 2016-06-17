from klein import Klein
from twisted.web.static import File
from twisted.internet.defer import inlineCallbacks, returnValue
from autobahn.twisted.wamp import Application
import os, os.path, subprocess, shutil, json, string, pprint, cgi, uuid
from itertools import * # for skipping lines in a file

app = Klein()
wampapp = Application()

cwd = os.getcwd()
pp = pprint.PrettyPrinter(indent=4)
tmpDir = cwd + "/../tmp/";
print 'tmpDir', tmpDir

@app.route('/pgmlab.html')
def home(request):
    # return File("./pgmlab.html")
    return File("./../pgmlab.html")

@app.route('/', branch=True)
def js(request):
    # return File('./js/')
    return File("./../js/")


@app.route('/runlearning/submit')
def runlearning_submit(request):
    runID = str(uuid.uuid4())
    runPath = tmpDir + runID + "/"
    os.mkdir(runPath)

    piFilepath = runPath + "pathway.pi"
    piFile = request.args["learningPairwiseInteractionFile"][0]
    piFh = open(piFilepath, "w")
    piFh.write(piFile)
    piFh.close()

    returnCode = generateFactorgraph(runPath)
    if returnCode != "0":
        shutil.rmtree(runPath)
        request.setResponseCode(500)
        return "Could not generate Factorgraph from Pairwise Interaction File"

    obsFilepath = runPath + "learning.obs"
    learningObservationFile = request.args["learningObservationFile"][0]
    obsFh = open(obsFilepath, "w")
    obsFh.write(learningObservationFile)
    obsFh.close()

    numberOfStates = int(request.args.get("learningNumberOfStates", [0]) [0])
    logLikelihoodChangeLimit = request.args.get("logLikelihoodChangeLimit", [0])[0]
    emMaxIterations = request.args.get("emMaxIterations", [0])[0]
    returnCode = learningCommand(runPath, numberOfStates, logLikelihoodChangeLimit, emMaxIterations)
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

@wampapp.register("run.inference.submit")
def run_inference_submit(request):
    print "run_inference_submit", request
# @app.route("/run/inference/submit")
@app.route('/runinference/submit', methods=["POST"])
@inlineCallbacks
def runinference_submit(request):
    runID = str(uuid.uuid4())
    runPath = tmpDir + runID + "/"
    print 'runPath:', runPath
    os.mkdir(runPath)

    numberOfStates = int(request.args.get("inferenceNumberOfStates", [0]) [0])

    piFilepath = runPath + "pathway.pi"
    piFile = request.args["inferencePairwiseInteractionFile"][0]
    piFh = open(piFilepath, "w")
    piFh.write(piFile)
    piFh.close()

    obsFilepath = runPath + "inference.obs"
    observationFile = request.args["inferenceObservationFile"][0]
    obsFh = open(obsFilepath, "w")
    obsFh.write(observationFile)
    obsFh.close()
    returnCode = generateFactorgraph(runPath)
    if returnCode != "0":
        #shutil.rmtree(runPath)
        print 'returnCode', returnCode
        request.setResponseCode(500)
        return "Could not generate Factorgraph from Pairwise Interaction File"

    learntfgFilename = request.args["learntFactorgraphFilename"]
    if learntfgFilename[0] != "":
        learntfgFilepath = runPath + "learnt.fg"
        learntfgFh = open(learntfgFilepath, "w")
        learntfgFile = request.args["learntFactorgraphFile"][0]
        learntfgFh.write(learntfgFile)
        learntfgFh.close()
        returncode = inferenceCommand(runPath, numberOfStates, "learnt.fg")
    else:
        returnCode = inferenceCommand(runPath, numberOfStates)

    if returnCode == None:
        #shutil.rmtree(runPath)
        request.setResponseCode(500)
        return "Error while running inference"

    ppFilepath = runPath + "pathway.pp"
    ppFh = open(ppFilepath)
    ppFile = ppFh.read()
    ppFh.close()

    #shutil.rmtree(runPath)
    return (ppFile)

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return str(p.returncode)

def generateFactorgraph(runPath):
    # prepend '../bin' in command instead of using symlinks on install
    command = "../bin/pgmlab --generate-factorgraph --pairwise-interaction-file=" + str(runPath) + "pathway.pi --logical-factorgraph-file=" + str(runPath) + "logical.fg --number-of-states 3"
    return system_call(command)

def inferenceCommand(runPath, numberOfStates, fg="logical.fg"):
    command = "../bin/pgmlab --inference --pairwise-interaction-file=" + str(runPath) + "pathway.pi --inference-factorgraph-file=" + str(runPath) + fg + " --inference-observed-data-file=" + str(runPath) + "inference.obs --posterior-probability-file=" + str(runPath) + "pathway.pp --number-of-states " + str(numberOfStates)
    return system_call(command)

def learningCommand(runPath, numberOfStates, logLikelihoodChangeLimit, emMaxIterations):
    command = "../bin/pgmlab --learning --pairwise-interaction-file=" + str(runPath) + "pathway.pi --logical-factorgraph-file=" + str(runPath) + "logical.fg --learning-observed-data-file=" + str(runPath) + "learning.obs --estimated-parameters-file=" + str(runPath) + "learnt.fg --number-of-states " + str(numberOfStates) +" --log-likelihood-change-limit=" + logLikelihoodChangeLimit + " --em-max-iterations=" + emMaxIterations
    return system_call(command)

if __name__ == "__main__":
    import sys
    # from twisted.python import log
    from twisted.web.server import Site
    from twisted.internet import reactor
    # log.startLogging(sys.stdout)

    reactor.listenTCP(9002, Site(app.resource()))
    wampapp.run(u"ws://localhost:9001/ws", u"realm1")
