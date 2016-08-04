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
    if upload_type == "pathway":
        return pairwise_interaction_json(upload_file)
    elif upload_type == "observation":
        return observation_json(upload_file)
    elif upload_type == "parameters":
        return parameters_json(upload_file)
    elif upload_type == "probabilities":
        return probabilities_json(upload_file)

# Use these for results of *_json(*_string) functions
upload_error = lambda comments: {"success":False,"data":None,"comments":comments}
upload_success = lambda data: {"success":True,"data":data,"comments":""}

# Use these function to check the format and pass comments on a failed upload
# Parse uploaded pairwise interaction file into json
def pairwise_interaction_json(pi_string):
    # Node constructor
    node = lambda n: {"name":n,"label":n,"longname":n,"leaf":None,"shape":None,"shape3":None,"type":None}
    link_nodes = lambda link: {"source":link[0],"target":link[1],"logic":link[2],"value":link[3]}
    try:
        lines = pi_string.splitlines()
        # Error handling
        if len(lines) < 2:
            return upload_error("File format error: file is empty")
        if len(lines) > 102:
            return upload_error("File error: max number of interactions is 100, larger pathways can be done by command line")
        if float(lines[0]) == 0 or not lines[0].isdigit():
            return upload_error("File format error: first line must represent non-zero number of interactions")
        if len(lines)-2 != float(lines[0]):
            return upload_error("File format error: number of interactions does not match value at top of file")
        if lines[1]:
            return upload_error("File format error: second line must be empty")
        # Parse
        def parse_line(pairwise, line):
            link = map(lambda w: w.strip(), line.split("\t"))
            [source, target, logic, value] = link
            if source not in pairwise["nodes"]:
                pairwise["nodes"][source] = node(source)
            if target not in pairwise["nodes"]:
                pairwise["nodes"][target] = node(source)
            pairwise["links"].append(link_nodes(link))
            return pairwise
        pi_parsed = reduce(parse_line, lines[2:], {"nodes":{},"links":[]})
        pi = {
            "nodes": [v for v in pi_parsed["nodes"].values()],
            "links": pi_parsed["links"]
        }
        return upload_success(pi)
    except Exception as e:
        raise(e)

# Parse uploaded observation file into json
def observation_json(obs_string):
    try:
        lines = obs_string.splitlines()
        # Error handling
        if len(lines) < 2:
            return upload_error("File format error: file is empty")
        if float(lines[0]) == 0 or not lines[0].isdigit():
            return upload_error("File format error: first line must represent non-zero number of observations")
        # Parse
        def parse_line(observations, line):
            if len(line.split("\t")) == 1:
                observations.append({})
            else:
                [name, state] = map(lambda w: w.strip(), line.split("\t"))
                observations[-1][name] = {
                    "name": name,
                    "state": state
                }
            return observations
        obs = reduce(parse_line, lines[1:], [])
        return upload_success(obs)
    except Exception as e:
        raise(e)

# Parse uploaded estimated parameter (learnt factorgraph) file into json
def parameters_json(pm_string):
    try:
        lines = pm_string.strip().splitlines()
        # Error handling
        if len(lines) < 2:
            return upload_error("File format error: file is empty (no observations)")
        if float(lines[0]) == 0 or not lines[0].isdigit():
            return upload_error("File format error: first line must be non-zero number of observations")
        # Parse
        def parse_line(parameters, line):
            # If statements in order of format : node_count, node_names, node_states, ...probabilities
            if not line: # empty string indicates new section
                parameters.append({})
            elif "node_count" not in parameters[-1]:
                parameters[-1]["node_count"] = line
            elif "node_names" not in parameters[-1]:
                node_names = line.split()
                parameters[-1]["node_names"] = node_names
                parameters[-1]["target"] = node_names[0]
                parameters[-1]["parents"] = node_names[1:]
            elif "node_states" not in parameters[-1]:
                node_states = line.split()
                parameters[-1]["node_states"] = node_states
            elif "prob_count" not in parameters[-1]:
                parameters[-1]["prob_count"] = line
            else:
                if "probabilities" not in parameters[-1]:
                    parameters[-1]["probabilities"] = []
                prob = line.split()[1]
                parameters[-1]["probabilities"].append(prob)
            return parameters
        pms = reduce(parse_line, lines[1:], [])
        return upload_success(pms)
    except Exception as e:
        raise(e)

# Parse uploaded posterior probabilities file into json
def probabilities_json(pp_string):
    try:
        lines = pp_string.strip().splitlines()
        # Error handling
        if len(lines) < 2:
            return upload_error("File format error: file is empty")
        # Parse
        def parse_line(probabilities, line):
            # node_prob = map(lambda w: w.strip(), line.split("\t"))
            node_prob = map(lambda w: w.strip(), line.split())
            [name, prob] = node_prob
            # State probabilities ordered as they appear line by line
            if name not in probabilities:
                probabilities[name] = []
            probabilities[name].append(prob)
            return probabilities
        pp = reduce(parse_line, lines, {})
        return upload_success(pp)
    except Exception as e:
        raise(e)


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
