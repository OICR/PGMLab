# PGMLAB-WebInterface

##list of technologies
PGMLaB
Crossbar.io
Autobahn
pip

##installation

### Linux

        apt-get install python-dev python-pip npm
        pip install crossbar autobahn[twisted] treq shutilwhich pyyaml pygments mistune jinja2 pytrie netaddr --upgrade  
        ln -s /usr/bin/nodejs /usr/bin/node (This was necessary on my computer)

### Mac OS X

	http://crossbar.io/docs/Installation-on-Mac-OS-X/


# Client side (Web Portal) portion of the PGMLaB User interface

##Install

     npm install -g webpack webpack-dev-server json-loader
     npm install

## Create bundle.js file

     webpack src/entry.js bundle.js


