#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../lib/perl";

use PGMBio;

my $gistic_file_path = $ARGV[0]; #"gistic_v2_3states_dist.txt";
my $pi_file_path = $ARGV[1]; #"Signaling_by_ERBB2.pi";
my $db_id_to_name_mapping = $ARGV[2]; #"db_id_to_name_mapping_feb22.16.txt";

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = PGMBio->get_rectome_ids_to_names_maps($db_id_to_name_mapping);
my $pi_genes = PGMBio->get_genes_in_pi_file($pi_file_path);
my $sample_gene_states = PGMBio->get_gistic_gene_states($gistic_file_path, $entity_name_to_reactome_id, $pi_genes);
PGMBio->create_obs_file->($sample_gene_states);
