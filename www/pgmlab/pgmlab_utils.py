import subprocess
import os
import shutil
cwd = os.getcwd()
pgmlab_path = cwd+"/../../bin/pgmlab"
from celery.exceptions import InvalidTaskError

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return str(p.returncode)

def generate_pairwise_interaction(run_path, pi_file):
    pi_filepath = run_path+"pathway.pi"
    pi = open(pi_filepath, "w")
    pi.write(pi_file)
    pi.close()

def generate_observation(run_path, obs_file, run_type):
    obs_filepath = run_path+run_type+".obs"
    obs = open(obs_filepath, "w")
    obs.write(obs_file)
    obs.close()

def generate_logical_factorgraph(run_path):
    command = "{0} --generate-factorgraph --pairwise-interaction-file={1}pathway.pi --logical-factorgraph-file={1}logical.fg --number-of-states 3".format(pgmlab_path, run_path)
    return system_call(command)

def learning(run_path, number_states, log_likelihood_change_limit, em_max_iterations):
    command = "{0} --learning --pairwise-interaction-file={1}pathway.pi --logical-factorgraph-file={1}logical.fg --learning-observed-data-file={1}learning.obs --estimated-parameters-file={1}learnt.fg --number-of-states {2} --log-likelihood-change-limit={3} --em-max-iterations={4}".format(pgmlab_path,run_path,number_states,log_likelihood_change_limit,em_max_iterations)
    return system_call(command)

def generate_learnt_factorgraph(run_path, lfg_file):
    lfg_filepath = run_path+"learnt.fg"
    lfg = open(lfg_filepath, "w")
    lfg.write(lfg_file)
    lfg.close()

def inference(run_path, number_states, fg="logical.fg"):
    command = "{0} --inference --pairwise-interaction-file={1}pathway.pi --inference-factorgraph-file={1}{2} --inference-observed-data-file={1}inference.obs --posterior-probability-file={1}pathway.pp --number-of-states {3}".format(pgmlab_path, run_path, fg, number_states)
    return system_call(command)

# Task pipeline:
#  Pairwise, Observations, Factorgraph
#  Learning || Inference
#  Package to download
# LEARNING
def learning_task(task_id, run_path, package_path, kwargs):
    os.mkdir(run_path)
    # Pairwise interaction
    pi_file = kwargs["pi_file"]
    generate_pairwise_interaction(run_path, pi_file)
    # Observation
    obs_file = kwargs["obs_file"]
    run_type = kwargs["task_type"]
    generate_observation(run_path, obs_file, run_type)
    # Factorgraph
    return_code = generate_logical_factorgraph(run_path)
    if return_code != "0":
        # self.update_state(state=states.FAILURE, meta="reason for failure")
        raise InvalidTaskError()
    # Learning
    number_states = kwargs["number_states"]
    change_limit = kwargs["change_limit"]
    max_iterations = kwargs["max_iterations"]
    return_code = learning(run_path, number_states, change_limit, max_iterations)
    if return_code != "0":
        raise InvalidTaskError()
    # Package to down
    shutil.make_archive(package_path, "zip", root_dir=run_path)
# INFERENCE
def inference_task(task_id, run_path, package_path, kwargs):
    os.mkdir(run_path)
    # Pairwise Interaction
    pi_file = kwargs["pi_file"]
    generate_pairwise_interaction(run_path, pi_file)
    # Observation
    obs_file = kwargs["obs_file"]
    run_type = kwargs["task_type"]
    generate_observation(run_path, obs_file, run_type)
    # Logical (|| Learnt) Factorgraph
    return_code = generate_logical_factorgraph(run_path)
    if return_code != "0":
        raise InvalidTaskError()
    lfg_file = kwargs["lfg_file"]
    if lfg_file != "":
        generate_learnt_factorgraph(run_path, lfg_file)
        fg_name = "learnt.fg"
    else:
        fg_name = "logical.fg"
    # Inference
    number_states = kwargs["number_states"]
    return_code = inference(run_path, number_states, fg_name)
    if return_code != "0":
        raise InvalidTaskError()
    # Package
    shutil.make_archive(package_path, "zip", root_dir=run_path)
