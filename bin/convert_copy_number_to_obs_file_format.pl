#!/usr/bin/env perl

use strict;
use warnings;

use autodie;

use POSIX;
use feature qw(say);
use Data::Dumper;

my $copy_number_files_path = $ARGV[0];
my $sample_list_path = $ARGV[1];
my $pi_file_path = $ARGV[2];
my $db_id_to_name_mapping = $ARGV[3];
my $ploidy_filepath = $ARGV[4];

#get ploidy

open(my $fh_ploidy, "<", $ploidy_filepath);

my $ploidy_header = <$fh_ploidy>;
chomp $ploidy_header;
my @ploidy_column_names = split /\t/, $ploidy_header;

my $ploidy_column_index = 0;
my %ploidy_column_map;
foreach my $column_name (@ploidy_column_names) {
    $ploidy_column_map{$column_name} = $ploidy_column_index;
    $ploidy_column_index++;
}

my %donor_ploidy;
while (my $line = <$fh_ploidy>) {
    chomp $line;
    my @donor = split /\t/, $line;
    if ($donor[$ploidy_column_map{'cnv.status'}] ne 'unusable') {
        $donor_ploidy{$donor[$ploidy_column_map{PWName}]} = int($donor[$ploidy_column_map{tumploidy}] + 0.5);
    }
}

close($fh_ploidy);

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
     my $state;
     foreach my $gene (keys %$gene_values) {
         my $cn = $gene_values->{$gene};
         $state = 0 if ($cn == 0);
         $state = 1 if (($cn == 1) || (($cn == 3) && ($donor_ploidy{$sample_name} == 4)));
         $state = 2 if ($cn == 2);
         $state = 3 if ($cn == 3 && (($donor_ploidy{$sample_name} == 1) || ($donor_ploidy{$sample_name} == 2) ||( $donor_ploidy{$sample_name} == 3 )));
         $state = 4 if ($cn == 4);
         $state = 5 if ($cn == 5);
         $state = 6 if ($cn >5);
         unless (defined $state) {say "ERROR:$sample_name\t".$donor_ploidy{$sample_name}."\t$cn";}
         say $gene."\t$state";
     }
}
