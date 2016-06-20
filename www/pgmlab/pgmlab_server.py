from twisted.web.static import File
from twisted.internet.defer import inlineCallbacks, returnValue
import os, os.path, shutil, json, string, pprint, cgi, uuid
from itertools import * # for skipping lines in a file

# PGMLab related modules
import pgmlab_commands
from pgmlab_db import session, Inference

# Application services
from klein import Klein
klein = Klein()
from autobahn.twisted.wamp import Application
wamp = Application()
from celery import Celery
celery = Celery("pgmlab_server", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker

cwd = os.getcwd()
pp = pprint.PrettyPrinter(indent=4)
tmpDir = cwd + "/../tmp/";

@klein.route('/runlearning/submit')
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

# INFERENCE
import random, time, datetime
@celery.task(bind=True)
def run_inference_task(self, **kwargs):
    print "run_inference_task", kwargs
    verb = ['Starting up', 'Booting', 'Repairing', 'Loading', 'Checking']
    adjective = ['master', 'radiant', 'silent', 'harmonic', 'fast']
    noun = ['solar array', 'particle reshaper', 'cosmic ray', 'orbiter', 'bit']
    message = ''
    total = random.randint(1, 2)
    for i in range(total):
        if not message or random.random() < 0.25:
            message = '{0} {1} {2}...'.format(random.choice(verb),
                                              random.choice(adjective),
                                              random.choice(noun))
        self.update_state(state='PROGRESS',
                          meta={'current': i, 'total': total,
                                'status': message})
        time.sleep(1)
    test = Inference(task_id=self.request.id, completed=False, submitted=datetime.datetime.now())
    session.add(test)
    session.commit()
    print session.query(Inference).all()
    return {'current': 100, 'total': 100, 'status': 'Task completed!',
            'result': 42}

@wamp.register("run.inference")
def run_inference(request):
    task = run_inference_task.apply_async(kwargs={"test":request})
    print "run_inference: task: ", task
    return task.id

@klein.route('/run/inference/submit', methods=["POST"])
@inlineCallbacks
def run_inference_submit(request):
    # print "run_inference_submit"
    res = yield wamp.session.call("run.inference", "requestDATA")
    returnValue(res)

if __name__ == "__main__":
    import sys
    from twisted.web.server import Site
    from twisted.internet import reactor

    reactor.listenTCP(9002, Site(klein.resource()))
    wamp.run(u"ws://localhost:9001/ws", u"realm1")


# INFERENCE
    # runID = str(uuid.uuid4())
    # runPath = tmpDir + runID + "/"
    # print 'runPath:', runPath
    # os.mkdir(runPath)
    #
    # numberOfStates = int(request.args.get("inferenceNumberOfStates", [0]) [0])
    #
    # piFilepath = runPath + "pathway.pi"
    # piFile = request.args["inferencePairwiseInteractionFile"][0]
    # piFh = open(piFilepath, "w")
    # piFh.write(piFile)
    # piFh.close()
    #
    # obsFilepath = runPath + "inference.obs"
    # observationFile = request.args["inferenceObservationFile"][0]
    # obsFh = open(obsFilepath, "w")
    # obsFh.write(observationFile)
    # obsFh.close()
    # returnCode = generateFactorgraph(runPath)
    # if returnCode != "0":
    #     #shutil.rmtree(runPath)
    #     print 'returnCode', returnCode
    #     request.setResponseCode(500)
    #     return "Could not generate Factorgraph from Pairwise Interaction File"
    #
    # learntfgFilename = request.args["learntFactorgraphFilename"]
    # if learntfgFilename[0] != "":
    #     learntfgFilepath = runPath + "learnt.fg"
    #     learntfgFh = open(learntfgFilepath, "w")
    #     learntfgFile = request.args["learntFactorgraphFile"][0]
    #     learntfgFh.write(learntfgFile)
    #     learntfgFh.close()
    #     returncode = inferenceCommand(runPath, numberOfStates, "learnt.fg")
    # else:
    #     returnCode = inferenceCommand(runPath, numberOfStates)
    #
    # if returnCode == None:
    #     #shutil.rmtree(runPath)
    #     request.setResponseCode(500)
    #     return "Error while running inference"
    #
    # ppFilepath = runPath + "pathway.pp"
    # ppFh = open(ppFilepath)
    # ppFile = ppFh.read()
    # ppFh.close()
    #
    # #shutil.rmtree(runPath)
    # return (ppFile)
