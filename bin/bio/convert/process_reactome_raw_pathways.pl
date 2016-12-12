#!/usr/bin/perl

use strict;
use warnings;

use autodie;
use feature qw(say);

use Data::Dumper;

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use Getopt::Euclid qw( :minimal_keys );

use PGMLab qw(flip_pi_logic find_cycles print_cycles add_pseudo_nodes_to_interactions is_pi_a_tree create_pi_file get_interactions_in_pi_file get_siblings_in_pi_file get_number_of_interactions);
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

foreach my $file (@tsv_files) {
    my ($pathway_name, $extension) = split /\./, $file;
    my $tsv_file = "$reactome_export_dir/$file";
    my $tsv_analysis_file = "$reactome_pi_result_dir/$pathway_name.analysis.txt";

    my $interactions = get_interactions_in_pi_file($tsv_file, "tsv");
    my $siblings = get_siblings_in_pi_file($tsv_file, "tsv");

    my $member_groups = network_components($siblings);

    my %member_hash =();

    my $member_group_id = 0;
    foreach my $members (@{$member_groups}) {
        $member_hash{"group_$member_group_id"} = $member_groups->[$member_group_id];
        $member_group_id++;
    }

    open(my $fh_analysis, ">", $tsv_analysis_file) if ($ARGV{create_analysis_file});

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

       if ($ARGV{create_analysis_file}) {
            print $fh_analysis "Group $member_group_index\n\n";

	    my $number_of_interactions = get_number_of_interactions(\%member_interactions);
            print $fh_analysis "Number of interactions: $number_of_interactions\n";

            my $is_a_tree = is_pi_a_tree(\%member_interactions);
            my $tree_y_n = ($is_a_tree)?"Yes":"No";
            print $fh_analysis "Tree: $tree_y_n\n";
     
            if ($is_a_tree) {
	        print $fh_analysis "\n";
	    }
	    else {
                my $cycles = find_cycles(\%member_interactions);
                if (scalar(@{$cycles})) {
                    print_cycles($cycles, $fh_analysis);
                } 
                else {
                    print $fh_analysis "No Cycles for this graph\n";
                }
                print $fh_analysis "\n";
            }
       }

       flip_pi_logic(\%member_interactions, $fh_analysis) if ($ARGV{flip_logic});

       add_pseudo_nodes_to_interactions(\%member_interactions, $ARGV{max_number_of_parents}) if ($ARGV{add_pseudonodes});

       if ($ARGV{create_pi_file}) {
           my $filepath = "$reactome_pi_result_dir/$pathway_name";
           $filepath .= "_$member_group_index" if ($member_group_index != 1);
           $filepath .= ".pi";

           say "Writing: $filepath" if($ARGV{verbose});
           create_pi_file($filepath, \%member_interactions)
       }

       $member_group_index++;
    }

    close($fh_analysis) if ($ARGV{create_analysis_file});
}
say "Done" if ($ARGV{verbose});
