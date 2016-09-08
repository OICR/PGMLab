#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../lib/perl";

use Getopt::Euclid qw( :minimal_keys );

use PGMLab::Bio::LP qw(create_lp_file);

use Data::Dumper;

print "I got the following options:                                                                    
@{[ Dumper \%ARGV ]}                                                                                   
" if $ARGV{'verbose'};

create_lp_file($ARGV{'pairwise_interaction'},
               $ARGV{'verbose'});
