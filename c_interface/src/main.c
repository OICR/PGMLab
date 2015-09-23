/*******************************************************************************
* C interface to libnet
*    USAGE:
*        libnetc [--help] [--learning] [--inference]
* 
*******************************************************************************/
//for inimini
#include <assert.h>
#include <stdio.h>
#include <stdlib.h> // for strtod
#include <string.h>
#include "../minini/minIni.h"
#define sizearray(a)  (sizeof(a) / sizeof((a)[0]))

//for checking to see if file is readable
#include <unistd.h>

//To handle tilda 
#include <wordexp.h>

//for basename
#include <libgen.h>

//for isbool to check if int
#include <ctype.h>

//readline
#include <readline/readline.h>
#include <readline/history.h>

#include "net.h"
#include "main.h"

#include "../include/argtable3.h"

#define TRUE		1
#define	FALSE		0
#define FILENAME_MAX	100

int non_interactive_command(int em_max_iterations, int em_number_of_training_samples, double em_log_likelihood_change_limit, double em_parameters_change_limit, int number_of_states, const char *ini_filename, int g_count, int l_count, int i_count, int logging, int inference_use_learnt_factorgraph) {

    char value[200];
    int MAP_flag = 1;

    char pairwise_filepath[200];
    char logical_factorgraph_filepath[200];
    char learning_observed_data_filepath[200];
    char inference_observed_data_filepath[200];
    char pairwise_interactions_filepath[200];
    char estimated_parameters_filepath[200];
    char inference_posterior_probabilities_filepath[200];

    ini_gets("files", "pairwise_interactions", "dummy", pairwise_filepath, sizearray(value), ini_filename);
    ini_gets("files", "logical_factorgraph", "dummy", logical_factorgraph_filepath, sizearray(value), ini_filename);
    ini_gets("files", "learning_observed_data", "dummy", learning_observed_data_filepath, sizearray(value), ini_filename);
    ini_gets("files", "inference_observed_data", "dummy", inference_observed_data_filepath, sizearray(value), ini_filename);
    ini_gets("files", "pairwise_interactions", "dummy", pairwise_interactions_filepath, sizearray(value), ini_filename);
    ini_gets("files", "estimated_parameters", "dummy", estimated_parameters_filepath, sizearray(value), ini_filename);
    ini_gets("files", "inference_posterior_probabilities", "dummy", inference_posterior_probabilities_filepath, sizearray(value), ini_filename);

    if (g_count > 0) {
        printf("Generating factorgraph with number of states: %d\n", number_of_states);

        if ( strcmp(logical_factorgraph_filepath, "dummy") == 0 ) {
            printf("Pathway filepath not specified in config\n");
            return 1;
        }
        if ( strcmp(pairwise_interactions_filepath, "dummy") == 0 ) {
            printf("Pairwise interactions filepath not specified in config\n");
            return 1;
        }

        int exit_code = reaction_logic_to_factorgraph(pairwise_interactions_filepath, logical_factorgraph_filepath, number_of_states);

        if (exit_code != 0) {
           char * strerr = strerror(exit_code);
           printf("Failed to generate logical factorgraph (error code: %d): %s\n", exit_code, strerr);
           return exit_code;
        }
        else {
           printf("\tLogic factorgragh has been output into the following pathway file: %s\n", logical_factorgraph_filepath); 
           printf("\tFactorgraph generation completed\n\n");
        }
    }
    if (l_count > 0) {
        printf("Running Learning with Max iterations: %d, number of states: %d, log likelilhood change limit: %e, parameters change limit: %e, logging: %d \n", em_max_iterations, number_of_states, em_log_likelihood_change_limit, em_parameters_change_limit, logging);

        if ( strcmp(logical_factorgraph_filepath, "dummy") == 0 ) {
            printf("Logic factorgraph filepath not specified in config\n");
            return 1;
        }
        if ( strcmp(learning_observed_data_filepath, "dummy") == 0 ) {
            printf("Learning observed data filepath not specified in config\n");
            return 1;
        }
        if ( strcmp(estimated_parameters_filepath, "dummy") == 0 ) {
            printf("Estimated Parameters filepath not specified in config\n");
            return 1;
        }

        int exit_code = learning_discrete_BayNet(logical_factorgraph_filepath, learning_observed_data_filepath, estimated_parameters_filepath, number_of_states, em_max_iterations, em_log_likelihood_change_limit, em_parameters_change_limit, MAP_flag, logging);
        if (exit_code != 0) {
            char * strerr = strerror_libnet(exit_code);
            printf("Learning failed (error code: %d): %s\n", exit_code, *strerr);
            return 0;
        } 
        else {
            printf("\tEstimated Parameters (learnt factorgraph) have been written to: %s\n", estimated_parameters_filepath);
            printf("\tLearning completed\n\n");
        }
    }
    if (i_count > 0) {
        printf("Running Inference with number of states: %d\n", number_of_states);
        if ( strcmp(learning_observed_data_filepath, "dummy") == 0 ) {
            printf("Observed data filepath not specified in config\n");
            return 1;
        }
        if ( strcmp(inference_posterior_probabilities_filepath, "dummy") == 0 ) {
            printf("Posterior probabilities filepath not specified in config\n");
            return 1;
        }

        int exit_code;
        if (inference_use_learnt_factorgraph) {
            if ( strcmp(estimated_parameters_filepath, "dummy") == 0 ) {
               printf("Estimated parameters (learnt factorgraph) filepath not specified in config\n");
               return 1;
            }

            exit_code = doLBPinference(estimated_parameters_filepath, inference_observed_data_filepath, inference_posterior_probabilities_filepath, number_of_states);
        } 
        else {
            if ( strcmp(logical_factorgraph_filepath, "dummy") == 0 ) {
               printf("Logic factorgraph filepath not specified in config\n");
               return 1;
            }

            exit_code = doLBPinference(logical_factorgraph_filepath, inference_observed_data_filepath, inference_posterior_probabilities_filepath, number_of_states);
        } 
        if (exit_code != 0) {
             char * strerr = strerror_libnet(exit_code);
             printf("Inference failed with (error code: %d): %s\n", exit_code, *strerr);
             return exit_code;
        }
        else {
             printf("\tPosterior probabilities have been written to the following file: %s\n", inference_posterior_probabilities_filepath);
             printf("\tInference completed\n");
        }
    }
    return 0;
}

void trimwhitespace(char ** s) {
    char * p = *s;
    int l = strlen(p);

    while(isspace(p[l - 1])) p[--l] = 0;
    while(* p && isspace(* p)) ++p, --l;
    memmove(*s, p, l + 1);
}

// Mainly used to expand tilda at beginning of filepath
void expand_path (char** path) {
 
    wordexp_t exp_result;
    wordexp(*path, &exp_result, 0);
 
    *path = (char*) exp_result.we_wordv[0];
 //   wordfree(&exp_result);  // freeing the variable causes errors at the beggining of the path variable
}

void clean_filepath(char**path) {
    trimwhitespace(path);
    expand_path(path);
}

//this checks if the directory is writalbel and the filename exists
int is_writeable(char * filepath) {
    if( ( strlen(filepath) == 0) || (strcmp(filepath, ".") == 0) || (strcmp(filepath, "/") ==0) ) {
         return FALSE;
    }
 
    char buf[1000];
    realpath(filepath, buf); // buff should now be full filepath
    char *ts = strdup(buf);
    char *ts2 = strdup(filepath);
    char *filename = basename(buf);
    char *dir = (char *) dirname(buf);

    if ( (access(dir, W_OK) == 0) && (strlen(filename) > 0)) 
        return TRUE;
    
    return FALSE;
}    

// Returns 1 for true an 0 for false
int is_yes(char * input) {
    if((strcmp(input,"yes") == 0) ||
       (strcmp(input,"YES") == 0) ||
       (strcmp(input,"Y") == 0) ||
       (strcmp(input,"y") == 0) ||
       (strcmp(input,"") == 0))
    {
        return TRUE;
    }

    return FALSE;
}

int get_readable_pairwise_interaction_filepath(char ** filepath) {
    *filepath = readline("\tEnter pairwise interaction filepath (input):  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (access(*filepath, R_OK) != 0) {
       printf("\t\tCan not read specified file.\n");
       return get_readable_pairwise_interaction_filepath(filepath);
    }

    return 0;
}

int get_writeable_logical_factorgraph_filepath(char ** filepath) {
    *filepath = readline("\tEnter logical factorgraph filepath (output):  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (!is_writeable(*filepath)) {
       printf("\t\tCan not write specified file.\n");
       return get_writeable_logical_factorgraph_filepath(filepath);
    }

    return 0;
}

int get_readable_logical_factorgraph_filepath(char ** filepath) {
    *filepath = readline("\tEnter logical factorgraph filepath (input):  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (access(*filepath, R_OK) != 0) {
       printf("\t\tCan not read specified file.\n");
       return get_readable_logical_factorgraph_filepath(filepath);
    }

    return 0;
}


int get_readable_factorgraph_filepath(char ** filepath) {
    *filepath = readline("\tEnter factorgraph filepath (input):  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (access(*filepath, R_OK) != 0) {
       printf("\t\tCan not read specified file.\n");
       return get_readable_factorgraph_filepath(filepath);
    }

    return 0;
}

int get_number_of_states(int * number_of_states) {
    char * ptr;
    char *str = "";
    str = readline("\tEnter number of states[default 3]: ");

    if (!*str) {
        *number_of_states = 3;
        return 0;
    }
   
    int number = strtol(str, &ptr, 10);
    if (number == 0 && *str != '0') {
        printf("\t\tNot a valid Integer - please try again");
        return get_number_of_states(number_of_states); 
    }
    else {
        *number_of_states = number;
    }

    return 0;
}

int get_observed_data_filepath(char ** filepath) {
    *filepath = readline("\tEnter observed data filepath (input):  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (access(*filepath, R_OK) != 0) { 
       printf("\t\tCan not read specified file.\n");
       return get_observed_data_filepath(filepath);
    }

    return 0;
}

int get_writeable_posterior_probabilities_filepath(char ** filepath) {
    *filepath = readline("\tEnter posterior probabilities filepath (output):  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (!is_writeable(*filepath)) {
       printf("\t\tCan not write to specified file.\n");
       return get_writeable_posterior_probabilities_filepath(filepath);
    }

    return 0;
}

int get_writeable_estimated_parameters_filepath(char ** filepath) {
    *filepath = readline("\tEnter estimated parameters (output) filepath:  ");
    clean_filepath(filepath);
    add_history(*filepath);

    if (!is_writeable(*filepath)) { 
       printf("\t\tCan not read specified file.\n");
       return get_writeable_estimated_parameters_filepath(filepath);
    }

    return 0;
}

int get_max_iterations(int * em_max_iterations) {
    char *ptr;
    char *str = "";
    str = readline("\tEnter max number of iterations for expectation maximization [default 400]: ");

    if (!*str) {
        *em_max_iterations = 400;
        return 0;
    }

    int number = strtol(str, &ptr, 10);
    if (number == 0) {
        printf("\t\tNot a valid Integer - please try again");
        return get_max_iterations(em_max_iterations); 
    }
    else {
        *em_max_iterations = number;
    }

    return 0;
}

int get_log_likelihood_change_limit(double * em_log_likelihood_change_limit) {
    char *ptr;
    char *str = "";
    str = readline("\tEnter the stop criteriion log likelihood change limit [default 1e-5]: ");
 
    if (!*str) {
        *em_log_likelihood_change_limit = 1e-5;
        return 0;
    }

    double number = strtod(str, &ptr);
    if (number == 0) {
        printf("\t\tNot a valid number");
        return get_log_likelihood_change_limit(em_log_likelihood_change_limit); 
    }
    else {
        *em_log_likelihood_change_limit = number;
    }

    return 0;
}


int get_parameters_change_limit(double * em_parameters_change_limit) {
    char *ptr;
    char *str = "";
    str = readline("\tEnter the stop criteriion parameters change limit [default 1e-3]: ");
 
    if (!*str) {
        *em_parameters_change_limit = 1e-3;
        return 0;
    }

    double number = strtod(str, &ptr);
    if (number == 0) {
        printf("\t\tNot a valid number");
        return get_parameters_change_limit(em_parameters_change_limit); 
    }
    else {
        *em_parameters_change_limit = number;
    }

    return 0;
}

int get_learning_logging(int *logging) {
    char *input = readline("\tWould you like to have a log be generated for monitoring progress. If yes the status will be outputted to screen as well. [Y/n]  ");
    
    *logging = is_yes(input) == 1 ? 1 : 0;

    return 0;
}

int get_map_flag(int * map_flag) {
    char *str = "";
    str = readline("\tEnter map flag (1 or 0) [default 1]: ");

    if ((!*str) || (*str == '1')) {
        *map_flag = 1;
    }
    else if (*str == '0') {
        *map_flag = 0;
    }
    else {
        printf("\t\tNot 0 or 1 - please try again\n");
        return get_map_flag(map_flag); 
    }

    return 0;
}

int interactive_pairwise_to_factorgraph(char **pairwise_interactions_filepath, char **factorgraph_filepath, int *number_of_states) {
    printf("\nGathering information required to generated the factorgraph file from pairwise interactions\n");
    get_readable_pairwise_interaction_filepath(pairwise_interactions_filepath);
    get_writeable_logical_factorgraph_filepath(factorgraph_filepath);
    get_number_of_states(number_of_states);

    printf("\nGenerating Factorgraph file from pairwise interactions:\t%s\n", *factorgraph_filepath);
    int exit_code = reaction_logic_to_factorgraph(*pairwise_interactions_filepath, *factorgraph_filepath, *number_of_states);

    if (exit_code != 0) {
        char * strerr = strerror_libnet(exit_code);
        printf("Failed to generate factorgraph (error code: %d): %s\n", exit_code, strerr);
        return exit_code;
    }
    else {
        printf("\tFactorgragh has been output into the following factorgraph file: %s\n", *factorgraph_filepath);
        printf("\tFactorgraph generation completed\n\n");
    }
}

int interactive_learning(char **logical_factorgraph_filepath, char ** observed_data_filepath, char** estimated_parameters_filepath, int *number_of_states, int * em_max_iterations, double * em_log_likelihood_change_limit, double * em_parameters_change_limit, int * MAP_flag, int * logging ) {
    printf("\nGathering information required to perform learning\n");
    if (access(*logical_factorgraph_filepath, R_OK) != 0) 
        get_readable_logical_factorgraph_filepath(logical_factorgraph_filepath);
    get_observed_data_filepath(observed_data_filepath);
    get_writeable_estimated_parameters_filepath(estimated_parameters_filepath);
    get_learning_logging(logging);
    if (*number_of_states == 0) 
        get_number_of_states(number_of_states);
    get_max_iterations(em_max_iterations);
    get_log_likelihood_change_limit(em_log_likelihood_change_limit);
    get_parameters_change_limit(em_parameters_change_limit);
    get_map_flag(MAP_flag);

    printf("Running Learning\n");
    int exit_code = learning_discrete_BayNet(*logical_factorgraph_filepath, *observed_data_filepath, *estimated_parameters_filepath, *number_of_states, *em_max_iterations, *em_log_likelihood_change_limit, *em_parameters_change_limit, *MAP_flag, *logging);
    if (exit_code != 0) {
        char * strerr = strerror_libnet(exit_code);
        printf("Learning failed (error code: %d): %s\n", exit_code, *strerr);
        return 0;
    } 
    else {
        printf("\tEstimated Parameters have been written to the following file: %s\n", *estimated_parameters_filepath);
        printf("\tLearning completed\n\n");
    }

    return 0;
}

int interactive_inference(char **factorgraph_filepath, char ** observed_data_filepath, char** posterior_probabilities_filepath, int *number_of_states) {
    printf("\nGathering information required to perform inference\n");
    if (access(*factorgraph_filepath, R_OK) != 0) 
        get_readable_factorgraph_filepath(factorgraph_filepath);

    if (access(*observed_data_filepath, R_OK) != 0)
        get_observed_data_filepath(observed_data_filepath);
    get_writeable_posterior_probabilities_filepath(posterior_probabilities_filepath);
    if (*number_of_states == 0) 
        get_number_of_states(number_of_states);
  
    printf("Running Inference\n");
    int exit_code = doLBPinference(*factorgraph_filepath, *observed_data_filepath, *posterior_probabilities_filepath, *number_of_states);
    if (exit_code != 0) {
         char * strerr = strerror_libnet(exit_code);
         printf("Inference failed with (error code: %d): %s\n", exit_code, *strerr);
         return exit_code;
    }
    else {
         printf("\tPosterior probabilities have been written to the following file: %s\n", *posterior_probabilities_filepath);
         printf("\tInference completed\n");
    }

    return 0;
}

int interactive_command() {
    char *input; 
    char *pairwise_interactions_filepath, *logical_factorgraph_filepath, *learning_observed_data_filepath, *inference_observed_data_filepath, *estimated_parameters_filepath, *posterior_probabilities_filepath;

    double result = 0;
    int number_of_states = 0;
    int logging = 0;
    int em_max_iterations = 0;
    double em_log_likelihood_change_limit = 0;
    double em_parameters_change_limit = 0;
    int MAP_flag = 0;

    input = readline("\nWould you like to generate a logical factorgraph file from pairwise interactions [Y/n] ");
    if (is_yes(input) == 1)
    {
        interactive_pairwise_to_factorgraph(&pairwise_interactions_filepath, &logical_factorgraph_filepath, &number_of_states);
    } 

    input = readline("Would you like to perform learning [Y/n] ");
    if (is_yes(input) == 1)
    {
        interactive_learning(&logical_factorgraph_filepath, &learning_observed_data_filepath, &estimated_parameters_filepath, &number_of_states, &em_max_iterations, &em_log_likelihood_change_limit, &em_parameters_change_limit, &MAP_flag, &logging);  
    } 

    input = readline("Would you like to perform inference [Y/n] ");
    if (is_yes(input) == 1)
    {
        if ((strlen(estimated_parameters_filepath) != 0) || (strlen(logical_factorgraph_filepath) !=0 )) {
            input =  is_yes( readline("\nSelect yes if you would like to use a learnt factorgraph (estimated parameters from learning) file vs a logical factorgraph file [Y/n] ")) ;
        } 

        if (input)         
        {
            interactive_inference(&estimated_parameters_filepath, &inference_observed_data_filepath, &posterior_probabilities_filepath, &number_of_states);  
        } 
        else { 
            interactive_inference(&logical_factorgraph_filepath, &inference_observed_data_filepath, &posterior_probabilities_filepath, &number_of_states);  
        }
    } 

    printf("\nAnalysis Complete\n");
    return 0;
}

int interactive_commands() {
    char *inpt;

    int i = 0;

    while ( i < 10 )
    {
        inpt = readline("Enter text: ");
        add_history(inpt);
        printf("%s", inpt);
        printf("\n");
        ++i;
    }

}

int main(int argc, char *argv[]) {
    struct arg_lit *i, *l, *g, *interactive, *logging_on, *inference_use_logical_factorgraph;
    struct arg_lit *help, *version;
    struct arg_end *end;
    struct arg_int *em_max_iterations, *em_number_of_training_samples, *number_of_states;
    struct arg_file *inifile;
    struct arg_dbl *em_log_likelihood_change_limit, *em_parameters_change_limit; 

    void *argtable[] = {
        g = arg_lit0("g", "generate-pathway", "Generate factorgraph from reaction logic"),
        i = arg_lit0("i", "inference", "Run inference on dataset"),
        l = arg_lit0("l", "learning", "Run learning on dataset"),
        interactive = arg_lit0(NULL, "interactive", "Interactive mode"),
        inifile = arg_file0(NULL, "inifile", "inifile", "File to be use to describe configuration of analysis"),
        inference_use_logical_factorgraph = arg_lit0(NULL, "inference_use_logical_factorgraph", "Set this flag if for inference you would like to use the logic factorgraph file (created from pairwise interaction file) instead of the learnt factorgraph file for inference"),
        number_of_states = arg_int0(NULL, "number-of-states", NULL, "Number of states for pathway (default is 3)"),
        em_max_iterations = arg_int0(NULL, "em-max-iterations", NULL , "Maximum number of iterations for expectation maximization - used in learning step (default is 4000)"),
        em_number_of_training_samples = arg_int0(NULL, "training-samples", NULL, "Number of training samples used in expectation mimization - used in learning step(default 400)"),
        em_log_likelihood_change_limit = arg_dbl0(NULL, "log-likelihood-change-limit", NULL, "Stop criteria threshold for expectation maximization - used in learning step (default 1e-5)"),
        em_parameters_change_limit = arg_dbl0(NULL, "parameters-change-limit", NULL, "Stop criteria threshold for expectation maximization parameters -used in learning step (default 1e-3)"),
        logging_on = arg_lit0(NULL, "logging-on", "Set this flag if you would like the learning step to produce status output into a log file (this file will have the same name as the estimate parameters file with .log appended to the end)"), 
        help = arg_lit0(NULL,"help", "Display help and exit"),
        version = arg_lit0(NULL,"version", "Display version information and exit"),
        end = arg_end(20)
    };
 
    const char *program_name = "prob-net";
    const char *program_version = "1.0.0";

    int exitcode = 0;
    int nerrors;

    /* set any command line default values prior to parsing */
    em_max_iterations->ival[0] = 4000;
    em_number_of_training_samples->ival[0] = 400;
    em_parameters_change_limit->dval[0] = 1e-3;
    em_log_likelihood_change_limit->dval[0] = 1e-5;
    number_of_states->ival[0] = 3; 

    /* verify the argtable[] entries were allocated sucessfully */
    if (arg_nullcheck(argtable) != 0) {
        /* NULL entries were detected, some allocations must have failed */
        printf("%s: insufficient memory\n", program_name);
        exitcode = 1;
        goto exit;
    }

    /* Parse the command line as defined by argtable[] */
    nerrors = arg_parse(argc,argv,argtable);

    /* special case: '--help' takes precedence over error reporting */
    if ( (help->count > 0) || (argc == 1) ) {
        printf("Usage: %s", program_name);
        arg_print_syntax(stdout,argtable,"\n");
        printf("Perform inference and learning on probabilistic networks.\n");
        arg_print_glossary(stdout,argtable," %-25s %s\n");
        printf("\nSupply paths of files in prob-net.cfg configuration file.\n\n"
        "Report bugs to <adam.j.wright82@gmail.com>.\n");
        exitcode = 0;
        goto exit;
    }

    /* special case: '--version' takes precedence error reporting */
    if (version->count > 0) {
        printf("'%s' for performing inference and learning on probability networks.\nVersion %s\n", program_name, program_version);
        printf("January 2015, Hossein Radfar and Adam Wright\n");  
        exitcode = 0;
        goto exit;
    }

    /* If the parser returned any errors then display them and exit */
    if (nerrors > 0) {
        /* Display the error details contained in the arg_end struct.*/
        arg_print_errors(stdout, end, program_name);
        printf("Try '%s --help' for more information.\n",program_name);
        exitcode = 1;
        goto exit;
    }

    if(interactive->count > 0) {
        printf("Starting Interactive Mode\n>>");
        interactive_command();
        goto exit;
    }

    if( access( *inifile->filename, F_OK ) == -1 ) {
        arg_print_errors(stdout, end, program_name);
        printf("Either the inifile specified is unreadable or was not specified: %s\n", *inifile->filename);
        exitcode = 2;
        goto exit;
    }

    int logging = logging_on->count > 0 ? 1 : 0;

    /* Command line parsing is complete, do the main processing */
    exitcode = non_interactive_command(em_max_iterations->ival[0], em_number_of_training_samples->ival[0], em_log_likelihood_change_limit->dval[0], em_parameters_change_limit->dval[0], number_of_states->ival[0], *inifile->filename, g->count, l->count, i->count, logging, inference_use_logical_factorgraph->count);
exit:
    /* deallocate each non-null entry in argtable[] */
    arg_freetable(argtable,sizeof(argtable)/sizeof(argtable[0]));  

    return exitcode;
}
