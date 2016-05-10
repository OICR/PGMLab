#!/usr/bin/perl

use strict;
use warnings;

use autodie;

use JSON;
use Data::Dumper;

use feature qw{say};

my $pp_file = $ARGV[0];

open (my $fh, "<", $pp_file);

my @observation_probabilities = ();
my @nodes;
my $old_node_name = '';
my %node;
my $count =1;
while ( my $line = <$fh> ) {
    chomp $line;
    if (($line =~ /^--/)) {
       my %new_node = %node;
       push(@nodes, \%new_node);
       my @new_nodes = @nodes;
       push(@observation_probabilities, \@new_nodes);
       $old_node_name = '';
       %node = ();
       @nodes = [];
    }
    else {
        my ($node_name, $probability) = split /\t/, $line;
        if ($node_name ne $old_node_name) {
            if (keys %node) {
                my %new_node = %node;
                push(@nodes, \%new_node); 
                %node= ();
            }
            %node = ( "name"  => $node_name,
                      "label" => $node_name, 
                      "probs" => [$probability]);
        }
        else {
            push $node{probs}, $probability;  
        }
        $old_node_name = $node_name;
    }
}

close($fh);

say "var pp = ".JSON->new->utf8->pretty->encode(\@observation_probabilities).';';

