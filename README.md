# LibNet

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
