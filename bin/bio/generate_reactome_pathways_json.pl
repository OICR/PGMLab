#!/usr/bin/perl

use strict;
use warnings;

use autodie;

use JSON;
use Data::Dumper;

use feature qw{say};

use LWP::Curl;

use XML::LibXML::Simple;

my $reactome_pathway_url = 'http://reactome.org/ReactomeRESTfulAPI/RESTfulWS/pathwayHierarchy/homo+sapiens';

my $data_dir = "../data/reactome_template";

open( my $fh, "<", "$data_dir/folder_to_reactome_id.txt");

my (%id_to_folder_map);
while (<$fh>) {
    chomp;
    my ($k, $v) = split "\t";
    $id_to_folder_map{$k} = $v; 
}

my $lwpcurl = LWP::Curl->new();
my $pathways_xml = $lwpcurl->get($reactome_pathway_url);

my $xs = XML::LibXML::Simple->new(ForceArray => 1);
my $pathways_orig = $xs->XMLin($pathways_xml);

my $pathways = get_pathway($pathways_orig->{Pathway});

#need to make it so taht there is only one of each. Not sure why there are dupicates
my %unique_pathways;
foreach my $path (@{$pathways}) {
    $unique_pathways{$path->{id}} = $path->{label};
}

my @unique_pathway_list;
foreach my $key (keys %unique_pathways) {
    push @unique_pathway_list, { 'label' => $unique_pathways{$key},
                                 'id'   => $key }; 
}

say JSON->new->utf8->pretty->encode(\@unique_pathway_list);

sub get_pathway {
    my ($pathway) = @_;

    my (@tree, $branch); 
    foreach ( @{$pathway}) {
        $branch = {'id' => $_->{dbId}, 
                   'label' => $_->{displayName}};
        my $sub_tree = get_pathway($_->{Pathway});
        push @tree, @$sub_tree if (@$sub_tree);
        if ( (exists $id_to_folder_map{$_->{dbId}}) && (-e "$data_dir/$id_to_folder_map{$_->{dbId}}")) { 
               #only including pathway if the directory exists (i.e. we have data on it)
            push @tree, $branch; 
       }
    }
    return \@tree;
}



