################################
#
# other external libraries/tools 
#
# 
LIBNET_LIB   = ../net/lib
SOFLAGS      = -lnet -Wl,-rpath,$(LIBNET_LIB)
################################

SHELL = /bin/sh
CC    = gcc

CFLAGS       =  -lm -w#-Wall -Werror

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

TEST_I_1_OUTPUT_FILE = ../test_data/Marija_new_DNArepair_28-05-15.out
TEST_I_1_VALIDATED_OUTPUT_FILE = ../test_data/Marija_new_DNArepair_28-05-15.test.correct
TEST_I_2_OUTPUT_FILE = ../test_data/Nt_or_learn.OUT
TEST_I_2_VALIDATED_OUTPUT_FILE = ../test_data/Nt_or_learn.OUT.test.correct

DEBUGFLAGS   = -O0 -D _DEBUG

LIBDIRS = -L$(LIBNET_LIB)
RPATH   = -Wl,-rpath=$(LIBNET_LIB)

TARGET  = libnetc
TARGET_PATH = ../bin/$(TARGET)
SOURCES = $(shell echo src/*.c) $(shell echo ../resources/make_hash_table/src/*.c) ../resources/minini/minIni.c
HEADERS = $(shell echo include/*.h) $(shell echo ../resources/make_hash_table/src/*.h) ../resources/minini/minIni.h ../resources/minini/wxMinIni.h ../resources/minini/minGlue.h
OBJECTS = $(SOURCES:.c=.o)

INCLUDE_GSL = -L../external_lib/gsl/lib -I../external_lib/gsl/include -lgsl -lgslcblas

all: $(TARGET) 

$(TARGET): folders
	$(CC) $(CCFLAGS) $(LIBDIRS) -o $(TARGET_PATH) $(SOURCES) $(CFLAGS) $(SOFLAGS) -Iinclude -I../net/include -I../resources/make_hash_table/include $(INCLUDE_GSL)

clean:
	rm -f $(TARGET) $(OBJECTS) 

folders: 
	mkdir -p ../bin \

test-inference1:
	./libnetc -i -f test.ini --number-of-states 2 \
	cmp -s $(TEST_I_1_OUTPUT_FILE) $(TEST_I_1_VALIDATED_OUTPUT_FILE); \
	RETVAL=$$?; \
	if [ $$RETVAL -eq 0 ]; then \
		echo "SAME - PASSED OUTPUT TEST"; \
	else \
		echo "NOT SAME -FAILED OUTPUT TEST"; \
	fi

test-inference2:
	./libnetc -i -f test2.ini --number-of-states 2; \
	cmp -s $(TEST_I_2_OUTPUT_FILE) $(TEST_I_2_VALIDATED_OUTPUT_FILE); \
	RETVAL=$$?; \
	if [ $$RETVAL -eq 0 ]; then \
		echo "SAME - PASSED OUTPUT TEST"; \
	else \
		echo "NOT SAME -FAILED OUTPUT TEST"; \
	fi
