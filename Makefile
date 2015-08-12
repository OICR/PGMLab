SHELL = /bin/sh
CC    = gcc
CWD   = $(shell pwd)

GSL_VERSION = 1.9

gsl:
	cd ./external_lib/gsl-$(GSL_VERSION); \
	./configure  --prefix=$(CWD)/gsl; \
	make; \
	make install; \
	\

