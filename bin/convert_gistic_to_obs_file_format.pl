#!/usr/bin/env perl

use strict;
use warnings;

use autodie;

use feature qw(say);
use Data::Dumper;

my $gistic_file_path = "gistic_v2_3states_dist.txt";
my $pi_file_path = "Signaling_by_ERBB2.pi";
my $db_id_to_name_mapping = "db_id_to_name_mapping_feb22.16.txt";

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


#getting information from gistic
open(my $fh_gistic, "<", $gistic_file_path);

my %gene_names_hash;
my $header_row = <$fh_gistic>;
chomp $header_row;
my @column_names = split /\t/, $header_row;
my @sample_names = @column_names[6.. $#column_names];
my @genes_indicies = (3, 4, 5); # list of wanted columns

my %sample_gene_values;
my (@line, @genes, @cnv_values, $gene_list_str);
while (my $row = <$fh_gistic>) {
    chomp $row;
    my @line = split /\t/, $row;
    foreach my $genes_index (@genes_indicies) {
        $gene_list_str = $line[$genes_index];
        if($gene_list_str) {
            $gene_list_str =~ s/"//g; # remove surounding quotes if they exist
            my @genes = split /,/, $gene_list_str;
            @cnv_values = @line[6.. $#line];
            for my $x (0.. $#cnv_values) {
                foreach my $gene (@genes) {
                    if ($entity_name_to_reactome_id{$gene})  {
                        foreach my $reactome_id (@{$entity_name_to_reactome_id{$gene}}) {
                            if (exists $pi_genes{$reactome_id}) {
                                $sample_gene_values{$sample_names[$x]}{$reactome_id} = $cnv_values[$x];
                            }
                        }
                    }
                }
            }
        }
    }
}

close($fh_gistic);


say scalar(keys %sample_gene_values);

foreach my $sample_name (@sample_names) {
     my $gene_values = $sample_gene_values{$sample_name};
     my $gene_count = scalar(keys %$gene_values);

     say $gene_count;
     foreach my $gene (keys %$gene_values) {
         say $gene."\t".$gene_values->{$gene};
     }
}
