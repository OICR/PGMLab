package PGMLab::Bio::LP;

use strict;
use warnings;
use autodie;

use feature qw(say);

use Data::Dumper;

use PGMLab qw(get_interactions_in_pi_file);

use base "Exporter";
use vars qw(@EXPORT_OK);

@EXPORT_OK = qw(create_lp_file);

sub create_lp_file {
    my ($pi_file, $verbose) = @_;

    my $pairwise_interactions = get_interactions_in_pi_file($pi_file);

    print Dumper $pairwise_interactions;
}

1;
