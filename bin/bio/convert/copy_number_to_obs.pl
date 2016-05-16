#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
use POSIX;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab;
use PGMLab::Bio;

use Getopt::Euclid qw( :minimal_keys );

my $donor_ploidy = PGMLAb::Bio->get_donor_ploidy(${'ploidy_file'});

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = PGMLab::Bio->get_rectome_ids_to_names_maps($ARGV{'db-id-to-name-mapping'});

my $pi_genes = PGMLab::Bio->get_genes_in_pi_file($ARGV{'pairwise-interaction'});

my $sample_list = PGMLab::Bio->get_sample_list($ARGV{'sample_list'});

my $sample_gene_states = PGMLab::Bio->get_sample_gene_values($ARGV{'copy-number'}, $sample_list, $entity_name_to_reactome_id, $donor_ploidy, $pi_genes);

PGMLab->create_obs_file->($ARGV{'observation_file'}, $sample_gene_states);
