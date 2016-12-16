#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use Data::Dumper;

use Getopt::Euclid qw( :minimal_keys );

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab::Bio qw(csv_to_dominant_state_table get_key_outputs_from_tsv get_sample_list_from_file);

print "I got the following options:                                                                    
@{[ Dumper \%ARGV ]}                                                                                   
" if $ARGV{'verbose'};

my $key_outputs;
if ($ARGV{'key_outputs_table_file'}) {
   if($ARGV{'reactome_pathway_id'}) {
       $key_outputs = get_key_outputs_from_tsv($ARGV{'key_outputs_table_file'},
                                               $ARGV{'reactome_pathway_id'});
   }
   else {
       die("reactome_pathway_id flag is required if specifying table");
   }
}
elsif ($ARGV{'key_outputs_file'}) {
   $key_outputs = get_sample_list_from_file($ARGV{'key_outputs_file'});
}


csv_to_dominant_state_table($ARGV{'db_id_to_name_mapping'}, 
                            $ARGV{'network'},
                            $ARGV{'data_dir'},
                            $ARGV{'observation_file'},
                            $ARGV{'number_of_states'},
                            $ARGV{'sample_list_file'},
                            $key_outputs,
                            $ARGV{'reactome_pathway_id'},
                            $ARGV{'verbose'});
