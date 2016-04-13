# WAMP interface

This interface is used to be able to run PGMLab remotely. It requires the inputs to be provided in JSON format and 

All Python application code is in `pathway/patway.py`.

This code is intended to be mainly used by the web interfaces in the PGMLab-GUI repository. 

##Install General

	sudo apt-get install libjson-perl
	apt-get install python-dev python-pip npm node libffi-dev
        pip install crossbar autobahn[twisted] treq shutilwhich pyyaml pygments mistune jinja2 pytrie netaddr klein --upgrade

- on my ubuntu install I had to run the following command to have crossbar find the packages: 

        sudo cp /usr/local/lib/python2.7/dist-packages/werkzeug /opt/crossbar/site-packages/ -r


#Install Crossbar

http://crossbar.io/docs/Installation-on-Ubuntu/

##Output

```
Automatically choosing optimal Twisted reactor
Running on Linux and optimal reactor (epoll) was installed.
     __  __  __  __  __  __      __     __
    /  `|__)/  \/__`/__`|__) /\ |__)  |/  \
    \__,|  \\__/.__/.__/|__)/~~\|  \. |\__/
                                        
 Crossbar.io        : 0.13.0
   Autobahn         : 0.13.0 (with JSON, MessagePack, CBOR)
   Twisted          : 16.0.0-EPollReactor
   LMDB             : 0.89/lmdb-0.9.18
   Python           : 2.7.10/PyPy-5.0.0
 OS                 : Linux-3.13.0-83-generic-x86_64-with-debian-jessie-sid
 Machine            : x86_64
```

#Browser

Web Service will be running on localhost:9000
