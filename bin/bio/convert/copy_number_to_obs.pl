#!/usr/bin/env perl

use strict;
use warnings;

use autodie;
#use POSIX;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab qw(create_obs_file get_nodes_in_pi_file);
use PGMLab::Bio qw(get_donor_ploidy get_reactome_ids_to_names_maps get_sample_list get_copy_number_gene_states);

use Getopt::Euclid qw( :minimal_keys );

use Data::Dumper;


my $donor_ploidy = get_donor_ploidy($ARGV{'ploidy'});

my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = get_reactome_ids_to_names_maps($ARGV{'db_id_to_name_mapping'});

my $pi_genes = get_nodes_in_pi_file($ARGV{'pi'});

my $sample_list = get_sample_list($ARGV{'sample_list'});

my $sample_gene_states = get_copy_number_gene_states($ARGV{'copy_number'}, $sample_list, $entity_name_to_reactome_id, $donor_ploidy, $pi_genes);

create_obs_file($ARGV{'observation_file'}, $sample_gene_states, $sample_list);
