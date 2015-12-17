#!/usr/bin/perl

use strict;
use warnings;

use autodie;

use JSON;
use Data::Dumper;

use List::MoreUtils qw(zip);
use feature qw{say};

## USAGE perl conver_pi_to_json.pl <pi_file> <map_file> > out.js

my $map_file = $ARGV[1];

open (my $map_fh, "<", $map_file);

my $header = <$map_fh>;
chomp $header;
my ($id_col, @attribute_names) = split /\t/, $header;

if ($id_col ne 'id') {
    say 'ERROR: First column needs to be "id"';
    die;
}

my (%nodes_meta_data, @line);
my ($id, @attributes);
while ( <$map_fh> ) {
   chomp;
   my @line = split /\t/;
   my $id = shift @line;
   my %meta_data = zip @attribute_names, @line;
#   if ($line[1] ne 'Pathway') {
     $nodes_meta_data{$id} = \%meta_data;
 #  }
}

close ($map_fh);


my $pi_file = $ARGV[0];

open (my $fh, "<", $pi_file);

my %unique_nodes;
my ( $source, $target, $value, $flag);

<$fh>;<$fh>; # skip first two lines of file
while ( <$fh> ) {
   chomp;
   ($source, $target, $value, $flag) = split "\t";
   if (($source =~ /_AND$/) || ($source =~ /_OR$/)) {
        $unique_nodes{$source} = "diamond";
   }
   else {
        $unique_nodes{$source} = "circle";
   }
   if (($target =~ /_AND$/) || ($target =~ /_OR$/)) {
        $unique_nodes{$target} = "diamond";
   }
   else {
        $unique_nodes{$target} = "circle";
   }
}

close($fh);

my %node_type_map = ( "ReferenceGeneProduct" => "circle",
                      "ReferenceMolecule"    => "diamond",
                      "Complex"              => "triangle-down",
                      "DefinedSet"           => "triangle-up",
                      "CandidateSet"         => "triangle-up",
                      "Reaction"             => "cross",
                      "BlackBoxEvent"        => "cross",
                      "GenomeEncodedEntity"  => "square",
                      "OtherEntity"          => "square" );

my @nodes = map { { "name" => $_,
                    "longname" => $nodes_meta_data{$_}{name},
                    "type" => $nodes_meta_data{$_}{reactome_class},
                    "shape" => $node_type_map{$nodes_meta_data{$_}{reactome_class}}} } keys %unique_nodes;

my $nodes_length = @nodes;

open ($fh, "<", $pi_file);

my (@links, %link);
<$fh>;<$fh>;
while ( <$fh> ) {
   chomp;
   ($source, $target, $value, $flag) = split "\t";
   push @links, {  "value"  => $value,
                   "source" => get_index_of_node($source),
                   "target" => get_index_of_node($target),
                   "logic"  => $flag
                 };
}

close($fh);

my $graph = { "nodes" => \@nodes, "links" => \@links };

say "var graph = ".JSON->new->utf8->pretty->encode($graph).';';

sub get_index_of_node {
   my ($node_id) = @_;

   my %node = ();
   for (my $i = 0; $i <= $nodes_length; $i++) {
      %node = %{$nodes[$i]};
      return $i if ( $node{"name"} eq $node_id);
   }
}

