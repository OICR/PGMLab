#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);
use POSIX;

my $pi_file = $ARGV[0];

open(my $fh, "<", $pi_file);

#skip header
<$fh>;<$fh>;

my %child_to_parents;
while (my $line = <$fh>) {
    chomp $line;
    my ($from, $to, $part_three, $part_four) = split /\t/, $line;
    $child_to_parents{$to}{$from} = [$part_three, $part_four];
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
