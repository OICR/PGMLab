SHELL := /bin/bash
CC = gcc

R_VERSION = 3.2.2_1

TARGET = libnetR
LIBNET_LIB = ../../net/lib


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
        LDFLAGS = -shared
        SHARED_OBJECT_EXTENSION = so
        R_LIB = -L/usr/lib/R/lib -lR
	INCLUDE_R = -I/usr/share/R/include
        R_FLAGS = -Wl,Bsymbolic-functions -Wl,-z,relro -std=gnu99
        SOFLAGS +=  -Wl,-rpath=$(LIBNET_LIB),-rpath=../external_lib/gsl/lib -fPIC
        OFLAGS =  -std=gnu99 -DNDEBUG -fpic -g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2 -g 
    endif
    ifeq ($(UNAME_S),Darwin)
        CCFLAGS += -D OSX
        LDFLAGS = -dynamiclib
        SHARED_OBJECT_EXTENSION = so
        R_LIB = -L/Library/Frameworks/R.framework/Resources/lib -L/usr/local/lib 
        INCLUDE_R = -I/Library/Frameworks/R.framework/Resources/include -I/usr/local/include -I/usr/local/include/freetype2 -I/opt/X11/include -fPIC 
        R_FLAGS = -F/Library/Frameworks/R.framework/.. -framework R -Wl,-framework -Wl,CoreFoundation
        SOFLAGS +=  -Wl,-headerpad_max_install_names -undefined dynamic_lookup -single_module -multiply_defined suppress
        OFLAGS = -Wall -mtune=core2 -g -O2 -w 
        XLINKER = -Xlinker $(LIBNET_LIB)
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

INCLUDE_GSL = -L../../external_lib/gsl/lib -I../../external_lib/gsl/include -lgsl -lgslcblas
INCLUDE_LIBNET = -L../../net/lib -lnet -I../../net/include -I../../resources/make_hash_table/include

all: object 
	mkdir -p lib; \
	$(CC) $(LDFLAGS) $(SOFLAGS) $(R_LIB) -o lib/$(TARGET).$(SHARED_OBJECT_EXTENSION) obj/$(TARGET).o $(INCLUDE_LIBNET) $(RFLAGS)

object:
	mkdir -p obj; \
	$(CC) -DNDEBUG $(INCLUDE_R) $(OFLAGS) -c src/$(TARGET).c -o obj/$(TARGET).o $(INCLUDE_LIBNET) $(INCLUDE_GSL)  $(XLINKER)

clean:
	rm lib/* obj/*
