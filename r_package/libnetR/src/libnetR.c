#include <R.h>
#include <Rinternals.h>

#include <net.h>

SEXP r_reaction_logic_to_factorgraph(SEXP reaction_logic_pathway_filepath_, SEXP pathway_filepath_, SEXP number_of_states_) {

    char* reaction_logic_pathway_filepath  = (char *) CHAR(asChar(reaction_logic_pathway_filepath_));
    char* pathway_filepath                 = (char *) CHAR(asChar(pathway_filepath_));

    int number_of_states = (int) asInteger(number_of_states_);

    int exit_code = reaction_logic_to_factorgraph(reaction_logic_pathway_filepath, pathway_filepath, number_of_states);
    if (exit_code != 0) {
        char * strerr = strerror_libnet(exit_code);
        Rprintf("ERROR: %s\n", strerr);
    }

    return ScalarInteger(exit_code);
}

SEXP r_learning_discrete_BayNet(SEXP reaction_logic_pathway_filepath_, SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP estimated_parameters_filepath_, SEXP number_of_states_, SEXP em_max_iterations_, SEXP em_log_likelihood_change_limit_, SEXP em_parameters_change_limit_, SEXP map_flag_, SEXP logging_) {

    char* reaction_logic_pathway_filepath  = (char *) CHAR(asChar(reaction_logic_pathway_filepath_));
    char* pathway_filepath                 = (char *) CHAR(asChar(pathway_filepath_));
    char* observed_data_filepath           = (char *) CHAR(asChar(observed_data_filepath_));
    char* estimated_parameters_filepath    = (char *) CHAR(asChar(estimated_parameters_filepath_));

    int number_of_states = (int) asInteger(number_of_states_);

    int em_max_iterations                 = (int) asInteger(em_max_iterations_);
    double em_log_likelihood_change_limit = (double) asReal(em_log_likelihood_change_limit_);
    double em_parameters_change_limit     = (double) asReal(em_parameters_change_limit_);
    int map_flag                          = (int) asInteger(map_flag_);
    int logging                           = (int) asInteger(logging_);

    int exit_code = learning_discrete_BayNet(reaction_logic_pathway_filepath, pathway_filepath, observed_data_filepath, estimated_parameters_filepath, 
                             number_of_states, em_max_iterations, em_log_likelihood_change_limit, em_parameters_change_limit, map_flag, logging);
    if (exit_code != 0) {
        char * strerr = strerror_libnet(exit_code);
        Rprintf("ERROR: %s\n", strerr);
    }

    return ScalarInteger(exit_code);
}

SEXP r_doLBPinference(SEXP reaction_logic_pathway_filepath_, SEXP pathway_filepath_, SEXP observed_data_filepath_, SEXP posterior_probabilities_filepath_, SEXP number_of_states_) {

    char* reaction_logic_pathway_filepath      = (char *) CHAR(asChar(reaction_logic_pathway_filepath_));
    char* pathway_filepath                     = (char *) CHAR(asChar(pathway_filepath_));
    char* observed_data_filepath               = (char *) CHAR(asChar(observed_data_filepath_));
    char* posterior_probabilities_filepath     = (char *) CHAR(asChar(posterior_probabilities_filepath_));
 
    int number_of_states = asInteger(number_of_states_); 
 
    int exit_code = doLBPinference(reaction_logic_pathway_filepath, pathway_filepath, observed_data_filepath, posterior_probabilities_filepath, number_of_states);
    if (exit_code != 0) {
        char * strerr = strerror_libnet(exit_code);
        Rprintf("ERROR: %s\n", strerr);
    }

    return ScalarInteger(exit_code);	
}
