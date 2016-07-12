# PGMLab commands
import pgmlab_commands
import datetime
import json
import shutil
import os, os.path
cwd = os.getcwd()
inference_path = cwd+"/../../data/pgmlab/inference/"
learning_path = cwd+"/../../data/pgmlab/learning/"

# Klein for POST that starts Celery task, resource for twistd command to start server
from twisted.web.static import File
from klein import Klein
klein = Klein()
resource = klein.resource
# QUEUE AND RUN TASKS ASYNC USING CELERY
from celery import Celery, states
from celery.exceptions import InvalidTaskError
celery = Celery("pgmlab_server", backend="amqp", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker
celery.conf.CELERY_SEND_EVENTS = True
# HOST HTML
@klein.route("/pgmlab.html")
def home(request):
    return File("../pgmlab.html")
# HOST JS
@klein.route("/", branch=True)
def js(request):
    return File("../js/")
# HOST RESULTS FOR DOWNLOAD
@klein.route("/results/<task_id>")
def result(request, task_id):
    print("...requesting task with id: {}".format(task_id))
    return File("./results/"+task_id+".zip")
# POST METHOD FOR SUBMITTING LEARNING AND INFERENCE JOBS
@klein.route('/run/learning/submit', methods=["POST"])
def run_learning_submit(request):
    print("...run_learning_submit @: {}".format(str(datetime.datetime.now())))
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
    print("...run_inference_submit @: {}".format(str(datetime.datetime.now())))
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
# CELERY TASKS FOR LEARNING AND INFERENCE
@celery.task(bind=True)
def run_learning_task(self, **kwargs):
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
        # shutil.rmtree(run_path)
        # self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
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
        # shutil.rmtree(run_path)
        # self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
    # Create package to download
    # Package is created into server directory (i.e. www/pgmlab/)
    # This path corresponds to save file path in results table
    package_path = cwd+"/results/"+task_id #package name is task uuid
    shutil.make_archive(package_path, "zip", root_dir=run_path)
@celery.task(bind=True)
def run_inference_task(self, **kwargs):
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
        # shutil.rmtree(run_path)
        # self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
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
        # shutil.rmtree(run_path)
        # self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
    # Create package to download
    # Package is created into server directory (i.e. www/pgmlab/)
    # This path corresponds to save file path in results table
    package_path = cwd+"/results/"+task_id #package name is task uuid
    shutil.make_archive(package_path, "zip", root_dir=run_path)

# EVENTSTREAM ENDPOINT FOR SERVER-SENT-EVENTS ON CELERY TASK UPDATE
from pgmlab_db import db_session, Task, Session
from twisted.internet import defer
spectators = set() # Holds request objects for each client requesting eventStream
@klein.route("/celery")
def stream(request):
    request.setHeader("Content-type", "text/event-stream")
    global spectators
    spectators = set([spec for spec in spectators if not spec.transport.disconnected]+[request])
    print("...celery event stream requests: ", len(spectators))
    return defer.Deferred()
# TASK UPDATING IN DB AND TO CLIENTS (SERVER SENT EVENTS)
def sse_add_task(task):
    print("...adding task with id: {}".format(task.to_dict()["task_id"]))
    global spectators
    for spec in spectators:
        if not spec.transport.disconnected:
            # Add event listener to event "celery.task.add" on client
            spec.write("event: celery.task.add\ndata: {}\n\n".format(json.dumps(task.to_dict())))
def sse_update_task(task_id, task_status):
    print("...updating task with id: {0} -> {1}".format(task_id, task_status))
    global spectators
    for spec in spectators:
        if not spec.transport.disconnected:
            spec.write("event: celery.task.update\ndata: {}\n\n".format(json.dumps({"task_id":task_id,"task_status":task_status})))

# CELERY TASK EVENT MONITOR
import threading
import time
import ast
from sqlalchemy.orm import scoped_session
def monitor(sess):
    print("...calling celery monitor")
    # sess = scoped_session(Session)
    def catch_all(event):
        # event["uuid"]=12
        if event["type"] == "task-received":
            kwargs = ast.literal_eval(event["kwargs"])
            task_to_add = Task(
                task_id = event["uuid"],
                task_type = kwargs["task_type"],
                submit_datetime = kwargs["submit_datetime"],
                status = event["type"],
                pi_filename = kwargs["pi_filename"],
                obs_filename = kwargs["obs_filename"],
                number_states = kwargs["number_states"]
            )
            if kwargs["task_type"] == "learning":
                task_to_add.change_limit = kwargs["change_limit"]
                task_to_add.max_iterations = kwargs["max_iterations"]
            else:
                task_to_add.lfg_filename = kwargs["lfg_filename"]
            try:
                sse_add_task(task=task_to_add)
                print(sess)
                sess.add(task_to_add)
                sess.commit()
            except Exception as err:
                print("...EXCEPTION caught on add: {}".format(err))
        elif event["type"] in ["task-started", "task-succeeded", "task-failed"]:
            try:
                sse_update_task(task_id=event["uuid"], task_status=event["type"])
                task_to_update = sess.query(Task).get(event["uuid"])
                task_to_update.status = event["type"]
                print(sess)
                sess.commit()
            except Exception as err:
                print("...EXCEPTION caught on update ({0}): {1}".format(event["type"], err))
    while True:
        try:
            with celery.connection() as connection:
                recv = celery.events.Receiver(
                    connection,
                    handlers ={"*": catch_all}
                )
                recv.capture(limit=None, timeout=None, wakeup=True)
        except (KeyboardInterrupt, SystemExit):
            raise
        except Exception: # unable to capture
            pass
        time.sleep(1)
def run_monitor(sess):
    thread = threading.Thread(target=monitor, kwargs={"sess":sess})
    thread.daemon = True
    thread.start()
run_monitor(sess=scoped_session(Session))
