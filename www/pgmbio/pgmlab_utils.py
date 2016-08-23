# Different from pgmlab/pgmlab_utils
import pprint
pp = pprint.PrettyPrinter(indent=4)
import subprocess
import os
import shutil
import datetime
cwd = os.getcwd()
results_path = cwd+"/results"
pgmlab_path = cwd+"/../../bin/pgmlab"

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    return p.stdout.read()

def write_pi_file(run_path, links):
    file_path = "{}/pathway.pi".format(run_path)
    with open(file_path, "w") as pi:
        pi.write("{}\n\n".format(str(len(links))))
        for interaction in links:
            [source, target, value, logic] = interaction.values()
            pi.write("{}\t{}\t{}\t{}\n".format(source,target,value,logic))

def write_obs_file(run_path, observation_set):
    file_path = "{}/inference.obs".format(run_path)
    obs_selected = map(
        lambda obs_idx: observation_set["data"][obs_idx],
        filter(
            lambda obs_idx: observation_set["selected"][obs_idx],
            range(len(observation_set["selected"]))))
    with open(file_path, "w") as obs:
        obs.write("{}\n".format(len(obs_selected)))
        for observations in obs_selected:
            obs.write("{}\n".format(len(observations)))
            for node in observations.values():
                obs.write("{}\t{}\n".format(node["name"],node["state"]))

def generate_fg_file(run_path):
    pi_flag = "--pairwise-interaction-file={}/pathway.pi".format(run_path)
    fg_flag = "--logical-factorgraph-file={}/logical.fg".format(run_path)
    num_states = "--number-of-states=3"
    command = "{} --generate-factorgraph {} {} {}".format(pgmlab_path,pi_flag,fg_flag,num_states)
    system_call(command)

def inference(run_path):
    pi_flag = "--pairwise-interaction-file={}/pathway.pi".format(run_path)
    fg_flag = "--inference-factorgraph-file={}/logical.fg".format(run_path)
    obs_flag = "--inference-observed-data-file={}/inference.obs".format(run_path)
    pp_flag = "--posterior-probability-file={}/post_probs.pp".format(run_path)
    num_states = "--number-of-states=3"
    command = "{} --inference {} {} {} {} {}".format(pgmlab_path,pi_flag,fg_flag,obs_flag,pp_flag,num_states)
    system_call(command)

import pprint
pretty = pprint.PrettyPrinter(indent=4)
def read_pp_file(run_path):
    file_path = "{}/post_probs.pp".format(run_path)
    all_post_probs = list()
    post_probs = dict()
    with open(file_path, "r") as pp:
        for line in pp:
            if line.startswith("-"): #new post probs from different observation
                all_post_probs.append(post_probs)
                test = post_probs
                post_probs = dict()
                continue
            [node_name, state_prob] = line.strip().split("\t")
            if node_name not in post_probs.keys():
                post_probs[node_name] = list()
            post_probs[node_name].append(state_prob)
    return all_post_probs

# not used
def write_pairwise_interaction(run_path, links):
    file_path = "{}/pathway.pi".format(run_path)
    with open(file_path, "w") as pi:
        interaction_count = len(links)
        pi.write("{}\n\n".format(str(interaction_count)))
        for interaction in links:
            pi.write("{}\t".format(str(interaction["source"])))
            pi.write("{}\t".format(str(interaction["target"])))
            pi.write("{}\t".format(str(interaction["value"])))
            pi.write("{}\n".format(str(interaction["logic"])))
    return interaction_count

def write_observation(run_path, obs_set):
    file_path = "{}/inference.obs".format(run_path)
    with open(file_path, "w") as obs:
        observations = obs_set["observations"]
        obs_count = len(observations)
        obs.write("{}\n".format(str(obs_count)))
        for observation in observations:
            node_count = len(observation)
            obs.write("{}\n".format(str(node_count)))
            for node in observation:
                obs.write("{0}\t{1}\n".format(str(node["name"]), str(node["state"])))
    return obs_count
