# Different from pgmlab/pgmlab_utils
import pprint
pp = pprint.PrettyPrinter(indent=4)
import subprocess
import os
import shutil
import datetime
import json
cwd = os.getcwd()
results_path = cwd+"/results"
pgmlab_path = cwd+"/../../bin/pgmlab"

import pprint
pretty = pprint.PrettyPrinter(indent=4)

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

def generate_fg_file(run_path):
    pi_flag = "--pairwise-interaction-file={}/pathway.pi".format(run_path)
    fg_flag = "--logical-factorgraph-file={}/logical.fg".format(run_path)
    num_states = "--number-of-states=3"
    command = "{} --generate-factorgraph {} {} {}".format(pgmlab_path,pi_flag,fg_flag,num_states)
    system_call(command)

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

def inference(run_path):
    pi_flag = "--pairwise-interaction-file={}/pathway.pi".format(run_path)
    fg_flag = "--inference-factorgraph-file={}/logical.fg".format(run_path)
    obs_flag = "--inference-observed-data-file={}/inference.obs".format(run_path)
    pp_flag = "--posterior-probability-file={}/post_probs.pp".format(run_path)
    num_states = "--number-of-states=3"
    command = "{} --inference {} {} {} {} {}".format(pgmlab_path,pi_flag,fg_flag,obs_flag,pp_flag,num_states)
    system_call(command)

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

# Converts results from PGMLab to be written to CSV for inchlib to convert to JSON
def inchlib(post_probs, run_id):
    run_id = "dev"
    run_path = "{}/results/{}".format(os.getcwd(),run_id)
    inchlib_csv = {}
    inchlib_json = {}
    for path_id,post_probs_obs in post_probs.items():
        if path_id not in inchlib_json:
            inchlib_csv[path_id] = {}
            inchlib_json[path_id] = {}
        for state_idx,state_type in enumerate(["1","2","3"]):
            inchlib_csv[path_id][state_type] = convert_pp_inchlib(post_probs_obs,state_type)
            write_inchlib_csv(inchlib_csv[path_id][state_type],run_path)
            inchlib_json[path_id][state_type] = inchlib_cluster_csv(run_path)
    return inchlib_json


def convert_pp_inchlib(post_probs_obs,state_type):
    def get_value(state_values, state_type):
        # pp.pprint(state_values)
        if state_type=="1":
            return state_values[0]
        elif state_type=="2":
            return state_values[1]
        elif state_type=="3":
            return state_values[2]
    heat_map = {}
    for obs_idx,post_probs in enumerate(post_probs_obs):
        for node,state_values in post_probs.items():
            if node not in heat_map:
                heat_map[node] = []
            heat_map[node].append(get_value(state_values,state_type))
    return heat_map

def write_inchlib_csv(heat_map_data, run_path):
    file_path = "{}/inchlib.csv".format(run_path)
    obs_count = len(heat_map_data.values()[0])
    with open(file_path, "w") as csv:
        header = reduce(lambda p,c: "{},Observation {}".format(p,str(c+1)),range(obs_count),"id")
        csv.write("{}\n".format(header))
        for node,obs_values in heat_map_data.items():
            node_line = reduce(lambda p,c: "{},{}".format(p,str(c)), obs_values, node)
            csv.write("{}\n".format(node_line))

def inchlib_cluster_csv(run_path):
    csv_filepath = "{}/inchlib.csv".format(run_path)
    json_filepath = "{}/inchlib.json".format(run_path)
    command = "python inchlib_clust.py {} -o {} -dh".format(csv_filepath,json_filepath)
    system_call(command)
    with open(json_filepath) as clustered:
        heatmap_json = json.load(clustered)
    return heatmap_json

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
