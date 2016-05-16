use strict;
use warnings; 

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab;
use PGMLab::Bio;

use Getopt::Euclid qw( :minimal_keys );


#0 is not mutated 1 is mutated 2 unknowna
# Frame shif del + insertion + nonsense = down
#
my %mutation_type_to_state = (
    "3'Flank"               => 1,
    "3'UTR"                 => 1,
    "5'Flank"               => 1,
    "5'UTR"                 => 1,
    "Frame_Shift_Del"       => 1,
    "Frame_Shift_Ins"       => 1,
    "IGR"                   => 0,
    "In_Frame_Del"          => 1,
    "In_Frame_Ins"          => 1,
    "Intron"                => 0,
    "Missense_Mutation"     => 1,
    "Nonsense_Mutation"     => 1,
    "Nonstop_Mutation"      => 1,
    "RNA"                   => 1,
    "Silent"                => 0,
    "Splice_Site"           => 1,
    "Unknown"               => 2,
    "upstream:downstream"   => 0,
    "UTR5:UTR3"             => 0
);

open (my $maf_fh, $ARGV[0]);

my $obs_file_path = $ARGV[1];

my $header = <$maf_fh>;
chomp $header;
my @column_names = split /\t/, $header;

my $column_index = 0;
my %column_map;
foreach my $column_name (@column_names) {
    $column_map{$column_name} = $column_index++;
}

my %sample_gene_states;
while(my $line = <$maf_fh>) {
    chomp $line;
    my @values = split /\t/, $line;
    #this part makes sure that if a gene is marked as mutated in any of the mutationes it is mutated. And if it is unknown it does not get used. 
    if ((( not exists  $sample_gene_states{$values[$column_map{Tumor_Sample_Barcode}]}{$values[$column_map{Hugo_Symbol}]}) 
            || ($sample_gene_states{$values[$column_map{Tumor_Sample_Barcode}]}{$values[$column_map{Hugo_Symbol}]} != 1))
         &&((exists $mutation_type_to_state{$values[$column_map{Variant_Classification}]})
            &&($mutation_type_to_state{$values[$column_map{Variant_Classification}]} != 2))) {
    $sample_gene_states{$values[$column_map{Tumor_Sample_Barcode}]}{$values[$column_map{Hugo_Symbol}]} = $mutation_type_to_state{$values[$column_map{Variant_Classification}]};
    }
}

close($maf_fh);

PGMLab->create_obs_file($obs_file_path, \@{keys $sample_gene_states}, $sample_gene_states)
