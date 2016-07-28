#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab qw(create_obs_file);
use PGMLab::Bio qw(get_gistic_gene_states get_genes_in_pi_file get_reactome_ids_to_names_maps);

use PGMLab::Bio qw(gistic_to_obs_file);

gistic_to_obs_file($ARGV{'db_id_to_name_mapping'}, 
                   $ARGV{'pairwise_interaction'},
                   $ARGV{'gistic'},
                   $ARGV{'observation_file'});
