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

#get node metadata
my (%nodes_meta_data, @line);
my ($id, @attributes);
while ( <$map_fh> ) {
   chomp;
   my @line = split /\t/;
   my $id = shift @line;
   my %meta_data = zip @attribute_names, @line;

   $nodes_meta_data{$id} = \%meta_data if ($line[1] ne 'Pathway');
}

close ($map_fh);

my $pi_file = $ARGV[0];

open (my $fh, "<", $pi_file);

my (%unique_nodes, %targets, %sources);
my ( $source, $target, $value, $flag);

<$fh>;<$fh>; # skip first two lines of file
while ( <$fh> ) {
   chomp;
   ($source, $target, $value, $flag) = split "\t";
   $unique_nodes{$source} = 1;
   $unique_nodes{$target} = 1;
   $targets{$target} = 1;
   $sources{$source} = 1;
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

my %node_shape_map = ("ReferenceGeneProduct" => "elipse",
                      "ReferenceMolecule"    => "diamond",
                      "Complex"              => "triangleDown",
                      "DefinedSet"           => "triangle",
                      "CandidateSet"         => "triangle",
                      "Reaction"             => "square",
                      "BlackBoxEvent"        => "square",
                      "GenomeEncodedEntity"  => "square",
                      "OtherEntity"          => "square" );


my @nodes = map { { "name" => $_,
                    "label" => $_,
                    "longname" => (exists $nodes_meta_data{$_}{name})? $nodes_meta_data{$_}{name}: undef,
                    "type" => (exists $nodes_meta_data{$_}{reactome_class})? $nodes_meta_data{$_}{reactome_class}: undef,
                    "root" => (!(exists $targets{$_}))? 'true': 'false',
                    "leaf" => (!(exists $sources{$_}))? 'true': 'false',
                    "shape" => (exists $nodes_meta_data{$_}{reactome_class})? (exists $node_shape_map{$nodes_meta_data{$_}{reactome_class}})?  $node_shape_map{$nodes_meta_data{$_}{reactome_class}}: undef : undef,
                    "shaped3" =>(exists $nodes_meta_data{$_}{reactome_class})? (exists $node_type_map{$nodes_meta_data{$_}{reactome_class}})?  $node_type_map{$nodes_meta_data{$_}{reactome_class}}: undef : undef } } keys %unique_nodes;


my $nodes_length = @nodes;

open ($fh, "<", $pi_file);

my (@links, %link);
<$fh>;<$fh>;
while ( <$fh> ) {
   chomp;
   ($source, $target, $value, $flag) = split "\t";
   push @links, {  "value"  => $value,
                   "source" => $source, #    get_index_of_node($source),
                   "target" => $target, #get_index_of_node($target),
                   "logic"  => $flag
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

