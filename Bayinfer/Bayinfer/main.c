//
//  main.c
//  Bayinfer
//
//  Created by Hossein on 2015-06-22.
//  Copyright (c) 2015 Hossein. All rights reserved.
//



#include <gsl/gsl_rng.h>
#include <gsl/gsl_randist.h>
#include<time.h>

#include "listOfFunction.h"



int main(void)
{
    
    
    /*
    double a[3],b[3];
    gsl_rng *r;
    
    a[0]= 1;
    a[1]= 10;
    a[2]= 20;
    
    r=gsl_rng_alloc(gsl_rng_mt19937);
    gsl_rng_set(r,1);
    int i;
    for (i=1;i<=100;i++) {
        
        gsl_ran_dirichlet(r,3,a,b);
        printf(" %g %g %g\n",b[0],b[1],b[2]);
    }
    
    */
    
    clock_t begin, end; /* to measure run time */
    
    double time_spent; /* to measure run time */
    
    /* Intializes random number generator */
    /* see for detail : http://www.cs.yale.edu/homes/aspnes/pinewiki/C(2f)Randomization.html  */
    unsigned int randval;
    FILE *f;
    
    f = fopen("/dev/random", "r");
    fread(&randval, sizeof(randval), 1, f);
    fclose(f);
    
    srand(randval);
    
    begin =clock();
    
    
    char obs_data[20000] =  "/Users/Hossein/Documents/MATLAB/work/KEGG_parser/observedData/JE_network_dd.txt";//C_elegans_immunity_learn_hr.txt";
    
    
    char nodepost[20000] = "/Users/Hossein/Documents/MATLAB/work/KEGG_parser/EstimateCPT/nodepost.txt";
    
    
    char pathway[20000] =   "/Users/Hossein/Documents/MATLAB/work/KEGG_parser/KeggFactorgraph/JE_Network_FG.txt";
    
    char input4columns[20000]= "/Users/Hossein/Documents/MATLAB/work/KEGG_parser/reaction_logic_pathways/JE_Network.txt";
    
    int num_state = 3;          /* number of states */
    int max_num_repeat = 4000;  /* max number of iterations in EM algorithm */
    int MAPflag = 1;
    double LLchangeLimit = 1e-5; /* */

    
    

    /*read the directed logical graph convert to factor-graph format */
   
    reaction_logic_to_factorgraph(input4columns,pathway,num_state);
    
    /* inference */
    doLBPinference(pathway,obs_data,nodepost,num_state);
    
    /*  learning */
    learning_discrete_BayNet(input4columns,pathway,obs_data,nodepost,num_state,max_num_repeat,LLchangeLimit,MAPflag);
    
    
    
    /* report running time*/
    end = clock();
    time_spent = (double)(end-begin) / CLOCKS_PER_SEC;
    printf(" Total time (sec) :  %f\n",time_spent);
    return 0;
}

