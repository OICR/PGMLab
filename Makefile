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

libnet:
	gcc -o libnet Bayinfer/Bayinfer/main.c \
	Bayinfer/Bayinfer/libnet_src.c \
	makeHashTable/perfect.c \
	makeHashTable/phash.c \
	makeHashTable/lookupa.c \
	makeHashTable/recycle.c \
	makeHashTable/perfhex.c \
	-IBayinfer/Bayinfer/ -ImakeHashTable \
	-L./external_lib/gsl/lib -I./external_lib/gsl/include -lgsl -lgslcblas \
	-lm -w
