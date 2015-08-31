SHELL := /bin/bash
CC = gcc

INCLUDE_GSL = -L../../external_lib/gsl/lib -I../../external_lib/gsl/include -lgsl -lgslcblas
INCLUDE_LIBNET = -L../../net/lib -lnet -I../../net/include -I../../resources/make_hash_table/include

all: object 
	mkdir -p lib; \
	$(CC) -std=gnu99 -shared -L/usr/lib/R/lib -Wl,-Bsymbolic-functions -Wl,-z,relro -o lib/libnetR.so obj/libnetR.o -L/usr/lib/R/lib -lR $(INCLUDE_LIBNET) $(INCLUDE_GSL) -fPIC -Wl,-rpath=../../net/lib

#-Wl,-rpath-link,../../net/lib

object:
	mkdir -p obj; \
	$(CC) -std=gnu99 -I/usr/share/R/include -DNDEBUG -fpic -g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2 -g -c src/libnetR.c -o obj/libnetR.o $(INCLUDE_LIBNET) $(INCLUDE_GSL)

clean:
	rm lib/* obj/*
