# WAMP interface

This interface is used to be able to run PGMLab remotely. It requires the inputs to be provided in JSON format and 

All Python application code is in `pathway/patway.py`.

This code is intended to be mainly used by the web interfaces in the PGMLab-GUI repository. 

##Install

	sudo apt-get install libjson-xs-perl
	apt-get install python-dev python-pip npm node libffi-dev
        pip install crossbar autobahn[twisted] treq shutilwhich pyyaml pygments mistune jinja2 pytrie netaddr --upgrade

#Browser

Web Service will be running on localhost:9000
