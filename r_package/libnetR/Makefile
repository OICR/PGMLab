SHELL := /bin/bash
CC = gcc


all: object 
	mkdir -p lib; \
	$(CC) -std=gnu99 -shared -L/usr/lib/R/lib -Wl,-Bsymbolic-functions -Wl,-z,relro -o lib/libnetR.so obj/libnet.o -L/usr/lib/R/lib -lR

object:
	mkdir -p obj; \
	$(CC) -std=gnu99 -I/usr/share/R/include -DNDEBUG -fpic -g -O2 -fstack-protector --param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2 -g -c src/libnet.c -o obj/libnet.o -L../../net/lib -lnet -I../../net/include -I../../resources/make_hash_table/include

clean:
	rm lib/* obj/*
