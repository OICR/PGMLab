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
