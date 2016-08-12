#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab qw(create_obs_file get_nodes_in_pi_file);
use PGMLab::Bio qw(get_reactome_ids_to_names_maps get_samples_from_sample_file get_snv_sample_gene_state);

use Getopt::Euclid qw( :minimal_keys );

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = get_reactome_ids_to_names_maps($ARGV{'db_id_to_name_mapping'});

my $pi_genes = get_nodes_in_pi_file($ARGV{'pi'});

my $sample_list = get_samples_from_sample_file($ARGV{'sample_list'});

my $sample_gene_states = get_snv_sample_gene_state($ARGV{'snv'}, $pi_genes, $entity_name_to_reactome_id);

create_obs_file($ARGV{'observation_file'}, $sample_gene_states, $sample_list);
