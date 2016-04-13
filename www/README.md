# PGMLAB-WebInterface

##list of technologies
PGMLaB
Crossbar.io
Autobahn
pip

##installation

### Linux

        apt-get install npm node libffi-dev
        ln -s /usr/bin/nodejs /usr/bin/node (This was necessary on my computer)

##Install

     npm install -g webpack webpack-dev-server
     npm install

## Create bundle.js file

     webpack src/\<entry\>.js bundle.js


I am wanting to use Alt (FLUX) to keep track of state.

I am using autobahnJS for the WAMP protocol and Crossbar to host in production


## to run in development

     npm run 

Now navigate to "http://localhost:8080/pgmlab.html" in your browser"


## In development the website will need to be able to access the pythong rest interface on the backend In order to do this add the following plugin to chrome: 
     https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en-US
