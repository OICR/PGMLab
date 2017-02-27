# PGMLab commands
import pgmlab_utils
import datetime
import json
import shutil
import os, os.path
cwd = os.getcwd()
inference_path = cwd+"/../../data/pgmlab/inference"
learning_path = cwd+"/../../data/pgmlab/learning"

# SQLite and SQLAlchemy
from database import Task, DatabaseSessionManager
dbsm = DatabaseSessionManager()

# Klein for POST that starts Celery task, resource for twistd command to start server
from twisted.web.static import File
from klein import Klein
klein = Klein()
resource = klein.resource

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
    sub_uid = dbsm.validate_g_token(id_token=request.args["id_token"][0])["sub"]
    data = {
        "sub_uid": sub_uid,
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
    sub_uid = dbsm.validate_g_token(id_token=request.args["id_token"][0])["sub"]
    data = {
        "sub_uid": sub_uid,
        "pi_file": request.args["pairwiseInteractionFile"][0],
        "pi_filename": request.args["pairwiseInteractionFilename"][0],
        "obs_file": request.args["observationFile"][0],
        "obs_filename": request.args["observationFilename"][0],
        "lfg_file": request.args["learntFactorgraphFile"][0],
        "lfg_filename": request.args["learntFactorgraphFilename"][0],
        "number_states": int(request.args["numberStates"][0]),
        "task_type": "inference",
        "submit_datetime": str(datetime.datetime.now())
    }
    task = run_inference_task.apply_async(kwargs=data)
    return task.id

# QUEUE AND RUN TASKS ASYNC USING CELERY
from celery import Celery, states
celery = Celery("pgmlab_server", backend="amqp", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker
celery.conf.CELERY_SEND_EVENTS = True
# CELERY TASKS FOR LEARNING AND INFERENCE
@celery.task(bind=True)
def run_learning_task(self, **kwargs):
    task_id = self.request.id
    run_path = "{0}/{1}/".format(learning_path, task_id)
    # Package filename is task uuid, path to download
    package_path = "{0}/results/{1}".format(cwd, task_id)
    pgmlab_utils.learning_task(task_id=task_id, run_path=run_path, package_path=package_path, kwargs=kwargs)
@celery.task(bind=True)
def run_inference_task(self, **kwargs):
    task_id = self.request.id
    run_path = "{0}/{1}/".format(inference_path, task_id)
    package_path = "{0}/results/{1}".format(cwd, task_id)
    pgmlab_utils.inference_task(task_id=task_id, run_path=run_path, package_path=package_path, kwargs=kwargs)

# EVENTSTREAM ENDPOINT FOR SERVER-SENT-EVENTS ON CELERY TASK UPDATE
from twisted.internet import defer
spectators = set() # Holds request objects for each client requesting eventStream
@klein.route("/celery")
def stream(request):
    request.setHeader("Content-type", "text/event-stream")
    global spectators
    spectators = set([spec for spec in spectators if not spec.transport.disconnected]+[request])
    print("...[sse] {} celery event stream requests: ".format(len(spectators)))
    return defer.Deferred()
# TASK UPDATING IN DB AND TO CLIENTS (SERVER SENT EVENTS)
def sse_add_task(task):
    print("...[sse] adding task: {}".format(task.to_dict()["task_id"]))
    global spectators
    for spec in spectators:
        if not spec.transport.disconnected:
            # Add event listener to event "celery.task.add" on client
            # Write needs to be in SSE format
            spec.write("event: celery.task.add\ndata: {}\n\n".format(json.dumps(task.to_dict())))
def sse_update_task(task_id, task_status):
    print("...[sse] updating task ({0}): {1}".format(task_status, task_id))
    global spectators
    for spec in spectators:
        if not spec.transport.disconnected:
            print('updating task')
            spec.write("event: celery.task.update\ndata: {}\n\n".format(json.dumps({"task_id":task_id,"task_status":task_status})))

# CELERY TASK EVENT MONITOR
import threading
import time
import ast
def monitor():
    print("...calling celery monitor")
    # Celery event handler
    def catch_all(event):
        # task-received: add to database and push sse to client with new task
        if event["type"] == "task-received":
            kwargs = ast.literal_eval(event["kwargs"])
            task_to_add = Task(
                user_sub_uid = kwargs["sub_uid"],
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
                dbsm.add_task(task_to_add)
                sse_add_task(task=task_to_add)
            except Exception as err:
                print("...EXCEPTION caught on add: {}".format(err))
        # else update task in database and push sse to client with task change
        elif event["type"] in ["task-started", "task-succeeded", "task-failed"]:
            try:
                dbsm.update_task(task_id=event["uuid"], status=event["type"])
                sse_update_task(task_id=event["uuid"], task_status=event["type"])
            except Exception as err:
                print("...EXCEPTION caught on update ({0}): {1}".format(event["type"], err))
    # Continuously poll Celery for events to handlers
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
def run_monitor():
    thread = threading.Thread(target=monitor, kwargs={})
    thread.daemon = True
    thread.start()
run_monitor()
