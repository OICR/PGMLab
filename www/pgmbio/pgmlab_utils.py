import pprint
pp = pprint.PrettyPrinter(indent=4)
import subprocess
import os
import shutil
import json
import datetime
cwd = os.getcwd()
pgmlab_path = cwd+"/../../bin/pgmlab"

# Called by Klein server for uploading
def upload_to_json(upload_file, upload_type):
    if upload_type == u"pathway":
        return pairwise_interaction_json(upload_file)
    elif upload_type == "observation":
        return
    elif upload_type == "parameters":
        return
    elif upload_type == "probabilities":
        return

# Use this function to check the format and pass comments on a failed upload
def pairwise_interaction_json(pi_string):
    # Node constructor
    node = lambda n: {"name":n,"label":n,"longname":n,"leaf":None,"shape":None,"shape3":None,"type":None}
    try:
        lines = pi_string.splitlines()
        nodes = {}
        nodes_list = []
        links_list = []
        for line in lines[2:]:
            link = map(lambda w: w.strip(), line.split("\t"))
            source = link[0]
            target = link[1]
            logic = link[2]
            value = link[3]
            if source not in nodes:
                nodes[source] = True
                nodes_list.append(node(source))
            if target not in nodes:
                nodes[target] = True
                nodes_list.append(node(source))
            links_list.append({
                "source": source,
                "target": target,
                "logic": logic,
                "value": value
            })
        pi = {
            "nodes": nodes_list,
            "links": links_list
        }
        return {
            "success": True,
            "comments": "",
            "data": pi
        }
    except:
        pass

#
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
