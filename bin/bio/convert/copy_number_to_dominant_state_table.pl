#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use Getopt::Euclid qw( :minimal_keys );

use PGMLab::Bio qw(copy_number_to_dominant_state_table);

use Data::Dumper;

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


copy_number_to_dominant_state_table($ARGV{'ploidy_file'},
                                    $ARGV{'db_id_to_name_mapping'},
                                    $ARGV{'network'},
                                    $ARGV{'data_dir'},
                                    $ARGV{'sample_list_file'},
                                    $ARGV{'number_of_states'},
                                    $ARGV{'copy_number_dir'},
                                    $key_outputs,
                                    $ARGV{'reactom_pathway_id'},
                                    $ARGV{'verbose'});
