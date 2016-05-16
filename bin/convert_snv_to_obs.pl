#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../lib/perl";

use PGMBio;

#perl convert_snv_to_obs.pl <snv_file_path> <pi_file_path> <db_id_to_name_mapping> <sample_list>   > out.obs

my $snv_file_path = $ARGV[0];
my $pi_file_path = $ARGV[1];
my $db_id_to_name_mapping = $ARGV[2];
my $sample_list_file_path = $ARGV[3];
my $obs_file_path = $ARGV[4];

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = PGMBio->get_rectome_ids_to_names_maps($db_id_to_name_mapping);
my $pi_genes = PGMBio->get_genes_in_pi_file($pi_file_path);
my $sample_list = PGMBio->get_samples_from_sample_file($sample_list_file_path);
my ($observed_genes, $sample_gene_states) = PGMBio->get_snv_sample_gene_state($snv_file_path, $pi_genes, $entity_name_to_reactome_id);


PGMBio->create_obs_file($obs_file_path, $sample_list, $sample_gene_states);
