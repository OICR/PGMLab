#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab;
use PGMLab::Bio;

use Getopt::Euclid qw( :minimal_keys );

use Data::Dumper;

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = PGMLab::Bio->get_rectome_ids_to_names_maps($ARGV{'db_id_to_name_mapping'});
my $pi_genes = PGMLab::Bio->get_genes_in_pi_file($ARGV{'pairwise_interaction'});
my ($sample_gene_states, $sample_list) = PGMLab::Bio->get_gistic_gene_states($ARGV{'gistic'}, $entity_name_to_reactome_id, $pi_genes);

PGMLab->create_obs_file($ARGV{'observation_file'}, $sample_gene_states, $sample_list);