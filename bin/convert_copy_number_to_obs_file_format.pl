#!/usr/bin/env perl

use strict;
use warnings;

use autodie;

use feature qw(say);
use Data::Dumper;

my $copy_number_files_path = $ARGV[0];
my $sample_list_path = $ARGV[1];
my $pi_file_path = $ARGV[2];
my $db_id_to_name_mapping = $ARGV[3];

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
          unless( exists $entity_name_to_reactome_id{$entity_name}) {
             $entity_name_to_reactome_id{$entity_name} = ();
          }
          push @{$entity_name_to_reactome_id{$entity_name}}, $reactome_id;
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


#getting sample list

open(my $fh_sample_list, "<", $sample_list_path);

my @sample_list;
while(my $line = <$fh_sample_list>) {
   chomp $line;
   push @sample_list, $line;
}

close($fh_sample_list);

#getting data on each sample

my $fh_sample_file;
my %sample_gene_values;

foreach my $sample_filename (@sample_list) {
    my $sample_file_path = $copy_number_files_path."TEAM_cnvs_20160323_".$sample_filename."_cnvannot.txt";
    open($fh_sample_file, "<", $sample_file_path);
    
    my $header = <$fh_sample_file>;
    chomp $header;
    my @column_names = split /\t/, $header;
    
    my $column_index = 0;
    my %column_map;
    foreach my $column_name (@column_names) {
        $column_map{$column_name} = $column_index;
        $column_index++;
    }
    
    my ($copy_number, $coding_full, $partial_genes, $overlaps);
    while (my $line = <$fh_sample_file>) {
        chomp $line;
    
        my @line_data = split /\t/, $line;
    
        $copy_number = $line_data[$column_map{CN}];
    
        my (@genes, $gene_list, $gene_list_str);
        my @genes_indicies = ($column_map{Coding_full}, $column_map{Coding_partial}, $column_map{CDS_overlaps});
        foreach my $genes_index (@genes_indicies) {
            $gene_list_str = $line_data[$genes_index];
            if($gene_list_str) {
                $gene_list_str =~ s/"//g; # remove surounding quotes if they exist
                my @genes = split /,/, $gene_list_str;
                foreach my $gene (@genes) {
                    if (exists $entity_name_to_reactome_id{$gene})  {
                        foreach my $reactome_id (@{$entity_name_to_reactome_id{$gene}}) {
                            if (exists $pi_genes{$reactome_id}) {
                                 $sample_gene_values{$sample_filename}{$reactome_id} = $copy_number;
                            }
                        }
                    }
                }
            }
        }
    }
}

close($fh_sample_file);

say scalar (keys %sample_gene_values);
foreach my $sample_name (@sample_list) {
     my $gene_values = $sample_gene_values{$sample_name};
     my $gene_count = scalar(keys %$gene_values);

     say $gene_count;
     foreach my $gene (keys %$gene_values) {
         my $value = $gene_values->{$gene};
         $value = 1 if ($value == 0);
         $value = 3 if ($value == 4);
         $value = 3 if ($value == 5);
         $value = 4 if ($value > 5);
         say $gene."\t$value";
     }
}
