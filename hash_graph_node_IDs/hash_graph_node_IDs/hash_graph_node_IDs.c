//
//  hash_graph_node_IDs.c
//  Bayinfer
//   get the nodes of a graph formatted in raction-logic style and extract the node names and hash them.
//  Created by Hossein on 2015-07-28.
//  Copyright (c) 2015 Hossein. All rights reserved.
//


#include "hash_graph_node_IDs.h"

int internal_uniq(char *a[], int len);
int internal_cstring_cmp(const void *a, const void *b);

void hash_graph_node_IDs(char *readreactionlogicpathways)
{
    int i,k,kk,Ne,Nv;
    int  maxLen = 2000;
    char buf[maxLen];
    const char delims[2] = "\t";
    char *temp;
    
    
        
    
    // read the node name and store in an array
    FILE *file = fopen(readreactionlogicpathways, "r");
    if (file == NULL)
    {
        fprintf(stderr, "cannot open the file in  ExtractNonUniqNodelist \n");
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
                printf("%s\n",temp);
                kk++;
            }
            
            temp = strtok(NULL, delims);
            
            i++;
            
        }
        
        
    }
    
    fclose(file); /* reset the fgets to the begining of the file*/
    
    Nv = internal_uniq(targetsource,2*Ne); /* unique list of target and source nodes;  Nv: # of variable node  */
    
    
    mphash(targetsource,Nv); /* hash the node lists*/
    
    
   for(i=0;i<Nv;i++)
        free(targetsource[i]);
}


// see http://www.anyexample.com/programming/c/qsort__sorting_array_of_strings__integers_and_structs.xml
int internal_cstring_cmp(const void *a, const void *b)
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
int internal_uniq(char *a[], int len)
{
    int i, j;
    
    qsort(a, len, (size_t) sizeof(char*), internal_cstring_cmp);
    for (i = j = 0; i < len; i++)
        if (strcmp(a[i],a[j])) a[++j] = a[i];
    return j + 1;
}


