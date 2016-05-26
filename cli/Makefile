################################
#
# other external libraries/tools 
#
#
CWD = $(shell pwd)
PGMLAB_LIB   = $(CWD)/../net/lib
SOFLAGS      = 
################################

SHELL = /bin/sh
CC    = gcc

CFLAGS       =  -lm -fPIC -w #-Wall -Werror

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
        SOFLAGS +=  -Wl,-rpath=$(PGMLAB_LIB),-rpath=$(CWD)/../external_lib/gsl/lib
    endif
    ifeq ($(UNAME_S),Darwin)
        CCFLAGS += -D OSX
        SOFLAGS += -Xlinker -rpath -Xlinker $(PGMLAB_LIB)
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

LIBDIRS = -L$(PGMLAB_LIB)
RPATH   = -Wl,-rpath=$(PGMLAB_LIB)

TARGET  = pgmlab
TARGET_PATH = $(CWD)/../bin/$(TARGET)
SOURCES = $(shell echo src/*.c) $(CWD)/$(shell echo ../resources/make_hash_table/src/*.c) $(CWD)/../resources/minini/minIni.c
HEADERS = $(shell echo include/*.h) $(CWD)/$(shell echo ../resources/make_hash_table/src/*.h) $(CWD)/../resources/minini/minIni.h $(CWD)../resources/minini/wxMinIni.h $(CWD)/../resources/minini/minGlue.h
OBJECTS = $(SOURCES:.c=.o)

INCLUDE_NET = -L$(CWD)/../net/lib -I$(CWD)/../net/include -l$(TARGET)
INCLUDE_GSL = -L$(CWD)/../external_lib/gsl/lib -I$(CWD)/../external_lib/gsl/include -lgsl -lgslcblas
INCLUDE_READLINE = -L$(CWD)/../external_lib/readline/lib -I$(CWD)/../external_lib/readline/include -lreadline
INCLUDE_TERMCAP = -L$(CWD)/../external_lib/termcap/lib -I$(CWD)/../external_lib/termcap/include -ltermcap

all: $(TARGET) 

$(TARGET): folders
	$(CC) $(CCFLAGS) -o $(TARGET_PATH) $(SOURCES) $(CFLAGS) $(SOFLAGS) -Iinclude -I$(CWD)/../resources/make_hash_table/include $(INCLUDE_NET) $(INCLUDE_GSL) $(INCLUDE_READLINE) $(INCLUDE_TERMCAP)

folders: 
	mkdir -p ../bin 

make install:
	ln -s $(CWD)/../bin/$(TARGET) /usr/local/bin/$(TARGET)

make uninstall:
	rm /usr/local/bin/$(TARGET)

clean:
	rm -f $(TARGET_PATH) $(OBJECTS) 
