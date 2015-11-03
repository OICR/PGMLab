SHELL = /bin/sh
CC    = gcc
CWD   = $(shell pwd)

READLINE_VERSION = 6.3
TERMCAP_VERSION = 1.3.1
GSL_VERSION = 1.9



ifeq ($(OS),Windows_NT)
    CCFLAGS += -D WIN32
    ifeq ($(PROCESSOR_ARCHITECTURE),AMD64)
        CCFLAGS += -D AMD64
    endif
    ifeq ($(PROCESSOR_ARCHITECTURE),x86)
        CCFLAGS += -D IA32
    endif
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        CCFLAGS += -D LINUX
    endif
    ifeq ($(UNAME_S),Darwin)
        CCFLAGS += -D OSX
    endif
    UNAME_P := $(shell uname -p)
    ifeq ($(UNAME_P),x86_64)
        CCFLAGS += -D AMD64
    endif
    ifneq ($(filter %86,$(UNAME_P)),)
        CCFLAGS += -D IA32
    endif
    ifneq ($(filter arm%,$(UNAME_P)),)
        CCFLAGS += -D ARM
    endif
endif


all: gsl readline generateHash

external_lib: gsl readline sha

sha: 
	cd ./external_lib/mbedtls-2.1.2; \
	make;

gsl:
	cd ./external_lib/gsl-$(GSL_VERSION); \
	./configure  --prefix=$(CWD)/external_lib/gsl; \
	make; \
	make install; 

readline: termcap
	cd ./external_lib/readline-$(READLINE_VERSION); \
	./configure --prefix=$(CWD)/external_lib/readline; \
	make; \
	make install;

termcap:
	cd ./external_lib/termcap-$(TERMCAP_VERSION); \
	./configure --prefix=$(CWD)/external_lib/termcap; \
	make; \
	make install;

generateHash:
	mkdir -p bin; \
	$(CC) $(CCFLAGS) -o bin/generateHash resources/hash_graph_node_ids/src/main.c \
	resources/make_hash_table/src/perfhex.c \
	resources/make_hash_table/src/lookupa.c \
	resources/make_hash_table/src/perfect.c \
	resources/make_hash_table/src/recycle.c \
	resources/hash_graph_node_ids/src/hash_graph_node_ids.c \
	-Inet/include/ -Iresources/make_hash_table/include/ -w 

libnet:
	cd net; \
	make 

clean:
	cd net; make clean; cd ..; \
	rm bin/*
