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

###Development
     npm install -g webpack webpack-dev-server
     npm install


####run website:
     npm run start --dev

####create final bundle:
     npm run build


##Prodcution and develpment

     pip install autobahn[twisted] klein --upgrade


## Adding TLS

To Setup: http://klein.readthedocs.io/en/latest/introduction/2-twistdtap.html 

To Run (Command): sudo twistd -n web --class=pgmlabServer.resource -c ~/cert.pem -k ~/privkey.pem --https=443


#### To Do
     I am wanting to use Alt (FLUX) to keep track of state.


###Development URL
     "http://localhost:8080/pgmlab.html" in your browser"

###Production URL
     "http://localhost:9000/pgmlab.html" in your browser"


## In development the website will need to be able to access the pythong rest interface on the backend In order to do this add the following plugin to chrome: 
     https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en-US
