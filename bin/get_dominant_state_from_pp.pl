#!/usr/bin/perl

use strict;
use warnings;
use feature qw{say};

use autodie;

#USAGE: perl getLargestState.pl <posterior probability file>
#then redirect standard our to desired file

my $file = $ARGV[0];

open (my $in, "<", $file);

say "state\tnode\tprobability";

my ($node, $probability, $current_probability, $current_state); 
my $current_node = "-1";
my $i = 1;

while(<$in>) {
    chomp;
    ($node, $probability) = split " \t ";

    if ($node ne $current_node)  {
       if ($current_node ne "-1") {
          say "$current_state\t$current_node\t$current_probability"; 
       }
       $i = 1;
       $current_state=1;
       $current_node = $node;
       $current_probability = $probability;
    } 
    elsif ($probability > $current_probability) {
        $i++;
        $current_probability = $probability;
        $current_state = $i;
    } 
    else {
        $i++;
    }
}

say "$current_state\t$current_node\t$current_probability";