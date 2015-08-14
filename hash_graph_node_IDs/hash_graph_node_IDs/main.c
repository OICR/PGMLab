//
//  main.c
//  hash_graph_node_IDs
//
//  Created by Hossein on 2015-07-30.
//  Modified by Adam Wright
//  Copyright (c) 2015 Hossein. All rights reserved.
//

#include <stdio.h>
#include <string.h>

#include "hash_graph_node_IDs.h"

int main(int argc, char *argv[] )
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
    if ( argc != 2 ) {
        /* We print argv[0] assuming it is the program name */
        printf( "usage: %s filename\n", argv[0] );
    }
    else {
        // We assume argv[1] is a filename to open
        FILE *file = fopen( argv[1], "r" );

        /* fopen returns 0, the NULL pointer, on failure */
        if ( file == 0 )
        {
            printf( "Could not open file\n" );
        }
        else 
        {
            fclose( file );

            char input4columns[20000];
            strcpy(input4columns, argv[1]);
      //      char input4columns[20000]= "/Users/Hossein/Documents/MATLAB/work/KEGG_parser/reaction_logic_pathways/JE_Network.txt";
            /*read name of nodes and hash them*/
            hash_graph_node_IDs(input4columns);
        }
    }
        
    /* report running time*/
    end = clock();
    time_spent = (double)(end-begin) / CLOCKS_PER_SEC;
    printf(" Total time (sec) :  %f\n",time_spent);
    return 0;
}

