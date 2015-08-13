//
//  main.c
//  hash_graph_node_IDs
//
//  Created by Hossein on 2015-07-30.
//  Copyright (c) 2015 Hossein. All rights reserved.
//






#include "hash_graph_node_IDs.h"

int main(void)
{
    
    
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
    
    
    
    
    char input4columns[20000]= "/Users/Hossein/Documents/MATLAB/work/KEGG_parser/reaction_logic_pathways/JE_Network.txt";
    
    
    /*read name of nodes and hash them*/
    
     hash_graph_node_IDs(input4columns);
    
    
    /* report running time*/
    end = clock();
    time_spent = (double)(end-begin) / CLOCKS_PER_SEC;
    printf(" Total time (sec) :  %f\n",time_spent);
    return 0;
}

