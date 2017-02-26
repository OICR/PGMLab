From ubuntu:12.04


RUN apt-get update
RUN apt-get install build-essential git -y

RUN git clone https://github.com/OICR/PGMLab.git

RUN cd PGMLab && make;

RUN cd PGMGLab && make install;

WORKDIR /PGMLab

CMD ["pgmlab --help"]

