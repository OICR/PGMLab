from twisted.web.static import File
import os, os.path
cwd = os.getcwd()
inference_path = cwd+"/../../data/pgmlab/inference/"
learning_path = cwd+"/../../data/pgmlab/learning/"
import pprint
pp = pprint.PrettyPrinter(indent=4)
from itertools import * # for skipping lines in a file
import datetime, shutil, json, string, cgi, uuid

# PGMLab related modules
import pgmlab_commands
# from pgmlab_db import db_session, Task
from pgmlab_db import Task

# Klein for POST that starts Celery task
from klein import Klein
klein = Klein()
# For communicating with backend (db, RPC, Pub/Sub)
from autobahn.twisted.wamp import Application
wamp = Application()
# Queue and run tasks async
from celery import Celery
celery = Celery("pgmlab_server", backend="amqp", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker
celery.conf.CELERY_SEND_EVENTS = True
# celery.conf.update(CELERY_SEND_EVENTS=True)

# RPC to register a wamp.publish on <App> mount (loop over all users in db)
@wamp.register("publish.tasks")
def publish_tasks():
    print("Publishing {} tasks...".format(len(db_session.query(Task).all())))
    yield wamp.session.publish("celery.tasks", len(db_session.query(Task).all()))

# LEARNING
@celery.task(bind=True)
def run_learning_task(self, **kwargs):
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
    # db_session.add(learning_task)
    # db_session.commit()
    # pgmlab stuff
@klein.route('/run/learning/submit', methods=["POST"])
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
    task = run_learning_task.apply_async(kwargs=data)
    return task.id

# INFERENCE
@celery.task(bind=True)
def run_inference_task(self, **kwargs):
    print "run_inference_task"
    pp.pprint(kwargs)
    inference_task = Task(
        task_id=self.request.id,
        task_type="inference",
        completed=False,
        submitted=datetime.datetime.now()
    )
    # db_session.add(inference_task)
    # db_session.commit()
@klein.route('/run/inference/submit', methods=["POST"])
def run_inference_submit(request):
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
    task = run_inference_task.apply_async(kwargs=data)
    return task.id

import threading
import time
class MonitorThread(object):
    def __init__(self, celery_app, interval=1):
        self.celery_app = celery_app
        self.interval = interval
        self.state = self.celery_app.events.State()
        # print threading
        self.thread = threading.Thread(target=self.run, args=())
        self.thread.daemon = True
        self.thread.start()

    def catchall(self, event):
        print event["type"]
        if event["type"] != "worker-heartbeat":
            self.state.event(event)
        if event["type"] == "task-sent":
            print("task-sent", event)
        if event["type"] == "task-succeeded":
            print("task-succeeded", event)
            wamp.session.publish("celery.tasks", 'DONE TASKS')

    def run(self):
        while True:
            try:
                with self.celery_app.connection() as connection:
                    recv = self.celery_app.events.Receiver(connection, handlers={
                        '*': self.catchall
                    })
                    recv.capture(limit=None, timeout=None, wakeup=True)

            except (KeyboardInterrupt, SystemExit):
                raise

            except Exception:
                # unable to capture
                pass

            time.sleep(self.interval)

if __name__ == "__main__":
    import sys
    from twisted.web.server import Site
    from twisted.internet import reactor

    reactor.listenTCP(9002, Site(klein.resource()))
    MonitorThread(celery)
    # celery.start()
    wamp.run(u"ws://localhost:9001/ws", u"realm1")
