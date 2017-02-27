package PGMLab::NetworkComponents;

#This module is inspired by Daniel Larremore's MatLab moduel netowrkComponents

use strict;
use warnings;
no warnings 'recursion';

use autodie;

use base "Exporter";
use vars qw(@EXPORT_OK);
@EXPORT_OK = qw(network_components);

sub network_components {
    my ($siblings) = @_; 

    foreach my $node (keys %{$siblings}) {
        $siblings->{$node}{visited} = 0;
    }
    
    my @member_groups;
    foreach my $node (keys %{$siblings}) {
        next if ($siblings->{$node}{visited} == 1); 
    
        my @members = ();
    
        visit_siblings($siblings, \@members, $node);
    
        push @member_groups, \@members;
    }

    return \@member_groups;
}

sub visit_siblings {
    my ($siblings, $members, $node) = @_;

    return if ($siblings->{$node}{visited} == 1);
    $siblings->{$node}{visited} = 1;
    
    push @{$members}, $node;

    foreach my $sibling (keys %{$siblings->{$node}{siblings}}) {
        visit_siblings($siblings, $members, $sibling);
    }

}

1;
