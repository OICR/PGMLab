

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#include <gsl/gsl_rng.h>
#include <gsl/gsl_randist.h>

#include "net.h"
/* *****************************************************************************************/

// see http://www.anyexample.com/programming/c/qsort__sorting_array_of_strings__integers_and_structs.xml
int cstring_cmp(const void *a, const void *b)
{
    const char **ia = (const char **)a;
    const char **ib = (const char **)b;
    return strcmp(*ia, *ib);
    /* strcmp functions works exactly as expected from
     comparison function */
}
/* *****************************************************************************************/
//see http://www.anyexample.com/programming/c/qsort__sorting_array_of_strings__integers_and_structs.xml
//http://rosettacode.org/wiki/Remove_duplicate_elements#Sorting_method
int uniq(char *a[], int len)
{
    int i, j;
    
    qsort(a, len, (size_t) sizeof(char*), cstring_cmp);
    for (i = j = 0; i < len; i++)
        if (strcmp(a[i],a[j])) a[++j] = a[i];
    return j + 1;
}

/* *****************************************************************************************/
/* code to a modulo (%) operator in C */
/* link : http://stackoverflow.com/questions/4003232/how-to-code-a-modulo-operator-in-c-c-obj-c-that-handles-negative-numbers */

int mod (int a, int b)
{
    if(b < 0) //you can check for b == 0 separately and do what you want
        return mod(-a, -b);
    int ret = a % b;
    if(ret < 0)
        ret+=b;
    return ret;
}

/* *****************************************************************************************/

/*
 
 Read a file contain multiple words(space separated strings) per line and write it into a char array.
 We must know the number of words in the files upfront.
 June, 2014
 MHR,
 */
int readCharFile(char * lines[],char *fileToRead,int maxbufflen)
{
    
    int datalen = 0;
    char buf[maxbufflen];
    char *temp;
    const char delims[2] = " ";
    
    /* Try to open the file */
    FILE *fp = fopen(fileToRead, "r");
    if (!fp)
    {
        fprintf(stderr, "Unable to open %s: %s\n",
                fileToRead, strerror(errno));
        exit(-1);
    }
    
    while ((fgets(buf,maxbufflen,fp)) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        temp = strtok(buf, delims);
        
        while (temp != NULL)
        {
            lines[datalen] = malloc((strlen(temp)+1)*sizeof(char));
            
            strcpy(lines[datalen],temp) ;
            
            datalen++;
            
            temp = strtok(NULL, delims);
        }
    }
    
    return(datalen);
    
}

/* *****************************************************************************************/


/*
 //test the function
 int main(void)
 {
 int i;
 int numel = 470464;
 int maxbufflen = 1000;
 char *lines[numel];
 
 char fileToRead[300] ="/Users/Hossein/Documents/MATLAB/work/UGM/FINetwork/listAllnodeinFGFI.txt";
 if (readCharFile(lines,fileToRead,maxbufflen)!=numel)
 {
 fprintf(stderr, "incorrect read: number of lines does not match \n");
 exit(-1);
 }
 
 
 for (i=0;i<numel;i++)
 printf("%s\n",lines[i]);
 
 return 0;
 }
 
 */


/**************************************************************************/
/*function: rad_normaliseC*/
/**************************************************************************/
void rad_normaliseC(double *T, int N)
{
    double  sum;
    int i;
    
    sum = 0;
    for (i = 0; i < N; i++)
        sum += T[i];
    
    
    if (sum > 0)
    {
        for (i = 0; i < N; i++)
            T[i] /= sum;
    }
    
}


/**************************************************************************/
/*function:maxVector*/
/**************************************************************************/
void maxVector(double *maxV, int *maxIdx, double  *v, int length_v)
{
    int i;
    double mMax;
    int index;
    mMax   = v[0];
    index = 1;
    
    for (i=1;i<length_v;i++)
    {
        if (v[i]> mMax)
        {
            mMax   = v[i];
            index = i+1;
        }
    }
    *maxV   = mMax;
    *maxIdx = index;
    
}



/**************************************************************************/
/*ExtractNonUniqNodelist(char *filename)*/
/**************************************************************************/
// read the fg file and return the list of all nodes. Note the the list has duplicate nodes so it is passed to the unique function

int ExtractNonUniqNodeNum(char *filename)
{
    int i,ii,K,h,numNode=0;
    int  maxLen = 1000;
    char buf[maxLen];
    const char delims[2] = " ";
    char *temp;
    
    // first read number of nodes to allocate memory
    FILE *file = fopen(filename, "r");
    if (file)
    {
        fgets(buf,maxLen,file);
        
        
        i =  0;
        ii = 0;
        
        while ((fgets(buf,maxLen,file)) != NULL)
        {
            
            buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
            
            
            if(i == 2)
            {
                
                temp = strtok(buf, delims);
                
                while (temp != NULL)
                {
                    
                    numNode++;
                    
                    
                    temp = strtok(NULL, delims);
                }
            }
            
            if(i == 4)
            {
                K= atoi(buf);
                
                for(h=0;h< K;h++)
                    fgets(buf,maxLen,file);
                
                ii++;
                
                i = -1;
                
            }
            
            i++;
        }
        
    }
    
    fclose(file);
    return(numNode);
}
/**************************************************************************/
/*ExtractNonUniqNodelist(char *filename)*/
/**************************************************************************/
// read the fg file and return the list of all nodes. Note the the list has duplicate nodes so it is passed to the unique function

int ExtractNonUniqNodelist(char *filename,char  ** nodeName)
{
    int i,ii,k,K,h;
    int  maxLen = 1000;
    char buf[maxLen];
    const char delims[2] = " ";
    char *temp;
    
    
    // read the node name and store in an array
    FILE *file = fopen(filename, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ExtractNonUniqNodelist \n");
        exit(42);
        
    }
    /* read first line  to get number of factors and store it in Nf*/
    fgets(buf,maxLen,file);
    
    
    i =  0;
    ii = 0;
    k=0;
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        
        if(i == 2)
        {
            
            temp = strtok(buf, delims);
            
            while (temp != NULL)
            {
                
                nodeName[k] = malloc((strlen(temp)+1)*sizeof(char));
                
                
                strcpy(nodeName[k],temp) ;
                k++;
                
                temp = strtok(NULL, delims);
                
            }
        }
        
        if(i == 4)
        {
            K= atoi(buf);
            for(h=0;h< K;h++)
                fgets(buf,maxLen,file);
            
            ii++;
            
            i = -1;
            
        }
        /*------------------------EoS-------------------------------*/
        
        i++;
    }
    
    fclose(file);
    return(k);
    
    
}

/**************************************************************************/
/* return absolute value of i */
/**************************************************************************/
double inAbsolute(double i)
{
    return (i >= 0) ? i : -i;
}


/**************************************************************************/
/* read source-target list of nodes in a graph and hash them */
/**************************************************************************/


int  hashSourceTargetNodes(char *readpairwisefilename)
{
    int i,k,Ne,Nv;
    int  maxLen = 1000;
    char buf[maxLen];
    const char delims[2] = "\t";
    char *temp;
    
    
    
    // read the node name and store in an array
    FILE *file = fopen(readpairwisefilename, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ExtractNonUniqNodelist \n");
        exit(42);
        
    }
    
    fgets(buf,maxLen,file);    /* read first line  to get number of edges and store it in Ne*/
    
    buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
    
    Ne =  atoi(buf);           /*first element is the number of edges*/
    
    char* nodeName[2*Ne];
    
    fgets(buf,maxLen,file);    /* second line is empty*/
    
    
    k=0;
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        
        temp = strtok(buf, delims);
        i = 0; /*  we need the second column (i.e. i==1) */
        while (temp != NULL)
        {
            if(i != 2)
            {
                nodeName[k] = malloc((strlen(temp)+1)*sizeof(char));
                
                strcpy(nodeName[k],temp) ;
                k++;
            }
            temp = strtok(NULL, delims);
            
            i++;
            
        }
        
        
    }
    
    fclose(file); /* reset the fgets to the begining of the file*/
    
    
    Nv = uniq(nodeName,Ne*2); /*remove duplicate from nodelist;  Nf: # of factor */
    
    mphash(nodeName,Nv); /*  and hash unique nodes */
    
    for(i=0;i<Nv;i++)
        free(nodeName[i]);
    
    
    return(Nv);
}



/**************************************************************************/
/* normalize a conditional probablity table*/
/**************************************************************************/
void normalizeCPD(double * f, double *CPD,int numComb,int num_state,int flag)
{
    int k,j;
    double partitionFactor = 0;
    int K =0;
    
    
    for(k = 0 ;k < numComb; k++)
    {
        if( k % num_state == 0) /* if the perfect divisor */
        {
            partitionFactor = 0;
            
            for(j = 0 ;j < num_state; j++)
            {
                partitionFactor += CPD[j+num_state*K];
            }
            K++;
        }
        if(flag)
        {
            if (CPD[k] == 0)
            {
                f[k] =logEPS;
            }
            else
            {
                f[k] = log(CPD[k]/partitionFactor); /* update the beliefs*/
            }
        }
        else
        {
            f[k] = CPD[k]/partitionFactor; /* update the beliefs*/
        }
        
    }
    
}


/**************************************************************************/
/* this function performs the inference using LBP algorithm */
/**************************************************************************/


void doLBPinference(char *pathway,char * obs_data,char *nodepost,int num_state)
{

    int *obs_values = NULL;
    int    *obs_Ids = NULL;
    gsl_rng *r; /* for random generator for gsl rand gernator to sample from Dirchelte distribution */
    
    int i,k,kk,m,h;         /*indexign for loops  and whiles */
    int lenMsgVec;       /*length of message vector (# of all messages *  # of state per message)*/
    int iteration = 0;   /* number of iteration in LBP */
    int maxLen = 1000;   /* max length of buffer to read a txt line*/
    int Nf = 0;          /* number of factors*/
    int Nv = 0;          /* number of variable nodes*/
    int N  = 0 ;          /* number of all nodes: Nf+Nv (factors+variables)*/
    char buf[maxLen];
    int  *visibleIds,*visible_values;
    const char delims[2] = "\t";
    char *temp;
    int num_visibles = 0;   /* # of visible nodes in each condition   */
    int num_conditions = 0; /* # of samples, conditions  */
    
    // read  all varibale nodes, remove duplicates; this section is excuted to make a unique list of nodes (keys) which are passed to
    // the hash function generator to make the hash function; we then we hash Ids throughout the code.
    
    int numel = ExtractNonUniqNodeNum(pathway); // read pathwat file and return the number of varibales nodes in the pathway.
    
    char *nodelist[numel];
    char *keys[numel];
    
    /*retrun the list of all varaible nodes; duplication may be in the list */
    if (ExtractNonUniqNodelist(pathway,nodelist)!=numel)
        fprintf(stderr, "incorrect read: number of lines does not match \n");
    
    Nv = uniq(nodelist, numel); /*remove duplicate from nodelist;  Nv: # of variable nodes */
    
    /*sort the variable node names  according  to thier hash map Ids */
    
    for(i=0;i<Nv;i++)
    {
        h = phash(nodelist[i],strlen(nodelist[i]));
       //printf(" %d %d %s\n",i,h,nodelist[i]);
        
        k = (int)strlen(nodelist[i]);
        keys[h] = malloc((k+1)*sizeof(char));
        
        strcpy(keys[h],nodelist[i]);
    }
    
    for (i = 0; i < Nv; ++i)
    {
        free(nodelist[i]);
        // printf(" %d %s\n",i,keys[i]);
    }
    /*write the factor graph file to read the number of factor given in the first line Nf*/
    
    FILE *file1 = fopen(pathway, "r");
    if (file1 == NULL)
    {
        fprintf(stderr, "cannot open the file %s in  main \n", pathway);
        exit(42);
        
    }
    
    /* read first line  to get number of factors and store it in Nf*/
    
    if (fgets(buf,maxLen,file1) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        Nf =  atoi(buf);//first element is the number of factors
        
    }
    
    fclose(file1);
    
    N = Nv+Nf; // number of all nodes the graph
    
    /* allocate memory for pGraph struct which contains message info*/
    Node *pGraph  = (Node *) malloc(N*sizeof(*pGraph));
    /*  fill the pGraph struct field accroding to info given in factor graph file */
    lenMsgVec = FactorgraphFile_To_NodeStructures(pathway,pGraph,num_state,Nv,Nf);

    /*allocate memory for message vectors*/
    double * u = (double *)malloc(lenMsgVec*num_state * sizeof(double));
    double * u_old = (double *)malloc(lenMsgVec*num_state * sizeof(double));

    /* build conditional probability table indexes */
    int** cpt = makeCPTindex(pGraph,Nf,Nv,num_state);
    
    /* allocate memory for factorarray and pGraph.beliefs  */
    double** factorarray  =  (double **)malloc(Nf*sizeof(*factorarray));
    double** factorarray0  = (double **)malloc(Nf*sizeof(*factorarray0));
    
    for(i = 0;i < Nf;i++)
    {
        factorarray[i]   = (double *)malloc(pGraph[i+Nv].numComb*sizeof(**factorarray));
        factorarray0[i]  = (double *)malloc(pGraph[i+Nv].numComb*sizeof(**factorarray0));
    }

    /* the model parameters passed to factorattay0 once . it  should be noted that factorarray0 does not change but factorattay changes in loop for each input   */
    for(i = 0;i < Nf;i++)
    {
        for (k=0;k<pGraph[i+Nv].numComb;k++)
        {
            factorarray0[i][k]   =    pGraph[i+Nv].beliefs[k];
        }
    }

    /* open this file to write the results into*/
    FILE * pn = fopen(nodepost, "w");
    
    if (pn == NULL)
    {
        fprintf(stderr, " to write, cannot open the posterior probabilities file \n");
        exit(42);
    }
    
    /* open and read the file to find number of observed data and samples*/
    FILE *file = fopen(obs_data, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ReadObservedData \n");
        exit(42);
        
    }
    
    
    fgets(buf,maxLen,file);    /* read first line  to get number of edges and store it in Ne*/
    
    buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
    
    num_conditions =  atoi(buf); /*number of conditions*/
    
    
    for(m=0;m < num_conditions;m++)
        
    {
        
        fgets(buf,maxLen,file);
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        num_visibles =  atoi(buf); /*number of visible nodes in condition i-th*/
        
        /* now you can allocate memory  for observed nodes in condition i-th */
        
        visible_values =  (int*)malloc(num_visibles *sizeof(int));
        visibleIds  =  (int*) malloc(num_visibles*sizeof(int));
        
        for(k=0;k< num_visibles;k++)
        {
            
            
            fgets(buf,maxLen,file);
            
            
            buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
            
            
            temp = strtok(buf, delims);
            h = 0; /*   a flag to let read the first and second column */
            while (temp != NULL)
            {
                
                if(h == 0) /* first column*/
                {
                    visibleIds[k] = phash(temp,strlen(temp));
                }
                
                if(h == 1) /* second column */
                {
                    visible_values[k]  = atoi(temp);
                    
                }
                
                temp = strtok(NULL, delims);
                
                h++;
                
            }
        }
        
        
        /* we assume p(y|x_1,..x_N) has Dirichlet distribution ; factorarray0 contains parameters of Dirichlet (i.e. \alpha). the gsl_ran_dirichlet generates samples from these distributions.   */
        
        for(i = 0;i < Nf;i++)
        {
            for (k=0;k<pGraph[i+Nv].numComb/num_state;k++)
            {
                
                
                r = gsl_rng_alloc(gsl_rng_mt19937);
                gsl_rng_set(r,1);
                gsl_ran_dirichlet(r,num_state,&factorarray0[i][k*num_state],&factorarray[i][k*num_state]);
                
                
            }
        }
        
        /* normalize CPD; each configuration should sum up to 1 and transform them to log domain */
        for(i=0;i<Nf;i++)
            normalizeCPD(factorarray[i],factorarray[i],pGraph[i+Nv].numComb,num_state,1);/*flag =1 mean convert to log */
        
        /* modify factors according to observed nodes states */
          inputBasedModifiedCPT(pGraph,factorarray,visible_values,visibleIds,cpt,Nv,num_visibles,1);
        
        /* do inference using LPB */
        
        /* initialize the message vectors*/
        for (i=0;i<(lenMsgVec*num_state);i++)
        {
            u[i] = 0;
            u_old[i] = 0;
        }
        
        iteration = LogRoundRobinSplashLBP(factorarray,cpt,pGraph,u,u_old,num_state, N,Nv,num_state*lenMsgVec);

        /* write the results in this file */
        for(i = 0;i < Nv;i++)
        {
            for(kk=0;kk<num_state;kk++)
            {
                fprintf(pn,"%s \t %f\n",keys[i],pGraph[i].beliefs[kk]);
            }
            
        }
        fprintf(pn,"------------------------------\n");
        
        
        free(visible_values);
        free(visibleIds);
        
    }
    
    
    fclose(file);
    
    
    /***************************************************************/
    
    
    fclose(pn);
    
    /* free  allocated arrays */
    if(1)
    {
        
        free(u);
        free(u_old);
        
        for (i = 0; i < Nf; ++i) {
            free(cpt[i]);
        }
        free(cpt);
        
        for(i=0;i<N;i++)
        {
            free(pGraph[i].adjNodes);
            free(pGraph[i].oIdx);
            free(pGraph[i].iIdx);
            free(pGraph[i].beliefs);
        }
        free(pGraph);
        for(i=0;i<Nf;i++)
        {
            
            free(factorarray[i]);
            free(factorarray0[i]);
            
        }
        
        free(factorarray);
        free(factorarray0);
        free(obs_values);
        free(obs_Ids);
        
        
        
        
    }
    
} /*end of doLBPinference function*/



/**************************************************************************/
/*pairwiseTofactorgraph*/
/**************************************************************************/
// read source-target list of nodes in a graph and convert to a factor graph.

//
//  pairwiseTofactorgraph.c
//  ReadFgInC
//
//  Created by Hossein on 2014-07-17.
//  Copyright (c) 2014 Hossein. All rights reserved.
//

int pairwiseTofactorgraph(char *readpairwisefilename,char * writefactorgraphfilename,int nstate)
{
    int i,k,kk,Ne,Nv,Nf;
    int  maxLen = 1000;
    char buf[maxLen];
    const char delims[2] = "\t";
    char *temp, *target, *source,*type;
    
    struct factor
    {
        int numParents; /*  number of parents of each child*/
        char** variablenode; /*  list of variable nodes in each factor */
    };
    typedef  struct factor  *factor;
    
    
    
    // read the node name and store in an array
    FILE *file = fopen(readpairwisefilename, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file %s in  ExtractNonUniqNodelist \n", readpairwisefilename);
        exit(42);
        
    }
    
    fgets(buf,maxLen,file);    /* read first line  to get number of edges and store it in Ne*/
    
    buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
    
    Ne =  atoi(buf);           /*first element is the number of edges*/
    
    char* nodeName1[Ne]; /*list of target nodes*/
    char* targetsource[2*Ne]; /* list of all nodes */
    
    fgets(buf,maxLen,file);    /* second line is empty*/
    
    
    k = 0;
    kk = 0;
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        
        temp = strtok(buf, delims);
        i = 0; /*  we need the second column (i.e. i==1) */
        while (temp != NULL)
        {
            
            if(i == 1)
            {
                nodeName1[k] = malloc((strlen(temp)+1)*sizeof(char));
                
                strcpy(nodeName1[k],temp) ;
                k++;
            }
            
            if(i != 2)
            {
                targetsource[kk] = malloc((strlen(temp)+1)*sizeof(char));
                
                strcpy(targetsource[kk],temp) ;
                kk++;
            }
            
            temp = strtok(NULL, delims);
            
            i++;
            
        }
        
        
    }

    rewind(file); /* reset the fgets to the begining of the file*/
    
    Nv = uniq(targetsource,2*Ne); /* unique list of target and source nodes;  Nv: # of variable node  */
    
    Nf = uniq(nodeName1,Ne); /* unique list of target nodes (childs);  Nf: # of factor */
    
    
    for(i=0;i<Nf;i++)
        free(nodeName1[i]);
    
    for(i=0;i<Nv;i++)
        free(targetsource[i]);
    
    /*------------------------------------------------------------*/
    /* find number of variable nodes connected to each child node */
    /*------------------------------------------------------------*/
    
    
    factor fGraph = (factor)malloc(Nv*sizeof(*fGraph));
    
    for(i=0;i<Nv;i++)
        fGraph[i].numParents = 1; /* initialize to one since child node is a member of factor */
    
    fgets(buf,maxLen,file);    /*get the first line */
    
    fgets(buf,maxLen,file);    /* second line is empty*/
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        
        temp = strtok(buf, delims);
        i = 0; /*  we need the second column (i.e. i==1) */
        while (temp != NULL)
        {
            if(i == 1)
            {
                k = phash(temp,strlen(temp)); /* child node "temp" has a parent so  count it*/
                
                fGraph[k].numParents++;
            }
            temp = strtok(NULL, delims);
            
            i++;
            
        }
        
        
    }
    
    
    
    rewind(file); /* reset the fgets to the begining of the file*/
    
    /* allocate the memory  nodes connected to each factor*/
    int varcount[Nv];  /*  a counter for each factor that counts number of nodes added so far*/
    for (i=0;i<Nv;i++)
    {
        fGraph[i].variablenode = (char**) malloc(fGraph[i].numParents *sizeof(fGraph[i].variablenode[0]));
      //  fGraph[i].variablenode = (char**) malloc(fGraph[i].numParents *sizeof(fGraph[i].variablenode));
        varcount[i] = 1 ;/* initialize it*/
    }
    
    
    /*--------------------------------------------------------------------------------*/
    /* find the variable parent  nodes  and the child node connected to  each factor */
    /*--------------------------------------------------------------------------------*/
    
    
    
    fgets(buf,maxLen,file);     /* get the first line (don't need this line) */
    
    fgets(buf,maxLen,file);     /* second line is empty */
    
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        source  = strtok(buf, delims); /* get the source node */
        
        target = strtok(NULL, delims);  /* get the target node */
        
        type = strtok(NULL, delims);    /* get the type of interaction - for later usages*/
        
        k = phash(target,strlen(target));
        /*  add the target node to the factor*/
        fGraph[k].variablenode[0] = malloc((strlen(target)+1)*sizeof(char));
        strcpy(fGraph[k].variablenode[0],target);
        
        /* add the source nodes to the factor*/
        fGraph[k].variablenode[varcount[k]] = malloc((strlen(source)+1)*sizeof(char));
        strcpy(fGraph[k].variablenode[varcount[k]],source);
        
        varcount[k]++; /*  one node added to factor k*/
    }
    
    rewind(file); /* reset the fgets to the begining of the file*/
    
    /* scan the file once more to fill the single factors that should be connected to the root nodes*/
    
    fgets(buf,maxLen,file);     /* get the first line (don't need this line) */
    fgets(buf,maxLen,file);     /* second line is empty */
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        source  = strtok(buf, delims); /* get the source node */
        
        target = strtok(NULL, delims);  /* get the target node */
        
        type = strtok(NULL, delims);    /* get the type of interaction - for later usages*/
        
        k = phash(source,strlen(source));
        if (varcount[k] == 1)
        {
            /*  add a factor for the root  nodes*/
            fGraph[k].variablenode[0] = malloc((strlen(source)+1)*sizeof(char));
            strcpy(fGraph[k].variablenode[0],source);
        }
        
    }
    
    
    
    fclose(file);
    
    
    
    
    /* write retrieved the in a factor graph format */
    
    FILE *file1 = fopen(writefactorgraphfilename, "w");
    if (file1 == NULL)
    {
        fprintf(stderr, "cannot open the file in  ExtractNonUniqNodelist to write in \n");
        exit(42);
        
    }
    /* write according to format*/
    fprintf(file1,"%d\n",Nv); /* number of factor*/
    fprintf(file1,"\n");    /* space*/
    
    
    for(i=0;i<Nv;i++)
    {
        //if(fGraph[i].numParents != 1)
        //{
        fprintf(file1,"%d\n",fGraph[i].numParents);
        
        for(k=0;k<fGraph[i].numParents;k++)
            fprintf(file1,"%s ",fGraph[i].variablenode[k]);
        
        fprintf(file1,"\n");    /* space*/
        
        for(k=0;k<fGraph[i].numParents;k++)
            fprintf(file1,"%d ",nstate);
        
        fprintf(file1,"\n");    /* space*/
        
        fprintf(file1,"%d\n",(int)pow(nstate,fGraph[i].numParents));
        
        
        for(k=0;k<(int)pow(nstate,fGraph[i].numParents);k++)
            fprintf(file1,"%d %f\n",k,1/(double)pow(nstate,fGraph[i].numParents-1));
        
        
        fprintf(file1,"\n");    /* space*/
        //}
        
    }
    
    fclose(file1);
    
    for(i=0;i<Nv;i++)
    {
        for(k=0;k<fGraph[i].numParents;k++)
        {
            // if(fGraph[i].numParents != 1)
            free(fGraph[i].variablenode[k]);
        }
        free(fGraph[i].variablenode);
        
    }
    free(fGraph);
    
    
    return(Nv);
    
}

/**************************************************************************/
/*function: makeCPTlist    */
/**************************************************************************/


/*
 produce a table of indexes for a conditional probability table represnting a factor in a factor graph;
 we need number of variables connected to the factor and the number of state for each variables.
 all these inputs are retrieved from the structure pGRaph
 Nv        = number of varibales
 Nf        = number of factors
 num_state = number of states
 e.g.
 cpt[i]=
 1  1
 2  1
 1  2
 2  2
 for two two-state variables.
 the indexes start from 1 rather than 0
 
 Note the order of conditional probability table first and second column.
 
 
 
 */

/**************************************************************************/
int **makeCPTindex(Node *pGraph,int Nf,int Nv,int num_state)
{
    
    int *Ncpt,i,h,k,Nrep,j,ii,kk;
    
    int  **cpt = (int **)malloc(Nf*sizeof(*cpt));
    
    // build conditional probability table indexes
    Ncpt = (int *)malloc(Nf*sizeof(int));
    
    //cpt = malloc(Nf*sizeof(*cpt));
    
    for (i = 0;i < Nf; i++)
    {
        h = 1;
        for(k = 0 ; k < pGraph[i+Nv].numAdj;k++)
            h *= num_state;
        
        Ncpt[i] = h;
        
       // cpt[i] = malloc(Ncpt[i]*pGraph[Nv+i].numAdj*sizeof(**cpt));
        cpt[i] = malloc(Ncpt[i]*pGraph[Nv+i].numAdj*sizeof(int));
        
        Nrep = Ncpt[i];
        
        //for(ii =0 ; ii < pGraph[Nv+i].numAdj;ii++) //if you use alramnet format
        for(ii = pGraph[Nv+i].numAdj-1 ; ii >= 0 ;ii--)
        {
            kk = 1;
            
            Nrep /= (double)num_state;
            for(j =0; j< Ncpt[i];j++)
            {
                
                cpt[i][ii*Ncpt[i]+j] = kk;
                
                if(((j+1) % Nrep) == 0)
                    kk++;
                
                if(kk > num_state)
                    kk = 1;
            }
            // printf("*************\n");
        }
        
        // printf("----------------\n");
    }
    
    free (Ncpt);
    return(cpt);
    
}



/**************************************************************************/
/*inputBasedModifiedCPT.c*/
 /**************************************************************************/

void inputBasedModifiedCPT(Node *pGraph,double ** factorarray, int *obs_values,int *obs_Ids, int **cpt, int Nv,int numObs,int  flag )
{
    int i,j,nn,k,kk,h,ii;
    
    for(i = 0;i < numObs;i++) //for all observed nodes
    {
        
        // nn = phash(obs_Ids[i],strlen(obs_Ids[i]));
        nn = obs_Ids[i];
        
        
        
        if(nn < Nv) // if observed node was found in the list of nodes
        {
            for (j=0;j< pGraph[nn].numAdj;j++) // for all factors connected to each observed node
            {
                h = pGraph[nn].adjNodes[j]; //index of the kth factor connected
                
                ii = 0; // find the index of the observed node in the CPT table
                for (kk = 0; kk < pGraph[h].numAdj ;kk++)
                {
                    if (pGraph[h].adjNodes[kk] == nn)
                        ii = kk ; // the variable node is the iith adjNodes the factor node adjNodes list
                }
                
                
                for(k=0;k<pGraph[h].numComb;k++)
                {
                    //printf("%d  %d\n ",cpt[h-Nv][ii*pGraph[h].numComb+k], obs_values[i]);
                    /*set all probabilities to zeros except the observed sates of the observed node */
                    if ((cpt[h-Nv][ii*pGraph[h].numComb+k] != obs_values[i]))
                    {
                        if(flag)
                        {
                            factorarray[h-Nv][k] = logEPS; /*modify CPT in log domain*/
                            
                        }
                        else
                        {
                            factorarray[h-Nv][k] = EPS; /*modify CPT in not log domain*/
                            
                            
                            
                        }
                    }
                }
                
            }
        }
        
    }
    
    
}


/**************************************************************************/
/* FactorgraphFile_To_NodeStructures*/
/**************************************************************************/


int FactorgraphFile_To_NodeStructures(char *pathway, Node *pGraph,int num_state,int Nv,int Nf)
{
    
    int i,ii,nn,k,h;
    int lenMsgVec,K,*adjCount;
    double parZ; // to normalize factors that donot sum up to unity
    int maxLen = 1000; /* max length of buffer to read a txt line*/
    char buf[maxLen], *temp;
    const char delims[2] = " ";
    int N = Nv+Nf; // number of all nodes the graph
    
    
    FILE *file = fopen(pathway, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  main \n");
        exit(42);
        
    }
    
    
    /* read first line  to get number of factors and store it in Nf*/
    
    fgets(buf,maxLen,file); /*read the first line but no need to use for it*/
    
    
    
    for(i=0;i<N;i++)
        pGraph[i].numAdj = 0;
    
    
    i =  0;
    ii = 0;
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        // printf(" i = %d, n= %s\n",i,buf);
        
        if(i == 1)
            pGraph[ii+Nv].numAdj = atoi(buf);
        
        
        
        if(i == 2)
        {
            
            temp = strtok(buf, delims);
            
            while (temp != NULL)
            {
                
                pGraph[phash(temp,strlen(temp))].numAdj++;
                
                temp = strtok(NULL, delims);
            }
        }
        
        if(i == 4)
        {
            K= atoi(buf);
            //printf("%d\n",K);
            for(h=0;h< K;h++)
                fgets(buf,maxLen,file);
            
            ii++;
            
            i = -1;
            
        }
        
        
        i++;
    }
    
    /* ***************************************sec **************************************************/
    // allocate memory for the second field of pGraph structure in which we keep indexes of messages
    for(i = 0;i< N;i++)
    {
        pGraph[i].adjNodes = malloc(pGraph[i].numAdj *sizeof(pGraph[i].adjNodes));
        pGraph[i].oIdx = malloc(pGraph[i].numAdj *sizeof(pGraph[i].oIdx));
        pGraph[i].iIdx = malloc(pGraph[i].numAdj *sizeof(pGraph[i].iIdx));
    }

    // a counter to increment number of  the adjNodess of variable nodes.
    adjCount = malloc(Nv*sizeof(int));
    
    for(i=0;i<Nv;i++)
        adjCount[i]=0; // a counter to increment number of  the adjNodess of variable nodes.
    // number of combination in the CPT of each factor
    
    
    for(i = 0;i < N;i++)
        pGraph[i].numComb = 0;  // initialize to zero
    
    
    /* ********************************************* Sec 3 **************************************** */
    // sec 3 read pathway to a strucute which later is written to Node structure
    rewind(file); /* reset the fgets to the begining of the file*/
    
    
    /* read forst line  to get number of factors and store it in Nf*/
    fgets(buf,maxLen,file);
    
    
    /* copy all factors info into a structure   */
    
    i =  0;
    ii = 0;
    lenMsgVec = 0;
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        
        if(i == 2)
        {
            
            temp = strtok(buf, delims);
            
            //printf("%s\n",temp);
            
            k = 0;
            
            while (temp != NULL)
            {
                
                nn = phash(temp,strlen(temp));// the index of variable node temp
                
                pGraph[ii+Nv].adjNodes[k] = nn;// add variable node nn to the factor node ii neighbor
                
                
                
                pGraph[nn].adjNodes[adjCount[nn]] = ii+ Nv; // add neighbor to the varibale node nn
                
                
                
                pGraph[ii+Nv].oIdx[k]         = num_state * lenMsgVec; // message  ii --> nn
                pGraph[nn].iIdx[adjCount[nn]] = num_state * lenMsgVec; // message  nn --> ii
                
                lenMsgVec++;
                
                pGraph[ii+Nv].iIdx[k] =           num_state * lenMsgVec; // message nn --> ii
                pGraph[nn].oIdx[adjCount[nn]] =   num_state * lenMsgVec; // message ii --> nn
                
                
                lenMsgVec++;
                
                adjCount[nn]++;
                
                k++;
                
                temp = strtok(NULL, delims);
                // printf("%s\n",temp);
            }
        }
        
        /* to read factors */
        if(i == 4)
        {
            parZ = 0; // the probabilities should sum up to 1;
            temp = strtok(buf, delims);
            
            
            pGraph[ii+Nv].numComb =atoi(temp);
            
            pGraph[ii+Nv].beliefs = malloc(pGraph[ii+Nv].numComb *sizeof(double));
            
            for(h=0;h<pGraph[ii+Nv].numComb;h++)
            {
                if((fgets(buf,maxLen,file)) != NULL)
                {
                    buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
                    temp = strtok(buf, delims);
                    
                    while (temp != NULL)
                    {
                        
                        temp = strtok(NULL, delims);
                        
                        
                        pGraph[ii+Nv].beliefs[h] = atof(temp);
                        
                        
                        parZ += atof(temp);
                        temp = strtok(NULL, delims);
                        
                    }
                }
            }
            
            
            ii++;
            
            i = -1;
            
            
        }
        
        i++;
    }
    fclose(file);

    /* allocate memory for variable beliefs and initialize them*/
    for(i = 0;i < Nv;i++)
    {
 //       pGraph[i].beliefs = malloc(num_state*sizeof(pGraph[i].beliefs));
        pGraph[i].beliefs = malloc(num_state*sizeof(double));
        
        for(k = 0;k < num_state;k++)
            pGraph[i].beliefs[k] = 1/(double)num_state;
    }

    return(lenMsgVec);
    
}


/**************************************************************************/
/*ReadObservedData.c */
 /**************************************************************************/




int ReadObservedData(char *filename,  double **obs_values, int **obs_Ids,int *numSample)
{
    int h,nn;
    
    double *mRNA_values;
    int    *mRNAObsIds;
    
    char *temp;
    
    int numofTCGAsample =50000; //need a large buffer to reading all observed nodes
    
    char bufTCGA[numofTCGAsample];
    int nmRNAObs = 0;   /* # of observed nodes */
    int nmRNASample =0; /* # of samples  */
    
    
    /* open and read the file to find number of observed data and samples*/
    FILE *file = fopen(filename, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ReadObservedData \n");
        exit(42);
        
    }
    
    
    if (fgets(bufTCGA,numofTCGAsample,file) != NULL)
    {
        bufTCGA[strlen(bufTCGA)-1] = '\0';  /*remove \n placed at the end of each line */
        
        temp = strtok(bufTCGA, "\t");
        
        
        while (temp != NULL)
        {
            nmRNAObs++;
            temp = strtok(NULL, "\t");
            
        }
        
        while ((fgets(bufTCGA,numofTCGAsample,file)) != NULL)
            nmRNASample++;
    }
    
    
    fclose(file);
    
    nmRNAObs--; /* since the first column contains the mRNA ids */
    
    /* now you can allocate memory  for observed data */
    
    mRNA_values =  malloc(nmRNAObs*nmRNASample *sizeof(*mRNA_values));
    mRNAObsIds  =  malloc(nmRNAObs*sizeof(*mRNAObsIds));
    
    /*  open the file second time to read the data and store them in allocated matrix*/
    file = fopen(filename, "r");
    
    
    
    nn = 0;
    while ((fgets(bufTCGA,numofTCGAsample,file)) != NULL)
    {
        bufTCGA[strlen(bufTCGA)-1] = '\0';  /*remove \n placed at the end of each line */
        
        temp = strtok(bufTCGA, "\t"); /*read the first entity in the scanned row */
        h = 0;
        while (temp != NULL)
        {
            if (h !=0)
            {
                if(nn==0)
                {
                    mRNAObsIds[h-1] = phash(temp,strlen(temp));
                }
                else
                {
                    mRNA_values[h-1+nmRNAObs*(nn-1)]  = atof(temp);
                    //printf("%f\n",atof(temp));
                }
            }
            
            h++;
            
            temp = strtok(NULL, "\t");
        }
        
        nn++;
    }
    
    fclose(file);
    
    
    
    /*to test uncomment this part */
    
    
    // for(h=0;h<nmRNAObs;h++)
    //{
    // printf("%d\t\n",mRNAObsIds[h]);
    //}
    
    //for(nn=0;nn<nmRNASample;nn++)
    //{
    //for(h=0;h<nmRNAObs;h++)
    //{
    //printf("%f\n",mRNA_values[h+nmRNAObs*(nn)]);
    //}
    
    //}
    
    
    *obs_values = mRNA_values;
    *obs_Ids  = mRNAObsIds;
    *numSample = nmRNASample;
    
    
    
    
    
    return(nmRNAObs);// number of observed data
    
}


/**************************************************************************/
/* LBP algorithm */
/**************************************************************************/
int LogRoundRobinSplashLBP(double **factorarray,int **array,Node *AlarmNet,double* u,double* u_old,int num_state,int N,int Nv,int lu)
{
    
    
    
    
    int L,i,j,v,k,noN,maxiter,Iter,Nf;
    
    
    double *f,*ff,dist,maxVal;
    double temp[num_state],temp0[num_state];;
    double maxLog[num_state],maxLogVar,normLog,stopThr;
    
    
    Iter = 0;
    maxiter   = 100;
    maxVal    = 1e10;
    stopThr = 1e-3;
    
    while (maxVal > stopThr  && Iter <maxiter)
    {
        
        Iter ++; //number of iterations
        
        for (k=0;k<lu;k++)
            u_old[k] = u[k];
        
        
        for (v=1;v<=N;v++)
        {
            
            
            noN =AlarmNet[v-1].numAdj;  /* # of adjNodes nodes conneceted to node v */
            
            if (v > Nv)
            {
                
                
                L = AlarmNet[v-1].numComb; /* # of conditions in CPT represnted by factor Nv-v*/
                
                
                f = (double *)malloc(L * sizeof(double));
                
                for(k=0;k<L;k++)
                {
                    f[k] = factorarray[v-Nv-1][k];
                    //printf("%f\n",f[k]);
                }
                
                for (j = 0;j < noN;j++)
                {
                    
                    for (k=0;k<L;k++){
                        f[k] +=  u[AlarmNet[v-1].iIdx[j]+array[v-Nv-1][k+j*L]-1];
                        // printf("%f\n",u[AlarmNet[v-1].iIdx[j]+array[v-Nv-1][k+j*L]-1]);
                        
                    }
                }
                
                for (j =0;j<noN;j++)
                {
                    
                    
                    for(k=0;k<num_state;k++)
                    {
                        maxLog[k] = LargeNegNumber;
                        temp[k]=0;
                        
                    }
                    
                    
                    
                    for(i=0;i<num_state;i++)
                    {
                        for (k=0;k<L;k++)
                        {
                            if(i==array[v-Nv-1][k+j*L]-1)
                            {
                                if (f[k] > maxLog[i])
                                {
                                    maxLog[i] = f[k];
                                    
                                }
                            }
                        }
                    }
                    
                    for (k=0;k<L;k++)
                    {
                        temp[array[v-Nv-1][k+j*L]-1] += exp(f[k]-maxLog[array[v-Nv-1][k+j*L]-1]);
                        
                    }
                    
                    for (k=0;k<num_state;k++)
                    {
                        u[AlarmNet[v-1].oIdx[j]+k] = maxLog[k]+log(temp[k])-u[AlarmNet[v-1].iIdx[j]+k];
                        //printf("%f\n",(u[AlarmNet[v-1].oIdx[j]+k]));
                        
                    }
                    
                }
                
                
                free(f);
                
            }
            
            
            else   /*  message from variable  to factor*/
            {
                
                
                if(noN !=1)
                {
                    
                    
                    for(k=0;k<num_state;k++){temp0[k] = 0;} /* initialize the temp*/
                    
                    
                    for (j =0;j<noN;j++)
                    {
                        for (k=0;k<num_state;k++)
                        {
                            temp0[k] += u[AlarmNet[v-1].iIdx[j]+k];
                            //printf("%d %d %f\n",j,k,u[AlarmNet[v-1].iIdx[j]+k]);
                        }
                    }
                    
                    
                    
                    
                    
                    for (j =0;j<noN;j++)
                    {
                        
                        for (k=0;k<num_state;k++)
                        {
                            temp[k] = temp0[k]-u[AlarmNet[v-1].iIdx[j]+k];
                            //printf("%d %d %f\n",j,k,temp[k]);
                        }
                        
                        
                        maxLogVar = LargeNegNumber;
                        normLog = 0;
                        
                        for (k = 0; k < num_state; k++)
                        {
                            
                            
                            if (temp[k]>maxLogVar)
                                maxLogVar = temp[k];
                            
                        }
                        
                        for (k = 0; k < num_state; k++)
                        {
                            temp[k] -= maxLogVar;
                            
                            normLog += exp(temp[k]);
                            
                            
                        }
                        
                        
                        normLog = log(normLog);
                        
                        
                        for (k = 0; k < num_state; k++)
                        {
                            u[AlarmNet[v-1].oIdx[j]+k] =  temp[k]-normLog;
                            // printf("%d %d %f\n",j,k,u[AlarmNet[v-1].oIdx[j]+k]);
                            
                            
                        }
                        
                        //printf("----------------------\n");
                        
                        
                    }
                }
                
            }
            
            
        }
        
        
        maxVal =0;
        
        for (j=0;j<lu;j++)
        {
            dist = inAbsolute(u[j]-u_old[j]);
            if (dist > maxVal)
                maxVal = dist;
        }
        
        
    }
    
    
    
    
    
    /*compute the states probability of nodes after LBP is converged*/
    
    
    for (v=1;v<=Nv;v++)
        
    {
        
        
        noN = AlarmNet[v-1].numAdj;
        
        
        for(k=0;k<num_state;k++){temp[k] = 0;} /* initialize the temp*/
        
        
        for (k=0;k<num_state;k++)
        {
            for (j =0;j<noN;j++)
            {
                temp[k] += u[AlarmNet[v-1].iIdx[j]+k];
                
                // printf("%d %d %f\n",j,k,u[AlarmNet[v-1].iIdx[j]+k]);
            }
            
            
        }
        
        maxLogVar = LargeNegNumber;
        normLog = 0;
        
        for (k = 0; k < num_state; k++)
        {
            if (temp[k]>maxLogVar)
                maxLogVar = temp[k];
            
        }
        
        for (k = 0; k < num_state; k++)
        {
            temp[k] -= maxLogVar;
            normLog += exp(temp[k]);
        }
        
        normLog = log(normLog);
        
        for (k = 0; k < num_state; k++)
            temp[k] -= normLog;
        
        
        
        for (k = 0; k < num_state; k++)
        {
            
            AlarmNet[v-1].beliefs[k] = exp(temp[k]);
            //if(!isfinite(temp[k]))
            //printf("%f %f\n", exp(temp[k]),log(exp(temp[k])));
        }
        
        
        
    }
    
    /*compute the joint probabilty of set of variables belonging to a factor (see Eq 8.72 Bishop book)*/
    
    Nf = N-Nv;
    
    for (v=0;v<Nf;v++)
    {
        
        
        noN =AlarmNet[v+Nv].numAdj;  /* # of adjNodes nodes conneceted to node v */
        
        
        
        L = AlarmNet[v+Nv].numComb; /* # of conditions in CPT represnted by factor Nv-v*/
        
        
        ff = (double *)malloc(L * sizeof(*ff));
        
        for(k=0;k<L;k++)
            ff[k] = factorarray[v][k];
        
        for (j = 0;j < noN;j++)
        {
            
            for (k=0;k<L;k++)
            {
                ff[k] +=  u[AlarmNet[v+Nv].iIdx[j]+array[v][k+j*L]-1];
                
                // printf("%d %f\n",k, exp(u[AlarmNet[v+Nv].iIdx[j]+array[v][k+j*L]-1]));
                
            }
            
            //printf("---------------\n");
            
        }
        
        /* to normalize the beliefs */
        
        
        
        maxLogVar = LargeNegNumber;
        normLog = 0;
        
        for (k = 0; k < L; k++)
        {
            if (ff[k]>maxLogVar)
                maxLogVar = ff[k];
            
        }
        
        for (k = 0; k < L; k++)
        {
            ff[k] -= maxLogVar;
            normLog += exp(ff[k]);
            // printf("%f  %f\n",ff[k], normLog);
        }
        
        normLog = log(normLog);
        
        for (k = 0; k < L; k++)
            ff[k] -= normLog;
        
        
        
        for (k = 0; k < L; k++)
        {
            
            AlarmNet[v+Nv].beliefs[k] = exp(ff[k]);
            // printf("%d %f\n",k, AlarmNet[v+Nv].beliefs[k]);
        }
        // printf("-----------------\n");
        free(ff);
        
        
        
    }
    
    
    return(Iter);
    
    
}




/**************************************************************************/
/* reaction_logic_to_factorgraph*/
/**************************************************************************/


int reaction_logic_to_factorgraph(char *readreactionlogicpathways,char * writefactorgraphfilename,int nstate)
{
    
    int i,k,h,kk,Ne,Nv;
    int  maxLen = 2000;
    char buf[maxLen];
    const char delims[2] = "\t";
    char *temp, *target, *source,*pos_neg,*type_interaction;
    
    
    struct factor
    {
        int numVariables;         /*  number of parents of each child*/
        char** variablenode;    /*  list of variable nodes in each factor */
        int *pos_neg;  /* '0' and  '1' indicate the and and or  */
        int *type_interaction;     /*  '+1' and '-1' indicate positive or negative */
        
    };
    typedef  struct factor  *factor;
    
    
    
    // read the node name and store in an array
    FILE *file = fopen(readreactionlogicpathways, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file %s in  ExtractNonUniqNodelist \n", readreactionlogicpathways);
        exit(42);
        
    }
    
    fgets(buf,maxLen,file);    /* read first line  to get number of edges and store it in Ne*/
    
    buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
    
    Ne =  atoi(buf);           /*first element is the number of edges*/
    
    char* targetsource[2*Ne]; /* list of all nodes */
    
    fgets(buf,maxLen,file);    /* second line is empty*/
    
    
    
    
    k = 0;
    kk = 0;
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        
        temp = strtok(buf, delims);
        i = 0; /*  we need the second column (i.e. i==1) */
        while (temp != NULL)
        {
            
            
            if(i == 0 || i == 1 ) /* read first and second column; child and parent nodes*/
            {
                targetsource[kk] = malloc((strlen(temp)+1)*sizeof(char));
                
                strcpy(targetsource[kk],temp) ;
                kk++;
            }
            
            temp = strtok(NULL, delims);
            
            i++;
            
        }
        
        
    }
    
    rewind(file); /* reset the fgets to the begining of the file*/
    
    Nv = uniq(targetsource,2*Ne); /* unique list of target and source nodes;  Nv: # of variable node  */
    
    
    for(i=0;i<Nv;i++)
        free(targetsource[i]);
    
    /*------------------------------------------------------------*/
    /* find number of variable nodes connected to each child node */
    /*------------------------------------------------------------*/
    
    
    factor fGraph = (factor)malloc(Nv*sizeof(*fGraph));
    
    for(i=0;i<Nv;i++)
        fGraph[i].numVariables = 1; /* initialize to one since child node is a member of factor */
    
    fgets(buf,maxLen,file);    /*get the first line */
    
    fgets(buf,maxLen,file);    /* second line is empty*/
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        temp = strtok(buf, delims);
        i = 0; /*  we need the second column (i.e. i==1) */
        while (temp != NULL)
        {
            if(i == 1)
            {
                k = phash(temp,strlen(temp)); /* child node "temp" has a parent so  count it*/
                fGraph[k].numVariables++;
            }
            temp = strtok(NULL, delims);
            i++;
        }
    }
    
    rewind(file); /* reset the fgets to the begining of the file*/
    
    /* allocate the memory  nodes connected to each factor*/
    int varcount[Nv];  /*  a counter for each factor that counts number of nodes added so far*/
    for (i=0;i<Nv;i++)
    {
        fGraph[i].variablenode =      (char**) malloc(fGraph[i].numVariables *sizeof(fGraph[i].variablenode));
        fGraph[i].pos_neg =  (int*) malloc(fGraph[i].numVariables *sizeof(int));
        fGraph[i].type_interaction  =     (int*) malloc(fGraph[i].numVariables *sizeof(int));
        
        varcount[i] = 1 ;/* initialize it*/
    }
    
    
    /*--------------------------------------------------------------------------------*/
    /* find the variable parent  nodes  and the child node connected to  each factor */
    /*--------------------------------------------------------------------------------*/
    
    
    
    fgets(buf,maxLen,file);     /* get the first line (don't need this line) */
    
    fgets(buf,maxLen,file);     /* second line is empty */
    
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        source  = strtok(buf, delims); /* get the source node */
        //printf("%s \n",source);
        
        target = strtok(NULL, delims);  /* get the target node */
        //printf("%s \n",target);
        
        pos_neg = strtok(NULL, delims);   /* get flag indicating the interaction is positive or negative*/
        //printf("%s \n",type);
        
        type_interaction = strtok(NULL, delims);    /* get the type of interaction and or or*/
        //printf("%s  %s \n",pos_neg,type_interaction);
        
        k = phash(target,strlen(target));
        /*  add the target node to the factor*/
        fGraph[k].variablenode[0] = malloc((strlen(target)+1)*sizeof(char));
        strcpy(fGraph[k].variablenode[0],target);
        
        fGraph[k].pos_neg[0] = 1; /*this is a target source*/
        
        fGraph[k].type_interaction[0] = atoi(type_interaction); /* read the forth column */
        
        /* add the source nodes to the factor*/
        fGraph[k].variablenode[varcount[k]] = malloc((strlen(source)+1)*sizeof(char));
        
        strcpy(fGraph[k].variablenode[varcount[k]],source);
        
        fGraph[k].pos_neg[varcount[k]] = atoi(pos_neg); /* read the third column */
        //printf("%d %d %d \n",k,fGraph[k].pos_neg[varcount[k]],atoi(pos_neg));
        
        fGraph[k].type_interaction[varcount[k]] = atoi(type_interaction); /* read the forth column */
        
        
        varcount[k]++; /* one node added to factor k */
    }
    
    rewind(file); /* reset the fgets to the begining of the file*/
    
    /* scan the file once more to fill the single factors that should be connected to the root nodes*/
    
    fgets(buf,maxLen,file);     /* get the first line (don't need this line) */
    fgets(buf,maxLen,file);     /* second line is empty */
    
    while ((fgets(buf,maxLen,file)) != NULL)
    {
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        source  = strtok(buf, delims); /* get the source node */
        //printf("%s \n",source);
        
        target = strtok(NULL, delims);  /* get the target node */
        //printf("%s \n",target);
        
        pos_neg = strtok(NULL, delims);    /* get flag indicating the interaction is positive or negative*/
        //printf("%s \n",type);
        
        type_interaction = strtok(NULL, delims);    /* get the type of interaction and or or*/
        //printf("%s \n",type);
        //printf("%s  %s \n",pos_neg,type_interaction);
        
        
        k = phash(source,strlen(source));
        if (varcount[k] == 1)
        {
            /*  add a factor for the root  nodes*/
            fGraph[k].variablenode[0] = malloc((strlen(source)+1)*sizeof(char));
            strcpy(fGraph[k].variablenode[0],source);
            
            fGraph[k].pos_neg[0] = 1; /* read the third column */
            
            fGraph[k].type_interaction[0] = 1 ; /* read the forth column */
            
            
        }
        
    }
    
    
    
    fclose(file);
    
    
    
    
    /*  make the CPT to be used to compute the probablity corresponding to each combination of parents*/
    
    /* begin CPT*/
    
    int *Ncpt,Nrep,j,ii;
    
    int  **cpt = (int **)malloc(Nv*sizeof(*cpt));
    
    // build conditional probability table indexes
    Ncpt = (int *)malloc(Nv*sizeof(int));
    
    //cpt = malloc(Nf*sizeof(*cpt));
    
    for (i = 0;i < Nv; i++)
    {
        h = 1;
        for(k = 0 ; k < fGraph[i].numVariables;k++)
            h *= nstate;
        
        Ncpt[i] = h;
        
        cpt[i] = malloc(Ncpt[i]*fGraph[i].numVariables*sizeof(int));
//        cpt[i] = malloc(Ncpt[i]*fGraph[i].numVariables*sizeof(**cpt));
       
        Nrep = Ncpt[i];
        
        //for(ii =0 ; ii < pGraph[Nv+i].numAdj;ii++) //if you use alramnet format
        for(ii = fGraph[i].numVariables-1 ; ii >= 0 ;ii--)
        {
            kk = 1;
            
            Nrep /= (double)nstate;
            for(j =0; j< Ncpt[i];j++)
            {
                
                cpt[i][ii*Ncpt[i]+j] = kk;
                
                if(((j+1) % Nrep) == 0)
                    kk++;
                
                if(kk > nstate)
                    kk = 1;
            }
            // printf("*************\n");
        }
        
        //printf("----------------\n");
    }
    
    free (Ncpt);
    
    
    /*end CPT*/
    
    
    /*  we set the CPD values based on AND and OR and POS or Neg ; we use the min and max similar to PARADIGM but should be imporoved*/
    /*start writing CPD values*/
    
    int s=0,K,MaxNum;
    
    /* allocate memory for factorarray (0) and pGraph.beliefs before the main EM loop */
    double** vote  = (double **)malloc(Nv*sizeof(*vote));
    double** factorarray  = (double **)malloc(Nv*sizeof(*factorarray));
    
    for(i = 0;i < Nv;i++)
    {
        vote[i]  = (double *)malloc(pow(nstate,fGraph[i].numVariables)*sizeof(**vote));
        factorarray[i]  = (double *)malloc(pow(nstate,fGraph[i].numVariables)*sizeof(**factorarray));
    }
    
    for(i = 0;i < Nv;i++)
    {
        for (k=0;k<pow(nstate,fGraph[i].numVariables);k++)
        {
            factorarray[i][k]  = (1e-3)/2;//(((double)rand()/(double)RAND_MAX));
            // printf("%f\n",(factorarray0[i][k])); /*check to see is really random !!*/
        }
        // printf("------------\n");
    }
    
    /*   multiply indexes of CPT by +1 or -1 depending that the interaction is positive or negative*/
    for(i = 0;i < Nv;i++)
    {
        for (h= 0;h < fGraph[i].numVariables;h++)
        {
            for (k=0;k<pow(nstate,fGraph[i].numVariables);k++)
            {
                cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)] = (cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)]-2)*fGraph[i].pos_neg[h] ;
            }
            
            
            
        }
    }
    
    /*
    for(i = 0;i < Nv;i++)
    {
        for (k=0;k<pow(nstate,fGraph[i].numVariables);k++)
        {
            for (h= 0;h < fGraph[i].numVariables;h++)
            {
                if(i==30)
                    printf("%d %d %d %d\n",i,k,h,cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)]);
            }
        }
    }
    */

    /*    OR resembles max and AND resembles min */
    int Small_num_for_OR ; /* to find max*/
    int Big_Num_for_AND;   /*to find min*/
    for(i = 0;i < Nv;i++)
    {
        
        
        for (k=0;k<pow(nstate,fGraph[i].numVariables);k++)
        {
            
            Small_num_for_OR   = -1e5;
            Big_Num_for_AND = 1e5;
            for (h=1;h < fGraph[i].numVariables;h++)
            {
                if (fGraph[i].type_interaction[h]== 1)
                {
                    if (cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)] > Small_num_for_OR)
                    {
                        Small_num_for_OR =  cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)];
                        vote[i][k] = Small_num_for_OR;
                    }
                }
                else if (fGraph[i].type_interaction[h]== 0)
                {
                    if (cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)] < Big_Num_for_AND)
                    {
                        Big_Num_for_AND =  cpt[i][k+h*(int)pow(nstate,fGraph[i].numVariables)];
                        vote[i][k] = Big_Num_for_AND;
                    }
                }
            }
            
            vote[i][k] -= cpt[i][k];
            vote[i][k]  = inAbsolute(vote[i][k]);
            
            // printf("%f %d\n",vote[i][k],cpt[i][k]);
            
            
        }
        
        
    }

    /*based on the vote procedure (AND or OR)  to find the best condition and assign a hight probablity fot that condition, i.e. p(y|x1,...x_N,)*/
    /*note for root nodes we assign high probability to "0" state as common mode is to see no change compare to control . this can adapted if we have prior knowledge from the root node*/
    
    for(i = 0;i < Nv;i++)
    {
        
        if(fGraph[i].numVariables > 1) /*if it is not a root node */
        {
            K=0;
            
            for(k = 0 ;k < pow(nstate,fGraph[i].numVariables); k++)
            {
                if( k % nstate == 0) /* if the perfect divisor */
                {
                    
                    MaxNum = 1e5;
                    s = 0;
                    
                    for(h = 0 ;h < nstate; h++)
                    {
                        
                        if(vote[i][h+nstate*K] < MaxNum)
                        {
                            s = h+nstate*K;
                            MaxNum = vote[i][h+nstate*K];
                        }
                        
                        
                    }
                    
                    K++;
                }
                
                factorarray[i][s]= 1-(1e-3)/2;
                
            }
        }
        else /*this is a root node so the zero state take the maximum change to occur unless we have some prior knowledge about other states being active*/
        {
            factorarray[i][1]= 1-(1e-3)/2;
        }
        
        
        
        // printf("-----------\n");
        
        
        
    }

    /*end of writing CDP values*/
    
    /* write retrieved the in a factor graph format */
    FILE *file1 = fopen(writefactorgraphfilename, "w");
    if (file1 == NULL)
    {
        fprintf(stderr, "cannot open the file %s in  ExtractNonUniqNodelist to write in \n", writefactorgraphfilename);
        exit(42);
        
    }
    /* write according to format*/
    fprintf(file1,"%d\n",Nv); /* number of factor*/
    fprintf(file1,"\n");    /* space*/
    
    for(i=0;i<Nv;i++)
    {
        //if(fGraph[i].numVariables != 1)
        //{
        fprintf(file1,"%d\n",fGraph[i].numVariables);//

        for(k=0;k<fGraph[i].numVariables;k++)
            fprintf(file1,"%s ",fGraph[i].variablenode[k]);

        fprintf(file1,"\n");    /* space*/
         
        for(k=0;k<fGraph[i].numVariables;k++)
            fprintf(file1,"%d ",nstate);

        fprintf(file1,"\n");    /* space*/
        
        fprintf(file1,"%d\n",(int)pow(nstate,fGraph[i].numVariables));

        for(k=0;k<(int)pow(nstate,fGraph[i].numVariables);k++)
            fprintf(file1,"%d %f\n",k,factorarray[i][k]);
        
        fprintf(file1,"\n");    /* space*/
        //}
        
    }
    fclose(file1);
    
    for(i=0;i<Nv;i++)
    {
        for(k=0;k<fGraph[i].numVariables;k++)
        {
            //if(fGraph[i].numVariables != 1)
            free(fGraph[i].variablenode[k]);
            
        }
        free(fGraph[i].variablenode);
        free(fGraph[i].type_interaction);
        free(fGraph[i].pos_neg);
        free(factorarray[i]);
        
        
    }
    free(fGraph);
    
    return(Nv);
    
}


/**************************************************************************/
/*  ReadMultipleVisibleSets*/
/**************************************************************************/

int ReadMultipleVisibleSets(char *filename,  double **obs_values, int **obs_Ids,int *numSample)
{
    int i,k;
    
    
    int    *visibleIds,*visible_values;
    const char delims[2] = "\t";
    char *temp;
    
    int maxLen=1000; //need a large buffer to reading all observed nodes
    
    char buf[maxLen];
    int num_visibles = 0;   /* # of observed nodes */
    int num_conditions =0; /* # of samples  */
    
    
    /* open and read the file to find number of observed data and samples*/
    FILE *file = fopen(filename, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ReadObservedData \n");
        exit(42);
        
    }
    
    
    fgets(buf,maxLen,file);    /* read first line  to get number of edges and store it in Ne*/
    
    buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
    
    num_conditions =  atoi(buf); /*number of conditions*/
    
    
    for(i=0;i< num_conditions;i++)
        
    {
        
        fgets(buf,maxLen,file);
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        num_visibles =  atoi(buf); /*number of visible nodes in condition i-th*/
        
        /* now you can allocate memory  for observed nodes in condition i-th */
        
        visible_values =  malloc(num_visibles *sizeof(int));
        visibleIds  =  malloc(num_visibles*sizeof(int));
        
        for(k=0;k< num_visibles;k++)
        {
            
            
            fgets(buf,maxLen,file);
            
            
            buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
            
            
            temp = strtok(buf, delims);
            i = 0; /*  we need the second column (i.e. i==1) */
            while (temp != NULL)
            {
                
                if(i == 0)
                {
                    visibleIds[k] = phash(temp,strlen(temp));
                }
                
                if(i == 1)
                {
                    visible_values[k]  = atoi(temp);
                    
                }
                
                temp = strtok(NULL, delims);
                
                i++;
                
            }
            printf("%d %d %d\n",k,visibleIds[k],visible_values[k]);
            
        }
        
        free(visible_values);
        free(visibleIds);
        
    }
    
    
    fclose(file);
    
    
    
    /*to test uncomment this part */
    
    
    // for(h=0;h<num_visibles;h++)
    //{
    // printf("%d\t\n",mRNAObsIds[h]);
    //}
    
    //for(nn=0;nn<num_conditions;nn++)
    //{
    //for(h=0;h<num_visibles;h++)
    //{
    //printf("%f\n",mRNA_values[h+num_visibles*(nn)]);
    //}
    
    //}
    
    
    *obs_values = visible_values;
    *obs_Ids  = visibleIds;
    *numSample = num_conditions;
    
    
    
    
    
    return(num_visibles);// number of observed data
    
}



/**************************************************************************/
/*  learning_discrete_BayNet*/
/**************************************************************************/
void learning_discrete_BayNet(char * pathway,char *obs_data,char *nodepost, int num_state, int max_num_repeat, double LLchangeLimit, int MAPflag)
{
    int i,k,m,h;         /*indexign for loops  and whiles */
    int lenMsgVec;       /*length of message vector (# of all messages *  # of state per message)*/
    int iteration = 0;   /* number of iteration in LBP */
    int num_repeat = 0 ; /* counter of number of iteration in EM*/
    int maxLen = 1000;    /* max length of buffer to read a txt line*/
    int Nf = 0;           /* number of factors*/
    int Nv = 0;           /* number of variable nodes*/
    int N  = 0 ;          /* number of all nodes: Nf+Nv (factors+variables)*/
    char buf[maxLen];
    gsl_rng *r; /* for random generator for gsl rand gernator to sample from Dirchelte distribution */
    
    
    int  *visibleIds,*visible_values;
    const char delims[2] = "\t";
    char *temp;
    int num_visibles = 0;   /* # of visible nodes in each condition   */
    int num_conditions = 0; /* # of samples, conditions  */
    
    double oldLL= -LargeNumber;
    double changeLL = LargeNumber;
    double change_parameters = 10;
    
    // read  all varibale nodes, remove duplicates; this section is excuted to make a unique list of nodes (keys) which are passed to
    // the hash function generator to make the hash function; we then we hash Ids throughout the code.
    
    int numel = ExtractNonUniqNodeNum(pathway); // read pathwat file and return the number of varibales nodes in the pathway.
    
    char* nodelist[numel];
    char *keys[numel];
    
    /*retrun the list of all varaible nodes; duplication may be in the list */
    if (ExtractNonUniqNodelist(pathway,nodelist)!=numel)
        fprintf(stderr, "incorrect read: number of lines does not match \n");
    
    
    Nv = uniq(nodelist, numel); /*remove duplicate from nodelist;  Nv: # of variable nodes */
    
    
    Nf = Nv; /*in our setting # of facotrs should be equal to # of variables becuase we consider one factor for each root node */
    
    N = Nv+Nf; // number of all nodes the graph
    
    /*sort the variable node names  according  to thier hash map Ids */
    
    for(i=0;i<Nv;i++)
    {
        h = phash(nodelist[i],strlen(nodelist[i]));
        //printf(" %d %d %s\n",i,h,nodelist[i]);
        
        k = (int)strlen(nodelist[i]);
        keys[h] = malloc((k+1)*sizeof(char));
        strcpy(keys[h],nodelist[i]);
    }
    
    for (i = 0; i < Nv; ++i)
    {
        free(nodelist[i]);
        // printf(" %d %s\n",i,keys[i]);
    }
    
    
    
    
    /* allocate memory for pGraph struct which contains message info*/
    Node *pGraph  = (Node *) malloc(N*sizeof(*pGraph));
    
    /*  fill the pGraph struct field accroding to info given in factor graph file */
    lenMsgVec = FactorgraphFile_To_NodeStructures(pathway,pGraph,num_state,Nv,Nf);
    
    /*allocate memory for message vectors*/
    double * u = (double *)malloc(lenMsgVec*num_state * sizeof(double));
    double * u_old = (double *)malloc(lenMsgVec*num_state * sizeof(double));
    
    
    /* build conditional probability table indexes */
    
    int** cpt = makeCPTindex(pGraph,Nf,Nv,num_state);
    
    
    
    /* allocate memory for factorarray and pGraph.beliefs  */
    
    double** factorarray  =  (double **)malloc(Nf*sizeof(*factorarray));
    double** factorarray0  = (double **)malloc(Nf*sizeof(*factorarray0));
    double** oldfactorarray0  = (double **)malloc(Nf*sizeof(*oldfactorarray0));
    double** alpha  = (double **)malloc(Nf*sizeof(*alpha));
    
    
    
    
    
    for(i = 0;i < Nf;i++)
    {
        factorarray[i]   = (double *)malloc(pGraph[i+Nv].numComb*sizeof(**factorarray));
        factorarray0[i]  = (double *)malloc(pGraph[i+Nv].numComb*sizeof(**factorarray0));
        oldfactorarray0[i]  = (double *)malloc(pGraph[i+Nv].numComb*sizeof(**oldfactorarray0));
        alpha[i]  = (double *)malloc(pGraph[i+Nv].numComb*sizeof(**alpha));
    }
    
    
    
    
    
    /* the model parameters passed to factorattay0 once . it  should be noted that factorarray0 does not change but factorattay changes in loop for each input   */
    
    for(i = 0;i < Nf;i++)
    {
        for (k=0;k<pGraph[i+Nv].numComb;k++)
        {
            alpha[i][k]   =    pGraph[i+Nv].beliefs[k];
            
            
            // printf("p_o(%d,%d) %f\n",i,k, (factorarray0[i][k]));
        }
        //printf("----------------------\n");
    }
    
    
    
    /* we assume p(y|x_1,..x_N) has Dirichlet distribution ; factorarray0 contains parameters of Dirichlet (i.e. \alpha). the gsl_ran_dirichlet generates samples from these distributions.   */
    
    for(i = 0;i < Nf;i++)
    {
        for (k=0;k<pGraph[i+Nv].numComb/num_state;k++)
        {
            
            
            r = gsl_rng_alloc(gsl_rng_mt19937);
            gsl_rng_set(r,1);
            gsl_ran_dirichlet(r,num_state,&pGraph[i+Nv].beliefs[k*num_state],&factorarray0[i][k*num_state]);
            
            
        }
    }
    
    
    
    /* normalize CPD; each configuration should sum up to 1 and transform them to log domain */
    for(i=0;i<Nf;i++)
        normalizeCPD(factorarray0[i],factorarray0[i],pGraph[i+Nv].numComb,num_state,1);/*flag =1 mean convert to log */
    
    
    /* allocate a train and test array for sum of factor probabilities across the training and test data*/
    
    double** sumFactorProbability      = (double **)malloc(Nf*sizeof(*sumFactorProbability));
    
    
    /* initialize to zero*/
    for(i = 0;i < Nf;i++)
    {
        sumFactorProbability[i] = (double *)malloc(pGraph[i+Nv].numComb*sizeof(double));
        
        for(k = 0 ;k < pGraph[i+Nv].numComb; k++)
        {
            sumFactorProbability[i][k] = 0;
        }
    }
    
    
    /* to observe the changes of conditional probability values in each iteration*/
    
    
    
    
    
    /* allocate two log likelihood vectors for the train and test phases*/
    double* LogLikelihood = (double *) malloc(max_num_repeat*sizeof(double));
    
    
    /*initialize  the LogLikelihood vectors to zero*/
    for(i=0;i<max_num_repeat;i++)
    {
        LogLikelihood[i] = 0;
        
    }
    
    
    
    
    
    /* open and read the file to find number of observed data and samples*/
    FILE *file = fopen(obs_data, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ReadObservedData \n");
        exit(42);
        
    }
    
    /* do the EM algorithm */
    
    while(change_parameters > LLchangeLimit && num_repeat < max_num_repeat) /*stopping criterion*/
    {
        
        
        change_parameters = 0;
        /* initialize  to zeros*/
        for(i = 0;i < Nf;i++)
        {
            for(k = 0 ;k < pGraph[i+Nv].numComb; k++)
            {
                sumFactorProbability[i][k]=0;
                oldfactorarray0[i][k]= factorarray0[i][k];
                
            }
        }
        
        fgets(buf,maxLen,file);    /* read first line  to get number of edges and store it in Ne*/
        
        buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
        
        num_conditions =  atoi(buf); /*number of conditions*/
        /* do inference for each set of numSample training data */
        
        
        for(m=0;m < num_conditions;m++)
            
        {
            
            for(i = 0;i < Nf;i++)
            {
                for (k=0;k<pGraph[i+Nv].numComb;k++)
                {
                    factorarray[i][k]   =   factorarray0[i][k];
                    // printf("p_o(%d,%d) %f\n",i,k, (factorarray0[i][k]));
                }
                //printf("----------------------\n");
            }
            
            
            fgets(buf,maxLen,file);
            buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
            
            num_visibles =  atoi(buf); /*number of visible nodes in condition i-th*/
            
            /* now you can allocate memory  for observed nodes in condition i-th */
            
            visible_values =  (int*)malloc(num_visibles*sizeof(int));
            visibleIds     =  (int*)malloc(num_visibles*sizeof(int));
            
            for(k=0;k< num_visibles;k++)
            {
                
                
                fgets(buf,maxLen,file);
                
                
                buf[strlen(buf)-1] = '\0';  /*remove \n placed at the end of each line */
                
                
                temp = strtok(buf, delims);
                h = 0; /*   a flag to let read the first and second column */
                while (temp != NULL)
                {
                    
                    if(h == 0) /* first column*/
                    {
                        visibleIds[k] = phash(temp,strlen(temp));
                    }
                    
                    if(h == 1) /* second column */
                    {
                        visible_values[k]  = atoi(temp);
                        
                    }
                    
                    temp = strtok(NULL, delims);
                    
                    h++;
                    
                }
                //printf("%d %d %d\n",m,visibleIds[k],visible_values[k]);
            }
            
            
            
            
            
            /* modify factors according to observed nodes states */
            
            inputBasedModifiedCPT(pGraph,factorarray,visible_values,visibleIds,cpt,Nv,num_visibles,1);
            
            
            
            /* do inference using LPB */
            
            /* initialize the message vectors*/
            for (i=0;i<(lenMsgVec*num_state);i++)
            {
                u[i] = 0;
                u_old[i] = 0;
            }
            
            
            iteration = LogRoundRobinSplashLBP(factorarray,cpt,pGraph,u,u_old,num_state, N,Nv,num_state*lenMsgVec);
            //printf("Number of LPB iterations for %d th input data is:   %d\n", m, iteration);
            
            
            
            
            free(visible_values);
            free(visibleIds);
            
            
            
            /* sum up joint beliefs (factor probabilities) obtained from ech configuration of obersved data  */
            /* this generates expected sufficient statistics (page 872 Koller book)*/
            
            for(i = 0;i < Nf;i++)
            {
                for(k = 0 ;k < pGraph[i+Nv].numComb; k++)
                {
                    
                    sumFactorProbability[i][k] += pGraph[i+Nv].beliefs[k];
                    
                    // printf("%d %f %f\n",m,factorarray[i][k],pGraph[i+Nv].beliefs[k]);
                }
                //printf("-----------------------\n");
                
            }
            
            
        } /* end of m loop for each set of observed data*/
        
        
        
        /* the maximization step of the EM algorithm  */
        
        
        /* compute the expected log likelihood (page 883, see Eq 19.5 Koller book) */
        for(i = 0;i < Nf;i++)
        {
            for(k=0;k<pGraph[i+Nv].numComb;k++)
            {
                LogLikelihood[num_repeat] += sumFactorProbability[i][k]*factorarray0[i][k]+alpha[i][k]*factorarray0[i][k] ;
                
                
            }
        }
        
        
        /* if you want to do MAP estimate instead of ML (see EQ 10.32  and  11.60 of Murphy's book)*/
        if(MAPflag)
        {
            for(i = 0;i < Nf;i++)
            {
                for(k = 0 ;k < pGraph[i+Nv].numComb; k++)
                {
                    sumFactorProbability[i][k] += alpha[i][k];
                    
                    //printf(" output %d %f\n",i,sumFactorProbability[i][k]);
                    
                }
                //printf("----------------\n");
                
            }
            
        }
        
        /* convert joint beliefs to conditional probability, that is, p(x1,x2)--> p(x1|x2); it is a local normalization*/
        for(i = 0;i < Nf;i++)
        {
            normalizeCPD(factorarray0[i],sumFactorProbability[i],pGraph[i+Nv].numComb,num_state,1);/*flag =1 mean convert to log */
            // for(k=0;k<pGraph[i+Nv].numComb;k++)
            // printf("factor = %d c = %d  p = %f\n",i,k,exp(factorarray0[i][k]));
            // printf("-----------------------\n");
        }
        
        
        /* calculate changes in parameters of each factor after an update*/
        
        
        for(i = 0;i < Nf;i++)
        {
            for(k=0;k<pGraph[i+Nv].numComb;k++)
            {
                change_parameters += inAbsolute(exp(factorarray0[i][k])-exp(oldfactorarray0[i][k]));
                
            }
            
            //change_parameters /= pGraph[i+Nv].numComb; /*if you want to use avarege  change per sample*/
            //printf("%f\n",parameterChange[num_repeat][i]);
        }
        
        
        
        
        
        
        /* check stopping criterion*/
     //   printf(" itr = %d, par =  %f  LL = %f   \n",num_repeat,change_parameters,LogLikelihood[num_repeat]);
        changeLL= inAbsolute(oldLL -  LogLikelihood[num_repeat]);
        
        
        
   //     if (oldLL> LogLikelihood[num_repeat])//LogLikelihood[num_repeat]
 //           printf( " warning : log likelihood decreases! \n");
        
        
        
        //printf("change in LL = %f\n",changeLL);
        oldLL =  LogLikelihood[num_repeat];
        num_repeat++; /* one EM iteration is performed */
        
        
        
        rewind(file); /* reset the fgets to the begining of the file*/
        
        
        
    } /* end of  EM while*/
    
    fclose(file);
    
    /* open this file to write the results into*/
    FILE * pm = fopen(nodepost, "w");
    
    if (pm == NULL)
    {
        fprintf(stderr, " to write, cannot open the posterior probabilities file \n");
        exit(42);
    }
    
    
    /* wirte the results in this file */
    for(i = 0;i < Nf;i++)
    {
        for(k=0;k<pGraph[i+Nv].numComb;k++)
        {
            fprintf(pm,"%f\n",exp(factorarray0[i][k]));
            // printf("%f\n",exp(factorarray0[i][k]));
        }
        // printf("-------\n");
    }
    
    
    
    fclose(pm);
    
    
    
    /* free  allocated arrays */
    if(1)
    {
        
        free(u);
        free(u_old);
        
        for (i = 0; i < Nf; ++i) {
            free(cpt[i]);
        }
        free(cpt);
        
        for(i=0;i<N;i++)
        {
            free(pGraph[i].adjNodes);
            free(pGraph[i].oIdx);
            free(pGraph[i].iIdx);
            free(pGraph[i].beliefs);
        }
        free(pGraph);
        for(i=0;i<Nf;i++)
        {
            free(alpha[i]);
            free(factorarray[i]);
            free(factorarray0[i]);
            free(oldfactorarray0[i]);
            free(sumFactorProbability[i]);
            
        }
        free(alpha);
        free(factorarray);
        free(factorarray0);
        free(oldfactorarray0);
        free(sumFactorProbability);
        free(LogLikelihood);
        
    }
    
}






