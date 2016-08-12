#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);
use POSIX;

use FindBin qw($Bin);
use lib "$Bin/../lib/perl";

use PGMLab qw(add_pseudo_nodes_to_interactions get_interactions_in_pi_file create_pi_file);

#USAGE: perl split_nodes.pl <input_file> <output_file>

my $input_filepath = $ARGV[0];

my $output_filepath = $ARGV[1];

my $max_number_of_parents = 10;

my $interactions = get_interactions_in_pi_file($input_filepath);

add_pseudo_nodes_to_interactions($interactions, $max_number_of_parents);

create_pi_file($output_filepath, $interactions);
