#!/usr/bin/perl

use strict;
use warnings;

use autodie;

use JSON;
use Data::Dumper;


use feature qw{say};

my $pi_file = $ARGV[0];

open (my $fh, "<", $pi_file);

my %unique_nodes;
my ( $source, $target, $value, $flag);

<$fh>;<$fh>; # skip first two lines of file
while ( <$fh> ) {
   ($source, $target, $value, $flag) = split "\t";
   if (($source =~ /^AND_/) || ($source =~ /^OR_/)) {
        $unique_nodes{$source} = "logic";
   }
   else {
        $unique_nodes{$source} = "normal";
   }
   if (($target =~ /^AND_/) || ($target =~ /^OR_/)) {
        $unique_nodes{$target} = "logic";
   }
   else {
        $unique_nodes{$target} = "normal";
   }
}

close($fh);

my @nodes = map { { "name" => $_,  "type" => $unique_nodes{$_} }  } keys %unique_nodes;
my $nodes_length = @nodes;

open ($fh, "<", $pi_file);

my (@links, %link);
<$fh>;<$fh>;
while ( <$fh> ) {
   ($source, $target, $value, $flag) = split "\t";
   push @links, {  "value" =>  $value,
                   "source" => get_index_of_node($source),
                   "target" => get_index_of_node($target) 
                 };
}

close($fh);

my $graph = { "nodes" => \@nodes, "links" => \@links };

say JSON->new->utf8->pretty->encode($graph);

sub get_index_of_node {
   my ($node_id) = @_;

   my %node = ();
   for (my $i = 0; $i <= $nodes_length; $i++) {
      %node = %{$nodes[$i]};
      return $i if ( $node{"name"} eq $node_id);
   }
}


