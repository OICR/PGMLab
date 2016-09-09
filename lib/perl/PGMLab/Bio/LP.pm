package PGMLab::Bio::LP;

use strict;
use warnings;
use autodie;

use feature qw(say);

use Data::Dumper;

use PGMLab qw(generate_factorgraph_from_pi_file get_nodes_in_pi_file);

use base "Exporter";
use vars qw(@EXPORT_OK);

@EXPORT_OK = qw(create_lp_file);

sub create_lp_file {
    my ($pi_file, $verbose) = @_;

    my $factorgraph = generate_factorgraph_from_pi_file($pi_file, $verbose);



    my $nodes_map = get_nodes_in_pi_file($pi_file);
    my @nodes = keys %$nodes_map;

    my $variable_name = 'A';
    my (%variables_to_nodes_map, %nodes_to_variables_map);
    foreach my $node (@nodes) {
        $variables_to_nodes_map{$variable_name} = $node;
        $nodes_to_variables_map{$node} = $variable_name;

        $variable_name++;
    }


}

1;
