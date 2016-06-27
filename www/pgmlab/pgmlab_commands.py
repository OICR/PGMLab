import subprocess
import os
cwd = os.getcwd()
pgmlab_path = cwd+"/../../bin/pgmlab"

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return str(p.returncode)

def generate_pairwise_interaction(run_path, pi_file):
    pi_filepath = run_path+"pathway.pi"
    pi = open(pi_filepath, "w")
    pi.write(pi_file)
    pi.close()

def generate_logical_factorgraph(run_path):
    command = "{0} --generate-factorgraph --pairwise-interaction-file={1}pathway.pi --logical-factorgraph-file={1}logical.fg --number-of-states 3".format(pgmlab_path, run_path)
    # command = "../bin/pgmlab --generate-factorgraph --pairwise-interaction-file=" + str(runPath) + "pathway.pi --logical-factorgraph-file=" + str(runPath) + "logical.fg --number-of-states 3"
    return system_call(command)

def generate_observation(run_path, obs_file, run_type):
    obs_filepath = run_path+run_type+".obs"
    obs = open(obs_filepath, "w")
    obs.write(obs_file)
    obs.close()

def generate_learnt_factorgraph(run_path, lfg_file):
    lfg_filepath = run_path+"learnt.fg"
    lfg = open(lfg_filepath, "w")
    lfg.write(lfg_file)
    lfg.close()

def inference(run_path, number_states, fg="logical.fg"):
    command = "{0} --inference --pairwise-interaction-file={1}pathway.pi --inference-factorgraph-file={1}{2} --inference-observed-data-file={1}inference.obs --posterior-probability-file={1}pathway.pp --number-of-states {3}".format(pgmlab_path, run_path, fg, number_states)
    # command = "../bin/pgmlab --inference --pairwise-interaction-file=" + str(runPath) + "pathway.pi --inference-factorgraph-file=" + str(runPath) + fg + " --inference-observed-data-file=" + str(runPath) + "inference.obs --posterior-probability-file=" + str(runPath) + "pathway.pp --number-of-states " + str(numberOfStates)
    return system_call(command)

def learning(run_path, number_states, log_likelihood_change_limit, em_max_iterations):
    command = "{0} --learning --pairwise-interaction-file={1}pathway.pi --logical-factorgraph-file={1}logical.fg --learning-observed-data-file={1}learning.obs --estimated-parameters-file={1}learnt.fg --number-of-states {2} --log-likelihood-change-limit={3} --em-max-iterations={4}".format(pgmlab_path,run_path,number_states,log_likelihood_change_limit,em_max_iterations)
    # command = "../bin/pgmlab --learning --pairwise-interaction-file=" + str(runPath) + "pathway.pi --logical-factorgraph-file=" + str(runPath) + "logical.fg --learning-observed-data-file=" + str(runPath) + "learning.obs --estimated-parameters-file=" + str(runPath) + "learnt.fg --number-of-states " + str(numberOfStates) +" --log-likelihood-change-limit=" + logLikelihoodChangeLimit + " --em-max-iterations=" + emMaxIterations
    return system_call(command)
