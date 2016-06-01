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

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = PGMLab::Bio->get_rectome_ids_to_names_maps($ARGV{'db-id-to-name-mapping'});

my $pi_genes = PGMLab::Bio->get_genes_in_pi_file($ARGV{'pi'});

my $sample_list = PGMLab::Bio->get_samples_from_sample_file($ARGV{'sample-list'});

my ($observed_genes, $sample_gene_states) = PGMLab::Bio->get_snv_sample_gene_state($ARGV{'snv'}, $pi_genes, $entity_name_to_reactome_id);

PGMLab->create_obs_file($ARGV{'obs'}, $sample_gene_states, $sample_list);
