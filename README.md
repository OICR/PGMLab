# LibNet

##Authors

   Hossein Radfar 
   Adam Wright 

#System requirements
This tool has been tested on OS X and Ubuntu 14.04

#Running tool

There are three steps to compiling this tool:
1. Install GSL Library
2. Install generateHash
3. Install libnet  (main tool)

## Install GSL Library

The GSL library is used by the libnet program. The make file will install gsl in a "external_lib/gsl" folder. This way you will be using the gsl-1.9 version of gsl with the code. 

Run Command:

	make gsl
	
Result:
	GSL will now be installed in the folder "external_lib/gsl"

##Install generateHash

This tool is used to create a hash for the pathway you are using. If you change the pathway you are using you will have to re-run this tool and then re-install libnet. 

Run Command:

	make generateHash
	
Result:
	The executable file "generateHash" will now exist

Usage:

	./generateHash <path to pathway file>

##Install libnet

Once the hash has been generated with the generateHash program you will be ready to compile and run teh libnet program. 

Prepare Code:
1. Open to Bayinfer/Bayinfer/main.c
2. Change file paths to the paths to your data
3. There are three functions that you can have not run by commenting out
  * reaction_logic_to_factorgraph
  * doLBPinference
  * learning_discrete_BayNet

If you already have created the pathwaygraph file you should commento out the reaction_logic_to_factorgraph. The other two functions can be commented out based on if you want to do learning and/or inference. 

Run Command:
	make libnet
	
Result
	The executable file "libnet" will now exist

Usage:

	./libnet
