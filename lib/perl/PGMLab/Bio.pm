package PGMLab::Bio;

use strict;
use warnings;
use feature qw(say);

use autodie;

use Data::Dumper;

use base "Exporter";
use vars qw(@EXPORT_OK);
@EXPORT_OK = qw(get_donor_ploidy get_reactome_ids_to_names_maps get_genes_in_pi_file get_sample_list get_copy_number_gene_states get_gistic_gene_states get_samples_from_sample_file get_snv_sample_gene_state);

sub get_donor_ploidy {
    my ($ploidy_filepath) = @_; 
    
    print $ploidy_filepath;
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
            $donor_ploidy{$donor[$ploidy_column_map{PWName}]} = int($donor[$ploidy_column_map{tumploidy}]+ 0.5);
        }
    }

    close($fh_ploidy);

    return \%donor_ploidy;
}

sub get_sample_list {
    my ($sample_list_path) = @_;

    open(my $fh_sample_list, "<", $sample_list_path);
    
    my @sample_list;
    while(my $line = <$fh_sample_list>) {
       chomp $line;
       push @sample_list, $line;
    }
    
    close($fh_sample_list);

    return \@sample_list; 
}



sub get_reactome_ids_to_names_maps {
    my ($db_id_to_name_mapping) = @_;

    open(my $fh_db_id, "<", $db_id_to_name_mapping);
    
    my %reactome_id_to_entity_name;
    my %entity_name_to_reactome_id;
    my ($reactome_id, $entity_name, $entity_type);
    while (my $reactome_map = <$fh_db_id>) {
         chomp $reactome_map;
         ($reactome_id, $entity_name, $entity_type) = split /\t/, $reactome_map;
         if (( $entity_type eq 'ReferenceGeneProduct') || ($entity_type eq 'ReferenceRNASequence') || ($entity_type eq 'ReferenceDNASequence')) {
              $reactome_id_to_entity_name{$reactome_id} = $entity_name;
              unless( exists $entity_name_to_reactome_id{$entity_name}) {
                 $entity_name_to_reactome_id{$entity_name} = ();
              }
              push @{$entity_name_to_reactome_id{$entity_name}}, $reactome_id;
         }
    }
    
    close($fh_db_id);

    return (\%entity_name_to_reactome_id, \%reactome_id_to_entity_name);
}

sub get_genes_in_pi_file {
    my ($pi_file_path) = @_;

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

    return \%pi_genes;
}  

sub getting_sample_list {
    my ($sample_list_path) = @_;   
 
    open(my $fh_sample_list, "<", $sample_list_path);
    
    my @sample_list;
    while(my $line = <$fh_sample_list>) {
       chomp $line;
       push @sample_list, $line;
    }
    
    close($fh_sample_list);

    return \@sample_list;
}

sub get_copy_number_gene_states {
    my($copy_number_files_path, $sample_list, $entity_name_to_reactome_id, $donor_ploidy, $pi_genes) = @_;

    my $fh_sample_file;
    my %sample_gene_state;

    foreach my $sample_name (@{$sample_list}) {
        my $sample_file_path = $copy_number_files_path."TEAM_cnvs_20160323_".$sample_name."_cnvannot.txt";
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
                        if (exists $entity_name_to_reactome_id->{$gene})  {
                            foreach my $reactome_id (@{$entity_name_to_reactome_id->{$gene}}) {
                                if (exists $pi_genes->{$reactome_id}) {
                                    $sample_gene_state{$sample_name}{$reactome_id} = ($copy_number == 0)? 0 :
                                        (($copy_number == 1) || (($copy_number == 3) && ($donor_ploidy->{$sample_name} == 4)))? 1:
                                        ($copy_number == 2)? 2:
                                        ($copy_number == 3 && (($donor_ploidy->{$sample_name} == 1) || ($donor_ploidy->{$sample_name} == 2) ||( $donor_ploidy->{$sample_name} == 3 )))? 3:
                                        ($copy_number == 4)? 4:
                                        ($copy_number == 5)? 5: 6;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    return \%sample_gene_state;
}

sub get_gistic_gene_states {
    my ($gistic_file_path, $entity_name_to_reactome_id, $pi_genes) = @_;

    #getting information from gistic
    open(my $fh_gistic, "<", $gistic_file_path);
    
    my %gene_names_hash;
    my $header_row = <$fh_gistic>;
    chomp $header_row;
    my @column_names = split /\t/, $header_row;
    my @sample_names = @column_names[6.. $#column_names];
    my @genes_indicies = (3, 4, 5); # list of wanted columns
    
    my %sample_gene_states;
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
                        if ($entity_name_to_reactome_id->{$gene})  {
                            foreach my $reactome_id (@{$entity_name_to_reactome_id->{$gene}}) {
                                if (exists $pi_genes->{$reactome_id}) {
                                    $sample_gene_states{$sample_names[$x]}{$reactome_id} = $cnv_values[$x];
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    close($fh_gistic);
    
    return (\%sample_gene_states, \@sample_names);
}

sub get_samples_from_sample_file {
    my($sample_list_filepath) = @_;

    open(my $fh_samples, "<", $sample_list_filepath);
    
    <$fh_samples>; # skipping header
    
    my @samples;
    while (my $sample = <$fh_samples>) {
        chomp $sample;
        push @samples, $sample;
    }
    
    close($fh_samples);
    
    return \@samples;
}


sub get_snv_sample_gene_state {
    my ($snv_file_path, $pi_genes, $entity_name_to_reactome_id) = @_;

    open(my $fh_snv, "<", $snv_file_path);

    <$fh_snv>; # getting the header
    
    my (%sample_gene_mutation, %genes_observed, $gene, $sample, $gene_ids);
    while (my $mutation = <$fh_snv>) {
        chomp $mutation;
        ($gene, $sample) = split "\t", $mutation;
        $gene_ids = $entity_name_to_reactome_id->{$gene};
        foreach my $gene_id (@$gene_ids) {
            if (exists $pi_genes->{$gene_id}) {
                $sample_gene_mutation{$sample}{$gene_id} = 1;
                $genes_observed{$gene_id} = 1;
            }
        }
    }
    
    close($fh_snv);

    my @observed_genes = keys %genes_observed;

    say "observed genes";

    my %sample_gene_state;
    foreach my $sample_name (keys %sample_gene_mutation) {
say $sample_name;
         foreach my $gene (@observed_genes) {
say $gene;
             $sample_gene_state{$sample}{$gene} = 1; #= (exists $sample_gene_mutation{$sample}{$gene})? "1": "2";
         }
    }
 print Dumper \%sample_gene_state;
    return \%sample_gene_state;
}

1;
