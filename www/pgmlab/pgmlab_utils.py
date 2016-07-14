import subprocess
import os
import shutil
import datetime
cwd = os.getcwd()
pgmlab_path = cwd+"/../../bin/pgmlab"
from celery.exceptions import InvalidTaskError

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return str(p.returncode)

def write_pairwise_interaction(run_path, pi_file):
    pi_filepath = run_path+"pathway.pi"
    pi = open(pi_filepath, "w")
    pi.write(pi_file)
    pi.close()

def write_observation(run_path, obs_file, run_type):
    obs_filepath = run_path+run_type+".obs"
    obs = open(obs_filepath, "w")
    obs.write(obs_file)
    obs.close()

def generate_logical_factorgraph(run_path):
    starttime = datetime.datetime.now()
    command = "{0} --generate-factorgraph --pairwise-interaction-file={1}pathway.pi --logical-factorgraph-file={1}logical.fg --number-of-states 3".format(pgmlab_path, run_path)
    yield command # return command used to generate logical factograph
    yield system_call(command) # then generate it
    yield str(datetime.datetime.now() - starttime) # then take time difference for runtime
    # return system_call(command)

def write_learnt_factorgraph(run_path, lfg_file):
    lfg_filepath = run_path+"learnt.fg"
    lfg = open(lfg_filepath, "w")
    lfg.write(lfg_file)
    lfg.close()

def learning(run_path, number_states, log_likelihood_change_limit, em_max_iterations):
    starttime = datetime.datetime.now()
    command = "{0} --learning --pairwise-interaction-file={1}pathway.pi --logical-factorgraph-file={1}logical.fg --learning-observed-data-file={1}learning.obs --estimated-parameters-file={1}learnt.fg --number-of-states {2} --log-likelihood-change-limit={3} --em-max-iterations={4}".format(pgmlab_path,run_path,number_states,log_likelihood_change_limit,em_max_iterations)
    yield command
    yield system_call(command)
    yield str(datetime.datetime.now() - starttime)
    # return system_call(command)

def inference(run_path, number_states, fg="logical.fg"):
    starttime = datetime.datetime.now()
    command = "{0} --inference --pairwise-interaction-file={1}pathway.pi --inference-factorgraph-file={1}{2} --inference-observed-data-file={1}inference.obs --posterior-probability-file={1}pathway.pp --number-of-states {3}".format(pgmlab_path, run_path, fg, number_states)
    yield command
    yield system_call(command)
    yield str(datetime.datetime.now() - starttime)
    # return system_call(command)

# Task pipeline:
#  Pairwise, Observations, Factorgraph
#  Learning || Inference
#  Package to download
def write_info_file(run_path, meta_info):
    filepath = run_path+"info.txt"
    print(filepath, meta_info)

# LEARNING
def learning_task(task_id, run_path, package_path, kwargs):
    os.mkdir(run_path)
    meta_info = {"task_id":task_id,"task_kwargs":kwargs}
    # Pairwise interaction
    pi_file = kwargs["pi_file"]
    write_pairwise_interaction(run_path, pi_file)
    # Observation
    obs_file = kwargs["obs_file"]
    run_type = kwargs["task_type"]
    write_observation(run_path, obs_file, run_type)
    # Factorgraph
    lfg_generator = generate_logical_factorgraph(run_path)
    meta_info["lfg_command"] = next(lfg_generator)
    lfg_return_code = next(lfg_generator)
    meta_info["lfg_runtime"]= next(lfg_generator)
    # return_code = generate_logical_factorgraph(run_path)
    if lfg_return_code != "0":
        # self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
    # Learning
    number_states = kwargs["number_states"]
    change_limit = kwargs["change_limit"]
    max_iterations = kwargs["max_iterations"]
    learning_generator = learning(run_path, number_states, change_limit, max_iterations)
    meta_info["pgm_command"] = next(learning_generator)
    pgm_return_code = next(learning_generator)
    meta_info["pgm_runtime"] = next(learning_generator)
    # pgm_return_code = learning(run_path, number_states, change_limit, max_iterations)
    if pgm_return_code != "0":
        raise InvalidTaskError()
    # Package to down
    write_info_file(run_path, meta_info)
    shutil.make_archive(package_path, "zip", root_dir=run_path)
# INFERENCE
def inference_task(task_id, run_path, package_path, kwargs):
    os.mkdir(run_path)
    meta_info = {"task_id":task_id,"task_kwargs":kwargs}
    # Pairwise Interaction
    pi_file = kwargs["pi_file"]
    write_pairwise_interaction(run_path, pi_file)
    # Observation
    obs_file = kwargs["obs_file"]
    run_type = kwargs["task_type"]
    write_observation(run_path, obs_file, run_type)
    # Logical (|| Learnt) Factorgraph
    lfg_generator = generate_logical_factorgraph(run_path)
    meta_info["lfg_command"] = next(lfg_generator)
    lfg_return_code = next(lfg_generator)
    meta_info["lfg_runtime"] = next(lfg_generator)
    # return_code = generate_logical_factorgraph(run_path)
    if lfg_return_code != "0":
        raise InvalidTaskError()
    # If a learnt factorgraph is provided, use it for inference instead
    lfg_file = kwargs["lfg_file"]
    if lfg_file != "":
        write_learnt_factorgraph(run_path, lfg_file)
        fg_name = "learnt.fg"
    else:
        fg_name = "logical.fg"
    # Inference
    number_states = kwargs["number_states"]
    inference_generator = inference(run_path, number_states, fg_name)
    meta_info["pgm_command"] = next(inference_generator)
    pgm_return_code = next(inference_generator)
    meta_info["pgm_runtime"] = next(inference_generator)
    # pgm_return_code = inference(run_path, number_states, fg_name)
    if pgm_return_code != "0":
        raise InvalidTaskError()
    # Package
    write_info_file(run_path, meta_info)
    shutil.make_archive(package_path, "zip", root_dir=run_path)
