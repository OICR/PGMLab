#LibNet

Libnet performs learning and inference in large discrete baysian networks. Libnet is a standalone library written in c. 

is used for performing both inference and learning on graphical probabilistic models. The tool has been written in the programming language C, in order to have the tool run as fast as possible. The main program gets compiled into a a shared object. In order to run this program the user will have to either create an interface or use one of the ones that have been previously created. This repository contains a command line interface and a R programming interface. 

Data is provided to the program through tab delimited files (described later in this document) and results outputted to files as well. With the command line interface, the paths to the files are all specified to the user within a configuration file and processing parameters are specified through flags. With the R interface, both the the file paths and processing parameters can be supplied through function parameters. 

##Authors

   - Hossein Radfar 
   - Adam Wright 

##Wiki
   - Please visit the LibNet wiki [here](https://github.com/OICR/LibNet/wiki) for details and theory. 
   - Make sure to follow the input file formats specifications [here](https://github.com/OICR/LibNet/wiki/File-Formats).  

##System requirements
LibNet has been tested on OS X and Ubuntu 14.04.

##How to run LibNet

###Installation

###Command

        cd <libnet root directory>  
	make   

###Result

    	gsl, termcap, and readline libraries will now be installed in the folder "external_lib" and the program "bin/generateHash" and bin/generasteHash will exist.

###External Libraries

The external libraries GSL, termcap, and realidne are used by the libnet program. The make command will install these external libraries in the external_lib folder and create the generateHash tool when you run the "make" command. 

### generateHash

This tool is used to create a hash for the pathway you are using. If you change the pathway you are using you will have to re-run this tool and then re-install libnet. 

#Running LibNet

1. Generate hash for particular network with the  generateHash
2. Install libnet and desired interface  
3. Run analysis

###Usage: generateHash

	cd bin  
	./generateHash <pairwise interaction file>  

##Install libnet

Once the hash has been generated with the generateHash program you will be ready to compile and run the libnet program. 

###Prepare config file
Using config/example.ini as a template specify where the files are that you would like to both have read in and written to file. I suggest creating a folder data folder in your desired location and place all files in this folder. 

##Compiling libnet

###Command

	cd net  
	make  

###Result
	net/lib/libnet.so (.dynlib on OSX) has been generated
	
##Library Path

This program and tutorials rely on the relative paths to the main libnet shared object. If you are wanting to to access this object systemwide you could set the LD_LIBRARY_PATH environment variable (DYLD_LIBRARY_PATH on OSX).

###Example command

	export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:<path to shared object directory>

After the LibNet shared object has been created with the hash you desire you will need to compile an interface. 

##Command line interface

###Command

	cd cli  
	make  
	
###Result
	bin/libnet has been generated

###Getting started

	cd bin  
	./libnet --help  
	
	
###Usage

```
libnet [-gil] [--interactive] [--file-paths=file-paths] [--inference-use-logical-factorgraph] [--number-of-states=<int>] [--em-max-iterations=<int>] [--training-samples=<int>] [--log-likelihood-change-limit=<double>] [--parameters-change-limit=<double>] [--logging-on] [--maximum-a-posteriori-estimation] [--help] [--version] 

###Flag descriptions  
 -g, --generate-factorgraph Generate factor graph from reaction logic
 -i, --inference           Run inference given the states of visible sets
 -l, --learning            Run learning using training dataset
 --interactive             Interactive mode
 --file-paths=file-paths   Path to config file that contains paths for input and output files
 --inference-use-logical-factorgraph Set this flag if, for inference, you would like to use the logic factorgraph file (created from pairwise interaction file) instead of the learnt factorgraph file for inference
 --number-of-states=<int>  Number of states for each node (default is 2)
 --em-max-iterations=<int> Maximum number of iterations in the EM algorithm - used in learning (default is 4000)
 --training-samples=<int>  Number of training samples used in expectation mimization - used in learning step(default 400)
 --log-likelihood-change-limit=<double> Stopping criteria: change in the ML - used in learning (default 1e-5)
 --parameters-change-limit=<double> Stopping criteria: change in the parameters - used in learning (default 1e-3)
 --logging-on              Set this flag if you would like the learning step to print out the status into a log file (this file will have the same name as the estimate parameters file with .log appended to the end)
 --maximum-a-posteriori-estimation Use this flag to set the MAP flag to 0 (default 1)
 --help                    Display help and exit
 --version                 Display version information and exit
```

If you would like to be guided through the running of the tool you should select the flag "--interactive".
If you would like to run a new pathway you will need to rerun the generateHash program and then recompile the libnet program.

##R interface

In order to call libnet from the R Contole you will need to create and load the R LibNet shared object. 

###Compile R interface (shared object)

####Command
	cd r_package/libnetR
	make

####Result
	lib/libnetR.so has been generated

###Running R commands ( The current working directory needs to be correct to have the shared obejects link to one another correctly)

	cd r_package/libnetR/  (for Linux)
	cd r_pathage/ (for OS X)
	r or rstudio

####Loading shared object:
	dyn.load("<path to repo>/libnet/r_package/libnetR/lib/libnetR.so")

		
####Available functions:

All filepaths can be either full or abolute paths and the rest of the variables should be supplied as integer values. 

The three available functions are:

	r_reaction_logic_to_factorgraph(SEXP reaction_logic_pathway_filepath_, SEXP pathway_filepath_, SEXP number_of_states_) 
	
	r_learning_discrete_BayNet(SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP estimated_parameters_filepath_, SEXP number_of_states_, SEXP em_max_iterations_, SEXP em_log_likelihood_change_limit_, SEXP map_flag_, SEXP logging_) 
	
	r_doLBPinference(SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP posterior_probabilities_filepath_, SEXP number_of_states_) 
	
####Call available functions:

All filepaths can either be relative or full paths and the rest of the variables should be supplied as integer values. Functions will return 0 upon success and error codes otherwise. 

*These relative paths are for linux and should be changed of OS X. In OS X the change should be to remove one of the '../' from the beginning of the each filepath. 

#####Reaction Logic to Factorgraph
	.Call("r_reaction_logic_to_factorgraph", "../../test/data1/munin4_pairwise.txt", "../../test/data1/logical_factorgraph.txt",2)
	
####Learning
	.Call("r_learning_discrete_BayNet", "../../test/data1/logical_factorgraph.txt", "../../test/data1/visibleSet_0.5.txt", "../../test/data1/estimated_parameters_0.5.txt", 2, 4000, 1e-5, 1e-3, 1, 1)
		
####Inference
	.Call("r_doLBPinference","../../test/data1/estimated_parameters_0.5.txt", "../../test/data1/visibleSet_0.7.txt","../../test/data1/visibleSet_0.5.txt", 2)
	
	
#Libnet dependencies

All resources are included in the LibNet package. 

##Resources
| Name                      |  Description | Link |
|---------------------------|------------------------|------|
|  Minimal Perfect Hashing   | Minimal Perfect Hashing wass Created by Bob Jenkins and is used to hashing the names of the nodes. This allows LibNet to very quickely query nodes by their unique hash  |  http://burtleburtle.net/bob/hash/perfect.html    |

##External Libraries
| Name                      |  Description | Link |
|---------------------------|------------------------|------|
| GNU Scientific Library (GSL) | GSL is a numerical library for C and C++ that provides a wirde range of mathematical routines | http://www.gnu.org/software/gsl/ |
| GNU Readline Library | The GNU Readline library provides a set of functions for use by applications that allow users to edit command lines as they are typed in. This library is used for the interactive command line interface. | https://cnswww.cns.cwru.edu/php/chet/readline/rltop.html |
| GNU Termcap Library | Termcap is a library and data base that enables programs to use display terminals in a terminal-independent manner | https://www.gnu.org/software/termutils/manual/termcap-1.3/html_mono/termcap.html |

