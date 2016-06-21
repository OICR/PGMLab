from twisted.web.static import File
from twisted.internet.defer import inlineCallbacks, returnValue
import os, os.path, shutil, json, string, pprint, cgi, uuid
from itertools import * # for skipping lines in a file
import datetime

# PGMLab related modules
import pgmlab_commands
from pgmlab_db import session, Task

# Application services
from klein import Klein
klein = Klein()
from autobahn.twisted.wamp import Application
wamp = Application()
from celery import Celery, chain
celery = Celery("pgmlab_server", backend="amqp", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker

cwd = os.getcwd()
inference_path = cwd+"/../../data/pgmlab/inference/"
learning_path = cwd+"/../../data/pgmlab/learning/"
pp = pprint.PrettyPrinter(indent=4)

# from autobahn.twisted.wamp import ApplicationRunner, ApplicationSession
# class MyComponent(ApplicationSession):
#     def __init__(self, realm="realm1"):
#         ApplicationSession.__init__(self)
#         self._realm = realm
#
#     def onConnect(self):
#         self.join(self._realm)
#
#     @inlineCallbacks
#     def onJoin(self, details):
#         if not self.factory._myAppSession:
#             self.factory._myAppSession = self
#
#         print("session ready")
#
#         def run_learning(data):
#             task = run_learning_task.apply_async(kwargs=data)
#             return task.id
#         yield self.register(run_learning, "run.learning")
#
#         self.publish("celery.tasks", ['all tasks here'])

# LEARNING
@wamp.register("publish.tasks")
def publish_tasks():
    print("PUBLISH TASKS")
    yield wamp.session.publish("celery.tasks", session.query(Task).all())
@celery.task(bind=True)
def run_learning_task(self, **kwargs):
    # print "run_learning_task", kwargs
    print "run_learning_task"
    pp.pprint(kwargs)
    # Define Task and push to db
    task_id = self.request.id
    learning_task = Task(
        task_id=task_id,
        task_type="learning",
        completed=False,
        submitted=datetime.datetime.now()
    )
    session.add(learning_task)
    session.commit()
    # res = yield wamp.session.call("publish.tasks")
    # res = yield wamp.session.publish("celery.tasks", session.query(Task).all())
@wamp.register("run.learning")
def run_learning(data):
    # res = chain(run_learning_task.s(kwargs=data), publish_tasks.s())()
    # res.get()
    task = run_learning_task.apply_async(kwargs=data)
    return task.id
@klein.route('/run/learning/submit', methods=["POST"])
@inlineCallbacks
def run_learning_submit(request):
    pi_file = request.args["learningPairwiseInteractionFile"][0]
    obs_file = request.args["learningObservationFile"][0]
    number_states = int(request.args["learningNumberOfStates"][0])
    log_likelihood_change_limit = request.args["logLikelihoodChangeLimit"][0]
    em_max_iterations = request.args["emMaxIterations"][0]
    data = {
        "pi_file": pi_file,
        "obs_file": obs_file,
        "number_states": number_states,
        "change_limit": log_likelihood_change_limit,
        "max_iterations": em_max_iterations
    }
    res = yield wamp.session.call("run.learning", data)
    returnValue(res)

# INFERENCE
@celery.task(bind=True)
def run_inference_task(self, **kwargs):
    # print "run_inference_task", kwargs
    print "run_inference_task"
    pp.pprint(kwargs)
    inference_task = Task(
        task_id=self.request.id,
        task_type="inference",
        completed=False,
        submitted=datetime.datetime.now()
    )
    session.add(inference_task)
    session.commit()
    return
@wamp.register("run.inference")
def run_inference(data):
    task = run_inference_task.apply_async(kwargs=data)
    return task.id
@klein.route('/run/inference/submit', methods=["POST"])
@inlineCallbacks
def run_inference_submit(request):
    # print "run_inference_submit"
    # pp.pprint(request)
    # pp.pprint(request.args)
    pi_file = request.args["inferencePairwiseInteractionFile"][0]
    obs_file = request.args["inferenceObservationFile"][0]
    fg_file = request.args["learntFactorgraphFile"][0]
    number_states = int(request.args["inferenceNumberOfStates"][0])
    data = {
        "pi_file": pi_file,
        "obs_file": obs_file,
        "fg_file": fg_file,
        "number_states": number_states
    }
    res = yield wamp.session.call("run.inference", data)
    returnValue(res)

if __name__ == "__main__":
    import sys
    from twisted.web.server import Site
    from twisted.internet import reactor

    reactor.listenTCP(9002, Site(klein.resource()))
    wamp.run(u"ws://localhost:9001/ws", u"realm1")
    # wamp = ApplicationRunner(url=u"ws://localhost:9001/ws", realm=u"realm1")
    # wamp.run(MyComponent)

# LEARNING
# runID = str(uuid.uuid4())
# runPath = tmpDir + runID + "/"
# os.mkdir(runPath)
#
# piFilepath = runPath + "pathway.pi"
# piFile = request.args["learningPairwiseInteractionFile"][0]
# piFh = open(piFilepath, "w")
# piFh.write(piFile)
# piFh.close()
#
# returnCode = generateFactorgraph(runPath)
# if returnCode != "0":
#     shutil.rmtree(runPath)
#     request.setResponseCode(500)
#     return "Could not generate Factorgraph from Pairwise Interaction File"
#
# obsFilepath = runPath + "learning.obs"
# learningObservationFile = request.args["learningObservationFile"][0]
# obsFh = open(obsFilepath, "w")
# obsFh.write(learningObservationFile)
# obsFh.close()
#
# numberOfStates = int(request.args.get("learningNumberOfStates", [0]) [0])
# logLikelihoodChangeLimit = request.args.get("logLikelihoodChangeLimit", [0])[0]
# emMaxIterations = request.args.get("emMaxIterations", [0])[0]
# returnCode = learningCommand(runPath, numberOfStates, logLikelihoodChangeLimit, emMaxIterations)
# if returnCode != "0":
#     shutil.rmtree(runPath)
#     request.setResponseCode(500)
#     return "Could not run learning with provided parameters"
#
# logicalfgFilepath = runPath + "logical.fg"
# logicalfgFh = open(logicalfgFilepath)
# logicalfgFile = logicalfgFh.read()
# logicalfgFh.close()
#
# shutil.rmtree(runPath)
# return (logicalfgFile)

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
