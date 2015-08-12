SHELL = /bin/sh
CC    = gcc

GSL_VERSION = 1.9

gsl:
	cd ./external_lib/gsl-$(GSL_VERSION); \
	./configure  --prefix=./gsl; \
	make; \
	make install; \
	\

