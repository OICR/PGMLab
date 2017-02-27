import os
import json

import subprocess
def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return p.stdout.read()
    # return str(p.returncode)

cwd = os.getcwd()
# hosted_data = cwd+"/../../data/reactome_template"
hosted_data = "{}/../../data/reactome_template".format(cwd)

# Returns an array of [{id,name}]
def get_pathways_list():
    pathways_json = None
    with open("{}/pathways.json".format(hosted_data)) as f:
        pathways_json = f.read()
    return json.loads(pathways_json)
# Returns
def get_pathway(pathway_id):
    # Get pathway name
    pathway_name = None
    with open("{}/folder_to_reactome_id.txt".format(hosted_data), "r") as f:
        for line in f:
            kv = line.split("\t")
            if kv[0] == pathway_id:
                pathway_name = kv[1].strip()
    # Convert to json
    file_path = "{0}/{1}/{1}.pi".format(hosted_data, pathway_name)
    try:
        pathway_json = system_call("perl {0}/../../bin/convert_pi_to_json.pl {1} {2}/db_id_to_name_mapping.txt".format(cwd,file_path,hosted_data))
        return json.loads(pathway_json)
    except:
        print("...[reactome] Could not get pathway {}".format(pathway_id))
