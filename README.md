# LibNet

Libnet is used for performing both inference and learning on graphical probabilistic models. The tool has been written in the programming language C, in order to have the tool run as fast as possible. The main program gets compiled into a a shared object. In order to run this program the user will have to either create an interface or use one of the ones that have been previously created. This repository contains a command line interface and a R programming interface. 

Data is provided to the program through tab delimited files (described later in this document) and results outputed to files as well. With the commandn line interface, the paths to the files are all specified to the user within a configuration file and processing parameters are specified through flags. With the R interface, both the the file paths and processing parameters can be supplied through function parameters. 

##Authors

   - Hossein Radfar 
   - Adam Wright 

#System requirements
This tool has been tested on OS X and Ubuntu 14.04

#Running tool

There are three steps to compiling this tool:

1. Install GSL Library  
2. Install generateHash  
3. Install libnet  (main tool)  

## Install GSL Library and generateHash

###GSL

The GSL library is used by the libnet program. The make file will install gsl in a "external_lib/gsl" folder. This way you will be using the gsl-1.9 version of gsl with the code. 

### generateHash

This tool is used to create a hash for the pathway you are using. If you change the pathway you are using you will have to re-run this tool and then re-install libnet. 

###Command

	make 
	
###Result

	GSL will now be installed in the folder "external_lib/gsl" and the program "bin/generateHash" will exist

###Usage: generateHash

	cd bin  
	./generateHash <path to pathway file>  

##Install libnet

Once the hash has been generated with the generateHash program you will be ready to compile and run teh libnet program. 

###Prepare config file
Using config/example.ini as a template specify where the files are that you would like to both have read in and written to file. I suggest creating a folder data folder in your desired location and place all files in this folder. 

##Compiling libnet

###Command

	cd net  
	make  

###Result
	The shared object "net/lib/libnet.so should now exist

##Compiling C interface

###Command

	cd c_interface  
	make  
	
###Result
	The exacutable "bin/libnetc" should now exist

###Usage

	cd bin  
	./libnetc --inifile=../config/example.ini --help  
	Provide customizations and select desired action with parametes  
	
If you would like to run a new pathway you will need to rerun the generateHash program and then recompile the libnet program

##R interface

In order to call libnet from the R Contole you will need to create and load the R LibNet shared object. 

###Compile r interface (shared object)

####Command
	cd r_package/libnetR
	make

####Result
	the file lib/libnetR.so should now exist

###Calling LibNetR functions from R Console

####Loading shared object:
	dyn.load("<path to repo>/libnet/r_package/libnetR/lib/libnetR.so")
		
####Call available functions:

All filepaths are full file paths and the rest of the variables should be supplied as integer values. 

The three available functions are:
	r_reaction_logic_to_factorgraph(SEXP reaction_logic_pathway_filepath_, SEXP pathway_filepath_, SEXP number_of_states_)
	r_learning_discrete_BayNet(SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP estimated_parameters_filepath_, SEXP number_of_states_, SEXP em_max_iterations_, SEXP em_log_likelihood_change_limit_, SEXP map_flag_)
	r_doLBPinference(SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP posterior_probabilities_filepath_, SEXP number_of_states_)
	
###Calling LibNet functions from R

####Loading shared object:
	dyn.load("<path to repo>/libnet/r_package/libnetR/lib/libnet.so")
		
####Call available functions:

All filepaths are full file paths and the rest of the variables should be supplied as integer values. Functions will return 0 upon success and error codes otherwise. 

#####Reaction Logic to Factorgraph
	.Call("reaction_logic_to_factorgraph", "../../test/data1/JE_Network.txt", "../../test/data1/JE_Network_FG.txt",3)
	
####Learning
	.Call("r_learning_discrete_BayNet", "../../test/data1/JE_Network_FG.txt", "../../test/data1/JE_network_dd.txt", "../../test/data1/estimated_parameters.txt", 3, 1e-3, 1)
		
####Inference
	.Call("r_doLBPinference","../../test/data1/JE_Network_FG.txt", "../../test/data1/JE_network_dd.txt","../../test/data1/nodepost.txt", 3)
	
	

