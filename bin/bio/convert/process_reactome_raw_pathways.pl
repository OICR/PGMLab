#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use Data::Dumper;

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use Getopt::Euclid qw( :minimal_keys );

use PGMLab qw(flip_pi_logic find_cycles print_cycles add_pseudo_nodes_to_interactions is_pi_a_tree create_pi_file get_interactions_in_pi_file get_siblings_in_pi_file);
use PGMLab::NetworkComponents qw(network_components);

print "I got the following options:                                                                    
@{[ Dumper \%ARGV ]}                                                                                   
" if $ARGV{'verbose'};


my $reactome_export_dir = $ARGV{reactome_dir};
$reactome_export_dir = $1 if($reactome_export_dir=~/(.*)\/$/); #remove trailing slash if exists

my $reactome_pi_result_dir = $ARGV{processed_dir};
$reactome_pi_result_dir = $1 if($reactome_pi_result_dir=~/(.*)\/$/);

opendir(my $dir_h, $reactome_export_dir);
my @tsv_files = grep(/\.tsv$/,readdir($dir_h));
closedir($dir_h);

$| = 1;

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
    foreach my $key (sort {scalar(@{$member_hash{$b}}) <=> scalar(@{$member_hash{$a}})} keys %member_hash) {
       my $members = $member_hash{$key};
       my %member_interactions = ();
       foreach my $node (@{$members}) {
           my $children = $interactions->{$node};
           foreach my $child (keys %$children) {
               $member_interactions{$node}{$child} = $interactions->{$node}{$child};
           }
       }

       my $filepath = "$reactome_pi_result_dir/$pathway_name";
       $filepath .= "_$member_group_index" if ($member_group_index != 1);
       $filepath .= ".pi";
        
       if($ARGV{verbose}) {
            say "Writing: $filepath";
            my $is_a_tree = is_pi_a_tree(\%member_interactions);
            my $tree_y_n = ($is_a_tree)?"Yes":"No";
            say "Tree: $tree_y_n";
     
            unless ($is_a_tree) {
                 my $cycles = find_cycles(\%member_interactions);
                 if (scalar(@{$cycles})) {
                     print_cycles($cycles);
                 } 
                 else {
                     say "No Cycles for this graph";
                 }
                 say "";
            }
       }

       flip_pi_logic(\%member_interactions, $ARGV{verbose}) unless($ARGV{leave_logic});

       add_pseudo_nodes_to_interactions(\%member_interactions, $ARGV{max_number_of_parents}) unless ($ARGV{no_add_pseudonodes});
       create_pi_file($filepath, \%member_interactions);

       $member_group_index++;
    }
}
say "Done";
