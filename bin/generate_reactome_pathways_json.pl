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

my $lwpcurl = LWP::Curl->new();
my $pathways_xml = $lwpcurl->get($reactome_pathway_url);

my $xs   = XML::LibXML::Simple->new(ForceArray => 1);
my $pathways_orig = $xs->XMLin($pathways_xml);


my $pathways = get_pathway($pathways_orig->{Pathway});

say "var pathways = ".JSON->new->utf8->pretty->encode($pathways).';';
say "exports.tree = pathways;";

sub get_pathway {
    my ($pathway) = @_;

    my (@tree, $branch); 
    foreach ( @{$pathway}) {
        $branch = {'id' => $_->{dbId}, 
                   'name' => $_->{displayName}};
        my $sub_tree = get_pathway($_->{Pathway});
        $branch->{children} = $sub_tree if (@$sub_tree);
        push @tree, $branch; 
    }
    return \@tree;
}



