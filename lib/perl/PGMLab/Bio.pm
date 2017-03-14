package PGMLab::Bio;

use strict;
use warnings;
use feature qw(say);

use autodie;

use Data::Dumper;

use PGMLab qw(create_obs_file get_nodes_in_pi_file get_root_nodes_in_pi_file);

use Text::CSV;

use base "Exporter";
use vars qw(@EXPORT_OK);

@EXPORT_OK = qw(gistic_to_obs_file
                csv_to_dominant_state_table
                get_key_outputs_from_tsv
                get_sample_list_from_file
                gistic_to_dominant_state_table
                copy_number_to_dominant_state_table
                copy_number_to_obs_file
                snv_to_obs_file);

sub copy_number_to_dominant_state_table {
    my ($ploidy_file, $db_id_to_name_mapping, $networks, $data_dir, $sample_list_file, $number_of_states, $copy_number_dir, $key_outputs, $reactome_pathway_ids, $verbose) = @_;

    $data_dir = $1 if($data_dir=~/(.*)\/$/); # if remove the trailing slash if it exists
    my ($network_dir, $observation_file, $pairwise_interaction_file, $posterior_probability_file, $command);

    my $network_index = 0;
    foreach my $network (@{$networks}) {
        $network_dir = "$data_dir/$network";
        $observation_file = "$network_dir/inference.obs";
        $pairwise_interaction_file = "$network_dir/$network.pi";
        $posterior_probability_file = "$network_dir/$network.pp"; 

        copy_number_to_obs_file($ploidy_file, $db_id_to_name_mapping, $pairwise_interaction_file, $sample_list_file, $copy_number_dir, $observation_file, $verbose);

        $command = "../../../bin/pgmlab --data-dir $data_dir --network $network --number-of-states $number_of_states --verbose";
        if ($verbose) {
            say "Running command: $command";
        }
        system($command);
        create_dominant_state_file($posterior_probability_file, $sample_list_file, $key_outputs, $reactome_pathway_ids->[$network_index], $number_of_states);
        $network_index++;
    }
}


sub csv_to_dominant_state_table {
    my ($db_id_to_name_mapping_file, $networks, $data_dir, $csv_file, $number_of_states, $sample_list_file, $key_outputs, $reactome_pathway_ids, $verbose) = @_;

    $data_dir = $1 if($data_dir=~/(.*)\/$/); # if remove the trailing slash if it exists
    my ($network_dir, $observation_file, $pairwise_interaction_file, $posterior_probability_file, $command);
   
    my $network_index = 0;
    foreach my $network (@{$networks}) {
        $network_dir = "$data_dir/$network";
        $observation_file = "$network_dir/inference.obs";
        $pairwise_interaction_file = "$network_dir/$network.pi";
        $posterior_probability_file = "$network_dir/$network.pp"; 

        my $exit_code = csv_to_obs_file($db_id_to_name_mapping_file, $pairwise_interaction_file, $csv_file, $observation_file, $verbose);

	return $exit_code if ($exit_code != 0);
        $command = "../../../bin/pgmlab --data-dir $data_dir --network $network --number-of-states $number_of_states --verbose";
        if ($verbose) {
            say "Running command: $command";
        }
        system($command);
        create_dominant_state_file($posterior_probability_file, $key_outputs, $reactome_pathway_ids->[$network_index], $csv_file, $number_of_states, 1);
        $network_index++;
    }


}


sub gistic_to_dominant_state_table {
    my ($db_id_to_name_mapping_file, $networks, $data_dir, $gistic_file, $number_of_states, $sample_list_file, $key_outputs, $reactome_pathway_ids, $verbose) = @_;

    $data_dir = $1 if($data_dir=~/(.*)\/$/); # if remove the trailing slash if it exists
    my ($network_dir, $observation_file, $pairwise_interaction_file, $posterior_probability_file, $command);
   
    my $network_index = 0;
    foreach my $network (@{$networks}) {
        $network_dir = "$data_dir/$network";
        $observation_file = "$network_dir/inference.obs";
        $pairwise_interaction_file = "$network_dir/$network.pi";
        $posterior_probability_file = "$network_dir/$network.pp"; 

        gistic_to_obs_file($db_id_to_name_mapping_file, $pairwise_interaction_file, $gistic_file, $observation_file, $verbose);

        $command = "../../../bin/pgmlab --data-dir $data_dir --network $network --number-of-states $number_of_states --verbose";
        if ($verbose) {
            say "Running command: $command";
        }
        system($command);
        create_dominant_state_file($posterior_probability_file, $key_outputs, $reactome_pathway_ids->[$network_index], $gistic_file, $number_of_states, 6);
        $network_index++;
    }
}

sub create_dominant_state_file {
    my ($pp_file, $key_outputs, $reactome_pathway_id, $csv_file, $number_of_states, $offset) = @_;

    my ($sample_number, $sample_to_nodes_dominant_state, $nodes) = posterior_probability_file_to_dominant_state($pp_file, $key_outputs, $reactome_pathway_id, $number_of_states);
     
    my $sample_names = get_sample_names_from_observation_file($csv_file, $offset);

    my $dominant_state_file = "$pp_file.tsv";
    print_dominant_state_file($sample_number, $sample_to_nodes_dominant_state, $dominant_state_file, $sample_names, $nodes);
}

sub get_sample_names_from_observation_file {
    my ($observation_file, $sample_column) = @_;

    my @sample_names;
    if (defined $observation_file) {
        open(my $fh, "<", $observation_file);
    
        my $header = <$fh>;
        chomp($header);

        my @column_names = split /\t/, $header;
        @sample_names = @column_names[$sample_column..$#column_names];
        close($fh);
    }

    return \@sample_names;   
}

sub print_dominant_state_file {
    my ($sample_number, $sample_to_nodes_dominant_state, $dominant_state_file, $sample_names_ref, $nodes) = @_;

    my @sample_names = @{$sample_names_ref};

    open(my $ds_fh, ">", $dominant_state_file);
    
    print $ds_fh "GeneID\t";

    my @sample_numbers = (1..$sample_number);
    local $" = "\t"; # needed for printing array
    if (@sample_names) {
        print $ds_fh "@sample_names";
    }
    else {
        print $ds_fh "@sample_numbers";
    }

    print $ds_fh "\n"; 
  
    foreach my $node_name (sort @{$nodes}) {
        print $ds_fh "$node_name\t";
    
        my @states;
        my $samples = $sample_to_nodes_dominant_state->{$node_name};
    
        foreach my $sample_id ((1..$sample_number)) {
             push @states, $samples->{$sample_id}{state};
        }
        print $ds_fh "@states\n";
    }
    close($ds_fh);
}

sub get_key_outputs_from_tsv {
    my ($key_outputs_file, $reactome_pathway_id) = @_;

    my $csv = Text::CSV->new( { sep_char => "\t"} )  # should set binary attribute.
                or die "Cannot use CSV: ".Text::CSV->error_diag ();

    open(my $fh, "<:encoding(utf8)", $key_outputs_file);

    my $header = $csv->getline($fh);
    my ($reactome_pathway_column_index, $pgmlab_node_column_index);
    my $header_index = 0;
    foreach my $column_name (@$header) {
        if ( $column_name eq "parent_pathway_id") {
            $reactome_pathway_column_index = $header_index;
        }
        elsif ($column_name eq "mapping_id") {
            $pgmlab_node_column_index = $header_index;
        }

        $header_index++;
    }

    my @key_outputs;
    while ( my $row = $csv->getline( $fh ) ) {
        if ($row->[$reactome_pathway_column_index] eq $reactome_pathway_id) {
             push @key_outputs, $row->[$pgmlab_node_column_index];
        }
    }

    $csv->eof or $csv->error_diag();

    close $fh;

    return \@key_outputs;
}

#legacy
sub get_key_outputs_from_file {
    my ($key_outputs_file) = @_;

    open(my $fh, "<", $key_outputs_file);

    chomp(my @key_outputs = <$fh>);
 
    close($fh);

    return \@key_outputs;
}

sub posterior_probability_file_to_dominant_state {
    my ($pp_file, $key_outputs, $reactome_pathway_id, $number_of_states) = @_;

    open(my $fh_pp, "<", $pp_file);
    my %sample_to_nodes_dominant_state;
    
    my $sample_number = 1;
    my $state = 1;
    my $old_node = "-1";
    my ($node, $probability, $highest_probability);
    my %nodes;
    
    my %key_output_hash = map {$_ => 1} @{$key_outputs};

    while (my $line = <$fh_pp>) {
        chomp $line;
        if ($line =~ /^--/) {
            $sample_number++;
            next;
        }

        ($node, $probability) = split /\t/, $line;

        if ((not $key_outputs) || ($key_output_hash{$node})) {
            unless ($sample_to_nodes_dominant_state{$node}{$sample_number}) {
                $state = 1;
                $nodes{$node} = 1;
                $sample_to_nodes_dominant_state{$node}{$sample_number} = {"probability" => $probability,
                                                                         "state"     => 1 };
            }
            else {
                $state++;
                if ($probability > $sample_to_nodes_dominant_state{$node}{$sample_number}{"probability"}) {
    
    
                        $sample_to_nodes_dominant_state{$node}{$sample_number} = { "probability" => $probability,
                                                                                "state"       => $state };
    
                }
            }
        }
    }
    $sample_number--;
    
    close($fh_pp);

    my @unique_nodes = keys %nodes;

    if ($number_of_states == 3) {
        foreach my $node_name (keys %sample_to_nodes_dominant_state) {
            foreach my $sample_number (keys %{$sample_to_nodes_dominant_state{$node_name}}) {
                if ($sample_to_nodes_dominant_state{$node_name}{$sample_number}{"probability"} < 0.5) {
                     #say "changing state for $node_name, $sample_number";
                     $sample_to_nodes_dominant_state{$node_name}{$sample_number}{"state"} = 2;
                }
            }
        }
    }

    return ($sample_number, \%sample_to_nodes_dominant_state, \@unique_nodes);
}

sub csv_to_obs_file {
    my ($db_id_to_name_mapping_file, $pairwise_interaction_file, $csv_file, $observation_file, $verbose) = @_;

    my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = get_reactome_ids_to_names_maps($db_id_to_name_mapping_file);
    #my $pi_genes = get_nodes_in_pi_file($pairwise_interaction_file);
    my $pi_genes = get_root_nodes_in_pi_file($pairwise_interaction_file);

    my ($sample_gene_states, $sample_list) = get_csv_gene_states($csv_file, $entity_name_to_reactome_id, $pi_genes);
    if (%{$sample_gene_states}) {
        create_obs_file($observation_file, $sample_gene_states, $sample_list, $verbose);
	return 0
    }
    elsif($verbose) {
        say "No results for $observation_file. Therefor not creating file";
    }
    return 1;
}



sub gistic_to_obs_file {
    my ($db_id_to_name_mapping_file, $pairwise_interaction_file, $gistic_file, $observation_file, $verbose) = @_;

    my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = get_reactome_ids_to_names_maps($db_id_to_name_mapping_file);
    #my $pi_genes = get_nodes_in_pi_file($pairwise_interaction_file);
    my $pi_genes = get_root_nodes_in_pi_file($pairwise_interaction_file);
    my ($sample_gene_states, $sample_list) = get_gistic_gene_states($gistic_file, $entity_name_to_reactome_id, $pi_genes);

    if (%{$sample_gene_states}) {
        create_obs_file($observation_file, $sample_gene_states, $sample_list, $verbose);
    }
    elsif($verbose) {
        say "No results for $observation_file. Therefor not creating file";
    }
}

sub copy_number_to_obs_file {
   my ($ploidy_file, $db_id_to_name_mapping_file, $pi_file, $sample_list_file, $copy_number_file, $observation_file, $verbose) = @_;

   my $donor_ploidy = get_donor_ploidy($ploidy_file);
   my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = get_reactome_ids_to_names_maps($db_id_to_name_mapping_file);

   my $pi_genes = get_root_nodes_in_pi_file($pi_file);

   my $sample_list = get_sample_list($sample_list_file);

   my $sample_gene_states = get_copy_number_gene_states($copy_number_file, $sample_list, $entity_name_to_reactome_id, $donor_ploidy, $pi_genes);

    if (%{$sample_gene_states}) {
        create_obs_file($observation_file, $sample_gene_states, $sample_list, $verbose);
    }
    elsif($verbose) {
        say "No results for $observation_file. Therefor not creating file";
    }
}

sub snv_to_obs_file {
    my ($db_id_to_name_mapping_file, $pi_file, $sample_list_file, $snv_file, $observation_file) = @_;

    my ($entity_name_to_reactome_id, $reactome_id_to_entity_name) = get_reactome_ids_to_names_maps($db_id_to_name_mapping_file);

    my $pi_genes = get_root_nodes_in_pi_file($pi_file);

    my $sample_list = get_samples_from_sample_file($sample_list_file);

    my $sample_gene_states = get_snv_sample_gene_state($snv_file, $pi_genes, $entity_name_to_reactome_id);

    create_obs_file($observation_file, $sample_gene_states, $sample_list);
}

sub get_donor_ploidy {
    my ($ploidy_filepath) = @_; 
    
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
         if (( $entity_type =~ /^Reference/) || ($entity_type =~ /^DefinedSet$/)) {
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

sub get_csv_gene_states {
    my ($csv_file_path, $entity_name_to_reactome_id, $pi_genes) = @_;

    #getting information from csv
    open(my $fh_csv, "<", $csv_file_path);
    
    my %gene_names_hash;
    my $header_row = <$fh_csv>;
    chomp $header_row;
    my @column_names = split /\t/, $header_row;
    my @sample_names = @column_names[1.. $#column_names];

    my %sample_gene_states;
    my (@line, @genes, @cnv_values, $gene_list_str);
    while (my $row = <$fh_csv>) {
        chomp $row;
        my @line = split /\t/, $row;
	my $gene = $line[0];
        @cnv_values = @line[1.. $#line];
        for my $x (0.. $#cnv_values) {
            if ($entity_name_to_reactome_id->{$gene})  {
                foreach my $reactome_id (@{$entity_name_to_reactome_id->{$gene}}) {
                    if (exists $pi_genes->{$reactome_id}) {
                        $sample_gene_states{$sample_names[$x]}{$reactome_id} = $cnv_values[$x];
                    }
                }
            }
        }
    }
    
    close($fh_csv);
    
    return (\%sample_gene_states, \@sample_names);
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
    
    my (%sample_gene_mutation, %genes_observed, $gene, $sample, $gene_ids, %sample_map);
    while (my $mutation = <$fh_snv>) {
        chomp $mutation;
        ($gene, $sample) = split "\t", $mutation;
        $sample_map{$sample} = 1;
        $gene_ids = $entity_name_to_reactome_id->{$gene};
        foreach my $gene_id (@$gene_ids) {
            if (exists $pi_genes->{$gene_id}) {
                $sample_gene_mutation{$sample}{$gene_id} = 1;
                $genes_observed{$gene_id} = 1;
            }
        }
    }

    close($fh_snv);

    my %sample_gene_state;
    foreach my $sample_name (keys %sample_map) {
         foreach my $gene (keys %genes_observed) {
             $sample_gene_state{$sample_name}{$gene} = (defined $sample_gene_mutation{$sample_name}{$gene})? "1": "2";
         }
    }

    return \%sample_gene_state;
}

1;
