from twisted.web.static import File
import os, os.path
cwd = os.getcwd()
inference_path = cwd+"/../../data/pgmlab/inference/"
learning_path = cwd+"/../../data/pgmlab/learning/"
import pprint
pp = pprint.PrettyPrinter(indent=4)
from itertools import * # for skipping lines in a file
import datetime, shutil, json, string, cgi, uuid, requests

# PGMLab related modules
import pgmlab_commands
from pgmlab_db import db_session, Task

# Klein for POST that starts Celery task
from klein import Klein
klein = Klein()
# For communicating with backend (db, RPC, Pub/Sub)
from autobahn.twisted.wamp import Application
wamp = Application()
# Queue and run tasks async
from celery import Celery, states
from celery.exceptions import InvalidTaskError
celery = Celery("pgmlab_server", backend="amqp", broker="amqp://guest@localhost//") # celery -A pgmlab_server.celery worker
celery.conf.CELERY_SEND_EVENTS = True

# RPC to register a wamp.publish on <App> mount (loop over all users in db)
@wamp.register("celery.tasks")
def get_all_tasks():
    tasks = db_session.query(Task).all()
    tasks_dict = {}
    for task in tasks:
        tasks_dict[task.task_id] = task.to_dict()
    return tasks_dict

# LEARNING
@celery.task(bind=True)
def run_learning_task(self, **kwargs):
    # print "run_learning_task"
    pp.pprint(kwargs)
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

@klein.route('/run/learning/submit', methods=["POST"])
def run_learning_submit(request):
    pi_file = request.args["pairwiseInteractionFile"][0]
    pi_filename = request.args["pairwiseInteractionFilename"][0]
    obs_file = request.args["observationFile"][0]
    obs_filename = request.args["observationFilename"][0]
    number_states = int(request.args["numberStates"][0])
    log_likelihood_change_limit = float(request.args["logLikelihoodChangeLimit"][0])
    em_max_iterations = int(request.args["emMaxIterations"][0])
    data = {
        "pi_file": pi_file,
        "pi_filename": pi_filename,
        "obs_file": obs_file,
        "obs_filename": obs_filename,
        "number_states": number_states,
        "change_limit": log_likelihood_change_limit, #
        "max_iterations": em_max_iterations, #
        "task_type": "learning",
        "submit_datetime": str(datetime.datetime.now())
    }
    task = run_learning_task.apply_async(kwargs=data)
    return task.id

# INFERENCE
@celery.task(bind=True)
def run_inference_task(self, **kwargs):
    # print "run_inference_task"
    pp.pprint(kwargs)
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

@klein.route('/run/inference/submit', methods=["POST"])
def run_inference_submit(request):
    pi_file = request.args["pairwiseInteractionFile"][0]
    pi_filename = request.args["pairwiseInteractionFilename"][0]
    obs_file = request.args["observationFile"][0]
    obs_filename = request.args["observationFilename"][0]
    lfg_file = request.args["learntFactorgraphFile"][0]
    lfg_filename = request.args["learntFactorgraphFilename"][0]
    number_states = int(request.args["inferenceNumberOfStates"][0])
    data = {
        "pi_file": pi_file,
        "pi_filename": pi_filename,
        "obs_file": obs_file,
        "obs_filename": obs_filename,
        "lfg_file": lfg_file,
        "lfg_filename": lfg_filename,
        "number_states": number_states,
        "task_type": "inference",
        "submit_datetime": str(datetime.datetime.now())
    }
    task = run_inference_task.apply_async(kwargs=data)
    return task.id

if __name__ == "__main__":
    from celery_monitor import MonitorThread
    MonitorThread(celery, wamp)

    from twisted.web.server import Site
    from twisted.internet import reactor
    reactor.listenTCP(9002, Site(klein.resource()))
    wamp.run(u"ws://localhost:9001/ws", u"realm1")
