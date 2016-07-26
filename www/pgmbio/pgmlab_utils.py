import subprocess
import os
import shutil
import datetime
cwd = os.getcwd()
pgmlab_path = cwd+"/../../bin/pgmlab"

def system_call(command):
    p = subprocess.Popen([command], stdout=subprocess.PIPE, shell=True)
    p.wait()
    return str(p.returncode)
