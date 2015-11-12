################################
#
# other external libraries/tools 
#
#
CWD = $(shell pwd)
LIBNET_LIB   = ../net/lib
SOFLAGS      = 
################################

SHELL = /bin/sh
CC    = gcc

CFLAGS       =  -lm -fPIC -w #-Wall -Werror

LIBNET_DIR = ../net/lib

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
        SOFLAGS +=  -Wl,-rpath=$(LIBNET_LIB),-rpath=../external_lib/gsl/lib
    endif
    ifeq ($(UNAME_S),Darwin)
        CCFLAGS += -D OSX
        SOFLAGS += -Xlinker -rpath -Xlinker $(LIBNET_DIR)
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

DEBUGFLAGS   = -O0 -D _DEBUG

LIBDIRS = -L$(LIBNET_LIB)
RPATH   = -Wl,-rpath=$(LIBNET_LIB)

TARGET  = pgmlab
TARGET_PATH = ../bin/$(TARGET)
SOURCES = $(shell echo src/*.c) $(shell echo ../resources/make_hash_table/src/*.c) ../resources/minini/minIni.c
HEADERS = $(shell echo include/*.h) $(shell echo ../resources/make_hash_table/src/*.h) ../resources/minini/minIni.h ../resources/minini/wxMinIni.h ../resources/minini/minGlue.h
OBJECTS = $(SOURCES:.c=.o)

INCLUDE_NET = -L../net/lib -I../net/include -lnet
INCLUDE_GSL = -L../external_lib/gsl/lib -I../external_lib/gsl/include -lgsl -lgslcblas
INCLUDE_READLINE = -L../external_lib/readline/lib -I../external_lib/readline/include -lreadline
INCLUDE_TERMCAP = -L../external_lib/termcap/lib -I../external_lib/termcap/include -ltermcap

all: $(TARGET) 

$(TARGET): folders
	$(CC) $(CCFLAGS) -o $(TARGET_PATH) $(SOURCES) $(CFLAGS) $(SOFLAGS) -Iinclude -I../resources/make_hash_table/include $(INCLUDE_NET) $(INCLUDE_GSL) $(INCLUDE_READLINE) $(INCLUDE_TERMCAP)

folders: 
	mkdir -p ../bin 

make install:
	ln -s $(CWD)/../bin/$(TARGET) /usr/local/bin/$(TARGET)

make uninstall:
	rm /usr/local/bin/$(TARGET)

clean:
	rm -f $(TARGET) $(OBJECTS) 
