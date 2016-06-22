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
