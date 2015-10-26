#LibNet

Libnet performs learning and inference in large discrete baysian networks. Libnet is a standalone C library, which has command line and R interfaces. 

LibNet developed to fulfill three goals: 

   - To perform learning and inference in extremely large graphs. 
   - To be used by both expert and non expert in the field of machine learning
   - To be as fast and as accurate as possible 

##Authors

   - Hossein Radfar 
   - Adam Wright 

##Wiki
   - Please visit the LibNet wiki [here](https://github.com/OICR/LibNet/wiki) for details and theory. 
   - Make sure to follow the input file formats specifications [here](https://github.com/OICR/LibNet/wiki/File-Formats).  

##System requirements

LibNet has been tested on OS X and Ubuntu 14.04.

###How to download, install and Run LibNet
####1. Download

   - Download the latest version of LibNet from [here](https://github.com/OICR/LibNet/zipball/master) 

####2. Installation

   - Type the following commands in a terminal:
   
        cd .../your-download-directory/LibNet  
	make  

####3. Running LibNet

#####3.1 Generate hash for particular network with generateHash

###Usage: generateHash

   - Type the following commands in the terminal in order to generate the hash for the pairwise interaction network you are intending on using for analysis

	cd bin  
	./generateHash <pairwise interaction file>  

#####3.2 Compile LibNet shared object

Once the hash has been generated with the generateHash program you will be ready to compile and run the libnet program. This stip has to be performed every time you generate a hash in order to have the new hash in shared object. 

   - In order to create the shared object with the desired hash files run the following commands 
 
	cd net  
	make

   - This command has produced the shared object net/lib/libnet.so (.dynlib on OSX) 

######Library Path

   - Run the following command if you would like to access this library system wide (not necessary for basic installation) 

	export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:<path to shared object directory> 

####4 User Interfaces 

There are two interaces to the shared object that come with this package: a command line interaface and a C interface. To make either of the interfaces you are required to have already compiled the LibNet shared object (3.2).

#####4.1Command line interface

######4.1.1 Compiling command line intface

   - Run the following command to create the command line interface

	cd cli  
	make  
	
   - After running this command the command line interface will be locaated at bin/libnet

######4.1.2 Interacting with the command line intface

This command line interface can be used in two distinct ways. The first way is to supply the paths of the files in a config file, in the same way as the example config files in the config folder and flags to customize the parameters to be use and the second way is to input the information through an interactive interface. Further infromation on how to use these interface can be found in the wiki.

   - Run the following commands for a description of the LibNet command line interface. 
 
	cd bin  
	./libnet --help  
	
   - The following will be outputed from the previous command

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

*If you would like to use the interactive interface select the following flag: "--interactive".

*If you would like to run a new pathway you will need to rerun the generateHash program and then recompile the libnet program.


#####4.2 R interface

In order to call libnet from the R Console you will need to create and load the R LibNet shared object. 

######4.2.1 Compiling the R interface

   - Run the following two commands to compile the R interface

	cd r_package/libnetR  
	make  

   - After running the command the following shared object should exist 

	lib/libnetR.so has been generated

######4.2.2 Running R in order to be able to access the R LibNet shared object

   - Run on of the first two commands, depending on your OS, and then run one of the two options in the last line. 

	cd r_package/libnetR/  (for Linux)  
	cd r_package/ (for OS X)  
	type r or rstudio  
   
   - You should now be in a R prompt

*The current working directory needs to be correct to have the shared obejects link to one another correctly

######4.2.3 Loading the LibNet shared ojbect within R or Rstudio

   - Run the following command in order to load the shared object 

	dyn.load("<path to repo>/libnet/r_package/libnetR/lib/libnetR.so") (for Linux)
	dyn.load("libnetR/lib/libnetR.so") (for OS X)

######4.2.4 Description of functions available from the R LibNet library

	r_reaction_logic_to_factorgraph(SEXP reaction_logic_pathway_filepath_, SEXP pathway_filepath_, SEXP number_of_states_) 
	
	r_learning_discrete_BayNet(SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP estimated_parameters_filepath_, SEXP number_of_states_, SEXP em_max_iterations_, SEXP em_log_likelihood_change_limit_, SEXP map_flag_, SEXP logging_) 
	
	r_doLBPinference(SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP posterior_probabilities_filepath_, SEXP number_of_states_) 
	
*All filepaths can be either full or abolute paths and the rest of the variables should be supplied as integer values. 
	
######4.2.5Example R function calls 

*These relative paths are for linux and should be changed of OS X. In OS X the change should be to remove one of the '../' from the beginning of the each filepath. 

   - Reaction Logic to Factorgraph
  
	.Call("r_reaction_logic_to_factorgraph", "../../test/data1/munin4_pairwise.txt", "../../test/data1/logical_factorgraph.txt",2)
	
   - Learning

	.Call("r_learning_discrete_BayNet", "../../test/data1/logical_factorgraph.txt", "../../test/data1/visibleSet_0.5.txt", "../../test/data1/estimated_parameters_0.5.txt", 2, 4000, 1e-5, 1e-3, 1, 1)
		
   - Inference

	.Call("r_doLBPinference","../../test/data1/estimated_parameters_0.5.txt", "../../test/data1/visibleSet_0.7.txt","../../test/data1/visibleSet_0.5.txt", 2)

*Functions will return 0 upon success and error codes otherwise. 	
	
####5 Libnet dependencies

All resources are included in the LibNet package. 

#####5.1 Resources
| Name                      |  Description | Link |
|---------------------------|------------------------|------|
|  Minimal Perfect Hashing   | Minimal Perfect Hashing wass Created by Bob Jenkins and is used to hashing the names of the nodes. This allows LibNet to very quickely query nodes by their unique hash  |  http://burtleburtle.net/bob/hash/perfect.html    |

#####5.2 External Libraries
| Name                      |  Description | Link |
|---------------------------|------------------------|------|
| GNU Scientific Library (GSL) | GSL is a numerical library for C and C++ that provides a wirde range of mathematical routines | http://www.gnu.org/software/gsl/ |
| GNU Readline Library | The GNU Readline library provides a set of functions for use by applications that allow users to edit command lines as they are typed in. This library is used for the interactive command line interface. | https://cnswww.cns.cwru.edu/php/chet/readline/rltop.html |
| GNU Termcap Library | Termcap is a library and data base that enables programs to use display terminals in a terminal-independent manner | https://www.gnu.org/software/termutils/manual/termcap-1.3/html_mono/termcap.html |

