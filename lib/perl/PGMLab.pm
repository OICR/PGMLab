package PGMLab;

use strict;
use warnings;

use autodie;
use feature qw(say);

use POSIX;

use Data::Dumper;

use base "Exporter";
use vars qw(@EXPORT_OK);
@EXPORT_OK = qw(add_pseudo_nodes_to_interactions is_pi_DAG create_pi_file create_obs_file get_nodes_in_pi_file get_interactions_in_pi_file get_siblings_in_pi_file);

sub add_pseudo_nodes_to_interactions {
    my ($interactions, $max_number_of_parents) = @_;
    
    my ($num_groups, $num_parents, $nodes_per_group, $node_index, $group_index);
    foreach my $child (keys %{$interactions}) {
        my @parents = keys %{$interactions->{$child}};
        $num_parents = scalar @parents;
        if ($num_parents >= 10) {
            $num_groups =  ceil($num_parents/$max_number_of_parents);
            $nodes_per_group = ceil($num_parents/$num_groups);
    
            $group_index = 1;
            $node_index = 1;
            foreach my $parent (@parents) {
                  if ($node_index > $nodes_per_group) {
                       $node_index = 1;
                       $group_index++;
                  }
                  my @node_data = @{$interactions->{$child}{$parent}};
                  $interactions->{"$child\_PSEUDONODE\_$group_index"}{$parent} = \@node_data;
                  $node_index++; 
            } 
            for(my $i = 1; $i < $num_groups; $i++) {
                $interactions->{$child}{"$child\_PSEUDONODE\_$i"} = [1,$interactions->{$child}{$parents[0]}[1]];
            }
        }
    }
}

sub is_pi_DAG {
    my($pi_interactions) = @_;

    my %network;
    foreach my $node (keys %{$pi_interactions}) {
        if (defined $pi_interactions->{$node}) {
             my @keys = keys %{$pi_interactions->{$node}};
             my $children = \@keys;
             if ($children) { #can't be in cycle if does not have children
                 $network{$node} = {"children" => $children,
                                    "visited"  => 0};
             }
        }
    }

    foreach my $node (keys %network) {
        next if ($network{$node}{visited});
        $network{$node}{visited} = $node;

        my $start_node = $node;
        my $resp = visit_children(\%network, $start_node, $node); 
        return $resp if ($resp);
    }

    return 0;
}

sub visit_children {
    my ($network, $start_node, $node) = @_;

    foreach my $child (@{$network->{$node}{children}}) {
         return 1 if (($network->{$child}{visited}) && ($network->{$child}{visited} eq $start_node)); 
         $network->{$node}{visited} = $start_node if (not $network->{$child}{visited});
         my $resp = visit_children($network, $start_node, $child); 
         return $resp if($resp);
    }

    return 0;   
}

sub create_pi_file {
    my ($pi_filepath, $interactions) = @_;

    my $number_of_interactions = get_number_of_interactions($interactions);

    open(my $fh, ">", $pi_filepath);

    print $fh "$number_of_interactions\n\n";
    foreach my $child (keys %{$interactions}) {
        foreach my $parent (keys %{$interactions->{$child}}) {
            my @values = @{$interactions->{$child}{$parent}};
            print $fh "$parent\t$child\t".$values[0]."\t".$values[1]."\n";
        }
    }
    
    close($fh);
}

sub get_number_of_interactions {
    my ($interactions) = @_;

    my $number_of_interactions = 0;
    foreach my $child (keys %{$interactions}) {
        $number_of_interactions += scalar( keys %{$interactions->{$child}});
    }

    return $number_of_interactions;
}


sub create_obs_file {
    my ($obs_filepath, $sample_gene_states, $sample_list) = @_;

    $sample_list //= [keys %{$sample_gene_states}];

    open(my $obs_fh, ">", $obs_filepath);

    say $obs_fh scalar (keys %{$sample_gene_states});
    foreach my $sample_name (@{$sample_list}) {
         my $gene_values = $sample_gene_states->{$sample_name};
         my $gene_count = scalar(keys %$gene_values);
    
         say $obs_fh $gene_count;
         foreach my $gene (keys %$gene_values) {
             say $obs_fh $gene."\t".$gene_values->{$gene};
         }
    }

    close($obs_fh);
}


sub get_interactions_in_pi_file {
    my ($pi_file_path) = @_;

    open(my $fh_pi, "<", $pi_file_path);

    <$fh_pi>;<$fh_pi>; ##remove fist two rows

    my %pi_interactions;
    my ($from, $to, $column_3, $column_4);
    while (my $interaction = <$fh_pi>) {
        chomp $interaction;
        ($from, $to, $column_3, $column_4) = split /\t/, $interaction;
        $pi_interactions{$from}{$to} = [$column_3, $column_4];
    }

    close($fh_pi);

    return \%pi_interactions;
}

sub get_nodes_in_pi_file {
    my ($pi_file_path) = @_;

    open(my $fh_pi, "<", $pi_file_path);

    <$fh_pi>;<$fh_pi>; ##remove fist two rows

    my %pi_nodes;
    my ($from, $to, $column_3, $column_4);
    while (my $interaction = <$fh_pi>) {
        chomp $interaction;
        ($from, $to, $column_3, $column_4) = split /\t/, $interaction;
        $pi_nodes{$from} = 1;
        $pi_nodes{$to} = 1;

    }

    close($fh_pi);

    return \%pi_nodes;
}

sub get_siblings_in_pi_file {
    my ($pi_filepath) = @_;

    open(my $fh, "<", $pi_filepath);

    #skip header
    <$fh>;<$fh>;

    my %siblings;
    while (my $line = <$fh>) {
        chomp $line;
        my ($from, $to, $part_three, $part_four) = split /\t/, $line;
        $siblings{$to}{siblings}{$from} = 1;
        $siblings{$from}{siblings}{$to} = 1;
    }

    close $fh;

    return \%siblings;
}

1;
