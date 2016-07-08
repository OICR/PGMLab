# PGMLab related modules
import pgmlab_commands
from pgmlab_db import db_session, Task

import os, os.path
cwd = os.getcwd()
inference_path = cwd+"/../../data/pgmlab/inference/"
learning_path = cwd+"/../../data/pgmlab/learning/"
import pprint
pp = pprint.PrettyPrinter(indent=4)
from itertools import * # for skipping lines in a file
import datetime, shutil, json, string, cgi, uuid, requests, json



# Klein for POST that starts Celery task, resource for twistd command to start server
from twisted.web.static import File
from klein import Klein
klein = Klein()
resource = klein.resource
# Host html and js
@klein.route("/pgmlab.html")
def home(request):
    return File("../pgmlab.html")

@klein.route("/", branch=True)
def js(request):
    return File("../js/")

@klein.route("/results/<task_id>")
def result(request, task_id):
    print(task_id,request)
    return File("./results/"+task_id+".zip")

from twisted.internet import defer
spectactors = set()
@klein.route("/test")
def stream(request):
    request.setHeader("Content-type", "text/event-stream")
    # request.write("data: connected: {}\n\n".format(str(datetime.datetime.now())))
    spectactors.add(request) #find a way to clear this
    return defer.Deferred()

@klein.route("/move", methods=["POST"])
def move(request):
    print('reqs', len(spectactors))
    for spec in spectactors:
        if not spec.transport.disconnected:
            spec.write("data: {}\n\n".format(str(datetime.datetime.now())))

def add_task(task):
    print("add:", task.to_dict())
    db_session.add(task)
    db_session.commit()
    for spec in spectactors:
        if not spec.transport.disconnected:
            spec.write("event: celery.task.add\n")
            spec.write("data: {}\n\n".format(json.dumps(task.to_dict())))
            None

def update_task(task_id, task_status):
    print("update:", task_id, task_status)
    task = db_session.query(Task).get(task_id)
    task.status = task_status
    db_session.commit()
    for spec in spectactors:
        if not spec.transport.disconnected:
            spec.write("event: celery.task.update\n")
            spec.write("data: {}\n\n".format(json.dumps({"task_id":task_id,"task_status":task_status})))
            None

# Queue and run tasks async
from celery import Celery, states
from celery.exceptions import InvalidTaskError
celery = Celery("pgmlab_server", backend="amqp", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker
celery.conf.CELERY_SEND_EVENTS = True

@klein.route('/run/learning/submit', methods=["POST"])
def run_learning_submit(request):
    data = {
        "pi_file": request.args["pairwiseInteractionFile"][0],
        "pi_filename": request.args["pairwiseInteractionFilename"][0],
        "obs_file": request.args["observationFile"][0],
        "obs_filename": request.args["observationFilename"][0],
        "number_states": int(request.args["numberStates"][0]),
        "change_limit": float(request.args["logLikelihoodChangeLimit"][0]), #
        "max_iterations": int(request.args["emMaxIterations"][0]), #
        "task_type": "learning",
        "submit_datetime": str(datetime.datetime.now())
    }
    task = run_learning_task.apply_async(kwargs=data)
    return task.id

@klein.route('/run/inference/submit', methods=["POST"])
def run_inference_submit(request):
    data = {
        "pi_file": request.args["pairwiseInteractionFile"][0],
        "pi_filename": request.args["pairwiseInteractionFilename"][0],
        "obs_file": request.args["observationFile"][0],
        "obs_filename": request.args["observationFilename"][0],
        "lfg_file": request.args["learntFactorgraphFile"][0],
        "lfg_filename": request.args["learntFactorgraphFilename"][0],
        "number_states": int(request.args["inferenceNumberOfStates"][0]),
        "task_type": "inference",
        "submit_datetime": str(datetime.datetime.now())
    }
    task = run_inference_task.apply_async(kwargs=data)
    return task.id

@celery.task(bind=True)
def run_learning_task(self, **kwargs):
    # print "run_learning_task"
    # pp.pprint(kwargs)
    # PGMLab
    task_id = self.request.id
    run_path = learning_path+task_id+"/"
    os.mkdir(run_path)
    # Pairwise Interaction
    pi_file = kwargs["pi_file"]
    pgmlab_commands.generate_pairwise_interaction(run_path, pi_file)
    # Factorgraph
    return_code = pgmlab_commands.generate_logical_factorgraph(run_path)
    if return_code != "0":
        shutil.rmtree(run_path)
        self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
        # return "Could not generate factorgraph from pairwise interaction file"
    # Observation
    obs_file = kwargs["obs_file"]
    run_type = kwargs["task_type"]
    pgmlab_commands.generate_observation(run_path, obs_file, run_type)
    # Learning
    number_states = kwargs["number_states"]
    change_limit = kwargs["change_limit"]
    max_iterations = kwargs["max_iterations"]
    return_code = pgmlab_commands.learning(run_path, number_states, change_limit, max_iterations)
    if return_code != "0":
        shutil.rmtree(run_path)
        raise InvalidTaskError()
        # return "Could not run learning with provided parameters"
    # Create package to download
    # Package is created into server directory (i.e. www/pgmlab/)
    # This path corresponds to save file path in results table
    package_path = cwd+"/results/"+task_id #package name is task uuid
    shutil.make_archive(package_path, "zip", root_dir=run_path)

@celery.task(bind=True)
def run_inference_task(self, **kwargs):
    # print "run_inference_task"
    # pp.pprint(kwargs)
    # PGMLab
    task_id = self.request.id
    run_path = inference_path+task_id+"/"
    os.mkdir(run_path)
    # Pairwise Interaction
    pi_file = kwargs["pi_file"]
    pgmlab_commands.generate_pairwise_interaction(run_path, pi_file)
    # Observation
    obs_file = kwargs["obs_file"]
    run_type = kwargs["task_type"]
    pgmlab_commands.generate_observation(run_path, obs_file, run_type)
    # Logical Factorgraph
    return_code = pgmlab_commands.generate_logical_factorgraph(run_path)
    if return_code != "0":
        shutil.rmtree(run_path)
        raise InvalidTaskError()
        # return "Could not generate factorgraph from pairwise interaction file"
    # Learnt factorgraph (optional)
    lfg_file = kwargs["lfg_file"]
    if lfg_file != "":
        pgmlab_commands.generate_learnt_factorgraph(run_path, lfg_file)
        fg_name = "learnt.fg"
    else:
        fg_name = "logical.fg"
    # Inference
    number_states = kwargs["number_states"]
    return_code = pgmlab_commands.inference(run_path, number_states, fg_name)
    if return_code != "0":
        # Catch errors: self.request.... (call fail event?)
        shutil.rmtree(run_path)
        raise InvalidTaskError()
        # return "Could not run inference with provided parameters"
    # Create package to download
    # Package is created into server directory (i.e. www/pgmlab/)
    # This path corresponds to save file path in results table
    package_path = cwd+"/results/"+task_id #package name is task uuid
    shutil.make_archive(package_path, "zip", root_dir=run_path)

import threading
import time
import ast
def monitor():
    print('monitor')
    def catch_all(event):
        if event["type"] == "task-received":
            kwargs = ast.literal_eval(event["kwargs"])
            task = Task(
                task_id = event["uuid"],
                task_type = kwargs["task_type"],
                submit_datetime = kwargs["submit_datetime"],
                status = event["type"],
                pi_filename = kwargs["pi_filename"],
                obs_filename = kwargs["obs_filename"],
                number_states = kwargs["number_states"]
            )
            if kwargs["task_type"] == "learning":
                task.change_limit = kwargs["change_limit"]
                task.max_iterations = kwargs["max_iterations"]
            else:
                task.lfg_filename = kwargs["lfg_filename"]
            add_task(task)
        elif event["type"] in ["task-started", "task-succeeded", "task-failed"]:
            update_task(event["uuid"], event["type"])
    while True:
        try:
            with celery.connection() as connection:
                recv = celery.events.Receiver(connection, handlers ={
                        # "task-received": handle_task_received,
                        # "task-started": handle_task_started,
                        # "task-succeeded": handle_task_succeeded,
                        # "task-failed": handle_task_failed,
                        "*": catch_all
                })
                recv.capture(limit=None, timeout=None, wakeup=True)
        except (KeyboardInterrupt, SystemExit):
            raise
        except Exception: # unable to capture
            pass
        time.sleep(1)
def run_monitor():
    thread = threading.Thread(target=monitor, args=())
    thread.daemon = True
    thread.start()
run_monitor()
