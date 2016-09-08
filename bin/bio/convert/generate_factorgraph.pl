#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use Data::Dumper;

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use Getopt::Euclid qw( :minimal_keys );

use PGMLab qw(generate_factorgraph_from_pi_file print_factorgraph);

print "I got the following options:                                                                    
@{[ Dumper \%ARGV ]}                                                                                   
" if $ARGV{'verbose'};

my $factorgraph = generate_factorgraph_from_pi_file($ARGV{pairwise_interaction_file}, $ARGV{verbose});

print_factorgraph($factorgraph, $ARGV{factorgraph_file}, $ARGV{number_of_states}, $ARGV{verbose});

