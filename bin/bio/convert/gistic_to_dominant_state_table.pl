#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use Data::Dumper;

use Getopt::Euclid qw( :minimal_keys );

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab::Bio qw(gistic_to_dominant_state_table);

print "I got the following options:                                                                    
@{[ Dumper \%ARGV ]}                                                                                   
" if $ARGV{'verbose'};


gistic_to_dominant_state_table($ARGV{'db_id_to_name_mapping'}, 
                               $ARGV{'network'},
                               $ARGV{'data_dir'},
                               $ARGV{'gistic_file'},
                               $ARGV{'number_of_states'},
                               $ARGV{'sample_list_file'},
                               $ARGV{'key_outputs_file'},
                               $ARGV{'verbose'});
