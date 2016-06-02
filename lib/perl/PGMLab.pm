package PGMLab;

use strict;
use warnings;

use autodie;
use feature qw(say);
use Data::Dumper;

sub create_obs_file {
    my ($class, $obs_filepath, $sample_gene_states, $sample_list) = @_;

    $sample_list //= [keys %{$sample_gene_states}];

    open(my $obs_fh, ">", $obs_filepath);

    say $obs_fh scalar (keys %{$sample_gene_states});
    foreach my $sample_name (@{$sample_list}) {
         my $gene_values = $sample_gene_states->{$sample_name};
         my $gene_count = scalar(keys %$gene_values);
    
         say $obs_fh $gene_count;
         foreach my $gene (keys %$gene_values) {
             say $obs_fh $gene."\t".$gene_values->{$gene};
         }
    }

    close($obs_fh);
}

1;
