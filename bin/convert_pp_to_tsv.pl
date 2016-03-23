#!/usr/bin/env perl

use strict;
use warnings;

use autodie;

use feature qw(say);
use Data::Dumper;

my $pp_file     = $ARGV[0];
my $gistic_file = $ARGV[1];


unless ( defined $pp_file ) {
   say "USAGE: convert_pp_to_tsv.pl <pp_file_path> [gistic file] > your_output_file.tsv";
   say "       if gistic file is provided it will take out the list of sample names from the header";
   exit 0;
}

my @sample_names;
if (defined $gistic_file) {
#Getting sample list
    open(my $fh_gistic, "<", $gistic_file);

    my $header = <$fh_gistic>;
    my @column_names = split /\t/, $header;
    @sample_names = @column_names[6..$#column_names];

    close($fh_gistic);
}

#Get data from pp file
open(my $fh_pp, "<", $pp_file);

my %sample_to_nodes_dominant_state;

my $sample_number = 1;
my $state = 1;
my $old_node = "-1";
my ($node, $probability, $highest_probability);
my %nodes;

while(my $line = <$fh_pp>) {
    chomp $line;
    if ($line =~ /^--/) {
        $sample_number++;
        next;
    }
    ($node, $probability) = split /\t/, $line;
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
$sample_number--;

close($fh_pp);


##Print output file

print "GeneID\t";

my @sample_numbers = (1..$sample_number);
$" = "\t"; # needed for printing array
if (@sample_names) {
    say scalar(@sample_names);
    print "@sample_names\n";
}
else {
    print "@sample_numbers\n";
}

foreach my $node_name (keys %nodes) {
    print "$node_name\t";

    my @states;
    my $samples = $sample_to_nodes_dominant_state{$node_name};

    foreach my $sample_id ((1..$sample_number)) {
         push @states, $samples->{$sample_id}{state};
    }
    print "@states\t";
    say "";
}
