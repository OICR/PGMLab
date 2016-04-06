#!/usr/bin/env perl

use strict;
use warnings;

use autodie;

use feature qw(say);

#perl convert_snv_to_obs.pl <snv_file_path> <pi_file_path> <db_id_to_name_mapping> <sample_list>   > out.obs

my $snv_file_path = $ARGV[0];#"/Users/cbaciu/Desktop/PGMLaB-old/data/GISTIC_v2_run/integrated_anal/SNV/202_donors_snv.txt";
my $pi_file_path = $ARGV[1]; #"/Users/cbaciu/Desktop/4paths_28mar16/Cell_Cycle_Checkpoints/Cell_Cycle_Checkpoints.pi";
my $db_id_to_name_mapping = $ARGV[2]; #"/Users/cbaciu/Desktop/PGMLaB-old/db_id_to_name_mapping_feb22.16.txt";
my $sample_list = $ARGV[3]; #"/Users/cbaciu/Desktop/PGMLaB-old/data/GISTIC_v2_run/integrated_anal/SNV/202_common_BART_Gistic.txt";

#Get the rectome ids to names; 
open(my $fh_db_id, "<", $db_id_to_name_mapping);

my %reactome_id_to_entity_name;
my %entity_name_to_reactome_id;
my ($reactome_id, $entity_name, $entity_type);
while (my $reactome_map = <$fh_db_id>) {
     chomp $reactome_map;
     ($reactome_id, $entity_name, $entity_type) = split /\t/, $reactome_map;

     if ( $entity_type eq 'ReferenceGeneProduct') {
          $reactome_id_to_entity_name{$reactome_id} = $entity_name;
          unless (exists $entity_name_to_reactome_id{$entity_name}) {
              $entity_name_to_reactome_id{$entity_name} = [$reactome_id];
          }
          else {
              push @{$entity_name_to_reactome_id{$entity_name}}, $reactome_id;
          }
     }
} 


close($fh_db_id);

####

# get all the genes in the pairwise interaction file
open(my $fh_pi, "<", $pi_file_path);

<$fh_pi>;<$fh_pi>; ##remove fist two rows

my %pi_genes;
my ($from, $to, $column_3, $column_4);
while (my $interaction = <$fh_pi>) {
    chomp $interaction;
    ($from, $to, $column_3, $column_4) = split /\t/, $interaction;
    $pi_genes{$from} = 1;
    $pi_genes{$to} = 1;

} 

my @pathway_genes = keys %pi_genes;

close($fh_pi);
######

#getting information from snv
open(my $fh_snv, "<", $snv_file_path);

<$fh_snv>; # getting the header

my (%sample_to_mutation, %genes_observed, $gene, $sample, $gene_ids);
while (my $mutation = <$fh_snv>) {
    chomp $mutation;
    ($gene, $sample) = split "\t", $mutation;
    $gene_ids = $entity_name_to_reactome_id{$gene};
    foreach my $gene_id (@$gene_ids) {
        if (exists $pi_genes{$gene_id}) {
            $sample_to_mutation{$sample}{$gene_id} = 1;
            $genes_observed{$gene_id} = 1;
        }
    }
}

my @observed_genes = keys %genes_observed;
my $number_of_observed_genes = scalar(@observed_genes);

close($fh_snv);

######

#getting samples form sample file

open(my $fh_samples, "<", $sample_list);

<$fh_samples>; # getting header

my @samples;
while (my $sample = <$fh_samples>) {
    chomp $sample;

    push @samples, $sample;
}

close($fh_samples);

#####

#print the obs file:q

say scalar(@samples);
my @mutated_genes;
foreach my $sample (@samples) {
     my @genes_mutated = (exists $sample_to_mutation{$sample})? keys $sample_to_mutation{$sample} : ();
     @mutated_genes = keys %{$sample_to_mutation{$sample}};
     say $number_of_observed_genes;
     foreach my $gene (@observed_genes) {
         print "$gene\t";
         my $state = (exists $sample_to_mutation{$sample}{$gene})? "1": "2";
         say $state;
     }
}
