#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use Getopt::Euclid qw( :minimal_keys );

use PGMLab::Bio qw(copy_number_to_obs_file);

use Data::Dumper;

copy_number_to_obs_file($ARGV{'ploidy'},
                        $ARGV{'db_id_to_name_mapping'},
                        $ARGV{'pi'},
                        $ARGV{'sample_list'},
                        $ARGV{'copy_number'},
                        $ARGV{'observation_file'});
