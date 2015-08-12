SHELL = /bin/sh
CC    = gcc
CWD   = $(shell pwd)

GSL_VERSION = 1.9

gsl:
	cd ./external_lib/gsl-$(GSL_VERSION); \
	./configure  --prefix=$(CWD)/external_lib/gsl; \
	make; \
	make install; 

generateHash:
	gcc -o generateHash hash_graph_node_IDs/hash_graph_node_IDs/main.c \
	makeHashTable/perfhex.c \
	makeHashTable/lookupa.c \
	makeHashTable/perfect.c \
	makeHashTable/recycle.c \
	Bayinfer/Bayinfer/hash_graph_node_IDs.c \
	-IBayinfer/Bayinfer/ -ImakeHashTable/ -w 
