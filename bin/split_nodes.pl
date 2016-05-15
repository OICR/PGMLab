#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);
use POSIX;

my $input_file = $ARGV[0];

my $max_number_of_parents = 3;

open(my $fh, "<", $input_file);

#skip header
<$fh>;<$fh>;

my %child_to_parents;
while (my $line = <$fh>) {
    chomp $line;
    my ($from, $to, $part_three, $part_four) = split /\t/, $line;
    $child_to_parents{$to}{$from} = [$part_three, $part_four];
}

close($fh);

my ($num_groups, $num_parents, $nodes_per_group, $node_index, $group_index);
foreach my $child (keys %child_to_parents) {
    my @parents = keys %{$child_to_parents{$child}};
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
              my @node_data = @{$child_to_parents{$child}{$parent}};
              $child_to_parents{"$child\_PSEUDONODE\_$group_index"}{$parent} = \@node_data;
              $node_index++; 
        } 
        for(my $i = 1; $i < $num_groups; $i++) {
            $child_to_parents{$child}{"$child\_PSEUDONODE\_$i"} = [1,$child_to_parents{$child}{$parents[0]}[1]];
        }
    }
}

###output file

my $number_of_interactions = 0;
foreach my $child (keys %child_to_parents) {
    $number_of_interactions += scalar( keys %{$child_to_parents{$child}});
}

say "$number_of_interactions\n";
foreach my $child (keys %child_to_parents) {
    foreach my $parent (keys %{$child_to_parents{$child}}) {
        my @values = @{$child_to_parents{$child}{$parent}};
        say "$parent\t$child\t".$values[0]."\t".$values[1];
    }
}
