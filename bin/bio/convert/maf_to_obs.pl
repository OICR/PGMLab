use strict;
use warnings; 

use autodie;
use feature qw(say);

use FindBin qw($Bin);
use lib "$Bin/../../../lib/perl";

use PGMLab;
use PGMLab::Bio;

use Getopt::Euclid qw( :minimal_keys );

use LWP::Simple;
use Text::CSV;

use Data::Dumper;

my $key = '14b-9CXgNkm5dvi6ezlhVWCd4B5CDDSvS_Uu4mDi5gLI';

my $content = get("https://docs.google.com/spreadsheets/d/$key/pub?gid=0&single=true&output=tsv");

my $csv = Text::CSV->new({ sep_char => "\t" });

my @lines = split /\n/, $content;

my $csv_header = shift @lines;
chomp $csv_header;
my @columns = split /\t/, $csv_header;

my %cosmic_column_map;
my $i = 0;
foreach my $column (@columns) {
   $cosmic_column_map{$column} = $i++;
}

my %genes_to_inheritance_pattern;
foreach my $line (@lines) {
    chomp $line;
    my @data = split /\t/, $line;
    my $cosmic_gene = $data[$cosmic_column_map{'COSMIC Cancer Gene Census List'}];
    my $inheritance_pattern = $data[$cosmic_column_map{'COSMIC Molecular Genetics'}];

    if ($cosmic_gene && $inheritance_pattern) {
        $genes_to_inheritance_pattern{$cosmic_gene} = $inheritance_pattern;
    }
}

# value 1 means it is inactivating, 0 means will have to check cosmic, 2 means drop mutation because unknown
my %mutation_type_to_state = (
    "3'Flank"               => 0,
    "3'UTR"                 => 0,
    "5'Flank"               => 0,
    "5'UTR"                 => 0,
    "Frame_Shift_Del"       => 1,
    "Frame_Shift_Ins"       => 1,
    "IGR"                   => 0,
    "In_Frame_Del"          => 0,
    "In_Frame_Ins"          => 0,
    "Intron"                => 0,
    "Missense_Mutation"     => 0,
    "Nonsense_Mutation"     => 1,
    "Nonstop_Mutation"      => 0,
    "RNA"                   => 0,
    "Silent"                => 0,
    "Splice_Site"           => 0,
    "Unknown"               => 2,
    "upstream:downstream"   => 0,
    "UTR5:UTR3"             => 0
);

open (my $maf_fh, $ARGV{"maf"});

my $obs_file_path = $ARGV{obs};

my $header = <$maf_fh>;
chomp $header;
my @column_names = split /\t/, $header;

my $column_index = 0;
my %column_map;
foreach my $column_name (@column_names) {
    $column_map{$column_name} = $column_index++;
}

my (%sample_gene_states, $variant_classification, $hugo_gene, $tumor_barcode);
while(my $line = <$maf_fh>) {
    chomp $line;
    my @values = split /\t/, $line;
    $variant_classification  = $values[$column_map{Variant_Classification}];
    $hugo_gene = $values[$column_map{Hugo_Symbol}];
    $tumor_barcode = $values[$column_map{Tumor_Sample_Barcode}];

    if ((( not exists  $sample_gene_states{$tumor_barcode}{$hugo_gene}) || ($sample_gene_states{$tumor_barcode}{$hugo_gene} != 1))
         &&((exists $mutation_type_to_state{$variant_classification})&&($mutation_type_to_state{$variant_classification} != 2))) {
        $sample_gene_states{$tumor_barcode}{$hugo_gene} = ($mutation_type_to_state{$variant_classification} || ((defined $genes_to_inheritance_pattern{$hugo_gene} ) && ($genes_to_inheritance_pattern{$hugo_gene} eq "Rec")))? 1: 3;
    }
}

close($maf_fh);

PGMLab->create_obs_file($obs_file_path, \%sample_gene_states)
