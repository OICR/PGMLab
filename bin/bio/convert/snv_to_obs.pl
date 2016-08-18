#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab::Bio qw(snv_to_obs_file);

use Getopt::Euclid qw( :minimal_keys );

snv_to_obs_file($ARGV{'db_id_to_name_mapping'},
                $ARGV{'pi'},
                $ARGV{'sample_list'},
                $ARGV{'snv'}, 
                $ARGV{'observation_file'});
