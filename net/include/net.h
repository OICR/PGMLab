//
//  net.h
//  ReadFgInC
//
//  Created by Hossein on 2014-06-11.
//  Copyright (c) 2014 Hossein. All rights reserved.

#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<time.h>
#include <errno.h>
#include <stdbool.h>
#include <math.h>
#include <sys/time.h>

#ifndef net
#define net
#include "perfect.h"


#ifndef STANDARD
#include "standard.h"
#endif

#ifndef EPS
#define  EPS 1e-300 ;
#endif
#ifndef logEPS
#define  logEPS -30 ;
#endif
#ifndef LargeNumber
#define  LargeNumber 1e300;
#endif
#ifndef LargeNegNumber
#define  LargeNegNumber -1e300;
#endif
typedef int (*lib_function)(char* key, int len); // for dynamic library

// define the struct node for message passing
struct Node
{
    int numAdj;     // number of neighbors
    int numComb;   // number of CPD combinations; zero for variable nodes
    int *adjNodes; // hash Ids of neighbors
    int *oIdx;     // indexes of outbound messages
    int *iIdx;     // indexes of inbound messages
    double * beliefs; // beliefs of nodes
};
typedef struct Node Node ;

double inAbsolute(double i);
int cstring_cmp(const void *a, const void *b);
int uniq(char *a[], int len);
int readCharFile(char * lines[],char *fileToRead,int maxbufflen, int *datalen);
void rad_normaliseC(double *T, int N);
void maxVector(double *maxV, int *maxIdx, double  *v, int length_v);
int ExtractNonUniqNodeNum(char *filename, int *numNode);
int ExtractNonUniqNodelist(char *filename,char  ** nodeName, int *k);


void LogSplashLBP(double **factorarray,int **array,int *numComb,Node *AlarmNet,int num_state,int N,int Nv,int lu,int *iteration);
int Splash(double *W, Node *AlarmNet,int *Sigma, int v, int maxW,int maxSplashSize,double *resBelief);

int LogRoundRobinSplashLBP(double **factorarray,int **array,Node *AlarmNet,double* u,double* u_old,int num_state,int N,int Nv,int lu);
void RoundRobinSplashLBP(double **factorarray, int **array,int *numComb,Node *AlarmNet,int N,int Nv,int lu,int * iteration);

void belief_resBelief_Splash(double **factorarray, int **array,int *numComb,Node*AlarmNet,int N,int Nv,int lu,int *iteration);

void LogRBP(double **factorarray, int **array,int *numComb,Node *AlarmNet,int num_state,int N,int Nv,int lu,int *iteration);

int **makeCPTindex(Node *pGraph,int Nf,int Nv,int num_state);
int ReadObservedData(lib_function *phash, char *filename,  double **obs_values, int **obs_Ids,int *numSample, int *nmRNAObs);

int pairwiseTofactorgraph(char *readpairwisefilename,char * writefactorgraphfilename,int nstate);
int  hashSourceTargetNodes(char *readpairwisefilename, int * Nv);
int mod (int a, int b);
void normalizeCPD(double * f, double *CPD,int numComb,int num_state,int flag);
int FactorgraphFile_To_NodeStructures(lib_function *phash, char *pathway, Node *pGraph,int num_state,int Nv,int Nf, int *lenMsgVec);

void inputBasedModifiedCPT(Node *pGraph,double ** factorarray, int *obs_values,int *obs_Ids, int **cpt, int Nv,int numObs,int  flag );

int doLBPinference(char* readreactionlogic, char *pathway,char * obs_data,char *posterior_probabilities,int num_state);

int reaction_logic_to_factorgraph(char *readreactionlogicpathways,char * writefactorgraphfilename,int nstate);

int ReadMultipleVisibleSets(lib_function *phash, char *filename,  double **obs_values, int **obs_Ids,int *numSample, int *num_visibles);

void hash_graph_node_IDs(char *readreactionlogicpathways);

int learning_discrete_BayNet(char* readreactionlogic, char * logical_factorgraph, char *obs_data,char *estimated_parameters, int num_state, int max_num_repeat, double LLchangeLimit, double parChangeLimit, int MAPflag, int logging);
char *strerror_libnet(int error_code);

int compile_shared_object(char* path);
int create_hash_folder (char* hash_folder_path);
void unsigned_char_to_char(char *dst,unsigned char *src,size_t src_len);
int streamFile(char*filename, char**string, long *length);
int hashFile(char *filename, unsigned char *sum);

int create_hash_object(char* readreactionlogic, char* hash_folder_path );
int load_hash_library(char* readreactionlogic, void **hash_library, lib_function *phash);
#endif
