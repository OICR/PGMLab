#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use Data::Dumper;

use FindBin qw($Bin);
use lib "$Bin/../lib/perl";

use PGMLab qw(is_pi_DAG create_pi_file get_interactions_in_pi_file get_siblings_in_pi_file);
use PGMLab::NetworkComponents qw(network_components);

my $reactome_export_dir = $ARGV[0];
$reactome_export_dir = $1 if($reactome_export_dir=~/(.*)\/$/); #remove trailing slash if exists

my $reactome_pi_result_dir = $ARGV[1];
$reactome_pi_result_dir = $1 if($reactome_pi_result_dir=~/(.*)\/$/);

opendir(my $dir_h, $reactome_export_dir);
my @tsv_files = grep(/\.tsv$/,readdir($dir_h));
closedir($dir_h);

foreach my $tsv_file (@tsv_files) {
    my ($pathway_name, $extension) = split /\./, $tsv_file;
    $tsv_file = "$reactome_export_dir/$tsv_file";
    my $interactions = get_interactions_in_pi_file($tsv_file);
    my $siblings = get_siblings_in_pi_file($tsv_file);
    
    my $member_groups = network_components($siblings);
    
    my %member_hash =();

    my $member_group_id = 0;
    foreach my $members (@{$member_groups}) {
        $member_hash{"group_$member_group_id"} = $member_groups->[$member_group_id];
        $member_group_id++;
    }

    my $member_group_index = 1;
    foreach my $key (sort {$member_hash{$b} <=> $member_hash{$a}} keys %member_hash) {
       my $members = $member_hash{$key};
 
       my %member_interactions = ();
       foreach my $node (@{$members}) {
           $member_interactions{$node} = $interactions->{$node};
       }   

       my $filepath = "$reactome_pi_result_dir/$pathway_name";
       $filepath .= "_$member_group_index" if ($member_group_index != 1);
       $filepath .= ".pi";
      
       say $filepath;
       my $is_a_dag = (is_pi_DAG(\%member_interactions))? "yes":"no";
       say "DAG? $is_a_dag";

       create_pi_file($filepath, \%member_interactions);

       $member_group_index++;    
    }

}
