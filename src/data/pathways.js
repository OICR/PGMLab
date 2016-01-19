var pathways = [
   {
      "id" : "1640170",
      "children" : [
         {
            "id" : "69620",
            "name" : "Cell Cycle Checkpoints",
            "children" : [
               {
                  "id" : "69615",
                  "name" : "G1/S DNA Damage Checkpoints",
                  "children" : [
                     {
                        "id" : "69580",
                        "children" : [
                           {
                              "id" : "69563",
                              "name" : "p53-Dependent G1 DNA Damage Response",
                              "children" : [
                                 {
                                    "id" : "69541",
                                    "children" : [
                                       {
                                          "id" : "349425",
                                          "name" : "Autodegradation of the E3 ubiquitin ligase COP1"
                                       }
                                    ],
                                    "name" : "Stabilization of p53"
                                 },
                                 {
                                    "id" : "69560",
                                    "children" : [
                                       {
                                          "id" : "69895",
                                          "name" : "Transcriptional  activation of  cell cycle inhibitor p21 "
                                       }
                                    ],
                                    "name" : "Transcriptional activation of p53 responsive genes  "
                                 }
                              ]
                           }
                        ],
                        "name" : "p53-Dependent G1/S DNA damage checkpoint"
                     },
                     {
                        "id" : "69613",
                        "name" : "p53-Independent G1/S DNA damage checkpoint",
                        "children" : [
                           {
                              "id" : "69610",
                              "name" : "p53-Independent DNA Damage Response",
                              "children" : [
                                 {
                                    "id" : "69601",
                                    "name" : "Ubiquitin Mediated Degradation of Phosphorylated Cdc25A"
                                 }
                              ]
                           }
                        ]
                     }
                  ]
               },
               {
                  "id" : "69481",
                  "name" : "G2/M Checkpoints",
                  "children" : [
                     {
                        "name" : "G2/M DNA damage checkpoint",
                        "children" : [
                           {
                              "name" : "Chk1/Chk2(Cds1) mediated inactivation of Cyclin B:Cdk1 complex",
                              "id" : "75035"
                           }
                        ],
                        "id" : "69473"
                     },
                     {
                        "name" : "G2/M DNA replication checkpoint",
                        "id" : "69478"
                     },
                     {
                        "name" : "Activation of ATR in response to replication stress",
                        "id" : "176187"
                     }
                  ]
               },
               {
                  "id" : "69618",
                  "name" : "Mitotic Spindle Checkpoint",
                  "children" : [
                     {
                        "id" : "141424",
                        "children" : [
                           {
                              "name" : "Amplification  of signal from unattached  kinetochores via a MAD2  inhibitory signal",
                              "id" : "141444"
                           }
                        ],
                        "name" : "Amplification of signal from the kinetochores"
                     },
                     {
                        "children" : [
                           {
                              "id" : "141430",
                              "name" : "Inactivation of APC/C via direct inhibition of the APC/C complex"
                           }
                        ],
                        "name" : "Inhibition of the proteolytic activity of APC/C required for the onset of anaphase by mitotic spindle checkpoint components",
                        "id" : "141405"
                     }
                  ]
               }
            ]
         },
         {
            "id" : "69278",
            "name" : "Cell Cycle, Mitotic",
            "children" : [
               {
                  "id" : "453279",
                  "name" : "Mitotic G1-G1/S phases",
                  "children" : [
                     {
                        "name" : "G0 and Early G1",
                        "id" : "1538133"
                     },
                     {
                        "id" : "69236",
                        "name" : "G1 Phase",
                        "children" : [
                           {
                              "id" : "69231",
                              "name" : "Cyclin D associated events in G1"
                           }
                        ]
                     },
                     {
                        "id" : "69206",
                        "children" : [
                           {
                              "name" : "Cyclin E associated events during G1/S transition ",
                              "children" : [
                                 {
                                    "id" : "187577",
                                    "name" : "SCF(Skp2)-mediated degradation of p27/p21"
                                 },
                                 {
                                    "id" : "69200",
                                    "name" : "Phosphorylation of proteins involved in G1/S transition by active Cyclin E:Cdk2 complexes"
                                 }
                              ],
                              "id" : "69202"
                           },
                           {
                              "name" : "G1/S-Specific Transcription",
                              "id" : "69205"
                           },
                           {
                              "name" : "Activation of the pre-replicative complex",
                              "id" : "68962"
                           },
                           {
                              "id" : "113510",
                              "children" : [
                                 {
                                    "id" : "113501",
                                    "name" : "Inhibition of replication initiation of damaged DNA by RB1/E2F1"
                                 },
                                 {
                                    "name" : "E2F-enabled inhibition of pre-replication complex formation",
                                    "id" : "113507"
                                 }
                              ],
                              "name" : "E2F mediated regulation of DNA replication"
                           }
                        ],
                        "name" : "G1/S Transition"
                     }
                  ]
               },
               {
                  "id" : "69242",
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "187577",
                              "name" : "SCF(Skp2)-mediated degradation of p27/p21"
                           }
                        ],
                        "name" : "Cyclin A:Cdk2-associated events at S phase entry",
                        "id" : "69656"
                     },
                     {
                        "id" : "69239",
                        "children" : [
                           {
                              "id" : "68952",
                              "name" : "DNA replication initiation"
                           },
                           {
                              "id" : "69052",
                              "name" : "Switching of origins to a post-replicative state",
                              "children" : [
                                 {
                                    "name" : "Orc1 removal from chromatin",
                                    "id" : "68949"
                                 },
                                 {
                                    "id" : "69017",
                                    "name" : "CDK-mediated phosphorylation and removal of Cdc6"
                                 }
                              ]
                           },
                           {
                              "name" : "DNA strand elongation",
                              "children" : [
                                 {
                                    "id" : "176974",
                                    "name" : "Unwinding of DNA"
                                 },
                                 {
                                    "id" : "69109",
                                    "children" : [
                                       {
                                          "id" : "69091",
                                          "name" : "Polymerase switching"
                                       }
                                    ],
                                    "name" : "Leading Strand Synthesis"
                                 },
                                 {
                                    "id" : "69186",
                                    "name" : "Lagging Strand Synthesis",
                                    "children" : [
                                       {
                                          "name" : "Polymerase switching",
                                          "id" : "69091"
                                       },
                                       {
                                          "id" : "69183",
                                          "name" : "Processive synthesis on the lagging strand",
                                          "children" : [
                                             {
                                                "id" : "69166",
                                                "name" : "Removal of the Flap Intermediate"
                                             }
                                          ]
                                       }
                                    ]
                                 }
                              ],
                              "id" : "69190"
                           }
                        ],
                        "name" : "Synthesis of DNA"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Ubiquitin-dependent degradation of Cyclin D1",
                              "id" : "69229"
                           }
                        ],
                        "name" : "Ubiquitin-dependent degradation of Cyclin D",
                        "id" : "75815"
                     },
                     {
                        "name" : "Establishment of Sister Chromatid Cohesion",
                        "id" : "2468052"
                     }
                  ],
                  "name" : "S Phase"
               },
               {
                  "id" : "69304",
                  "name" : "Regulation of DNA replication",
                  "children" : [
                     {
                        "name" : "Association of licensing factors with the pre-replicative complex",
                        "id" : "69298"
                     },
                     {
                        "id" : "69300",
                        "name" : "Removal of licensing factors from origins",
                        "children" : [
                           {
                              "name" : "Orc1 removal from chromatin",
                              "id" : "68949"
                           },
                           {
                              "id" : "69017",
                              "name" : "CDK-mediated phosphorylation and removal of Cdc6"
                           }
                        ]
                     }
                  ]
               },
               {
                  "id" : "453274",
                  "name" : "Mitotic G2-G2/M phases",
                  "children" : [
                     {
                        "name" : "G2 Phase",
                        "id" : "68911"
                     },
                     {
                        "name" : "G2/M Transition",
                        "children" : [
                           {
                              "name" : "Cyclin A/B1 associated events during G2/M transition",
                              "children" : [
                                 {
                                    "id" : "170145",
                                    "name" : "Phosphorylation of proteins involved in the G2/M transition by Cyclin A:Cdc2 complexes"
                                 }
                              ],
                              "id" : "69273"
                           },
                           {
                              "name" : "Cyclin B2 mediated events",
                              "id" : "157881"
                           },
                           {
                              "id" : "2565942",
                              "name" : "Regulation of PLK1 Activity at G2/M Transition"
                           },
                           {
                              "id" : "156711",
                              "name" : "Polo-like kinase mediated events"
                           },
                           {
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "id" : "380320",
                                          "name" : "Recruitment of NuMA to mitotic centrosomes"
                                       }
                                    ],
                                    "name" : "Recruitment of mitotic centrosome proteins and complexes",
                                    "id" : "380270"
                                 },
                                 {
                                    "id" : "380284",
                                    "children" : [
                                       {
                                          "id" : "380259",
                                          "name" : "Loss of Nlp from mitotic centrosomes"
                                       }
                                    ],
                                    "name" : "Loss of proteins required for interphase microtubule organization from the centrosome"
                                 }
                              ],
                              "name" : "Centrosome maturation",
                              "id" : "380287"
                           }
                        ],
                        "id" : "69275"
                     }
                  ]
               },
               {
                  "id" : "68886",
                  "children" : [
                     {
                        "id" : "68875",
                        "children" : [
                           {
                              "name" : "Golgi Cisternae Pericentriolar Stack Reorganization",
                              "id" : "162658"
                           },
                           {
                              "id" : "2299718",
                              "name" : "Condensation of Prophase Chromosomes"
                           },
                           {
                              "id" : "2465910",
                              "name" : "MASTL Facilitates Mitotic Progression"
                           },
                           {
                              "id" : "2980766",
                              "children" : [
                                 {
                                    "id" : "2980767",
                                    "name" : "Activation of NIMA Kinases NEK9, NEK6, NEK7"
                                 },
                                 {
                                    "id" : "3301854",
                                    "name" : "Nuclear Pore Complex (NPC) Disassembly"
                                 },
                                 {
                                    "id" : "2993913",
                                    "name" : "Clearance of Nuclear Envelope Membranes from Chromatin"
                                 },
                                 {
                                    "name" : "Depolymerisation of the Nuclear Lamina",
                                    "id" : "4419969"
                                 }
                              ],
                              "name" : "Nuclear Envelope Breakdown"
                           }
                        ],
                        "name" : "Mitotic Prophase"
                     },
                     {
                        "id" : "68877",
                        "name" : "Mitotic Prometaphase",
                        "children" : [
                           {
                              "id" : "2500257",
                              "name" : "Resolution of Sister Chromatid Cohesion"
                           },
                           {
                              "name" : "Condensation of Prometaphase Chromosomes",
                              "id" : "2514853"
                           }
                        ]
                     },
                     {
                        "id" : "2555396",
                        "name" : "Mitotic Metaphase and Anaphase",
                        "children" : [
                           {
                              "name" : "Mitotic Metaphase/Anaphase Transition",
                              "id" : "68881"
                           },
                           {
                              "id" : "68882",
                              "name" : "Mitotic Anaphase",
                              "children" : [
                                 {
                                    "id" : "2467813",
                                    "name" : "Separation of Sister Chromatids"
                                 },
                                 {
                                    "children" : [
                                       {
                                          "id" : "2995383",
                                          "name" : "Initiation of Nuclear Envelope Reformation"
                                       }
                                    ],
                                    "name" : "Nuclear Envelope Reassembly",
                                    "id" : "2995410"
                                 }
                              ]
                           }
                        ]
                     },
                     {
                        "name" : "Mitotic Telophase/Cytokinesis",
                        "children" : [
                           {
                              "id" : "2470946",
                              "name" : "Cohesin Loading onto Chromatin"
                           }
                        ],
                        "id" : "68884"
                     }
                  ],
                  "name" : "M Phase"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "Assembly of the ORC complex at the origin of replication",
                                    "id" : "68616"
                                 },
                                 {
                                    "name" : "CDC6 association with the ORC:origin complex",
                                    "id" : "68689"
                                 },
                                 {
                                    "id" : "68827",
                                    "name" : "CDT1 association with the CDC6:ORC:origin complex"
                                 }
                              ],
                              "name" : "Assembly of the pre-replicative complex",
                              "id" : "68867"
                           },
                           {
                              "name" : "Activation of the pre-replicative complex",
                              "id" : "68962"
                           }
                        ],
                        "name" : "DNA Replication Pre-Initiation",
                        "id" : "69002"
                     }
                  ],
                  "name" : "M/G1 Transition",
                  "id" : "68874"
               },
               {
                  "name" : "Regulation of mitotic cell cycle",
                  "children" : [
                     {
                        "name" : "APC/C-mediated degradation of cell cycle proteins",
                        "children" : [
                           {
                              "id" : "176408",
                              "name" : "Regulation of APC/C activators between G1/S and early anaphase",
                              "children" : [
                                 {
                                    "name" : "Phosphorylation of Emi1",
                                    "id" : "176417"
                                 },
                                 {
                                    "name" : "SCF-beta-TrCP mediated degradation of Emi1",
                                    "id" : "174113"
                                 },
                                 {
                                    "children" : [
                                       {
                                          "id" : "141430",
                                          "name" : "Inactivation of APC/C via direct inhibition of the APC/C complex"
                                       }
                                    ],
                                    "name" : "Inhibition of the proteolytic activity of APC/C required for the onset of anaphase by mitotic spindle checkpoint components",
                                    "id" : "141405"
                                 }
                              ]
                           },
                           {
                              "name" : "Activation of APC/C and APC/C:Cdc20 mediated degradation of mitotic proteins",
                              "children" : [
                                 {
                                    "name" : "Phosphorylation of the APC/C",
                                    "id" : "176412"
                                 },
                                 {
                                    "name" : "APC/C:Cdc20 mediated degradation of mitotic proteins",
                                    "children" : [
                                       {
                                          "id" : "179419",
                                          "name" : "APC:Cdc20 mediated degradation of cell cycle proteins prior to satisfation of the cell cycle checkpoint",
                                          "children" : [
                                             {
                                                "id" : "174184",
                                                "name" : "Cdc20:Phospho-APC/C mediated degradation of Cyclin A"
                                             },
                                             {
                                                "id" : "179409",
                                                "name" : "APC-Cdc20 mediated degradation of Nek2A"
                                             }
                                          ]
                                       },
                                       {
                                          "name" : "APC/C:Cdc20 mediated degradation of Cyclin B",
                                          "id" : "174048"
                                       },
                                       {
                                          "name" : "APC/C:Cdc20 mediated degradation of Securin",
                                          "id" : "174154"
                                       }
                                    ],
                                    "id" : "176409"
                                 }
                              ],
                              "id" : "176814"
                           },
                           {
                              "id" : "176407",
                              "name" : "Conversion from APC/C:Cdc20 to APC/C:Cdh1 in late anaphase"
                           },
                           {
                              "id" : "174178",
                              "name" : "APC/C:Cdh1 mediated degradation of Cdc20 and other APC/C:Cdh1 targeted proteins in late mitosis/early G1"
                           },
                           {
                              "id" : "174084",
                              "name" : "Autodegradation of Cdh1 by Cdh1:APC/C"
                           }
                        ],
                        "id" : "174143"
                     }
                  ],
                  "id" : "453276"
               }
            ]
         },
         {
            "id" : "73886",
            "children" : [
               {
                  "name" : "Nucleosome assembly",
                  "children" : [
                     {
                        "id" : "606279",
                        "name" : "Deposition of new CENPA-containing nucleosomes at the centromere"
                     }
                  ],
                  "id" : "774815"
               },
               {
                  "id" : "157579",
                  "name" : "Telomere Maintenance",
                  "children" : [
                     {
                        "id" : "180786",
                        "children" : [
                           {
                              "id" : "171319",
                              "name" : "Telomere Extension By Telomerase"
                           },
                           {
                              "id" : "174417",
                              "children" : [
                                 {
                                    "name" : "Telomere C-strand synthesis initiation",
                                    "id" : "174430"
                                 },
                                 {
                                    "name" : "Polymerase switching on the C-strand of the telomere",
                                    "id" : "174411"
                                 },
                                 {
                                    "id" : "174414",
                                    "name" : "Processive synthesis on the C-strand of the telomere",
                                    "children" : [
                                       {
                                          "id" : "174437",
                                          "name" : "Removal of the Flap Intermediate from the C-strand"
                                       }
                                    ]
                                 }
                              ],
                              "name" : "Telomere C-strand (Lagging Strand) Synthesis"
                           }
                        ],
                        "name" : "Extension of Telomeres"
                     },
                     {
                        "name" : "Packaging Of Telomere Ends",
                        "id" : "171306"
                     }
                  ]
               }
            ],
            "name" : "Chromosome Maintenance"
         },
         {
            "id" : "1500620",
            "children" : [
               {
                  "id" : "912446",
                  "name" : "Meiotic recombination"
               },
               {
                  "name" : "Meiotic synapsis",
                  "id" : "1221632"
               }
            ],
            "name" : "Meiosis"
         }
      ],
      "name" : "Cell Cycle"
   },
   {
      "children" : [
         {
            "children" : [
               {
                  "id" : "421270",
                  "name" : "Cell-cell junction organization",
                  "children" : [
                     {
                        "id" : "418990",
                        "name" : "Adherens junctions interactions",
                        "children" : [
                           {
                              "id" : "420597",
                              "name" : "Nectin/Necl  trans heterodimerization"
                           }
                        ]
                     },
                     {
                        "name" : "Tight junction interactions",
                        "id" : "420029"
                     }
                  ]
               },
               {
                  "id" : "446353",
                  "children" : [
                     {
                        "id" : "446343",
                        "name" : "Localization of the PINCH-ILK-PARVIN complex to focal adhesions"
                     },
                     {
                        "id" : "446388",
                        "name" : "Regulation of cytoskeletal remodeling and cell spreading by IPP complex components"
                     }
                  ],
                  "name" : "Cell-extracellular matrix interactions"
               },
               {
                  "id" : "446107",
                  "name" : "Type I hemidesmosome assembly"
               }
            ],
            "name" : "Cell junction organization",
            "id" : "446728"
         },
         {
            "name" : "Signal regulatory protein (SIRP) family interactions",
            "id" : "391160"
         },
         {
            "name" : "DSCAM interactions",
            "id" : "376172"
         },
         {
            "name" : "Nephrin interactions",
            "id" : "373753"
         }
      ],
      "name" : "Cell-Cell communication",
      "id" : "1500931"
   },
   {
      "children" : [
         {
            "children" : [
               {
                  "id" : "1234174",
                  "name" : "Regulation of Hypoxia-inducible Factor (HIF) by oxygen",
                  "children" : [
                     {
                        "name" : "Oxygen-dependent asparagine hydroxylation of Hypoxia-inducible Factor Alpha",
                        "id" : "1234162"
                     },
                     {
                        "id" : "1234176",
                        "name" : "Oxygen-dependent proline hydroxylation of Hypoxia-inducible Factor Alpha"
                     },
                     {
                        "name" : "Regulation of gene expression by Hypoxia-inducible Factor",
                        "id" : "1234158"
                     }
                  ]
               }
            ],
            "name" : "Cellular response to hypoxia",
            "id" : "2262749"
         },
         {
            "id" : "3299685",
            "name" : "Detoxification of Reactive Oxygen Species"
         },
         {
            "id" : "3371556",
            "children" : [
               {
                  "name" : "HSF1 activation",
                  "id" : "3371511"
               },
               {
                  "id" : "3371571",
                  "name" : "HSF1-dependent transactivation",
                  "children" : [
                     {
                        "name" : "Attenuation phase",
                        "id" : "3371568"
                     }
                  ]
               },
               {
                  "name" : "Regulation of HSF1-mediated heat shock response",
                  "id" : "3371453"
               }
            ],
            "name" : "Cellular response to heat stress"
         },
         {
            "name" : "Cellular Senescence",
            "children" : [
               {
                  "id" : "2559585",
                  "name" : "Oncogene Induced Senescence"
               },
               {
                  "id" : "2559580",
                  "name" : "Oxidative Stress Induced Senescence"
               },
               {
                  "id" : "2559586",
                  "name" : "DNA Damage/Telomere Stress Induced Senescence",
                  "children" : [
                     {
                        "id" : "2559584",
                        "name" : "Formation of Senescence-Associated Heterochromatin Foci (SAHF)"
                     }
                  ]
               },
               {
                  "id" : "2559582",
                  "name" : "Senescence-Associated Secretory Phenotype (SASP)"
               }
            ],
            "id" : "2559583"
         },
         {
            "id" : "1632852",
            "name" : "Macroautophagy"
         }
      ],
      "name" : "Cellular responses to stress",
      "id" : "2262752"
   },
   {
      "id" : "4839726",
      "name" : "Chromatin organization",
      "children" : [
         {
            "id" : "3247509",
            "name" : "Chromatin modifying enzymes",
            "children" : [
               {
                  "name" : "HATs acetylate histones",
                  "id" : "3214847"
               },
               {
                  "id" : "3214815",
                  "name" : "HDACs deacetylate histones"
               },
               {
                  "id" : "3214842",
                  "name" : "HDMs demethylate histones"
               },
               {
                  "name" : "PKMTs methylate histone lysines",
                  "id" : "3214841"
               },
               {
                  "id" : "3214858",
                  "name" : "RMTs methylate histone arginines"
               }
            ]
         }
      ]
   },
   {
      "id" : "400253",
      "children" : [
         {
            "id" : "1368108",
            "name" : "BMAL1:CLOCK,NPAS2 activates circadian gene expression"
         },
         {
            "name" : "RORA activates gene expression",
            "id" : "1368082"
         },
         {
            "id" : "1368071",
            "name" : "NR1D1 (REV-ERBA) represses gene expression"
         }
      ],
      "name" : "Circadian Clock"
   },
   {
      "id" : "1266738",
      "children" : [
         {
            "id" : "422475",
            "children" : [
               {
                  "name" : "Semaphorin interactions",
                  "children" : [
                     {
                        "id" : "400685",
                        "name" : "Sema4D in semaphorin signaling",
                        "children" : [
                           {
                              "name" : "Sema4D mediated inhibition of cell attachment and migration",
                              "id" : "416550"
                           },
                           {
                              "id" : "416572",
                              "name" : "Sema4D induced cell migration and growth-cone collapse"
                           }
                        ]
                     },
                     {
                        "id" : "399955",
                        "name" : "SEMA3A-Plexin repulsion signaling by inhibiting Integrin adhesion"
                     },
                     {
                        "name" : "Sema3A PAK dependent Axon repulsion",
                        "id" : "399954"
                     },
                     {
                        "id" : "399956",
                        "name" : "CRMPs in Sema3A signaling"
                     },
                     {
                        "id" : "416700",
                        "name" : "Other semaphorin interactions"
                     }
                  ],
                  "id" : "373755"
               },
               {
                  "id" : "375165",
                  "children" : [
                     {
                        "id" : "5673001",
                        "name" : "RAF/MAP kinase cascade",
                        "children" : [
                           {
                              "name" : "RAF activation",
                              "id" : "5673000"
                           },
                           {
                              "id" : "5674135",
                              "name" : "MAP2K and MAPK activation"
                           },
                           {
                              "name" : "Negative regulation of MAPK pathway",
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ],
                              "id" : "5675221"
                           },
                           {
                              "name" : "Regulation of RAS by GAPs",
                              "id" : "5658442"
                           }
                        ]
                     },
                     {
                        "id" : "419037",
                        "name" : "NCAM1 interactions"
                     }
                  ],
                  "name" : "NCAM signaling for neurite out-growth"
               },
               {
                  "name" : "Netrin-1 signaling",
                  "children" : [
                     {
                        "id" : "418885",
                        "name" : "DCC mediated attractive signaling"
                     },
                     {
                        "name" : "Netrin mediated repulsion signals",
                        "id" : "418886"
                     },
                     {
                        "id" : "418890",
                        "name" : "Role of second messengers in netrin-1 signaling"
                     }
                  ],
                  "id" : "373752"
               },
               {
                  "name" : "Signaling by Robo receptor",
                  "children" : [
                     {
                        "name" : "Regulation of Commissural axon pathfinding by Slit and Robo",
                        "id" : "428542"
                     },
                     {
                        "id" : "428543",
                        "name" : "Inactivation of Cdc42 and Rac"
                     },
                     {
                        "id" : "428540",
                        "name" : "Activation of Rac"
                     },
                     {
                        "name" : "Role of Abl in Robo-Slit signaling",
                        "id" : "428890"
                     }
                  ],
                  "id" : "376176"
               },
               {
                  "id" : "373760",
                  "children" : [
                     {
                        "id" : "437239",
                        "name" : "Recycling pathway of L1"
                     },
                     {
                        "name" : "Interaction between L1 and Ankyrins",
                        "id" : "445095"
                     },
                     {
                        "name" : "Signal transduction by L1",
                        "id" : "445144"
                     },
                     {
                        "id" : "447041",
                        "name" : "CHL1 interactions"
                     },
                     {
                        "id" : "447043",
                        "name" : "Neurofascin interactions"
                     },
                     {
                        "name" : "NrCAM interactions",
                        "id" : "447038"
                     }
                  ],
                  "name" : "L1CAM interactions"
               },
               {
                  "id" : "2682334",
                  "name" : "EPH-Ephrin signaling",
                  "children" : [
                     {
                        "name" : "EPHA-mediated growth cone collapse",
                        "id" : "3928663"
                     },
                     {
                        "id" : "3928662",
                        "name" : "EPHB-mediated forward signaling"
                     },
                     {
                        "id" : "3928664",
                        "name" : "Ephrin signaling"
                     },
                     {
                        "id" : "3928665",
                        "name" : "EPH-ephrin mediated repulsion of cells"
                     }
                  ]
               }
            ],
            "name" : "Axon guidance"
         },
         {
            "id" : "525793",
            "name" : "Myogenesis",
            "children" : [
               {
                  "name" : "CDO in myogenesis",
                  "id" : "375170"
               }
            ]
         },
         {
            "children" : [
               {
                  "id" : "210747",
                  "name" : "Regulation of gene expression in early pancreatic precursor cells"
               },
               {
                  "name" : "Regulation of gene expression in late stage (branching morphogenesis) pancreatic bud precursor cells",
                  "id" : "210744"
               },
               {
                  "id" : "210746",
                  "name" : "Regulation of gene expression in endocrine-committed (NEUROG3+) progenitor cells"
               },
               {
                  "id" : "210745",
                  "name" : "Regulation of gene expression in beta cells",
                  "children" : [
                     {
                        "name" : "AKT-mediated inactivation of FOXO1A",
                        "id" : "211163"
                     }
                  ]
               }
            ],
            "name" : "Regulation of beta-cell development",
            "id" : "186712"
         },
         {
            "id" : "1181150",
            "name" : "Signaling by NODAL",
            "children" : [
               {
                  "id" : "1433617",
                  "name" : "Regulation of signaling by NODAL"
               }
            ]
         },
         {
            "name" : "Transcriptional regulation of white adipocyte differentiation",
            "id" : "381340"
         },
         {
            "name" : "Transcriptional regulation of pluripotent stem cells",
            "children" : [
               {
                  "name" : "POU5F1 (OCT4), SOX2, NANOG activate genes related to proliferation",
                  "id" : "2892247"
               },
               {
                  "id" : "2892245",
                  "name" : "POU5F1 (OCT4), SOX2, NANOG repress genes related to differentiation"
               }
            ],
            "id" : "452723"
         },
         {
            "id" : "5619507",
            "children" : [
               {
                  "name" : "Activation of anterior HOX genes in hindbrain development during early embryogenesis",
                  "id" : "5617472"
               }
            ],
            "name" : "Activation of HOX genes during differentiation"
         },
         {
            "id" : "5682910",
            "name" : "LGI-ADAM interactions"
         }
      ],
      "name" : "Developmental Biology"
   },
   {
      "children" : [
         {
            "name" : "Diseases of signal transduction",
            "children" : [
               {
                  "id" : "1643713",
                  "children" : [
                     {
                        "id" : "5637815",
                        "name" : "Signaling by Ligand-Responsive EGFR Variants in Cancer",
                        "children" : [
                           {
                              "name" : "Constitutive Signaling by Ligand-Responsive EGFR Cancer Variants",
                              "id" : "1236382"
                           }
                        ]
                     },
                     {
                        "name" : "Signaling by EGFRvIII in Cancer",
                        "children" : [
                           {
                              "name" : "Constitutive Signaling by EGFRvIII",
                              "id" : "5637810"
                           }
                        ],
                        "id" : "5637812"
                     },
                     {
                        "name" : "Signaling by Overexpressed Wild-Type EGFR in Cancer",
                        "children" : [
                           {
                              "name" : "Inhibition of Signaling by Overexpressed EGFR",
                              "id" : "5638303"
                           }
                        ],
                        "id" : "5638302"
                     }
                  ],
                  "name" : "Signaling by EGFR in Cancer"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "1839124",
                              "name" : "FGFR1 mutant receptor activation",
                              "children" : [
                                 {
                                    "name" : "Signaling by FGFR1 amplification mutants",
                                    "id" : "1839120"
                                 },
                                 {
                                    "id" : "1839117",
                                    "name" : "Signaling by FGFR1 fusion mutants"
                                 },
                                 {
                                    "id" : "1839122",
                                    "name" : "Signaling by activated point mutants of FGFR1"
                                 }
                              ]
                           }
                        ],
                        "name" : "Signaling by FGFR1 in disease",
                        "id" : "5655302"
                     },
                     {
                        "name" : "Signaling by FGFR2 in disease",
                        "children" : [
                           {
                              "id" : "1839126",
                              "name" : "FGFR2 mutant receptor activation",
                              "children" : [
                                 {
                                    "id" : "2033519",
                                    "name" : "Activated point mutants of FGFR2"
                                 },
                                 {
                                    "name" : "Signaling by FGFR2 amplification mutants",
                                    "id" : "2023837"
                                 }
                              ]
                           }
                        ],
                        "id" : "5655253"
                     },
                     {
                        "id" : "5655332",
                        "children" : [
                           {
                              "id" : "2033514",
                              "name" : "FGFR3 mutant receptor activation",
                              "children" : [
                                 {
                                    "id" : "1839130",
                                    "name" : "Signaling by activated point mutants of FGFR3"
                                 },
                                 {
                                    "id" : "2033515",
                                    "name" : "t(4;14) translocations of FGFR3"
                                 }
                              ]
                           }
                        ],
                        "name" : "Signaling by FGFR3 in disease"
                     },
                     {
                        "children" : [
                           {
                              "id" : "1839128",
                              "name" : "FGFR4 mutant receptor activation"
                           }
                        ],
                        "name" : "Signaling by FGFR4 in disease",
                        "id" : "5655291"
                     }
                  ],
                  "name" : "Signaling by FGFR in disease",
                  "id" : "1226099"
               },
               {
                  "children" : [
                     {
                        "name" : "Constitutive Signaling by Aberrant PI3K in Cancer",
                        "id" : "2219530"
                     },
                     {
                        "id" : "5674400",
                        "name" : "Constitutive Signaling by AKT1 E17K in Cancer"
                     },
                     {
                        "name" : "PTEN Loss of Function in Cancer",
                        "id" : "5674404"
                     }
                  ],
                  "name" : "PI3K/AKT Signaling in Cancer",
                  "id" : "2219528"
               },
               {
                  "children" : [
                     {
                        "id" : "2660825",
                        "children" : [
                           {
                              "name" : "Constitutive Signaling by NOTCH1 t(7;9)(NOTCH1:M1580_K2555) Translocation Mutant",
                              "id" : "2660826"
                           }
                        ],
                        "name" : "Signaling by NOTCH1 t(7;9)(NOTCH1:M1580_K2555) Translocation Mutant"
                     },
                     {
                        "children" : [
                           {
                              "id" : "2691232",
                              "name" : "Constitutive Signaling by NOTCH1 HD Domain Mutants"
                           }
                        ],
                        "name" : "Signaling by NOTCH1 HD Domain Mutants in Cancer",
                        "id" : "2691230"
                     },
                     {
                        "name" : "Signaling by NOTCH1 PEST Domain Mutants in Cancer",
                        "children" : [
                           {
                              "id" : "2644606",
                              "name" : "Constitutive Signaling by NOTCH1 PEST Domain Mutants"
                           }
                        ],
                        "id" : "2644602"
                     },
                     {
                        "id" : "2894858",
                        "children" : [
                           {
                              "id" : "2894862",
                              "name" : "Constitutive Signaling by NOTCH1 HD+PEST Domain Mutants"
                           }
                        ],
                        "name" : "Signaling by NOTCH1 HD+PEST Domain Mutants in Cancer"
                     },
                     {
                        "id" : "2644605",
                        "children" : [
                           {
                              "id" : "2644607",
                              "name" : "Loss of Function of FBXW7 in Cancer and NOTCH1 Signaling"
                           }
                        ],
                        "name" : "FBXW7 Mutants and NOTCH1 in Cancer"
                     }
                  ],
                  "name" : "Signaling by NOTCH1 in Cancer",
                  "id" : "2644603"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "3311021",
                              "name" : "SMAD4 MH2 Domain Mutants in Cancer"
                           }
                        ],
                        "name" : "Loss of Function of SMAD4 in Cancer",
                        "id" : "3304347"
                     },
                     {
                        "name" : "Loss of Function of SMAD2/3 in Cancer",
                        "children" : [
                           {
                              "name" : "SMAD2/3 Phosphorylation Motif Mutants in Cancer",
                              "id" : "3304356"
                           },
                           {
                              "name" : "SMAD2/3 MH2 Domain Mutants in Cancer",
                              "id" : "3315487"
                           }
                        ],
                        "id" : "3304349"
                     },
                     {
                        "id" : "3642278",
                        "name" : "Loss of Function of TGFBR2 in Cancer",
                        "children" : [
                           {
                              "name" : "TGFBR2 MSI Frameshift Mutants in Cancer",
                              "id" : "3642279"
                           },
                           {
                              "name" : "TGFBR2 Kinase Domain Mutants in Cancer",
                              "id" : "3645790"
                           }
                        ]
                     },
                     {
                        "id" : "3656534",
                        "name" : "Loss of Function of TGFBR1 in Cancer",
                        "children" : [
                           {
                              "name" : "TGFBR1 LBD Mutants in Cancer",
                              "id" : "3656535"
                           },
                           {
                              "name" : "TGFBR1 KD Mutants in Cancer",
                              "id" : "3656532"
                           }
                        ]
                     }
                  ],
                  "name" : "Signaling by TGF-beta Receptor Complex in Cancer",
                  "id" : "3304351"
               },
               {
                  "name" : "Signaling by WNT in cancer",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "APC truncation mutants are not K63 polyubiquitinated",
                              "id" : "5467333"
                           },
                           {
                              "name" : "APC truncation mutants have impaired AXIN binding",
                              "id" : "5467337"
                           }
                        ],
                        "name" : "truncated APC mutants destabilize the destruction complex",
                        "id" : "4839744"
                     },
                     {
                        "children" : [
                           {
                              "id" : "5467345",
                              "name" : "Deletions in the AXIN genes in hepatocellular carcinoma result in elevated WNT signaling"
                           },
                           {
                              "name" : "AXIN missense mutants destabilize the destruction complex",
                              "id" : "5467340"
                           }
                        ],
                        "name" : "AXIN mutants destabilize the destruction complex, activating WNT signaling",
                        "id" : "4839735"
                     },
                     {
                        "name" : "AMER1 mutants destabilize the destruction complex",
                        "children" : [
                           {
                              "name" : "Deletions in the AMER1 gene destabilize the destruction complex",
                              "id" : "5467343"
                           },
                           {
                              "name" : "Truncations of AMER1 destabilize the destruction complex",
                              "id" : "5467348"
                           }
                        ],
                        "id" : "4839748"
                     },
                     {
                        "name" : "phosphorylation site mutants of CTNNB1 are not targeted to the proteasome by the destruction complex",
                        "children" : [
                           {
                              "id" : "5358751",
                              "name" : "S45 mutants of beta-catenin aren't phosphorylated"
                           },
                           {
                              "name" : "T41 mutants of beta-catenin aren't phosphorylated",
                              "id" : "5358752"
                           },
                           {
                              "name" : "S37 mutants of beta-catenin aren't phosphorylated",
                              "id" : "5358749"
                           },
                           {
                              "id" : "5358747",
                              "name" : "S33 mutants of beta-catenin aren't phosphorylated"
                           }
                        ],
                        "id" : "4839743"
                     },
                     {
                        "name" : "Misspliced GSK3beta mutants stabilize beta-catenin",
                        "id" : "5339716"
                     },
                     {
                        "id" : "5339700",
                        "name" : "TCF7L2 mutants don't bind CTBP"
                     },
                     {
                        "name" : "Misspliced LRP5 mutants have enhanced beta-catenin-dependent signaling",
                        "id" : "5339717"
                     },
                     {
                        "id" : "5340588",
                        "name" : "RNF mutants show enhanced WNT signaling and proliferation"
                     },
                     {
                        "name" : "XAV939 inhibits tankyrase, stabilizing AXIN",
                        "id" : "5545619"
                     },
                     {
                        "id" : "5340573",
                        "name" : "WNT ligand secretion is abrogated by the PORCN inhibitor LGK974"
                     }
                  ],
                  "id" : "4791275"
               },
               {
                  "id" : "5387390",
                  "name" : "Hh mutants abrogate ligand secretion",
                  "children" : [
                     {
                        "id" : "5362768",
                        "name" : "Hh mutants that don't undergo autocatalytic processing are degraded by ERAD"
                     },
                     {
                        "name" : "HHAT G278V abrogates palmitoylation of Hh-Np",
                        "id" : "5658034"
                     }
                  ]
               },
               {
                  "id" : "2474795",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "Biosynthesis of A2E, implicated in retinal degradation",
                              "id" : "2466712"
                           }
                        ],
                        "name" : "Retinoid cycle disease events",
                        "id" : "2453864"
                     },
                     {
                        "name" : "Retinoid metabolism disease events",
                        "id" : "6809583"
                     }
                  ],
                  "name" : "Diseases associated with visual transduction"
               }
            ],
            "id" : "5663202"
         },
         {
            "name" : "Disorders of transmembrane transporters",
            "children" : [
               {
                  "id" : "5619084",
                  "children" : [
                     {
                        "id" : "5678895",
                        "name" : "Defective CFTR causes cystic fibrosis"
                     },
                     {
                        "id" : "5678771",
                        "name" : "Defective ABCB4 causes progressive familial intrahepatic cholestasis 3, intrahepatic cholestasis of pregnancy 3 and gallbladder disease 1"
                     },
                     {
                        "name" : "Defective ABCB6 causes isolated colobomatous microphthalmia 7 (MCOPCB7)",
                        "id" : "5683371"
                     },
                     {
                        "name" : "Defective ABCB11 causes progressive familial intrahepatic cholestasis 2 and benign recurrent intrahepatic cholestasis 2",
                        "id" : "5678520"
                     },
                     {
                        "id" : "5678420",
                        "name" : "Defective ABCC9 causes dilated cardiomyopathy 10, familial atrial fibrillation 12 and hypertrichotic osteochondrodysplasia"
                     },
                     {
                        "id" : "5682113",
                        "name" : "Defective ABCA1 causes Tangier disease"
                     },
                     {
                        "name" : "Defective ABCA12 causes autosomal recessive congenital ichthyosis type 4B",
                        "id" : "5682294"
                     },
                     {
                        "id" : "5683678",
                        "name" : "Defective ABCA3 causes pulmonary surfactant metabolism dysfunction type 3 (SMDP3)"
                     },
                     {
                        "name" : "Defective ABCC2 causes Dubin-Johnson syndrome",
                        "id" : "5679001"
                     },
                     {
                        "name" : "Defective ABCC6 causes pseudoxanthoma elasticum (PXE)",
                        "id" : "5690338"
                     },
                     {
                        "name" : "Defective ABCC8 can cause hypoglycemias and hyperglycemias",
                        "id" : "5683177"
                     },
                     {
                        "id" : "5684045",
                        "name" : "Defective ABCD1 causes adrenoleukodystrophy (ALD)"
                     },
                     {
                        "name" : "Defective ABCD4 causes methylmalonic aciduria and homocystinuria, cblj type (MAHCJ)",
                        "id" : "5683329"
                     },
                     {
                        "id" : "5679096",
                        "name" : "Defective ABCG5 causes sitosterolemia"
                     },
                     {
                        "id" : "5679090",
                        "name" : "Defective ABCG8 causes gallbladder disease 4 and sitosterolemia"
                     }
                  ],
                  "name" : "ABC transporter disorders"
               },
               {
                  "children" : [
                     {
                        "id" : "5619099",
                        "name" : "Defective AVP causes neurohypophyseal diabetes insipidus (NDI)"
                     },
                     {
                        "name" : "Defective CP causes aceruloplasminemia (ACERULOP)",
                        "id" : "5619060"
                     },
                     {
                        "name" : "Defective GCK causes maturity-onset diabetes of the young 2 (MODY2)",
                        "id" : "5619073"
                     },
                     {
                        "name" : "Defective HK1 causes hexokinase deficiency (HK deficiency)",
                        "id" : "5619056"
                     },
                     {
                        "name" : "Defective RHAG causes regulator type Rh-null hemolytic anemia (RHN)",
                        "id" : "5619042"
                     },
                     {
                        "id" : "5619048",
                        "name" : "Defective SLC11A2 causes hypochromic microcytic anemia, with iron overload 1 (AHMIO1)"
                     },
                     {
                        "name" : "Defective SLC12A1 causes Bartter syndrome 1 (BS1)",
                        "id" : "5619104"
                     },
                     {
                        "id" : "5619087",
                        "name" : "Defective SLC12A3 causes Gitelman syndrome (GS)"
                     },
                     {
                        "name" : "Defective SLC12A6 causes agenesis of the corpus callosum, with peripheral neuropathy (ACCPN)",
                        "id" : "5619039"
                     },
                     {
                        "id" : "5619070",
                        "name" : "Defective SLC16A1 causes symptomatic deficiency in lactate transport (SDLT)"
                     },
                     {
                        "id" : "5619035",
                        "name" : "Defective SLC17A5 causes Salla disease (SD) and ISSD"
                     },
                     {
                        "id" : "5619076",
                        "name" : "Defective SLC17A8 causes autosomal dominant deafness 25 (DFNA25)"
                     },
                     {
                        "name" : "Defective SLC1A1 is implicated in schizophrenia 18 (SCZD18) and dicarboxylic aminoaciduria (DCBXA)",
                        "id" : "5619067"
                     },
                     {
                        "id" : "5619062",
                        "name" : "Defective SLC1A3 causes episodic ataxia 6 (EA6)"
                     },
                     {
                        "name" : "Defective SLC20A2 causes idiopathic basal ganglia calcification 1 (IBGC1)",
                        "id" : "5619111"
                     },
                     {
                        "name" : "Defective SLC22A12 causes renal hypouricemia 1 (RHUC1)",
                        "id" : "5619071"
                     },
                     {
                        "id" : "5619066",
                        "name" : "Defective SLC22A18 causes lung cancer (LNCR) and embryonal rhabdomyosarcoma 1 (RMSE1)"
                     },
                     {
                        "name" : "Defective SLC22A5 causes systemic primary carnitine deficiency (CDSP)",
                        "id" : "5619053"
                     },
                     {
                        "id" : "5619077",
                        "name" : "Defective SLC24A1 causes congenital stationary night blindness 1D (CSNB1D)"
                     },
                     {
                        "name" : "Defective SLC24A4 causes hypomineralized amelogenesis imperfecta (AI)",
                        "id" : "5619055"
                     },
                     {
                        "name" : "Defective SLC24A5 causes oculocutaneous albinism 6 (OCA6)",
                        "id" : "5619036"
                     },
                     {
                        "name" : "Defective SLC26A2 causes chondrodysplasias",
                        "id" : "3560792"
                     },
                     {
                        "id" : "5619085",
                        "name" : "Defective SLC26A3 causes congenital secretory chloride diarrhea 1 (DIAR1)"
                     },
                     {
                        "name" : "Defective SLC26A4 causes Pendred syndrome (PDS)",
                        "id" : "5619046"
                     },
                     {
                        "id" : "5619108",
                        "name" : "Defective SLC27A4 causes ichthyosis prematurity syndrome (IPS)"
                     },
                     {
                        "id" : "5619063",
                        "name" : "Defective SLC29A3 causes histiocytosis-lymphadenopathy plus syndrome (HLAS)"
                     },
                     {
                        "id" : "5619043",
                        "name" : "Defective SLC2A1 causes GLUT1 deficiency syndrome 1 (GLUT1DS1)"
                     },
                     {
                        "name" : "Defective SLC2A10 causes arterial tortuosity syndrome (ATS)",
                        "id" : "5619068"
                     },
                     {
                        "id" : "5619098",
                        "name" : "Defective SLC2A2 causes Fanconi-Bickel syndrome (FBS)"
                     },
                     {
                        "id" : "5619047",
                        "name" : "Defective SLC2A9 causes hypouricemia renal 2 (RHUC2)"
                     },
                     {
                        "id" : "5619061",
                        "name" : "Defective SLC33A1 causes spastic paraplegia 42 (SPG42)"
                     },
                     {
                        "id" : "5619040",
                        "name" : "Defective SLC34A1 causes hypophosphatemic nephrolithiasis/osteoporosis 1 (NPHLOP1)"
                     },
                     {
                        "id" : "5619045",
                        "name" : "Defective SLC34A2 causes pulmonary alveolar microlithiasis (PALM)"
                     },
                     {
                        "id" : "5619097",
                        "name" : "Defective SLC34A3 causes Hereditary hypophosphatemic rickets with hypercalciuria (HHRH)"
                     },
                     {
                        "name" : "Defective SLC35A1 causes congenital disorder of glycosylation 2F (CDG2F)",
                        "id" : "5619037"
                     },
                     {
                        "name" : "Defective SLC35A1 causes congenital disorder of glycosylation 2F (CDG2F)",
                        "id" : "5663020"
                     },
                     {
                        "name" : "Defective SLC35A2 causes congenital disorder of glycosylation 2M (CDG2M)",
                        "id" : "5619072"
                     },
                     {
                        "id" : "5619083",
                        "name" : "Defective SLC35A3 causes arthrogryposis, mental retardation, and seizures (AMRS)"
                     },
                     {
                        "name" : "Defective SLC35C1 causes congenital disorder of glycosylation 2C (CDG2C)",
                        "id" : "5619078"
                     },
                     {
                        "name" : "Defective SLC36A2 causes iminoglycinuria (IG) and hyperglycinuria (HG)",
                        "id" : "5619041"
                     },
                     {
                        "id" : "5619088",
                        "name" : "Defective SLC39A4 causes acrodermatitis enteropathica, zinc-deficiency type (AEZ)"
                     },
                     {
                        "name" : "Defective SLC3A1 causes cystinuria (CSNU)",
                        "id" : "5619113"
                     },
                     {
                        "name" : "Defective SLC40A1 causes hemochromatosis 4 (HFE4) (macrophages)",
                        "id" : "5619049"
                     },
                     {
                        "name" : "Defective SLC40A1 causes hemochromatosis 4 (HFE4) (duodenum)",
                        "id" : "5655799"
                     },
                     {
                        "name" : "Defective SLC4A1 causes hereditary spherocytosis type 4 (HSP4),  distal renal tubular acidosis (dRTA) and dRTA with hemolytic anemia (dRTA-HA)",
                        "id" : "5619050"
                     },
                     {
                        "id" : "5619054",
                        "name" : "Defective SLC4A4 causes renal tubular acidosis, proximal, with ocular abnormalities and mental retardation (pRTA-OA)"
                     },
                     {
                        "name" : "Defective SLC5A1 causes congenital glucose/galactose malabsorption (GGM)",
                        "id" : "5656364"
                     },
                     {
                        "name" : "Defective SLC5A2 causes renal glucosuria (GLYS1)",
                        "id" : "5658208"
                     },
                     {
                        "id" : "5619096",
                        "name" : "Defective SLC5A5 causes thyroid dyshormonogenesis 1 (TDH1)"
                     },
                     {
                        "name" : "Defective SLC5A7 causes distal hereditary motor neuronopathy 7A (HMN7A)",
                        "id" : "5619114"
                     },
                     {
                        "id" : "5658471",
                        "name" : "Defective SLC5A7 causes distal hereditary motor neuronopathy 7A (HMN7A)"
                     },
                     {
                        "id" : "5619094",
                        "name" : "Variant SLC6A14 may confer susceptibility towards obesity"
                     },
                     {
                        "id" : "5619079",
                        "name" : "Defective SLC6A18 may confer susceptibility to iminoglycinuria and/or hyperglycinuria"
                     },
                     {
                        "name" : "Defective SLC6A18 may confer susceptibility to iminoglycinuria and/or hyperglycinuria",
                        "id" : "5659729"
                     },
                     {
                        "id" : "5619044",
                        "name" : "Defective SLC6A19 causes Hartnup disorder (HND)"
                     },
                     {
                        "id" : "5659735",
                        "name" : "Defective SLC6A19 causes Hartnup disorder (HND)"
                     },
                     {
                        "id" : "5619109",
                        "name" : "Defective SLC6A2 causes orthostatic intolerance (OI)"
                     },
                     {
                        "name" : "Variant SLC6A20 contributes towards hyperglycinuria (HG) and iminoglycinuria (IG)",
                        "id" : "5619101"
                     },
                     {
                        "name" : "Variant SLC6A20 contributes towards hyperglycinuria (HG) and iminoglycinuria (IG)",
                        "id" : "5660686"
                     },
                     {
                        "name" : "Defective SLC6A3 causes Parkinsonism-dystonia infantile (PKDYS)",
                        "id" : "5619081"
                     },
                     {
                        "name" : "Defective SLC6A3 causes Parkinsonism-dystonia infantile (PKDYS)",
                        "id" : "5660724"
                     },
                     {
                        "name" : "Defective SLC6A5 causes hyperekplexia 3 (HKPX3)",
                        "id" : "5619089"
                     },
                     {
                        "name" : "Defective SLC7A7 causes lysinuric protein intolerance (LPI)",
                        "id" : "5660862"
                     },
                     {
                        "name" : "Defective SLC7A9 causes cystinuria (CSNU)",
                        "id" : "5660883"
                     },
                     {
                        "id" : "5619092",
                        "name" : "Defective SLC9A6 causes  X-linked, syndromic mental retardation,, Christianson type (MRXSCH)"
                     },
                     {
                        "id" : "5619052",
                        "name" : "Defective SLC9A9 causes autism 16 (AUTS16)"
                     },
                     {
                        "id" : "5619110",
                        "name" : "Defective SLCO1B1 causes hyperbilirubinemia, Rotor type (HBLRR)"
                     },
                     {
                        "name" : "Defective SLCO1B1 causes hyperbilirubinemia, Rotor type (HBLRR)",
                        "id" : "5661182"
                     },
                     {
                        "id" : "5619058",
                        "name" : "Defective SLCO1B3 causes hyperbilirubinemia, Rotor type (HBLRR)"
                     },
                     {
                        "id" : "5619095",
                        "name" : "Defective SLCO2A1 causes primary, autosomal recessive hypertrophic osteoarthropathy 2 (PHOAR2)"
                     },
                     {
                        "id" : "5619107",
                        "name" : "Defective TRP may confer susceptibility towards thyroid papillary carcinoma (TPC)"
                     }
                  ],
                  "name" : "SLC transporter disorders",
                  "id" : "5619102"
               }
            ],
            "id" : "5619115"
         },
         {
            "id" : "5668914",
            "children" : [
               {
                  "id" : "5663084",
                  "children" : [
                     {
                        "name" : "Mucopolysaccharidoses",
                        "children" : [
                           {
                              "id" : "2206302",
                              "name" : "MPS I - Hurler syndrome"
                           },
                           {
                              "name" : "MPS II - Hunter syndrome",
                              "id" : "2206296"
                           },
                           {
                              "id" : "2206307",
                              "name" : "MPS IIIA - Sanfilippo syndrome A"
                           },
                           {
                              "id" : "2206282",
                              "name" : "MPS IIIB - Sanfilippo syndrome B"
                           },
                           {
                              "name" : "MPS IIIC - Sanfilippo syndrome C",
                              "id" : "2206291"
                           },
                           {
                              "name" : "MPS IIID - Sanfilippo syndrome D",
                              "id" : "2206305"
                           },
                           {
                              "id" : "2206290",
                              "name" : "MPS IV - Morquio syndrome A"
                           },
                           {
                              "name" : "MPS IV - Morquio syndrome B",
                              "id" : "2206308"
                           },
                           {
                              "id" : "2206285",
                              "name" : "MPS VI - Maroteaux-Lamy syndrome"
                           },
                           {
                              "id" : "2206292",
                              "name" : "MPS VII - Sly syndrome"
                           },
                           {
                              "id" : "2206280",
                              "name" : "MPS IX - Natowicz syndrome"
                           }
                        ],
                        "id" : "2206281"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Glycogen storage disease type 0 (muscle GYS1)",
                              "id" : "3828062"
                           },
                           {
                              "name" : "Glycogen storage disease type 0 (liver GYS2)",
                              "id" : "3858516"
                           },
                           {
                              "id" : "3274531",
                              "name" : "Glycogen storage disease type Ia (G6PC)"
                           },
                           {
                              "id" : "3229133",
                              "name" : "Glycogen storage disease type Ib (SLC37A4)"
                           },
                           {
                              "name" : "Glycogen storage disease type II (GAA)",
                              "id" : "5357609"
                           },
                           {
                              "name" : "Glycogen storage disease type IV (GBE1)",
                              "id" : "3878781"
                           },
                           {
                              "name" : "Glycogen storage disease type XV (GYG1)",
                              "id" : "3814836"
                           },
                           {
                              "name" : "Myoclonic epilepsy of Lafora",
                              "id" : "3785653"
                           },
                           {
                              "id" : "3282872",
                              "name" : "Severe congenital neutropenia type 4 (G6PC3)"
                           }
                        ],
                        "name" : "Glycogen storage diseases",
                        "id" : "3229121"
                     },
                     {
                        "id" : "5657560",
                        "name" : "Hereditary fructose intolerance"
                     },
                     {
                        "name" : "Essential fructosuria",
                        "id" : "5657562"
                     },
                     {
                        "name" : "Essential pentosuria",
                        "id" : "5662853"
                     },
                     {
                        "id" : "6791465",
                        "children" : [
                           {
                              "id" : "6791461",
                              "name" : "RPIA deficiency: failed conversion of RU5P to R5P"
                           },
                           {
                              "id" : "5659996",
                              "name" : "RPIA deficiency: failed conversion of R5P to RU5P"
                           },
                           {
                              "name" : "TALDO1 deficiency: failed conversion of  Fru(6)P, E4P to SH7P, GA3P",
                              "id" : "6791462"
                           },
                           {
                              "id" : "6791055",
                              "name" : "TALDO1 deficiency: failed conversion of SH7P, GA3P to Fru(6)P, E4P"
                           }
                        ],
                        "name" : "Pentose phosphate pathway disease"
                     },
                     {
                        "id" : "5659898",
                        "name" : "Intestinal saccharidase deficiencies"
                     }
                  ],
                  "name" : "Diseases of carbohydrate metabolism"
               },
               {
                  "name" : "Phenylketonuria",
                  "id" : "2160456"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "3359462",
                              "name" : "Defective AMN causes hereditary megaloblastic anemia 1"
                           },
                           {
                              "name" : "Defective CUBN causes hereditary megaloblastic anemia 1",
                              "id" : "3359463"
                           },
                           {
                              "id" : "3359454",
                              "name" : "Defective TCN2 causes hereditary megaloblastic anemia"
                           },
                           {
                              "name" : "Defective LMBRD1 causes methylmalonic aciduria and homocystinuria type cblF",
                              "id" : "3359458"
                           },
                           {
                              "name" : "Defective GIF causes intrinsic factor deficiency",
                              "id" : "3359457"
                           },
                           {
                              "name" : "Defective MMACHC causes methylmalonic aciduria and homocystinuria type cblC",
                              "id" : "3359474"
                           },
                           {
                              "id" : "3359473",
                              "name" : "Defective MMADHC causes methylmalonic aciduria and homocystinuria type cblD"
                           },
                           {
                              "id" : "3359467",
                              "name" : "Defective MTRR causes methylmalonic aciduria and homocystinuria type cblE"
                           },
                           {
                              "id" : "3359469",
                              "name" : "Defective MTR causes methylmalonic aciduria and homocystinuria type cblG"
                           },
                           {
                              "name" : "Defective MMAB causes methylmalonic aciduria type cblB",
                              "id" : "3359471"
                           },
                           {
                              "id" : "3359475",
                              "name" : "Defective MMAA causes methylmalonic aciduria type cblA"
                           },
                           {
                              "name" : "Defective MUT causes methylmalonic aciduria mut type",
                              "id" : "3359478"
                           },
                           {
                              "name" : "Defective CD320 causes methylmalonic aciduria",
                              "id" : "3359485"
                           },
                           {
                              "name" : "Defective ABCD4 causes methylmalonic aciduria and homocystinuria, cblj type (MAHCJ)",
                              "id" : "5683329"
                           }
                        ],
                        "name" : "Defects in cobalamin (B12) metabolism",
                        "id" : "3296469"
                     },
                     {
                        "name" : "Defects in biotin (Btn) metabolism",
                        "children" : [
                           {
                              "id" : "3371599",
                              "name" : "Defective HLCS causes multiple carboxylase deficiency"
                           },
                           {
                              "name" : "Defective BTD causes biotidinase deficiency",
                              "id" : "3371598"
                           }
                        ],
                        "id" : "3323169"
                     }
                  ],
                  "name" : "Defects in vitamin and cofactor metabolism",
                  "id" : "3296482"
               },
               {
                  "name" : "Metabolic disorders of biological oxidation enzymes",
                  "children" : [
                     {
                        "name" : "Defective ACY1 causes encephalopathy",
                        "id" : "5579007"
                     },
                     {
                        "name" : "Defective AHCY causes Hypermethioninemia with S-adenosylhomocysteine hydrolase deficiency (HMAHCHD)",
                        "id" : "5578997"
                     },
                     {
                        "id" : "5579026",
                        "name" : "Defective CYP11A1 causes Adrenal insufficiency, congenital, with 46,XY sex reversal (AICSR)"
                     },
                     {
                        "name" : "Defective CYP11B1 causes Adrenal hyperplasia 4 (AH4)",
                        "id" : "5579017"
                     },
                     {
                        "name" : "Defective CYP11B2 causes Corticosterone methyloxidase 1 deficiency (CMO-1 deficiency)",
                        "id" : "5579009"
                     },
                     {
                        "name" : "Defective CYP17A1 causes Adrenal hyperplasia 5 (AH5)",
                        "id" : "5579028"
                     },
                     {
                        "id" : "5579030",
                        "name" : "Defective CYP19A1 causes Aromatase excess syndrome (AEXS)"
                     },
                     {
                        "id" : "5579000",
                        "name" : "Defective CYP1B1 causes Glaucoma"
                     },
                     {
                        "name" : "Defective CYP21A2 causes Adrenal hyperplasia 3 (AH3)",
                        "id" : "5579021"
                     },
                     {
                        "id" : "5579010",
                        "name" : "Defective CYP24A1 causes Hypercalcemia, infantile (HCAI)"
                     },
                     {
                        "id" : "5579015",
                        "name" : "Defective CYP26B1 causes Radiohumeral fusions with other skeletal and craniofacial anomalies (RHFCA)"
                     },
                     {
                        "id" : "5579004",
                        "name" : "Defective CYP26C1 causes Focal facial dermal dysplasia 4 (FFDD4)"
                     },
                     {
                        "id" : "5578996",
                        "name" : "Defective CYP27A1 causes Cerebrotendinous xanthomatosis (CTX)"
                     },
                     {
                        "id" : "5579014",
                        "name" : "Defective CYP27B1 causes Rickets vitamin D-dependent 1A (VDDR1A)"
                     },
                     {
                        "id" : "5579027",
                        "name" : "Defective CYP2R1 causes Rickets vitamin D-dependent 1B (VDDR1B)"
                     },
                     {
                        "id" : "5579011",
                        "name" : "Defective CYP2U1 causes Spastic paraplegia 56, autosomal recessive (SPG56)"
                     },
                     {
                        "id" : "5579005",
                        "name" : "Defective CYP4F22 causes Ichthyosis, congenital, autosomal recessive 5 (ARCI5)"
                     },
                     {
                        "name" : "Defective TBXAS1 causes Ghosal hematodiaphyseal dysplasia (GHDD)",
                        "id" : "5579032"
                     },
                     {
                        "id" : "5579013",
                        "name" : "Defective CYP7B1 causes Spastic paraplegia 5A, autosomal recessive (SPG5A) and Congenital bile acid synthesis defect 3 (CBAS3)"
                     },
                     {
                        "id" : "5579019",
                        "name" : "Defective FMO3 causes Trimethylaminuria (TMAU)"
                     },
                     {
                        "id" : "5578999",
                        "name" : "Defective GCLC causes Hemolytic anemia due to gamma-glutamylcysteine synthetase deficiency (HAGGSD)"
                     },
                     {
                        "name" : "Defective GGT1 causes Glutathionuria (GLUTH)",
                        "id" : "5579022"
                     },
                     {
                        "name" : "Defective GSS causes Glutathione synthetase deficiency (GSS deficiency)",
                        "id" : "5579006"
                     },
                     {
                        "id" : "5578998",
                        "name" : "Defective OPLAH causes 5-oxoprolinase deficiency (OPLAHD)"
                     },
                     {
                        "name" : "Defective MAOA causes Brunner syndrome (BRUNS)",
                        "id" : "5579012"
                     },
                     {
                        "name" : "Defective MAT1A causes Methionine adenosyltransferase deficiency (MATD)",
                        "id" : "5579024"
                     },
                     {
                        "id" : "5579031",
                        "name" : "Defective ACTH causes Obesity and Pro-opiomelanocortinin deficiency (POMCD)"
                     },
                     {
                        "id" : "5579020",
                        "name" : "Defective SLC35D1 causes Schneckenbecken dysplasia (SCHBCKD)"
                     },
                     {
                        "id" : "5578995",
                        "name" : "Defective TPMT causes Thiopurine S-methyltransferase deficiency (TPMT deficiency)"
                     },
                     {
                        "name" : "Defective UGT1A1 causes hyperbilirubinemia",
                        "id" : "5579002"
                     },
                     {
                        "name" : "Defective UGT1A4 causes hyperbilirubinemia",
                        "id" : "5579016"
                     }
                  ],
                  "id" : "5579029"
               },
               {
                  "id" : "2978092",
                  "name" : "Abnormal conversion of 2-oxoglutarate to 2-hydroxyglutarate"
               },
               {
                  "children" : [
                     {
                        "name" : "Defective SLC34A2 causes pulmonary alveolar microlithiasis (PALM)",
                        "id" : "5687583"
                     },
                     {
                        "name" : "Defective SFTPA2 causes idiopathic pulmonary fibrosis (IPF)",
                        "id" : "5687868"
                     },
                     {
                        "name" : "Defective pro-SFTPB causes pulmonary surfactant metabolism dysfunction 1 (SMDP1) and respiratory distress syndrome (RDS)",
                        "id" : "5688031"
                     },
                     {
                        "id" : "5688354",
                        "name" : "Defective pro-SFTPC causes pulmonary surfactant metabolism dysfunction 2 (SMDP2) and respiratory distress syndrome (RDS)"
                     },
                     {
                        "name" : "Defective ABCA3 causes pulmonary surfactant metabolism dysfunction 3 (SMDP3)",
                        "id" : "5688399"
                     },
                     {
                        "id" : "5688890",
                        "name" : "Defective CSF2RA causes pulmonary surfactant metabolism dysfunction 4 (SMDP4)"
                     },
                     {
                        "id" : "5688849",
                        "name" : "Defective CSF2RB causes pulmonary surfactant metabolism dysfunction 5 (SMDP5)"
                     }
                  ],
                  "name" : "Diseases associated with surfactant metabolism",
                  "id" : "5687613"
               }
            ],
            "name" : "Diseases of metabolism"
         },
         {
            "children" : [
               {
                  "name" : "Diseases associated with glycosaminoglycan metabolism",
                  "children" : [
                     {
                        "id" : "3560792",
                        "name" : "Defective SLC26A2 causes chondrodysplasias"
                     },
                     {
                        "name" : "Defective PAPSS2 causes SEMD-PA",
                        "id" : "3560796"
                     },
                     {
                        "id" : "3560783",
                        "name" : "Defective B4GALT7 causes EDS, progeroid type"
                     },
                     {
                        "name" : "Defective B3GAT3 causes JDSSDHD",
                        "id" : "3560801"
                     },
                     {
                        "name" : "Defective CHSY1 causes TPBS",
                        "id" : "3595177"
                     },
                     {
                        "name" : "Defective CHST3 causes SEDCJD",
                        "id" : "3595172"
                     },
                     {
                        "id" : "3595174",
                        "name" : "Defective CHST14 causes EDS, musculocontractural type"
                     },
                     {
                        "id" : "3656244",
                        "name" : "Defective B4GALT1 causes B4GALT1-CDG (CDG-2d)"
                     },
                     {
                        "id" : "3656225",
                        "name" : "Defective CHST6 causes MCDC1"
                     },
                     {
                        "name" : "Defective EXT1 causes exostoses 1, TRPS2 and CHDS",
                        "id" : "3656253"
                     },
                     {
                        "id" : "3656237",
                        "name" : "Defective EXT2 causes exostoses 2"
                     },
                     {
                        "name" : "Defective ST3GAL3 causes MCT12 and EIEE15",
                        "id" : "3656243"
                     },
                     {
                        "id" : "4420332",
                        "name" : "Defective B3GALT6 causes EDSP2 and SEMDJL1"
                     }
                  ],
                  "id" : "3560782"
               },
               {
                  "name" : "Diseases associated with N-glycosylation of proteins",
                  "children" : [
                     {
                        "id" : "4724289",
                        "name" : "Defective ALG6 causes ALG6-CDG (CDG-1c)"
                     },
                     {
                        "id" : "4720475",
                        "name" : "Defective ALG3 causes ALG3-CDG (CDG-1d)"
                     },
                     {
                        "name" : "Defective MPDU1 causes MPDU1-CDG (CDG-1f)",
                        "id" : "4687000"
                     },
                     {
                        "name" : "Defective ALG12 causes ALG12-CDG (CDG-1g)",
                        "id" : "4720489"
                     },
                     {
                        "id" : "4724325",
                        "name" : "Defective ALG8 causes ALG8-CDG (CDG-1h)"
                     },
                     {
                        "name" : "Defective ALG2 causes ALG2-CDG (CDG-1i)",
                        "id" : "4549349"
                     },
                     {
                        "id" : "4549356",
                        "name" : "Defective DPAGT1 causes DPAGT1-CDG (CDG-1j) and CMSTA2"
                     },
                     {
                        "id" : "4549380",
                        "name" : "Defective ALG1 causes ALG1-CDG (CDG-1k)"
                     },
                     {
                        "id" : "4720454",
                        "name" : "Defective ALG9 causes ALG9-CDG (CDG-1l)"
                     },
                     {
                        "id" : "4570571",
                        "name" : "Defective RFT1 causes RFT1-CDG (CDG-1n)"
                     },
                     {
                        "name" : "Defective ALG11 causes ALG11-CDG (CDG-1p)",
                        "id" : "4551295"
                     },
                     {
                        "id" : "4793952",
                        "name" : "Defective MGAT2 causes MGAT2-CDG (CDG-2a)"
                     },
                     {
                        "name" : "Defective MOGS causes MOGS-CDG (CDG-2b)",
                        "id" : "4793954"
                     },
                     {
                        "name" : "Defective B4GALT1 causes B4GALT1-CDG (CDG-2d)",
                        "id" : "4793953"
                     },
                     {
                        "name" : "Defective MAN1B1 causes MRT15",
                        "id" : "4793950"
                     },
                     {
                        "name" : "Defective ALG14 causes congenital myasthenic syndrome (ALG14-CMS)",
                        "id" : "5633231"
                     }
                  ],
                  "id" : "3781860"
               },
               {
                  "children" : [
                     {
                        "name" : "Defective PGM1 causes PGM1-CDG (CDG1t)",
                        "id" : "5609974"
                     },
                     {
                        "name" : "Defective GALE can cause Epimerase-deficiency galactosemia (EDG)",
                        "id" : "5609977"
                     },
                     {
                        "id" : "5609978",
                        "name" : "Defective GALT can cause Galactosemia"
                     },
                     {
                        "name" : "Defective GALK1 can cause Galactosemia II (GALCT2)",
                        "id" : "5609976"
                     },
                     {
                        "name" : "Defective DHDDS causes retinitis pigmentosa 59",
                        "id" : "4755609"
                     },
                     {
                        "name" : "Defective SRD5A3 causes SRD5A3-CDG (CDG-1q) and KHRZ",
                        "id" : "4755579"
                     },
                     {
                        "name" : "Defective DOLK causes DOLK-CDG (CDG-1m)",
                        "id" : "4755583"
                     },
                     {
                        "name" : "Defective GFPT1 causes CMSTA1",
                        "id" : "4085023"
                     },
                     {
                        "name" : "Defective MPI causes MPI-CDG (CDG-1b)",
                        "id" : "4043916"
                     },
                     {
                        "id" : "4043911",
                        "name" : "Defective PMM2 causes PMM2-CDG (CDG-1a)"
                     },
                     {
                        "name" : "Defective DPM1 causes DPM1-CDG (CDG-1e)",
                        "id" : "4717374"
                     },
                     {
                        "id" : "4719377",
                        "name" : "Defective DPM2 causes DPM2-CDG (CDG-1u)"
                     },
                     {
                        "name" : "Defective DPM3 causes DPM3-CDG (CDG-1o)",
                        "id" : "4719360"
                     },
                     {
                        "id" : "4085011",
                        "name" : "Defective GNE causes sialuria, Nonaka myopathy and inclusion body myopathy 2"
                     },
                     {
                        "id" : "4341670",
                        "name" : "Defective NEU1 causes sialidosis"
                     }
                  ],
                  "name" : "Diseases associated with glycosylation precursor biosynthesis",
                  "id" : "5609975"
               }
            ],
            "name" : "Diseases of glycosylation",
            "id" : "3781865"
         },
         {
            "id" : "5663205",
            "name" : "Infectious disease",
            "children" : [
               {
                  "id" : "162906",
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "162594",
                              "name" : "Early Phase of HIV Life Cycle",
                              "children" : [
                                 {
                                    "id" : "173107",
                                    "name" : "Binding and entry of HIV virion"
                                 },
                                 {
                                    "id" : "162585",
                                    "name" : "Uncoating of the HIV Virion"
                                 },
                                 {
                                    "id" : "162589",
                                    "name" : "Reverse Transcription of HIV RNA",
                                    "children" : [
                                       {
                                          "id" : "164516",
                                          "name" : "Minus-strand DNA synthesis"
                                       },
                                       {
                                          "id" : "164525",
                                          "name" : "Plus-strand DNA synthesis"
                                       }
                                    ]
                                 },
                                 {
                                    "children" : [
                                       {
                                          "id" : "175567",
                                          "name" : "Integration of viral DNA into host genomic DNA"
                                       },
                                       {
                                          "id" : "164843",
                                          "name" : "2-LTR circle formation"
                                       },
                                       {
                                          "name" : "Autointegration results in viral DNA circles",
                                          "id" : "177539"
                                       }
                                    ],
                                    "name" : "Integration of provirus",
                                    "id" : "162592"
                                 }
                              ]
                           },
                           {
                              "id" : "162599",
                              "children" : [
                                 {
                                    "id" : "167172",
                                    "name" : "Transcription of the HIV genome",
                                    "children" : [
                                       {
                                          "name" : "HIV Transcription Initiation",
                                          "id" : "167161"
                                       },
                                       {
                                          "name" : "RNA Polymerase II HIV Promoter Escape",
                                          "id" : "167162"
                                       },
                                       {
                                          "name" : "RNA Pol II CTD phosphorylation and interaction with CE",
                                          "id" : "167160"
                                       },
                                       {
                                          "children" : [
                                             {
                                                "name" : "Formation of the HIV-1 Early Elongation Complex",
                                                "id" : "167158"
                                             },
                                             {
                                                "id" : "167246",
                                                "name" : "Tat-mediated elongation of the HIV-1 transcript",
                                                "children" : [
                                                   {
                                                      "id" : "167200",
                                                      "name" : "Formation of HIV-1 elongation complex containing HIV-1 Tat"
                                                   }
                                                ]
                                             },
                                             {
                                                "id" : "167242",
                                                "name" : "Abortive elongation of HIV-1 transcript in the absence of Tat"
                                             }
                                          ],
                                          "name" : "HIV Transcription Elongation",
                                          "id" : "167169"
                                       },
                                       {
                                          "id" : "167287",
                                          "name" : "HIV elongation arrest and recovery"
                                       },
                                       {
                                          "name" : "Formation of HIV elongation complex in the absence of HIV Tat",
                                          "id" : "167152"
                                       },
                                       {
                                          "id" : "167290",
                                          "name" : "Pausing and recovery of HIV elongation"
                                       },
                                       {
                                          "name" : "Tat-mediated HIV elongation arrest and recovery",
                                          "id" : "167243"
                                       },
                                       {
                                          "id" : "167238",
                                          "name" : "Pausing and recovery of Tat-mediated HIV elongation"
                                       },
                                       {
                                          "id" : "167168",
                                          "name" : "HIV Transcription Termination"
                                       }
                                    ]
                                 },
                                 {
                                    "id" : "165054",
                                    "name" : "Rev-mediated nuclear export of HIV RNA"
                                 },
                                 {
                                    "id" : "175474",
                                    "name" : "Assembly Of The HIV Virion",
                                    "children" : [
                                       {
                                          "name" : "Synthesis And Processing Of GAG, GAGPOL Polyproteins",
                                          "children" : [
                                             {
                                                "id" : "174490",
                                                "name" : "Membrane binding and targetting of GAG proteins"
                                             }
                                          ],
                                          "id" : "174495"
                                       },
                                       {
                                          "id" : "171286",
                                          "name" : "Synthesis and processing of ENV and VPU"
                                       }
                                    ]
                                 },
                                 {
                                    "name" : "Budding and maturation of HIV virion",
                                    "id" : "162588"
                                 }
                              ],
                              "name" : "Late Phase of HIV Life Cycle"
                           }
                        ],
                        "name" : "HIV Life Cycle",
                        "id" : "162587"
                     },
                     {
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "Vpr-mediated induction of apoptosis by mitochondrial outer membrane permeabilization",
                                    "id" : "180897"
                                 },
                                 {
                                    "id" : "180910",
                                    "name" : "Vpr-mediated nuclear import of PICs"
                                 }
                              ],
                              "name" : "Interactions of Vpr with host cellular proteins",
                              "id" : "176033"
                           },
                           {
                              "id" : "177243",
                              "children" : [
                                 {
                                    "id" : "180746",
                                    "name" : "Nuclear import of Rev protein"
                                 },
                                 {
                                    "id" : "165054",
                                    "name" : "Rev-mediated nuclear export of HIV RNA"
                                 }
                              ],
                              "name" : "Interactions of Rev with host cellular proteins"
                           },
                           {
                              "name" : "APOBEC3G mediated resistance to HIV-1 infection",
                              "id" : "180689"
                           },
                           {
                              "id" : "180585",
                              "name" : "Vif-mediated degradation of APOBEC3G"
                           },
                           {
                              "name" : "Interactions of Tat with host cellular proteins",
                              "id" : "176034"
                           },
                           {
                              "name" : "The role of Nef in HIV-1 replication and disease pathogenesis",
                              "children" : [
                                 {
                                    "id" : "164944",
                                    "name" : "Nef and signal transduction"
                                 },
                                 {
                                    "id" : "164938",
                                    "children" : [
                                       {
                                          "name" : "Nef mediated downregulation of CD28 cell surface expression",
                                          "id" : "164939"
                                       },
                                       {
                                          "id" : "164940",
                                          "name" : "Nef mediated downregulation of MHC class I complex cell surface expression"
                                       },
                                       {
                                          "name" : "Nef Mediated CD4 Down-regulation",
                                          "id" : "167590"
                                       },
                                       {
                                          "name" : "Nef Mediated CD8 Down-regulation",
                                          "id" : "182218"
                                       }
                                    ],
                                    "name" : "Nef-mediates down modulation of cell surface receptors by recruiting them to clathrin adapters"
                                 }
                              ],
                              "id" : "164952"
                           },
                           {
                              "name" : "Vpu mediated degradation of CD4",
                              "id" : "180534"
                           }
                        ],
                        "name" : "Host Interactions of HIV factors",
                        "id" : "162909"
                     }
                  ],
                  "name" : "HIV Infection"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "168275",
                              "name" : "Entry of Influenza Virion into Host Cell via Endocytosis"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Fusion of the Influenza Virion to the Host Cell Endosome",
                                    "id" : "168288"
                                 },
                                 {
                                    "id" : "168336",
                                    "name" : "Uncoating of the Influenza Virion"
                                 }
                              ],
                              "name" : "Fusion and Uncoating of the Influenza Virion",
                              "id" : "168270"
                           },
                           {
                              "id" : "168271",
                              "name" : "Transport of Ribonucleoproteins into the Host Nucleus"
                           },
                           {
                              "children" : [
                                 {
                                    "id" : "192905",
                                    "name" : "vRNP Assembly"
                                 },
                                 {
                                    "name" : "Viral Messenger RNA Synthesis",
                                    "id" : "168325"
                                 },
                                 {
                                    "id" : "192869",
                                    "name" : "cRNA Synthesis"
                                 },
                                 {
                                    "name" : "vRNA Synthesis",
                                    "id" : "192814"
                                 },
                                 {
                                    "id" : "192823",
                                    "name" : "Viral mRNA Translation"
                                 }
                              ],
                              "name" : "Influenza Viral RNA Transcription and Replication",
                              "id" : "168273"
                           },
                           {
                              "id" : "168274",
                              "name" : "Export of Viral Ribonucleoproteins from Nucleus",
                              "children" : [
                                 {
                                    "name" : "Viral RNP Complexes in the Host Cell Nucleus",
                                    "id" : "168330"
                                 },
                                 {
                                    "id" : "168333",
                                    "name" : "NEP/NS2 Interacts with the Cellular Export Machinery"
                                 }
                              ]
                           },
                           {
                              "id" : "168268",
                              "children" : [
                                 {
                                    "id" : "168316",
                                    "name" : "Assembly of Viral Components at the Budding Site",
                                    "children" : [
                                       {
                                          "id" : "168874",
                                          "name" : "Transport of HA trimer, NA tetramer and M2 tetramer from the endoplasmic reticulum to the Golgi Apparatus"
                                       }
                                    ]
                                 },
                                 {
                                    "name" : "Packaging of Eight RNA Segments",
                                    "id" : "168303"
                                 },
                                 {
                                    "name" : "Budding",
                                    "id" : "168302"
                                 },
                                 {
                                    "name" : "Release",
                                    "id" : "168298"
                                 }
                              ],
                              "name" : "Virus Assembly and Release"
                           }
                        ],
                        "name" : "Influenza Life Cycle",
                        "id" : "168255"
                     },
                     {
                        "children" : [
                           {
                              "id" : "168276",
                              "children" : [
                                 {
                                    "name" : "Inhibition of Host mRNA Processing and RNA Silencing",
                                    "id" : "168315"
                                 },
                                 {
                                    "id" : "168305",
                                    "children" : [
                                       {
                                          "id" : "168888",
                                          "name" : "Inhibition of IFN-beta"
                                       }
                                    ],
                                    "name" : "Inhibition of Interferon Synthesis"
                                 },
                                 {
                                    "name" : "Inhibition of PKR",
                                    "id" : "169131"
                                 }
                              ],
                              "name" : " NS1 Mediated Effects on Host Pathways"
                           },
                           {
                              "name" : "Influenza Virus Induced Apoptosis",
                              "id" : "168277"
                           }
                        ],
                        "name" : "Host Interactions with Influenza Factors",
                        "id" : "168253"
                     }
                  ],
                  "name" : "Influenza Infection",
                  "id" : "168254"
               },
               {
                  "children" : [
                     {
                        "id" : "1222499",
                        "children" : [
                           {
                              "id" : "1222538",
                              "name" : "Tolerance by Mtb to nitric oxide produced by macrophages"
                           },
                           {
                              "id" : "1222387",
                              "name" : "Tolerance of reactive oxygen produced by macrophages"
                           },
                           {
                              "id" : "1222541",
                              "name" : "Cell redox homeostasis"
                           },
                           {
                              "name" : "Mtb iron assimilation by chelation",
                              "id" : "1222449"
                           }
                        ],
                        "name" : "Response of Mtb to phagocytosis"
                     }
                  ],
                  "name" : "Latent infection of Homo sapiens with Mycobacterium tuberculosis",
                  "id" : "1222352"
               },
               {
                  "name" : "Uptake and actions of bacterial toxins",
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "5250968",
                              "name" : "Toxicity of botulinum toxin type A (BoNT/A)"
                           },
                           {
                              "name" : "Toxicity of botulinum toxin type B (BoNT/B)",
                              "id" : "5250958"
                           },
                           {
                              "id" : "5250992",
                              "name" : "Toxicity of botulinum toxin type E (BoNT/E)"
                           },
                           {
                              "name" : "Toxicity of tetanus toxin (TeNT)",
                              "id" : "5250982"
                           },
                           {
                              "id" : "5250971",
                              "name" : "Toxicity of botulinum toxin type C (BoNT/C)"
                           },
                           {
                              "name" : "Toxicity of botulinum toxin type D (BoNT/D)",
                              "id" : "5250955"
                           },
                           {
                              "id" : "5250981",
                              "name" : "Toxicity of botulinum toxin type F (BoNT/F)"
                           },
                           {
                              "id" : "5250989",
                              "name" : "Toxicity of botulinum toxin type G (BoNT/G)"
                           }
                        ],
                        "name" : "Neurotoxicity of clostridium toxins",
                        "id" : "168799"
                     },
                     {
                        "name" : "Uptake and function of anthrax toxins",
                        "id" : "5210891"
                     },
                     {
                        "name" : "Uptake and function of diphtheria toxin",
                        "id" : "5336415"
                     }
                  ],
                  "id" : "5339562"
               }
            ]
         },
         {
            "children" : [
               {
                  "name" : "Diseases associated with the TLR signaling cascade",
                  "children" : [
                     {
                        "name" : "IRAK4 deficiency (TLR2/4)",
                        "id" : "5603041"
                     },
                     {
                        "id" : "5603037",
                        "name" : "IRAK4 deficiency (TLR5)"
                     },
                     {
                        "name" : "MyD88 deficiency (TLR2/4)",
                        "id" : "5602498"
                     },
                     {
                        "name" : "MyD88 deficiency (TLR5)",
                        "id" : "5602680"
                     },
                     {
                        "name" : "TLR3 deficiency - HSE",
                        "id" : "5602410"
                     },
                     {
                        "id" : "5602415",
                        "name" : "UNC93B1 deficiency - HSE"
                     },
                     {
                        "name" : "TICAM1 deficiency - HSE",
                        "id" : "5602566"
                     },
                     {
                        "name" : "TRAF3 deficiency - HSE",
                        "id" : "5602571"
                     },
                     {
                        "id" : "5603027",
                        "name" : "IKBKG deficiency causes anhidrotic ectodermal dysplasia with immunodeficiency (EDA-ID) (via TLR)"
                     },
                     {
                        "id" : "5602636",
                        "name" : "IKBKB deficiency causes SCID"
                     },
                     {
                        "name" : "IkBA variant leads to EDA-ID",
                        "id" : "5603029"
                     }
                  ],
                  "id" : "5602358"
               }
            ],
            "name" : "Diseases of Immune System",
            "id" : "5260271"
         }
      ],
      "name" : "Disease",
      "id" : "1643685"
   },
   {
      "id" : "73894",
      "children" : [
         {
            "children" : [
               {
                  "name" : "Base-Excision Repair, AP Site Formation",
                  "children" : [
                     {
                        "id" : "73927",
                        "children" : [
                           {
                              "name" : "Recognition and association of DNA glycosylase with site containing an affected purine",
                              "id" : "110330"
                           },
                           {
                              "id" : "110331",
                              "name" : "Cleavage of the damaged purine"
                           }
                        ],
                        "name" : "Depurination"
                     },
                     {
                        "id" : "73928",
                        "children" : [
                           {
                              "id" : "110328",
                              "name" : "Recognition and association of DNA glycosylase with site containing an affected pyrimidine"
                           },
                           {
                              "id" : "110329",
                              "name" : "Cleavage of the damaged pyrimidine "
                           }
                        ],
                        "name" : "Depyrimidination"
                     }
                  ],
                  "id" : "73929"
               },
               {
                  "children" : [
                     {
                        "name" : "Displacement of DNA glycosylase by APEX1",
                        "id" : "110357"
                     },
                     {
                        "id" : "110381",
                        "name" : "Resolution of AP sites via the single-nucleotide replacement pathway",
                        "children" : [
                           {
                              "name" : "Abasic sugar-phosphate removal via the single-nucleotide replacement pathway",
                              "id" : "73930"
                           }
                        ]
                     },
                     {
                        "name" : "APEX1-Independent Resolution of AP Sites via the Single Nucleotide Replacement Pathway",
                        "id" : "5649702"
                     },
                     {
                        "id" : "110373",
                        "name" : "Resolution of AP sites via the multiple-nucleotide patch replacement pathway",
                        "children" : [
                           {
                              "id" : "110362",
                              "name" : "POLB-Dependent Long Patch Base Excision Repair"
                           },
                           {
                              "id" : "5651801",
                              "name" : "PCNA-Dependent Long Patch Base Excision Repair"
                           }
                        ]
                     }
                  ],
                  "name" : "Resolution of Abasic Sites (AP sites)",
                  "id" : "73933"
               }
            ],
            "name" : "Base Excision Repair",
            "id" : "73884"
         },
         {
            "name" : "DNA Damage Bypass",
            "children" : [
               {
                  "id" : "110314",
                  "name" : "Recognition of DNA damage by PCNA-containing replication complex"
               },
               {
                  "children" : [
                     {
                        "id" : "110312",
                        "name" : "Translesion synthesis by REV1"
                     },
                     {
                        "name" : "Translesion Synthesis by POLH",
                        "id" : "110320"
                     },
                     {
                        "name" : "Translesion synthesis by POLK",
                        "id" : "5655862"
                     },
                     {
                        "id" : "5656121",
                        "name" : "Translesion synthesis by POLI"
                     },
                     {
                        "id" : "5656169",
                        "name" : "Termination of translesion DNA synthesis"
                     }
                  ],
                  "name" : "Translesion synthesis by Y family DNA polymerases bypasses lesions on DNA template",
                  "id" : "110313"
               }
            ],
            "id" : "73893"
         },
         {
            "name" : "DNA Damage Reversal",
            "children" : [
               {
                  "id" : "5657655",
                  "name" : "MGMT-mediated DNA damage reversal"
               },
               {
                  "children" : [
                     {
                        "id" : "112122",
                        "name" : "ALKBH2 mediated reversal of alkylation damage"
                     },
                     {
                        "name" : "ALKBH3 mediated reversal of alkylation damage",
                        "id" : "112126"
                     }
                  ],
                  "name" : "Reversal of alkylation damage by DNA dioxygenases",
                  "id" : "73943"
               }
            ],
            "id" : "73942"
         },
         {
            "id" : "5693532",
            "children" : [
               {
                  "id" : "5693606",
                  "name" : "DNA Double Strand Break Response",
                  "children" : [
                     {
                        "id" : "5693548",
                        "name" : "Sensing of DNA Double Strand Breaks"
                     },
                     {
                        "id" : "5693565",
                        "name" : "Recruitment and ATM-mediated phosphorylation of repair and signaling proteins at DNA double strand breaks"
                     }
                  ]
               },
               {
                  "name" : "Homology Directed Repair",
                  "children" : [
                     {
                        "id" : "5693567",
                        "children" : [
                           {
                              "name" : "Processing of DNA double-strand break ends",
                              "id" : "5693607"
                           },
                           {
                              "name" : "HDR through Homologous Recombination (HRR)",
                              "children" : [
                                 {
                                    "name" : "Homologous DNA Pairing and Strand Exchange",
                                    "children" : [
                                       {
                                          "name" : "Presynaptic phase of homologous DNA pairing and strand exchange",
                                          "id" : "5693616"
                                       }
                                    ],
                                    "id" : "5693579"
                                 },
                                 {
                                    "id" : "5693537",
                                    "name" : "Resolution of D-Loop Structures",
                                    "children" : [
                                       {
                                          "id" : "5693568",
                                          "name" : "Resolution of D-loop Structures through Holliday Junction Intermediates"
                                       },
                                       {
                                          "id" : "5693554",
                                          "name" : "Resolution of D-loop Structures through Synthesis-Dependent Strand Annealing (SDSA)"
                                       }
                                    ]
                                 }
                              ],
                              "id" : "5685942"
                           },
                           {
                              "id" : "5685938",
                              "name" : "HDR through Single Strand Annealing (SSA)"
                           }
                        ],
                        "name" : "HDR through Homologous Recombination (HR) or Single Strand Annealing (SSA)"
                     },
                     {
                        "id" : "5685939",
                        "name" : "HDR through MMEJ (alt-NHEJ)"
                     }
                  ],
                  "id" : "5693538"
               },
               {
                  "id" : "5693571",
                  "name" : "Nonhomologous End-Joining (NHEJ)"
               }
            ],
            "name" : "DNA Double-Strand Break Repair"
         },
         {
            "id" : "5696398",
            "name" : "Nucleotide Excision Repair",
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "5696394",
                        "name" : "DNA Damage Recognition in GG-NER"
                     },
                     {
                        "id" : "5696395",
                        "name" : "Formation of Incision Complex in GG-NER"
                     },
                     {
                        "name" : "Dual Incision in GG-NER",
                        "id" : "5696400"
                     },
                     {
                        "name" : "Gap-filling DNA repair synthesis and ligation in GG-NER",
                        "id" : "5696397"
                     }
                  ],
                  "name" : "Global Genome Nucleotide Excision Repair (GG-NER)",
                  "id" : "5696399"
               },
               {
                  "children" : [
                     {
                        "id" : "6781823",
                        "name" : "Formation of TC-NER Pre-Incision Complex"
                     },
                     {
                        "name" : "Dual incision in TC-NER",
                        "id" : "6782135"
                     },
                     {
                        "id" : "6782210",
                        "name" : "Gap-filling DNA repair synthesis and ligation in TC-NER"
                     }
                  ],
                  "name" : "Transcription-Coupled Nucleotide Excision Repair (TC-NER)",
                  "id" : "6781827"
               }
            ]
         },
         {
            "name" : "Mismatch Repair",
            "children" : [
               {
                  "id" : "5358565",
                  "name" : "Mismatch repair (MMR) directed by MSH2:MSH6 (MutSalpha)"
               },
               {
                  "id" : "5358606",
                  "name" : "Mismatch repair (MMR) directed by MSH2:MSH3 (MutSbeta)"
               }
            ],
            "id" : "5358508"
         },
         {
            "id" : "6783310",
            "name" : "Fanconi Anemia Pathway"
         }
      ],
      "name" : "DNA Repair"
   },
   {
      "children" : [
         {
            "id" : "68874",
            "children" : [
               {
                  "name" : "DNA Replication Pre-Initiation",
                  "children" : [
                     {
                        "id" : "68867",
                        "name" : "Assembly of the pre-replicative complex",
                        "children" : [
                           {
                              "id" : "68616",
                              "name" : "Assembly of the ORC complex at the origin of replication"
                           },
                           {
                              "name" : "CDC6 association with the ORC:origin complex",
                              "id" : "68689"
                           },
                           {
                              "id" : "68827",
                              "name" : "CDT1 association with the CDC6:ORC:origin complex"
                           }
                        ]
                     },
                     {
                        "name" : "Activation of the pre-replicative complex",
                        "id" : "68962"
                     }
                  ],
                  "id" : "69002"
               }
            ],
            "name" : "M/G1 Transition"
         },
         {
            "children" : [
               {
                  "name" : "DNA replication initiation",
                  "id" : "68952"
               },
               {
                  "id" : "69052",
                  "name" : "Switching of origins to a post-replicative state",
                  "children" : [
                     {
                        "name" : "Orc1 removal from chromatin",
                        "id" : "68949"
                     },
                     {
                        "id" : "69017",
                        "name" : "CDK-mediated phosphorylation and removal of Cdc6"
                     }
                  ]
               },
               {
                  "id" : "69190",
                  "name" : "DNA strand elongation",
                  "children" : [
                     {
                        "id" : "176974",
                        "name" : "Unwinding of DNA"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Polymerase switching",
                              "id" : "69091"
                           }
                        ],
                        "name" : "Leading Strand Synthesis",
                        "id" : "69109"
                     },
                     {
                        "id" : "69186",
                        "children" : [
                           {
                              "id" : "69091",
                              "name" : "Polymerase switching"
                           },
                           {
                              "id" : "69183",
                              "children" : [
                                 {
                                    "name" : "Removal of the Flap Intermediate",
                                    "id" : "69166"
                                 }
                              ],
                              "name" : "Processive synthesis on the lagging strand"
                           }
                        ],
                        "name" : "Lagging Strand Synthesis"
                     }
                  ]
               }
            ],
            "name" : "Synthesis of DNA",
            "id" : "69239"
         },
         {
            "children" : [
               {
                  "name" : "Association of licensing factors with the pre-replicative complex",
                  "id" : "69298"
               },
               {
                  "id" : "69300",
                  "children" : [
                     {
                        "name" : "Orc1 removal from chromatin",
                        "id" : "68949"
                     },
                     {
                        "id" : "69017",
                        "name" : "CDK-mediated phosphorylation and removal of Cdc6"
                     }
                  ],
                  "name" : "Removal of licensing factors from origins"
               }
            ],
            "name" : "Regulation of DNA replication",
            "id" : "69304"
         }
      ],
      "name" : "DNA Replication",
      "id" : "69306"
   },
   {
      "name" : "Extracellular matrix organization",
      "children" : [
         {
            "name" : "Collagen formation",
            "children" : [
               {
                  "id" : "1650814",
                  "name" : "Collagen biosynthesis and modifying enzymes"
               },
               {
                  "children" : [
                     {
                        "id" : "2214320",
                        "name" : "Anchoring fibril formation"
                     },
                     {
                        "name" : "Crosslinking of collagen fibrils",
                        "id" : "2243919"
                     }
                  ],
                  "name" : "Assembly of collagen fibrils and other multimeric structures",
                  "id" : "2022090"
               }
            ],
            "id" : "1474290"
         },
         {
            "id" : "1566977",
            "name" : "Fibronectin matrix formation"
         },
         {
            "id" : "1566948",
            "name" : "Elastic fibre formation",
            "children" : [
               {
                  "id" : "2129379",
                  "name" : "Molecules associated with elastic fibres"
               }
            ]
         },
         {
            "name" : "Laminin interactions",
            "id" : "3000157"
         },
         {
            "id" : "3000171",
            "name" : "Non-integrin membrane-ECM interactions",
            "children" : [
               {
                  "name" : "Syndecan interactions",
                  "id" : "3000170"
               }
            ]
         },
         {
            "id" : "3000178",
            "name" : "ECM proteoglycans"
         },
         {
            "id" : "1474228",
            "children" : [
               {
                  "id" : "1592389",
                  "name" : "Activation of Matrix Metalloproteinases"
               },
               {
                  "name" : "Collagen degradation",
                  "id" : "1442490"
               }
            ],
            "name" : "Degradation of the extracellular matrix"
         },
         {
            "id" : "216083",
            "name" : "Integrin cell surface interactions"
         }
      ],
      "id" : "1474244"
   },
   {
      "name" : "Gene Expression",
      "children" : [
         {
            "id" : "212436",
            "name" : "Generic Transcription Pathway",
            "children" : [
               {
                  "id" : "350054",
                  "name" : "Notch-HLH transcription pathway"
               },
               {
                  "id" : "383280",
                  "name" : "Nuclear Receptor transcription pathway"
               },
               {
                  "id" : "2032785",
                  "name" : "YAP1- and WWTR1 (TAZ)-stimulated gene expression"
               },
               {
                  "id" : "2173793",
                  "name" : "Transcriptional activity of SMAD2/SMAD3:SMAD4 heterotrimer",
                  "children" : [
                     {
                        "id" : "2173796",
                        "name" : "SMAD2/SMAD3:SMAD4 heterotrimer regulates transcription"
                     },
                     {
                        "id" : "2173795",
                        "name" : "Downregulation of SMAD2/3:SMAD4 transcriptional activity"
                     }
                  ]
               },
               {
                  "id" : "3700989",
                  "name" : "Transcriptional Regulation by TP53",
                  "children" : [
                     {
                        "name" : "TP53 Regulates Metabolic Genes",
                        "id" : "5628897"
                     }
                  ]
               }
            ]
         },
         {
            "id" : "504046",
            "name" : "RNA Polymerase I, RNA Polymerase III, and Mitochondrial Transcription",
            "children" : [
               {
                  "name" : "RNA Polymerase I Transcription",
                  "children" : [
                     {
                        "id" : "73854",
                        "children" : [
                           {
                              "name" : "RNA Polymerase I Promoter Opening",
                              "id" : "73728"
                           },
                           {
                              "id" : "73762",
                              "name" : "RNA Polymerase I Transcription Initiation"
                           },
                           {
                              "id" : "73772",
                              "name" : "RNA Polymerase I Promoter Escape"
                           }
                        ],
                        "name" : "RNA Polymerase I Promoter Clearance"
                     },
                     {
                        "name" : "RNA Polymerase I Chain Elongation",
                        "id" : "73777"
                     },
                     {
                        "name" : "RNA Polymerase I Transcription Termination",
                        "id" : "73863"
                     }
                  ],
                  "id" : "73864"
               },
               {
                  "children" : [
                     {
                        "name" : "RNA Polymerase III Abortive And Retractive Initiation",
                        "id" : "749476"
                     },
                     {
                        "id" : "76046",
                        "name" : "RNA Polymerase III Transcription Initiation",
                        "children" : [
                           {
                              "id" : "76061",
                              "name" : "RNA Polymerase III Transcription Initiation From Type 1 Promoter"
                           },
                           {
                              "id" : "76066",
                              "name" : "RNA Polymerase III Transcription Initiation From Type 2 Promoter"
                           },
                           {
                              "name" : "RNA Polymerase III Transcription Initiation From Type 3 Promoter",
                              "id" : "76071"
                           }
                        ]
                     },
                     {
                        "name" : "RNA Polymerase III Chain Elongation",
                        "id" : "73780"
                     },
                     {
                        "id" : "73980",
                        "name" : "RNA Polymerase III Transcription Termination"
                     }
                  ],
                  "name" : "RNA Polymerase III Transcription",
                  "id" : "74158"
               },
               {
                  "id" : "75944",
                  "name" : "Transcription from mitochondrial promoters",
                  "children" : [
                     {
                        "id" : "163282",
                        "name" : "Mitochondrial transcription initiation"
                     },
                     {
                        "name" : "Mitochondrial transcription termination",
                        "id" : "163316"
                     }
                  ]
               }
            ]
         },
         {
            "id" : "73857",
            "children" : [
               {
                  "id" : "674695",
                  "name" : "RNA Polymerase II Pre-transcription Events"
               },
               {
                  "name" : "RNA Polymerase II Transcription Pre-Initiation And Promoter Opening",
                  "id" : "73779"
               },
               {
                  "id" : "76042",
                  "name" : "RNA Polymerase II Transcription Initiation And Promoter Clearance",
                  "children" : [
                     {
                        "id" : "75953",
                        "name" : "RNA Polymerase II Transcription Initiation"
                     },
                     {
                        "name" : "RNA Polymerase II Promoter Escape",
                        "id" : "73776"
                     }
                  ]
               },
               {
                  "name" : "RNA Pol II CTD phosphorylation and interaction with CE",
                  "id" : "77075"
               },
               {
                  "id" : "75955",
                  "name" : "RNA Polymerase II Transcription Elongation",
                  "children" : [
                     {
                        "name" : "Formation of the Early Elongation Complex",
                        "id" : "113418"
                     },
                     {
                        "id" : "112382",
                        "name" : "Formation of RNA Pol II elongation complex "
                     }
                  ]
               },
               {
                  "children" : [
                     {
                        "id" : "109688",
                        "name" : "Cleavage of Growing Transcript in the Termination Region "
                     }
                  ],
                  "name" : "RNA Polymerase II Transcription Termination",
                  "id" : "73856"
               }
            ],
            "name" : "RNA Polymerase II Transcription"
         },
         {
            "id" : "72086",
            "name" : "mRNA Capping"
         },
         {
            "id" : "72203",
            "name" : "Processing of Capped Intron-Containing Pre-mRNA",
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "72163",
                        "name" : "mRNA Splicing - Major Pathway"
                     },
                     {
                        "name" : "mRNA Splicing - Minor Pathway",
                        "id" : "72165"
                     }
                  ],
                  "name" : "mRNA Splicing",
                  "id" : "72172"
               },
               {
                  "name" : "mRNA 3'-end processing",
                  "id" : "72187"
               },
               {
                  "name" : "Transport of Mature Transcript to Cytoplasm",
                  "children" : [
                     {
                        "name" : "Transport of Mature mRNA derived from an Intron-Containing Transcript",
                        "id" : "159236"
                     },
                     {
                        "id" : "159234",
                        "name" : "Transport of Mature mRNAs Derived from Intronless Transcripts",
                        "children" : [
                           {
                              "id" : "159230",
                              "name" : "Transport of the SLBP Dependant Mature mRNA"
                           },
                           {
                              "name" : "Transport of the SLBP independent Mature mRNA",
                              "id" : "159227"
                           },
                           {
                              "name" : "Transport of Mature mRNA Derived from an Intronless Transcript",
                              "id" : "159231"
                           }
                        ]
                     }
                  ],
                  "id" : "72202"
               }
            ]
         },
         {
            "id" : "75067",
            "name" : "Processing of Capped Intronless Pre-mRNA",
            "children" : [
               {
                  "name" : "SLBP Dependent Processing of Replication-Dependent Histone Pre-mRNAs",
                  "id" : "77588"
               },
               {
                  "name" : "SLBP independent Processing of Histone Pre-mRNAs",
                  "id" : "111367"
               },
               {
                  "id" : "77595",
                  "name" : "Processing of Intronless Pre-mRNAs"
               }
            ]
         },
         {
            "name" : "mRNA Editing",
            "children" : [
               {
                  "children" : [
                     {
                        "name" : "Formation of the Editosome",
                        "id" : "75094"
                     }
                  ],
                  "name" : "mRNA Editing: C to U Conversion",
                  "id" : "72200"
               },
               {
                  "id" : "75064",
                  "name" : "mRNA Editing: A to I Conversion",
                  "children" : [
                     {
                        "id" : "77042",
                        "name" : "Formation of editosomes by ADAR proteins"
                     },
                     {
                        "id" : "75102",
                        "name" : "C6 deamination of adenosine"
                     }
                  ]
               }
            ],
            "id" : "75072"
         },
         {
            "name" : "tRNA processing",
            "children" : [
               {
                  "id" : "6784531",
                  "name" : "tRNA processing in the nucleus"
               },
               {
                  "children" : [
                     {
                        "id" : "6782861",
                        "name" : "Synthesis of wybutosine at G37 of tRNA(Phe)"
                     }
                  ],
                  "name" : "tRNA modification in the nucleus and cytosol",
                  "id" : "6782315"
               },
               {
                  "name" : "tRNA processing in the mitochondrion",
                  "id" : "6785470"
               },
               {
                  "id" : "6787450",
                  "name" : "tRNA modification in the mitochondrion"
               }
            ],
            "id" : "72306"
         },
         {
            "children" : [
               {
                  "id" : "379716",
                  "name" : "Cytosolic tRNA aminoacylation"
               },
               {
                  "name" : "Mitochondrial tRNA aminoacylation",
                  "id" : "379726"
               }
            ],
            "name" : "tRNA Aminoacylation",
            "id" : "379724"
         },
         {
            "id" : "429914",
            "name" : "Deadenylation-dependent mRNA decay",
            "children" : [
               {
                  "id" : "429947",
                  "name" : "Deadenylation of mRNA"
               },
               {
                  "id" : "429958",
                  "name" : "mRNA decay by 3' to 5' exoribonuclease"
               },
               {
                  "name" : "mRNA decay by 5' to 3' exoribonuclease",
                  "id" : "430039"
               }
            ]
         },
         {
            "children" : [
               {
                  "id" : "975957",
                  "name" : "Nonsense Mediated Decay (NMD) enhanced by the Exon Junction Complex (EJC)"
               },
               {
                  "id" : "975956",
                  "name" : "Nonsense Mediated Decay (NMD) independent of the Exon Junction Complex (EJC)"
               }
            ],
            "name" : "Nonsense-Mediated Decay (NMD)",
            "id" : "927802"
         },
         {
            "id" : "211000",
            "children" : [
               {
                  "id" : "203927",
                  "name" : "MicroRNA (miRNA) biogenesis"
               },
               {
                  "id" : "426486",
                  "name" : "Small interfering RNA (siRNA) biogenesis"
               },
               {
                  "name" : "Post-transcriptional silencing by small RNAs",
                  "id" : "426496"
               },
               {
                  "name" : "Transcriptional regulation by small RNAs",
                  "id" : "5578749"
               },
               {
                  "id" : "5601884",
                  "name" : "PIWI-interacting RNA (piRNA) biogenesis"
               }
            ],
            "name" : "Gene Silencing by RNA"
         },
         {
            "id" : "450531",
            "children" : [
               {
                  "name" : "AUF1 (hnRNP D0) binds and destabilizes mRNA",
                  "id" : "450408"
               },
               {
                  "id" : "450385",
                  "name" : "Butyrate Response Factor 1 (BRF1) binds and destabilizes mRNA"
               },
               {
                  "name" : "Tristetraprolin (TTP, ZFP36) binds and destabilizes mRNA",
                  "id" : "450513"
               },
               {
                  "id" : "450604",
                  "name" : "KSRP (KHSRP) binds and destabilizes mRNA"
               },
               {
                  "id" : "450520",
                  "name" : "HuR (ELAVL1) binds and stabilizes mRNA"
               }
            ],
            "name" : "Regulation of mRNA stability by proteins that bind AU-rich elements"
         },
         {
            "id" : "72766",
            "name" : "Translation",
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "72737",
                        "name" : "Cap-dependent Translation Initiation",
                        "children" : [
                           {
                              "name" : "Formation of a pool of free 40S subunits",
                              "id" : "72689"
                           },
                           {
                              "name" : "Formation of the ternary complex, and subsequently, the 43S complex",
                              "id" : "72695"
                           },
                           {
                              "id" : "72662",
                              "children" : [
                                 {
                                    "name" : "Translation initiation complex formation",
                                    "id" : "72649"
                                 }
                              ],
                              "name" : "Activation of the mRNA upon binding of the cap-binding complex and eIFs, and subsequent binding to 43S"
                           },
                           {
                              "id" : "72702",
                              "name" : "Ribosomal scanning and start codon recognition"
                           },
                           {
                              "name" : "GTP hydrolysis and joining of the 60S ribosomal subunit",
                              "id" : "72706"
                           },
                           {
                              "name" : "Recycling of eIF2:GDP",
                              "id" : "72731"
                           }
                        ]
                     },
                     {
                        "name" : "L13a-mediated translational silencing of Ceruloplasmin expression",
                        "id" : "156827"
                     }
                  ],
                  "name" : "Eukaryotic Translation Initiation",
                  "id" : "72613"
               },
               {
                  "name" : "SRP-dependent cotranslational protein targeting to membrane",
                  "id" : "1799339"
               },
               {
                  "id" : "156842",
                  "name" : "Eukaryotic Translation Elongation",
                  "children" : [
                     {
                        "name" : "Peptide chain elongation",
                        "id" : "156902"
                     }
                  ]
               },
               {
                  "name" : "Eukaryotic Translation Termination",
                  "id" : "72764"
               }
            ]
         },
         {
            "id" : "194441",
            "name" : "Metabolism of non-coding RNA",
            "children" : [
               {
                  "id" : "191859",
                  "name" : "snRNP Assembly"
               }
            ]
         },
         {
            "name" : "Insulin-like Growth Factor-2 mRNA Binding Proteins (IGF2BPs/IMPs/VICKZs) bind RNA",
            "id" : "428359"
         },
         {
            "id" : "212165",
            "name" : "Epigenetic regulation of gene expression",
            "children" : [
               {
                  "id" : "212300",
                  "name" : "PRC2 methylates histones and DNA"
               },
               {
                  "id" : "5221030",
                  "name" : "TET1,2,3 and TDG demethylate DNA"
               },
               {
                  "children" : [
                     {
                        "id" : "5250924",
                        "name" : "B-WICH complex positively regulates rRNA expression"
                     }
                  ],
                  "name" : "Positive epigenetic regulation of rRNA expression",
                  "id" : "5250913"
               },
               {
                  "name" : "Negative epigenetic regulation of rRNA expression",
                  "children" : [
                     {
                        "name" : "SIRT1 negatively regulates rRNA Expression",
                        "id" : "427359"
                     },
                     {
                        "id" : "427413",
                        "name" : "NoRC negatively regulates rRNA expression"
                     }
                  ],
                  "id" : "5250941"
               },
               {
                  "id" : "5334118",
                  "name" : "DNA methylation"
               }
            ]
         }
      ],
      "id" : "74160"
   },
   {
      "id" : "109582",
      "children" : [
         {
            "id" : "418346",
            "children" : [
               {
                  "id" : "392851",
                  "name" : "Prostacyclin signalling through prostacyclin receptor"
               },
               {
                  "children" : [
                     {
                        "name" : "cGMP effects",
                        "id" : "418457"
                     }
                  ],
                  "name" : "Nitric oxide stimulates guanylate cyclase",
                  "id" : "392154"
               },
               {
                  "children" : [
                     {
                        "id" : "139853",
                        "name" : "Elevation of cytosolic Ca2+ levels"
                     },
                     {
                        "name" : "Reduction of cytosolic Ca++ levels",
                        "id" : "418359"
                     }
                  ],
                  "name" : "Platelet calcium homeostasis",
                  "id" : "418360"
               },
               {
                  "name" : "Platelet sensitization by LDL",
                  "id" : "432142"
               }
            ],
            "name" : "Platelet homeostasis"
         },
         {
            "id" : "75892",
            "name" : "Platelet Adhesion to exposed collagen"
         },
         {
            "children" : [
               {
                  "name" : "GP1b-IX-V activation signalling",
                  "id" : "430116"
               },
               {
                  "id" : "392518",
                  "children" : [
                     {
                        "name" : "ADP signalling through P2Y purinoceptor 12",
                        "id" : "392170"
                     },
                     {
                        "name" : "ADP signalling through P2Y purinoceptor 1",
                        "id" : "418592"
                     },
                     {
                        "name" : "Thromboxane signalling through TP receptor",
                        "id" : "428930"
                     }
                  ],
                  "name" : "Signal amplification"
               },
               {
                  "name" : "Thrombin signalling through proteinase activated receptors (PARs)",
                  "id" : "456926"
               },
               {
                  "id" : "114604",
                  "name" : "GPVI-mediated activation cascade"
               },
               {
                  "name" : "Platelet Aggregation (Plug Formation)",
                  "children" : [
                     {
                        "id" : "354192",
                        "children" : [
                           {
                              "id" : "354194",
                              "name" : "GRB2:SOS provides linkage to MAPK signaling for Integrins "
                           },
                           {
                              "name" : "p130Cas linkage to MAPK signaling for integrins",
                              "id" : "372708"
                           }
                        ],
                        "name" : "Integrin alphaIIb beta3 signaling"
                     },
                     {
                        "name" : "Adrenaline signalling through Alpha-2 adrenergic receptor",
                        "id" : "392023"
                     }
                  ],
                  "id" : "76009"
               },
               {
                  "id" : "114508",
                  "children" : [
                     {
                        "id" : "426048",
                        "name" : "Arachidonate production from DAG"
                     }
                  ],
                  "name" : "Effects of PIP2 hydrolysis"
               },
               {
                  "name" : "Response to elevated platelet cytosolic Ca2+",
                  "children" : [
                     {
                        "id" : "114516",
                        "name" : "Disinhibition of SNARE formation"
                     },
                     {
                        "name" : "Platelet degranulation ",
                        "id" : "114608"
                     }
                  ],
                  "id" : "76005"
               }
            ],
            "name" : "Platelet activation, signaling and aggregation",
            "id" : "76002"
         },
         {
            "name" : "Formation of Fibrin Clot (Clotting Cascade)",
            "children" : [
               {
                  "id" : "140834",
                  "name" : "Extrinsic Pathway of Fibrin Clot Formation"
               },
               {
                  "id" : "140837",
                  "name" : "Intrinsic Pathway of Fibrin Clot Formation"
               },
               {
                  "name" : "Common Pathway of Fibrin Clot Formation",
                  "id" : "140875"
               }
            ],
            "id" : "140877"
         },
         {
            "name" : "Dissolution of Fibrin Clot",
            "id" : "75205"
         },
         {
            "name" : "Cell surface interactions at the vascular wall",
            "children" : [
               {
                  "name" : "Tie2 Signaling",
                  "id" : "210993"
               },
               {
                  "id" : "210990",
                  "name" : "PECAM1 interactions"
               },
               {
                  "id" : "210991",
                  "name" : "Basigin interactions"
               }
            ],
            "id" : "202733"
         },
         {
            "children" : [
               {
                  "id" : "983189",
                  "name" : "Kinesins"
               }
            ],
            "name" : "Factors involved in megakaryocyte development and platelet production",
            "id" : "983231"
         }
      ],
      "name" : "Hemostasis"
   },
   {
      "name" : "Immune System",
      "children" : [
         {
            "id" : "1280218",
            "children" : [
               {
                  "id" : "202403",
                  "name" : "TCR signaling",
                  "children" : [
                     {
                        "id" : "202427",
                        "name" : "Phosphorylation of CD3 and TCR zeta chains"
                     },
                     {
                        "id" : "202430",
                        "name" : "Translocation of ZAP-70 to Immunological synapse"
                     },
                     {
                        "name" : "Generation of second messenger molecules",
                        "id" : "202433"
                     },
                     {
                        "name" : "Downstream TCR signaling",
                        "id" : "202424"
                     }
                  ]
               },
               {
                  "id" : "388841",
                  "children" : [
                     {
                        "id" : "389356",
                        "children" : [
                           {
                              "name" : "CD28 dependent PI3K/Akt signaling",
                              "id" : "389357"
                           },
                           {
                              "name" : "CD28 dependent Vav1 pathway",
                              "id" : "389359"
                           }
                        ],
                        "name" : "CD28 co-stimulation"
                     },
                     {
                        "name" : "CTLA4 inhibitory signaling",
                        "id" : "389513"
                     },
                     {
                        "name" : "PD-1 signaling",
                        "id" : "389948"
                     }
                  ],
                  "name" : "Costimulation by the CD28 family"
               },
               {
                  "children" : [
                     {
                        "id" : "983695",
                        "name" : "Antigen activates B Cell Receptor (BCR) leading to generation of second messengers"
                     },
                     {
                        "id" : "1168372",
                        "children" : [
                           {
                              "id" : "1169091",
                              "name" : "Activation of NF-kappaB in B cells"
                           },
                           {
                              "name" : "Activation of RAS in B cells",
                              "id" : "1169092"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "AKT phosphorylates targets in the cytosol",
                                    "id" : "198323"
                                 },
                                 {
                                    "id" : "198693",
                                    "name" : "AKT phosphorylates targets in the nucleus"
                                 },
                                 {
                                    "name" : "Negative regulation of the PI3K/AKT network",
                                    "id" : "199418"
                                 }
                              ],
                              "name" : "PIP3 activates AKT signaling",
                              "id" : "1257604"
                           }
                        ],
                        "name" : "Downstream signaling events of B Cell Receptor (BCR)"
                     },
                     {
                        "id" : "5690714",
                        "name" : "CD22 mediated BCR regulation"
                     }
                  ],
                  "name" : "Signaling by the B Cell Receptor (BCR)",
                  "id" : "983705"
               },
               {
                  "name" : "Class I MHC mediated antigen processing & presentation",
                  "children" : [
                     {
                        "id" : "983168",
                        "name" : "Antigen processing: Ubiquitination & Proteasome degradation"
                     },
                     {
                        "name" : "Antigen Presentation: Folding, assembly and peptide loading of class I MHC",
                        "id" : "983170"
                     },
                     {
                        "id" : "1236975",
                        "children" : [
                           {
                              "id" : "1236973",
                              "name" : "Cross-presentation of particulate exogenous antigens (phagosomes)"
                           },
                           {
                              "id" : "1236974",
                              "name" : "ER-Phagosome pathway"
                           },
                           {
                              "id" : "1236977",
                              "name" : "Endosomal/Vacuolar pathway"
                           },
                           {
                              "name" : "Cross-presentation of soluble exogenous antigens (endosomes)",
                              "id" : "1236978"
                           }
                        ],
                        "name" : "Antigen processing-Cross presentation"
                     }
                  ],
                  "id" : "983169"
               },
               {
                  "name" : "MHC class II antigen presentation",
                  "id" : "2132295"
               },
               {
                  "name" : "Immunoregulatory interactions between a Lymphoid and a non-Lymphoid cell",
                  "id" : "198933"
               },
               {
                  "id" : "392517",
                  "name" : "Rap1 signalling"
               }
            ],
            "name" : "Adaptive Immune System"
         },
         {
            "children" : [
               {
                  "name" : "Toll-Like Receptors Cascades",
                  "children" : [
                     {
                        "name" : "Trafficking and processing of endosomal TLR",
                        "id" : "1679131"
                     },
                     {
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "937039",
                                    "name" : "IRAK1 recruits IKK complex"
                                 },
                                 {
                                    "id" : "937042",
                                    "name" : "IRAK2 mediated activation of TAK1 complex"
                                 },
                                 {
                                    "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex",
                                    "id" : "445989"
                                 },
                                 {
                                    "children" : [
                                       {
                                          "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1",
                                          "id" : "450321"
                                       },
                                       {
                                          "id" : "450302",
                                          "name" : "activated TAK1 mediates p38 MAPK activation"
                                       },
                                       {
                                          "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                                          "id" : "5684264"
                                       },
                                       {
                                          "id" : "450282",
                                          "children" : [
                                             {
                                                "children" : [
                                                   {
                                                      "name" : "ERKs are inactivated",
                                                      "id" : "202670"
                                                   }
                                                ],
                                                "name" : "ERK/MAPK targets",
                                                "id" : "198753"
                                             },
                                             {
                                                "id" : "199920",
                                                "name" : "CREB phosphorylation"
                                             },
                                             {
                                                "id" : "450341",
                                                "name" : "Activation of the AP-1 family of transcription factors"
                                             }
                                          ],
                                          "name" : "MAPK targets/ Nuclear events mediated by MAP kinases"
                                       }
                                    ],
                                    "name" : "MAP kinase activation in TLR cascade",
                                    "id" : "450294"
                                 }
                              ],
                              "name" : "MyD88 cascade initiated on plasma membrane",
                              "id" : "975871"
                           }
                        ],
                        "name" : "Toll Like Receptor 10 (TLR10) Cascade",
                        "id" : "168142"
                     },
                     {
                        "id" : "168164",
                        "children" : [
                           {
                              "id" : "166166",
                              "name" : "MyD88-independent TLR3/TLR4 cascade ",
                              "children" : [
                                 {
                                    "name" : "TRIF-mediated TLR3/TLR4 signaling ",
                                    "children" : [
                                       {
                                          "id" : "936964",
                                          "name" : "Activation of IRF3/IRF7 mediated by TBK1/IKK epsilon"
                                       },
                                       {
                                          "id" : "937041",
                                          "name" : "IKK complex recruitment mediated by RIP1"
                                       },
                                       {
                                          "name" : "TRIF-mediated programmed cell death",
                                          "id" : "2562578"
                                       },
                                       {
                                          "id" : "937072",
                                          "name" : "TRAF6 mediated induction of TAK1 complex"
                                       },
                                       {
                                          "id" : "445989",
                                          "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex"
                                       },
                                       {
                                          "name" : "MAP kinase activation in TLR cascade",
                                          "children" : [
                                             {
                                                "id" : "450321",
                                                "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1"
                                             },
                                             {
                                                "name" : "activated TAK1 mediates p38 MAPK activation",
                                                "id" : "450302"
                                             },
                                             {
                                                "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                                                "id" : "5684264"
                                             },
                                             {
                                                "id" : "450282",
                                                "name" : "MAPK targets/ Nuclear events mediated by MAP kinases",
                                                "children" : [
                                                   {
                                                      "children" : [
                                                         {
                                                            "id" : "202670",
                                                            "name" : "ERKs are inactivated"
                                                         }
                                                      ],
                                                      "name" : "ERK/MAPK targets",
                                                      "id" : "198753"
                                                   },
                                                   {
                                                      "name" : "CREB phosphorylation",
                                                      "id" : "199920"
                                                   },
                                                   {
                                                      "id" : "450341",
                                                      "name" : "Activation of the AP-1 family of transcription factors"
                                                   }
                                                ]
                                             }
                                          ],
                                          "id" : "450294"
                                       }
                                    ],
                                    "id" : "937061"
                                 }
                              ]
                           }
                        ],
                        "name" : "Toll Like Receptor 3 (TLR3) Cascade"
                     },
                     {
                        "children" : [
                           {
                              "name" : "MyD88 cascade initiated on plasma membrane",
                              "children" : [
                                 {
                                    "id" : "937039",
                                    "name" : "IRAK1 recruits IKK complex"
                                 },
                                 {
                                    "name" : "IRAK2 mediated activation of TAK1 complex",
                                    "id" : "937042"
                                 },
                                 {
                                    "id" : "445989",
                                    "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex"
                                 },
                                 {
                                    "id" : "450294",
                                    "children" : [
                                       {
                                          "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1",
                                          "id" : "450321"
                                       },
                                       {
                                          "id" : "450302",
                                          "name" : "activated TAK1 mediates p38 MAPK activation"
                                       },
                                       {
                                          "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                                          "id" : "5684264"
                                       },
                                       {
                                          "children" : [
                                             {
                                                "name" : "ERK/MAPK targets",
                                                "children" : [
                                                   {
                                                      "name" : "ERKs are inactivated",
                                                      "id" : "202670"
                                                   }
                                                ],
                                                "id" : "198753"
                                             },
                                             {
                                                "name" : "CREB phosphorylation",
                                                "id" : "199920"
                                             },
                                             {
                                                "id" : "450341",
                                                "name" : "Activation of the AP-1 family of transcription factors"
                                             }
                                          ],
                                          "name" : "MAPK targets/ Nuclear events mediated by MAP kinases",
                                          "id" : "450282"
                                       }
                                    ],
                                    "name" : "MAP kinase activation in TLR cascade"
                                 }
                              ],
                              "id" : "975871"
                           }
                        ],
                        "name" : "Toll Like Receptor 5 (TLR5) Cascade",
                        "id" : "168176"
                     },
                     {
                        "children" : [
                           {
                              "id" : "975155",
                              "name" : "MyD88 dependent cascade initiated on endosome",
                              "children" : [
                                 {
                                    "id" : "975138",
                                    "children" : [
                                       {
                                          "name" : "IRAK1 recruits IKK complex upon TLR7/8 or 9 stimulation",
                                          "id" : "975144"
                                       },
                                       {
                                          "name" : "IRAK2 mediated activation of TAK1 complex upon TLR7/8 or 9 stimulation",
                                          "id" : "975163"
                                       },
                                       {
                                          "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex",
                                          "id" : "445989"
                                       },
                                       {
                                          "id" : "450294",
                                          "children" : [
                                             {
                                                "id" : "450321",
                                                "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1"
                                             },
                                             {
                                                "id" : "450302",
                                                "name" : "activated TAK1 mediates p38 MAPK activation"
                                             },
                                             {
                                                "id" : "5684264",
                                                "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation"
                                             },
                                             {
                                                "id" : "450282",
                                                "name" : "MAPK targets/ Nuclear events mediated by MAP kinases",
                                                "children" : [
                                                   {
                                                      "id" : "198753",
                                                      "name" : "ERK/MAPK targets",
                                                      "children" : [
                                                         {
                                                            "name" : "ERKs are inactivated",
                                                            "id" : "202670"
                                                         }
                                                      ]
                                                   },
                                                   {
                                                      "name" : "CREB phosphorylation",
                                                      "id" : "199920"
                                                   },
                                                   {
                                                      "id" : "450341",
                                                      "name" : "Activation of the AP-1 family of transcription factors"
                                                   }
                                                ]
                                             }
                                          ],
                                          "name" : "MAP kinase activation in TLR cascade"
                                       }
                                    ],
                                    "name" : "TRAF6 mediated induction of NFkB and MAP kinases upon TLR7/8 or 9 activation"
                                 },
                                 {
                                    "id" : "975110",
                                    "name" : "TRAF6 mediated IRF7 activation in TLR7/8 or 9 signaling"
                                 }
                              ]
                           }
                        ],
                        "name" : "Toll Like Receptor 7/8 (TLR7/8) Cascade",
                        "id" : "168181"
                     },
                     {
                        "id" : "168138",
                        "children" : [
                           {
                              "name" : "MyD88 dependent cascade initiated on endosome",
                              "children" : [
                                 {
                                    "id" : "975138",
                                    "children" : [
                                       {
                                          "id" : "975144",
                                          "name" : "IRAK1 recruits IKK complex upon TLR7/8 or 9 stimulation"
                                       },
                                       {
                                          "id" : "975163",
                                          "name" : "IRAK2 mediated activation of TAK1 complex upon TLR7/8 or 9 stimulation"
                                       },
                                       {
                                          "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex",
                                          "id" : "445989"
                                       },
                                       {
                                          "name" : "MAP kinase activation in TLR cascade",
                                          "children" : [
                                             {
                                                "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1",
                                                "id" : "450321"
                                             },
                                             {
                                                "id" : "450302",
                                                "name" : "activated TAK1 mediates p38 MAPK activation"
                                             },
                                             {
                                                "id" : "5684264",
                                                "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation"
                                             },
                                             {
                                                "children" : [
                                                   {
                                                      "id" : "198753",
                                                      "name" : "ERK/MAPK targets",
                                                      "children" : [
                                                         {
                                                            "name" : "ERKs are inactivated",
                                                            "id" : "202670"
                                                         }
                                                      ]
                                                   },
                                                   {
                                                      "name" : "CREB phosphorylation",
                                                      "id" : "199920"
                                                   },
                                                   {
                                                      "name" : "Activation of the AP-1 family of transcription factors",
                                                      "id" : "450341"
                                                   }
                                                ],
                                                "name" : "MAPK targets/ Nuclear events mediated by MAP kinases",
                                                "id" : "450282"
                                             }
                                          ],
                                          "id" : "450294"
                                       }
                                    ],
                                    "name" : "TRAF6 mediated induction of NFkB and MAP kinases upon TLR7/8 or 9 activation"
                                 },
                                 {
                                    "name" : "TRAF6 mediated IRF7 activation in TLR7/8 or 9 signaling",
                                    "id" : "975110"
                                 }
                              ],
                              "id" : "975155"
                           }
                        ],
                        "name" : "Toll Like Receptor 9 (TLR9) Cascade"
                     },
                     {
                        "name" : "Toll Like Receptor 4 (TLR4) Cascade",
                        "children" : [
                           {
                              "id" : "166020",
                              "name" : "Transfer of LPS from LBP carrier to CD14"
                           },
                           {
                              "name" : "Activated TLR4 signalling",
                              "children" : [
                                 {
                                    "id" : "166058",
                                    "children" : [
                                       {
                                          "id" : "937042",
                                          "name" : "IRAK2 mediated activation of TAK1 complex"
                                       },
                                       {
                                          "name" : "IRAK1 recruits IKK complex",
                                          "id" : "937039"
                                       },
                                       {
                                          "id" : "445989",
                                          "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex"
                                       },
                                       {
                                          "children" : [
                                             {
                                                "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1",
                                                "id" : "450321"
                                             },
                                             {
                                                "name" : "activated TAK1 mediates p38 MAPK activation",
                                                "id" : "450302"
                                             },
                                             {
                                                "id" : "5684264",
                                                "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation"
                                             },
                                             {
                                                "id" : "450282",
                                                "children" : [
                                                   {
                                                      "id" : "198753",
                                                      "name" : "ERK/MAPK targets",
                                                      "children" : [
                                                         {
                                                            "id" : "202670",
                                                            "name" : "ERKs are inactivated"
                                                         }
                                                      ]
                                                   },
                                                   {
                                                      "name" : "CREB phosphorylation",
                                                      "id" : "199920"
                                                   },
                                                   {
                                                      "id" : "450341",
                                                      "name" : "Activation of the AP-1 family of transcription factors"
                                                   }
                                                ],
                                                "name" : "MAPK targets/ Nuclear events mediated by MAP kinases"
                                             }
                                          ],
                                          "name" : "MAP kinase activation in TLR cascade",
                                          "id" : "450294"
                                       }
                                    ],
                                    "name" : "MyD88:Mal cascade initiated on plasma membrane"
                                 },
                                 {
                                    "name" : "MyD88-independent TLR3/TLR4 cascade ",
                                    "children" : [
                                       {
                                          "id" : "937061",
                                          "children" : [
                                             {
                                                "name" : "Activation of IRF3/IRF7 mediated by TBK1/IKK epsilon",
                                                "id" : "936964"
                                             },
                                             {
                                                "id" : "937041",
                                                "name" : "IKK complex recruitment mediated by RIP1"
                                             },
                                             {
                                                "name" : "TRIF-mediated programmed cell death",
                                                "id" : "2562578"
                                             },
                                             {
                                                "name" : "TRAF6 mediated induction of TAK1 complex",
                                                "id" : "937072"
                                             },
                                             {
                                                "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex",
                                                "id" : "445989"
                                             },
                                             {
                                                "children" : [
                                                   {
                                                      "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1",
                                                      "id" : "450321"
                                                   },
                                                   {
                                                      "name" : "activated TAK1 mediates p38 MAPK activation",
                                                      "id" : "450302"
                                                   },
                                                   {
                                                      "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                                                      "id" : "5684264"
                                                   },
                                                   {
                                                      "id" : "450282",
                                                      "name" : "MAPK targets/ Nuclear events mediated by MAP kinases",
                                                      "children" : [
                                                         {
                                                            "id" : "198753",
                                                            "children" : [
                                                               {
                                                                  "name" : "ERKs are inactivated",
                                                                  "id" : "202670"
                                                               }
                                                            ],
                                                            "name" : "ERK/MAPK targets"
                                                         },
                                                         {
                                                            "name" : "CREB phosphorylation",
                                                            "id" : "199920"
                                                         },
                                                         {
                                                            "name" : "Activation of the AP-1 family of transcription factors",
                                                            "id" : "450341"
                                                         }
                                                      ]
                                                   }
                                                ],
                                                "name" : "MAP kinase activation in TLR cascade",
                                                "id" : "450294"
                                             }
                                          ],
                                          "name" : "TRIF-mediated TLR3/TLR4 signaling "
                                       }
                                    ],
                                    "id" : "166166"
                                 }
                              ],
                              "id" : "166054"
                           }
                        ],
                        "id" : "166016"
                     },
                     {
                        "id" : "181438",
                        "name" : "Toll Like Receptor 2 (TLR2) Cascade",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "IRAK2 mediated activation of TAK1 complex",
                                          "id" : "937042"
                                       },
                                       {
                                          "id" : "937039",
                                          "name" : "IRAK1 recruits IKK complex"
                                       },
                                       {
                                          "id" : "445989",
                                          "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex"
                                       },
                                       {
                                          "id" : "450294",
                                          "children" : [
                                             {
                                                "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1",
                                                "id" : "450321"
                                             },
                                             {
                                                "id" : "450302",
                                                "name" : "activated TAK1 mediates p38 MAPK activation"
                                             },
                                             {
                                                "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                                                "id" : "5684264"
                                             },
                                             {
                                                "name" : "MAPK targets/ Nuclear events mediated by MAP kinases",
                                                "children" : [
                                                   {
                                                      "id" : "198753",
                                                      "children" : [
                                                         {
                                                            "id" : "202670",
                                                            "name" : "ERKs are inactivated"
                                                         }
                                                      ],
                                                      "name" : "ERK/MAPK targets"
                                                   },
                                                   {
                                                      "id" : "199920",
                                                      "name" : "CREB phosphorylation"
                                                   },
                                                   {
                                                      "name" : "Activation of the AP-1 family of transcription factors",
                                                      "id" : "450341"
                                                   }
                                                ],
                                                "id" : "450282"
                                             }
                                          ],
                                          "name" : "MAP kinase activation in TLR cascade"
                                       }
                                    ],
                                    "name" : "MyD88:Mal cascade initiated on plasma membrane",
                                    "id" : "166058"
                                 }
                              ],
                              "name" : "Toll Like Receptor TLR1:TLR2 Cascade",
                              "id" : "168179"
                           },
                           {
                              "id" : "168188",
                              "name" : "Toll Like Receptor TLR6:TLR2 Cascade",
                              "children" : [
                                 {
                                    "name" : "MyD88:Mal cascade initiated on plasma membrane",
                                    "children" : [
                                       {
                                          "name" : "IRAK2 mediated activation of TAK1 complex",
                                          "id" : "937042"
                                       },
                                       {
                                          "id" : "937039",
                                          "name" : "IRAK1 recruits IKK complex"
                                       },
                                       {
                                          "name" : "TAK1 activates NFkB by phosphorylation and activation of IKKs complex",
                                          "id" : "445989"
                                       },
                                       {
                                          "id" : "450294",
                                          "children" : [
                                             {
                                                "id" : "450321",
                                                "name" : "JNK (c-Jun kinases) phosphorylation and  activation mediated by activated human TAK1"
                                             },
                                             {
                                                "name" : "activated TAK1 mediates p38 MAPK activation",
                                                "id" : "450302"
                                             },
                                             {
                                                "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                                                "id" : "5684264"
                                             },
                                             {
                                                "id" : "450282",
                                                "children" : [
                                                   {
                                                      "children" : [
                                                         {
                                                            "name" : "ERKs are inactivated",
                                                            "id" : "202670"
                                                         }
                                                      ],
                                                      "name" : "ERK/MAPK targets",
                                                      "id" : "198753"
                                                   },
                                                   {
                                                      "name" : "CREB phosphorylation",
                                                      "id" : "199920"
                                                   },
                                                   {
                                                      "name" : "Activation of the AP-1 family of transcription factors",
                                                      "id" : "450341"
                                                   }
                                                ],
                                                "name" : "MAPK targets/ Nuclear events mediated by MAP kinases"
                                             }
                                          ],
                                          "name" : "MAP kinase activation in TLR cascade"
                                       }
                                    ],
                                    "id" : "166058"
                                 }
                              ]
                           }
                        ]
                     }
                  ],
                  "id" : "168898"
               },
               {
                  "children" : [
                     {
                        "id" : "166663",
                        "name" : "Initial triggering of complement",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "166662",
                                    "name" : "Lectin pathway of complement activation",
                                    "children" : [
                                       {
                                          "id" : "2855086",
                                          "name" : "Ficolins bind to repetitive carbohydrate structures on the target cell surface"
                                       }
                                    ]
                                 },
                                 {
                                    "id" : "173623",
                                    "name" : "Classical antibody-mediated complement activation"
                                 }
                              ],
                              "name" : "Creation of C4 and C2 activators",
                              "id" : "166786"
                           },
                           {
                              "id" : "173736",
                              "name" : "Alternative complement activation"
                           }
                        ]
                     },
                     {
                        "id" : "174577",
                        "name" : "Activation of C3 and C5"
                     },
                     {
                        "name" : "Terminal pathway of complement",
                        "id" : "166665"
                     },
                     {
                        "name" : "Regulation of Complement cascade",
                        "id" : "977606"
                     }
                  ],
                  "name" : "Complement cascade",
                  "id" : "166658"
               },
               {
                  "id" : "168643",
                  "children" : [
                     {
                        "id" : "168638",
                        "name" : "NOD1/2 Signaling Pathway"
                     },
                     {
                        "id" : "622312",
                        "name" : "Inflammasomes",
                        "children" : [
                           {
                              "name" : "The NLRP3 inflammasome",
                              "id" : "844456"
                           },
                           {
                              "id" : "844455",
                              "name" : "The NLRP1 inflammasome"
                           },
                           {
                              "id" : "844623",
                              "name" : "The IPAF inflammasome"
                           },
                           {
                              "name" : "The AIM2 inflammasome",
                              "id" : "844615"
                           }
                        ]
                     }
                  ],
                  "name" : "Nucleotide-binding domain, leucine rich repeat containing receptor (NLR) signaling pathways"
               },
               {
                  "name" : "Advanced glycosylation endproduct receptor signaling",
                  "id" : "879415"
               },
               {
                  "children" : [
                     {
                        "id" : "918233",
                        "name" : "TRAF3-dependent IRF activation pathway"
                     },
                     {
                        "name" : "NF-kB activation through FADD/RIP-1 pathway mediated by caspase-8 and -10",
                        "id" : "933543"
                     },
                     {
                        "name" : "TRAF6 mediated IRF7 activation",
                        "id" : "933541"
                     },
                     {
                        "name" : "TRAF6 mediated NF-kB activation",
                        "id" : "933542"
                     },
                     {
                        "id" : "936440",
                        "name" : "Negative regulators of RIG-I/MDA5 signaling"
                     }
                  ],
                  "name" : "RIG-I/MDA5 mediated induction of IFN-alpha/beta pathways",
                  "id" : "168928"
               },
               {
                  "id" : "1461973",
                  "children" : [
                     {
                        "id" : "1462054",
                        "name" : "Alpha-defensins"
                     },
                     {
                        "name" : "Beta defensins",
                        "id" : "1461957"
                     }
                  ],
                  "name" : "Defensins"
               },
               {
                  "id" : "1834949",
                  "children" : [
                     {
                        "id" : "1606322",
                        "name" : "ZBP1(DAI) mediated induction of type I IFNs",
                        "children" : [
                           {
                              "name" : "IRF3 mediated activation of type 1 IFN",
                              "id" : "1606341"
                           },
                           {
                              "name" : "RIP-mediated NFkB activation via ZBP1",
                              "id" : "1810476"
                           }
                        ]
                     },
                     {
                        "id" : "1834941",
                        "children" : [
                           {
                              "name" : "IRF3-mediated induction of type I IFN",
                              "id" : "3270619"
                           },
                           {
                              "name" : "STAT6-mediated induction of chemokines",
                              "id" : "3249367"
                           }
                        ],
                        "name" : "STING mediated induction of host immune responses"
                     },
                     {
                        "id" : "3134973",
                        "name" : "LRR FLII-interacting protein 1 (LRRFIP1) activates type I IFN production"
                     },
                     {
                        "id" : "3134963",
                        "name" : "DEx/H-box helicases activate type I IFN and inflammatory cytokines production "
                     },
                     {
                        "id" : "3134975",
                        "children" : [
                           {
                              "id" : "3248023",
                              "name" : "Regulation by TREX1"
                           }
                        ],
                        "name" : "Regulation of innate immune responses to cytosolic DNA"
                     }
                  ],
                  "name" : "Cytosolic sensors of pathogen-associated DNA "
               },
               {
                  "id" : "2029480",
                  "children" : [
                     {
                        "name" : "FCGR activation",
                        "id" : "2029481"
                     },
                     {
                        "id" : "2029482",
                        "name" : "Regulation of actin dynamics for phagocytic cup formation"
                     },
                     {
                        "id" : "2029485",
                        "name" : "Role of phospholipids in phagocytosis"
                     }
                  ],
                  "name" : "Fcgamma receptor (FCGR) dependent phagocytosis"
               },
               {
                  "id" : "2172127",
                  "name" : "DAP12 interactions",
                  "children" : [
                     {
                        "id" : "2424491",
                        "name" : "DAP12 signaling",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "AKT phosphorylates targets in the cytosol",
                                    "id" : "198323"
                                 },
                                 {
                                    "id" : "198693",
                                    "name" : "AKT phosphorylates targets in the nucleus"
                                 },
                                 {
                                    "name" : "Negative regulation of the PI3K/AKT network",
                                    "id" : "199418"
                                 }
                              ],
                              "name" : "PIP3 activates AKT signaling",
                              "id" : "1257604"
                           },
                           {
                              "name" : "RAF/MAP kinase cascade",
                              "children" : [
                                 {
                                    "name" : "RAF activation",
                                    "id" : "5673000"
                                 },
                                 {
                                    "id" : "5674135",
                                    "name" : "MAP2K and MAPK activation"
                                 },
                                 {
                                    "name" : "Negative regulation of MAPK pathway",
                                    "children" : [
                                       {
                                          "name" : "Negative feedback regulation of MAPK pathway",
                                          "id" : "5674499"
                                       }
                                    ],
                                    "id" : "5675221"
                                 },
                                 {
                                    "id" : "5658442",
                                    "name" : "Regulation of RAS by GAPs"
                                 }
                              ],
                              "id" : "5673001"
                           },
                           {
                              "name" : "DAG and IP3 signaling",
                              "children" : [
                                 {
                                    "id" : "111997",
                                    "name" : "CaM pathway",
                                    "children" : [
                                       {
                                          "children" : [
                                             {
                                                "id" : "111931",
                                                "children" : [
                                                   {
                                                      "id" : "163615",
                                                      "name" : "PKA activation"
                                                   }
                                                ],
                                                "name" : "PKA-mediated phosphorylation of CREB"
                                             },
                                             {
                                                "name" : "CaMK IV-mediated phosphorylation of CREB",
                                                "id" : "111932"
                                             },
                                             {
                                                "id" : "111957",
                                                "name" : "Cam-PDE 1 activation"
                                             }
                                          ],
                                          "name" : "Calmodulin induced events",
                                          "id" : "111933"
                                       }
                                    ]
                                 }
                              ],
                              "id" : "1489509"
                           }
                        ]
                     }
                  ]
               },
               {
                  "id" : "2454202",
                  "name" : "Fc epsilon receptor (FCERI) signaling",
                  "children" : [
                     {
                        "id" : "2871796",
                        "children" : [
                           {
                              "id" : "5673001",
                              "children" : [
                                 {
                                    "id" : "5673000",
                                    "name" : "RAF activation"
                                 },
                                 {
                                    "name" : "MAP2K and MAPK activation",
                                    "id" : "5674135"
                                 },
                                 {
                                    "id" : "5675221",
                                    "children" : [
                                       {
                                          "id" : "5674499",
                                          "name" : "Negative feedback regulation of MAPK pathway"
                                       }
                                    ],
                                    "name" : "Negative regulation of MAPK pathway"
                                 },
                                 {
                                    "id" : "5658442",
                                    "name" : "Regulation of RAS by GAPs"
                                 }
                              ],
                              "name" : "RAF/MAP kinase cascade"
                           }
                        ],
                        "name" : "FCERI mediated MAPK activation"
                     },
                     {
                        "name" : "FCERI mediated Ca+2 mobilization",
                        "id" : "2871809"
                     },
                     {
                        "id" : "2871837",
                        "name" : "FCERI mediated NF-kB activation"
                     },
                     {
                        "name" : "Role of LAT2/NTAL/LAB on calcium mobilization",
                        "children" : [
                           {
                              "name" : "PIP3 activates AKT signaling",
                              "children" : [
                                 {
                                    "id" : "198323",
                                    "name" : "AKT phosphorylates targets in the cytosol"
                                 },
                                 {
                                    "name" : "AKT phosphorylates targets in the nucleus",
                                    "id" : "198693"
                                 },
                                 {
                                    "name" : "Negative regulation of the PI3K/AKT network",
                                    "id" : "199418"
                                 }
                              ],
                              "id" : "1257604"
                           }
                        ],
                        "id" : "2730905"
                     }
                  ]
               },
               {
                  "children" : [
                     {
                        "id" : "5607764",
                        "name" : "CLEC7A (Dectin-1) signaling",
                        "children" : [
                           {
                              "id" : "5607763",
                              "name" : "CLEC7A (Dectin-1) induces NFAT activation"
                           },
                           {
                              "name" : "Dectin-1 mediated noncanonical NF-kB signaling",
                              "id" : "5607761"
                           },
                           {
                              "id" : "5660668",
                              "name" : "CLEC7A/inflammasome pathway"
                           }
                        ]
                     },
                     {
                        "id" : "5621480",
                        "name" : "Dectin-2 family"
                     },
                     {
                        "id" : "5621575",
                        "name" : "CD209 (DC-SIGN) signaling"
                     }
                  ],
                  "name" : "C-type lectin receptors (CLRs)",
                  "id" : "5621481"
               }
            ],
            "name" : "Innate Immune System",
            "id" : "168249"
         },
         {
            "id" : "1280215",
            "name" : "Cytokine Signaling in Immune system",
            "children" : [
               {
                  "name" : "Interferon Signaling",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "Regulation of IFNA signaling",
                              "id" : "912694"
                           }
                        ],
                        "name" : "Interferon alpha/beta signaling",
                        "id" : "909733"
                     },
                     {
                        "id" : "877300",
                        "name" : "Interferon gamma signaling",
                        "children" : [
                           {
                              "name" : "Regulation of IFNG signaling",
                              "id" : "877312"
                           }
                        ]
                     },
                     {
                        "id" : "1169410",
                        "children" : [
                           {
                              "id" : "1169408",
                              "name" : "ISG15 antiviral mechanism"
                           }
                        ],
                        "name" : "Antiviral mechanism by IFN-stimulated genes"
                     }
                  ],
                  "id" : "913531"
               },
               {
                  "id" : "449147",
                  "children" : [
                     {
                        "name" : "Interleukin-1 processing",
                        "id" : "448706"
                     },
                     {
                        "id" : "446652",
                        "children" : [
                           {
                              "name" : "MAP3K8 (TPL2)-dependent MAPK1/3 activation",
                              "id" : "5684264"
                           }
                        ],
                        "name" : "Interleukin-1 signaling"
                     },
                     {
                        "id" : "451927",
                        "children" : [
                           {
                              "id" : "912526",
                              "name" : "Interleukin receptor SHC signaling",
                              "children" : [
                                 {
                                    "id" : "5673001",
                                    "children" : [
                                       {
                                          "name" : "RAF activation",
                                          "id" : "5673000"
                                       },
                                       {
                                          "name" : "MAP2K and MAPK activation",
                                          "id" : "5674135"
                                       },
                                       {
                                          "id" : "5675221",
                                          "children" : [
                                             {
                                                "id" : "5674499",
                                                "name" : "Negative feedback regulation of MAPK pathway"
                                             }
                                          ],
                                          "name" : "Negative regulation of MAPK pathway"
                                       },
                                       {
                                          "id" : "5658442",
                                          "name" : "Regulation of RAS by GAPs"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade"
                                 }
                              ]
                           },
                           {
                              "children" : [
                                 {
                                    "id" : "5673000",
                                    "name" : "RAF activation"
                                 },
                                 {
                                    "id" : "5674135",
                                    "name" : "MAP2K and MAPK activation"
                                 },
                                 {
                                    "name" : "Negative regulation of MAPK pathway",
                                    "children" : [
                                       {
                                          "name" : "Negative feedback regulation of MAPK pathway",
                                          "id" : "5674499"
                                       }
                                    ],
                                    "id" : "5675221"
                                 },
                                 {
                                    "name" : "Regulation of RAS by GAPs",
                                    "id" : "5658442"
                                 }
                              ],
                              "name" : "RAF/MAP kinase cascade",
                              "id" : "5673001"
                           }
                        ],
                        "name" : "Interleukin-2 signaling"
                     },
                     {
                        "id" : "512988",
                        "children" : [
                           {
                              "name" : "Interleukin receptor SHC signaling",
                              "children" : [
                                 {
                                    "id" : "5673001",
                                    "children" : [
                                       {
                                          "id" : "5673000",
                                          "name" : "RAF activation"
                                       },
                                       {
                                          "name" : "MAP2K and MAPK activation",
                                          "id" : "5674135"
                                       },
                                       {
                                          "id" : "5675221",
                                          "children" : [
                                             {
                                                "id" : "5674499",
                                                "name" : "Negative feedback regulation of MAPK pathway"
                                             }
                                          ],
                                          "name" : "Negative regulation of MAPK pathway"
                                       },
                                       {
                                          "id" : "5658442",
                                          "name" : "Regulation of RAS by GAPs"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade"
                                 }
                              ],
                              "id" : "912526"
                           },
                           {
                              "id" : "912631",
                              "name" : "Regulation of signaling by CBL"
                           }
                        ],
                        "name" : "Interleukin-3, 5 and GM-CSF signaling"
                     },
                     {
                        "children" : [
                           {
                              "id" : "6788467",
                              "name" : "IL-6-type cytokine receptor ligand interactions"
                           },
                           {
                              "id" : "1059683",
                              "name" : "Interleukin-6 signaling"
                           }
                        ],
                        "name" : "Interleukin-6 family signaling",
                        "id" : "6783589"
                     },
                     {
                        "id" : "1266695",
                        "name" : "Interleukin-7 signaling"
                     }
                  ],
                  "name" : "Signaling by Interleukins"
               },
               {
                  "name" : "Growth hormone receptor signaling",
                  "id" : "982772"
               },
               {
                  "id" : "1170546",
                  "name" : "Prolactin receptor signaling"
               },
               {
                  "id" : "5668541",
                  "children" : [
                     {
                        "name" : "TNF receptor superfamily (TNFSF) members mediating non-canonical NF-kB pathway",
                        "id" : "5676594"
                     },
                     {
                        "name" : "NIK-->noncanonical NF-kB signaling",
                        "id" : "5676590"
                     },
                     {
                        "name" : "TNFs bind their physiological receptors",
                        "id" : "5669034"
                     }
                  ],
                  "name" : "TNFR2 non-canonical NF-kB pathway"
               }
            ]
         },
         {
            "name" : "ROS, RNS production in response to bacteria",
            "id" : "1222556"
         }
      ],
      "id" : "168256"
   },
   {
      "name" : "Mitophagy",
      "children" : [
         {
            "name" : "Pink/Parkin Mediated Mitophagy",
            "id" : "5205685"
         }
      ],
      "id" : "5205647"
   },
   {
      "name" : "Metabolism",
      "children" : [
         {
            "id" : "71387",
            "name" : "Metabolism of carbohydrates",
            "children" : [
               {
                  "id" : "189085",
                  "name" : "Digestion of dietary carbohydrate"
               },
               {
                  "id" : "189200",
                  "name" : "Hexose transport",
                  "children" : [
                     {
                        "id" : "70153",
                        "children" : [
                           {
                              "name" : "Regulation of Glucokinase by Glucokinase Regulatory Protein",
                              "id" : "170822"
                           }
                        ],
                        "name" : "Glucose transport"
                     }
                  ]
               },
               {
                  "id" : "70326",
                  "name" : "Glucose metabolism",
                  "children" : [
                     {
                        "name" : "Glycolysis",
                        "id" : "70171"
                     },
                     {
                        "id" : "70263",
                        "name" : "Gluconeogenesis"
                     },
                     {
                        "name" : "Glycogen synthesis",
                        "id" : "3322077"
                     },
                     {
                        "children" : [
                           {
                              "id" : "5357572",
                              "name" : "Lysosomal glycogen catabolism"
                           }
                        ],
                        "name" : "Glycogen breakdown (glycogenolysis)",
                        "id" : "70221"
                     }
                  ]
               },
               {
                  "id" : "5652084",
                  "children" : [
                     {
                        "id" : "5652227",
                        "name" : "Fructose biosynthesis"
                     },
                     {
                        "id" : "70350",
                        "name" : "Fructose catabolism"
                     }
                  ],
                  "name" : "Fructose metabolism"
               },
               {
                  "name" : "Lactose synthesis",
                  "id" : "5653890"
               },
               {
                  "id" : "70370",
                  "name" : "Galactose catabolism"
               },
               {
                  "name" : "Pentose phosphate pathway (hexose monophosphate shunt)",
                  "id" : "71336"
               },
               {
                  "id" : "73843",
                  "name" : "5-Phosphoribose 1-diphosphate biosynthesis"
               },
               {
                  "id" : "1630316",
                  "children" : [
                     {
                        "name" : "Hyaluronan metabolism",
                        "children" : [
                           {
                              "id" : "2142850",
                              "name" : "Hyaluronan biosynthesis and export"
                           },
                           {
                              "name" : "Hyaluronan uptake and degradation",
                              "id" : "2160916"
                           }
                        ],
                        "id" : "2142845"
                     },
                     {
                        "name" : "Transport and synthesis of PAPS",
                        "id" : "174362"
                     },
                     {
                        "id" : "1638074",
                        "name" : "Keratan sulfate/keratin metabolism",
                        "children" : [
                           {
                              "id" : "2022854",
                              "name" : "Keratan sulfate biosynthesis"
                           },
                           {
                              "id" : "2022857",
                              "name" : "Keratan sulfate degradation"
                           }
                        ]
                     },
                     {
                        "id" : "1638091",
                        "children" : [
                           {
                              "id" : "1971475",
                              "name" : "A tetrasaccharide linker sequence is required for GAG synthesis"
                           },
                           {
                              "name" : "HS-GAG biosynthesis",
                              "id" : "2022928"
                           },
                           {
                              "name" : "HS-GAG degradation",
                              "id" : "2024096"
                           }
                        ],
                        "name" : "Heparan sulfate/heparin (HS-GAG) metabolism"
                     },
                     {
                        "name" : "Chondroitin sulfate/dermatan sulfate metabolism",
                        "children" : [
                           {
                              "id" : "1971475",
                              "name" : "A tetrasaccharide linker sequence is required for GAG synthesis"
                           },
                           {
                              "id" : "2022870",
                              "name" : "Chondroitin sulfate biosynthesis"
                           },
                           {
                              "id" : "2022923",
                              "name" : "Dermatan sulfate biosynthesis"
                           },
                           {
                              "name" : "CS/DS degradation",
                              "id" : "2024101"
                           }
                        ],
                        "id" : "1793185"
                     }
                  ],
                  "name" : "Glycosaminoglycan metabolism"
               },
               {
                  "id" : "5661270",
                  "name" : "Catabolism of glucuronate to xylulose-5-phosphate"
               }
            ]
         },
         {
            "id" : "1483249",
            "children" : [
               {
                  "id" : "1855204",
                  "name" : "Synthesis of IP3 and IP4 in the cytosol"
               },
               {
                  "id" : "1855196",
                  "name" : "IP3 and IP4 transport between cytosol and nucleus"
               },
               {
                  "id" : "1855191",
                  "name" : "Synthesis of IPs in the nucleus"
               },
               {
                  "name" : "IPs transport between nucleus and cytosol",
                  "id" : "1855170"
               },
               {
                  "name" : "Synthesis of pyrophosphates in the cytosol",
                  "id" : "1855167"
               },
               {
                  "id" : "1855229",
                  "name" : "IP6 and IP7 transport between cytosol and nucleus"
               },
               {
                  "name" : "IPs transport between cytosol and ER lumen",
                  "id" : "1855184"
               },
               {
                  "id" : "1855231",
                  "name" : "Synthesis of IPs in the ER lumen"
               },
               {
                  "id" : "1855215",
                  "name" : "IPs transport between ER lumen and cytosol"
               },
               {
                  "name" : "IPs transport between ER lumen and nucleus",
                  "id" : "1855156"
               },
               {
                  "id" : "1855192",
                  "name" : "IPs transport between nucleus and ER lumen"
               },
               {
                  "name" : "Synthesis of IP2, IP, and Ins in the cytosol",
                  "id" : "1855183"
               }
            ],
            "name" : "Inositol phosphate metabolism"
         },
         {
            "children" : [
               {
                  "id" : "73923",
                  "name" : "Lipid digestion, mobilization, and transport",
                  "children" : [
                     {
                        "name" : "Digestion of dietary lipid",
                        "id" : "192456"
                     },
                     {
                        "name" : "Trafficking of dietary sterols",
                        "id" : "265473"
                     },
                     {
                        "id" : "174824",
                        "name" : "Lipoprotein metabolism",
                        "children" : [
                           {
                              "name" : "Chylomicron-mediated lipid transport",
                              "id" : "174800"
                           },
                           {
                              "id" : "194223",
                              "name" : "HDL-mediated lipid transport"
                           },
                           {
                              "name" : "LDL-mediated lipid transport",
                              "id" : "171052"
                           }
                        ]
                     },
                     {
                        "name" : "Hormone-sensitive lipase (HSL)-mediated triacylglycerol hydrolysis",
                        "id" : "163560"
                     }
                  ]
               },
               {
                  "id" : "535734",
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "75105",
                              "name" : "Fatty Acyl-CoA Biosynthesis",
                              "children" : [
                                 {
                                    "id" : "75876",
                                    "name" : "Synthesis of very long-chain fatty acyl-CoAs"
                                 }
                              ]
                           }
                        ],
                        "name" : "Triglyceride Biosynthesis",
                        "id" : "75109"
                     },
                     {
                        "id" : "200425",
                        "name" : "Import of palmitoyl-CoA into the mitochondrial matrix"
                     },
                     {
                        "id" : "77289",
                        "name" : "Mitochondrial Fatty Acid Beta-Oxidation",
                        "children" : [
                           {
                              "name" : "mitochondrial fatty acid beta-oxidation of saturated fatty acids",
                              "children" : [
                                 {
                                    "name" : "Beta oxidation of palmitoyl-CoA to myristoyl-CoA",
                                    "id" : "77305"
                                 },
                                 {
                                    "name" : "Beta oxidation of myristoyl-CoA to lauroyl-CoA",
                                    "id" : "77285"
                                 },
                                 {
                                    "name" : "Beta oxidation of lauroyl-CoA to decanoyl-CoA-CoA",
                                    "id" : "77310"
                                 },
                                 {
                                    "id" : "77346",
                                    "name" : "Beta oxidation of decanoyl-CoA to octanoyl-CoA-CoA"
                                 },
                                 {
                                    "id" : "77348",
                                    "name" : "Beta oxidation of octanoyl-CoA to hexanoyl-CoA"
                                 },
                                 {
                                    "id" : "77350",
                                    "name" : "Beta oxidation of hexanoyl-CoA to butanoyl-CoA"
                                 },
                                 {
                                    "id" : "77352",
                                    "name" : "Beta oxidation of butanoyl-CoA to acetyl-CoA"
                                 }
                              ],
                              "id" : "77286"
                           },
                           {
                              "name" : "mitochondrial fatty acid beta-oxidation of unsaturated fatty acids",
                              "id" : "77288"
                           },
                           {
                              "id" : "71032",
                              "name" : "Propionyl-CoA catabolism"
                           }
                        ]
                     },
                     {
                        "id" : "74182",
                        "name" : "Ketone body metabolism",
                        "children" : [
                           {
                              "id" : "77111",
                              "name" : "Synthesis of Ketone Bodies"
                           },
                           {
                              "id" : "77108",
                              "name" : "Utilization of Ketone Bodies"
                           }
                        ]
                     },
                     {
                        "id" : "400206",
                        "name" : "Regulation of lipid metabolism by Peroxisome proliferator-activated receptor alpha (PPARalpha)",
                        "children" : [
                           {
                              "name" : "PPARA activates gene expression",
                              "id" : "1989781"
                           }
                        ]
                     }
                  ],
                  "name" : "Fatty acid, triacylglycerol, and ketone body metabolism"
               },
               {
                  "id" : "390918",
                  "children" : [
                     {
                        "name" : "Alpha-oxidation of phytanate",
                        "id" : "389599"
                     },
                     {
                        "name" : "Beta-oxidation of pristanoyl-CoA",
                        "id" : "389887"
                     },
                     {
                        "name" : "Beta-oxidation of very long chain fatty acids",
                        "id" : "390247"
                     },
                     {
                        "name" : "Plasmalogen biosynthesis",
                        "id" : "75896"
                     },
                     {
                        "id" : "389542",
                        "name" : "NADPH regeneration"
                     }
                  ],
                  "name" : "Peroxisomal lipid metabolism"
               },
               {
                  "children" : [
                     {
                        "id" : "6807047",
                        "name" : "Cholesterol biosynthesis via desmosterol"
                     },
                     {
                        "id" : "6807062",
                        "name" : "Cholesterol biosynthesis via lathosterol"
                     }
                  ],
                  "name" : "Cholesterol biosynthesis",
                  "id" : "191273"
               },
               {
                  "children" : [
                     {
                        "id" : "2426168",
                        "name" : "Activation of gene expression by SREBF (SREBP)"
                     }
                  ],
                  "name" : "Regulation of cholesterol biosynthesis by SREBP (SREBF)",
                  "id" : "1655829"
               },
               {
                  "name" : "Bile acid and bile salt metabolism",
                  "children" : [
                     {
                        "id" : "192105",
                        "children" : [
                           {
                              "name" : "Synthesis of bile acids and bile salts via 7alpha-hydroxycholesterol",
                              "id" : "193368"
                           },
                           {
                              "name" : "Synthesis of bile acids and bile salts via 24-hydroxycholesterol",
                              "id" : "193775"
                           },
                           {
                              "id" : "193807",
                              "name" : "Synthesis of bile acids and bile salts via 27-hydroxycholesterol"
                           }
                        ],
                        "name" : "Synthesis of bile acids and bile salts"
                     },
                     {
                        "id" : "159418",
                        "name" : "Recycling of bile acids and salts"
                     }
                  ],
                  "id" : "194068"
               },
               {
                  "id" : "196071",
                  "children" : [
                     {
                        "id" : "196108",
                        "name" : "Pregnenolone biosynthesis"
                     },
                     {
                        "id" : "194002",
                        "name" : "Glucocorticoid biosynthesis"
                     },
                     {
                        "id" : "193993",
                        "name" : "Mineralocorticoid biosynthesis"
                     },
                     {
                        "id" : "193048",
                        "name" : "Androgen biosynthesis"
                     },
                     {
                        "name" : "Estrogen biosynthesis",
                        "id" : "193144"
                     }
                  ],
                  "name" : "Metabolism of steroid hormones"
               },
               {
                  "name" : "Phospholipid metabolism",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "Synthesis of PA",
                              "id" : "1483166"
                           },
                           {
                              "name" : "Acyl chain remodeling of DAG and TAG",
                              "id" : "1482883"
                           },
                           {
                              "id" : "1483213",
                              "name" : "Synthesis of PE"
                           },
                           {
                              "id" : "1482839",
                              "name" : "Acyl chain remodelling of PE"
                           },
                           {
                              "id" : "1483152",
                              "name" : "Hydrolysis of LPE"
                           },
                           {
                              "id" : "1483191",
                              "name" : "Synthesis of PC"
                           },
                           {
                              "name" : "PI and PC transport between ER and Golgi membranes",
                              "id" : "1483196"
                           },
                           {
                              "id" : "1482788",
                              "name" : "Acyl chain remodelling of PC"
                           },
                           {
                              "name" : "Hydrolysis of LPC",
                              "id" : "1483115"
                           },
                           {
                              "id" : "1483101",
                              "name" : "Synthesis of PS"
                           },
                           {
                              "name" : "Acyl chain remodelling of PS",
                              "id" : "1482801"
                           },
                           {
                              "id" : "1483226",
                              "name" : "Synthesis of PI"
                           },
                           {
                              "id" : "1482922",
                              "name" : "Acyl chain remodelling of PI"
                           },
                           {
                              "id" : "1483148",
                              "name" : "Synthesis of PG"
                           },
                           {
                              "name" : "Acyl chain remodelling of PG",
                              "id" : "1482925"
                           },
                           {
                              "name" : "Synthesis of CL",
                              "id" : "1483076"
                           },
                           {
                              "name" : "Acyl chain remodeling of CL",
                              "id" : "1482798"
                           },
                           {
                              "name" : "Synthesis of BMP",
                              "id" : "1483171"
                           }
                        ],
                        "name" : "Glycerophospholipid biosynthesis",
                        "id" : "1483206"
                     },
                     {
                        "children" : [
                           {
                              "id" : "1483248",
                              "name" : "Synthesis of PIPs at the ER membrane"
                           },
                           {
                              "name" : "PI and PC transport between ER and Golgi membranes",
                              "id" : "1483196"
                           },
                           {
                              "name" : "Synthesis of PIPs at the Golgi membrane",
                              "id" : "1660514"
                           },
                           {
                              "name" : "PIPs transport between Golgi and plasma membranes",
                              "id" : "1660510"
                           },
                           {
                              "id" : "1660499",
                              "name" : "Synthesis of PIPs at the plasma membrane"
                           },
                           {
                              "name" : "PIPs transport between plasma and early endosome membranes",
                              "id" : "1660524"
                           },
                           {
                              "id" : "1660516",
                              "name" : "Synthesis of PIPs at the early endosome membrane"
                           },
                           {
                              "id" : "1660537",
                              "name" : "PIPs transport between early endosome and Golgi membranes"
                           },
                           {
                              "name" : "PIPs transport between early and late endosome membranes",
                              "id" : "1660502"
                           },
                           {
                              "name" : "Synthesis of PIPs at the late endosome membrane",
                              "id" : "1660517"
                           },
                           {
                              "id" : "1660508",
                              "name" : "PIPs transport between late endosome and Golgi membranes"
                           }
                        ],
                        "name" : "PI Metabolism",
                        "id" : "1483255"
                     }
                  ],
                  "id" : "1483257"
               },
               {
                  "id" : "2046104",
                  "children" : [
                     {
                        "name" : "alpha-linolenic acid (ALA) metabolism",
                        "id" : "2046106"
                     },
                     {
                        "id" : "2046105",
                        "name" : "Linoleic acid (LA) metabolism"
                     }
                  ],
                  "name" : "alpha-linolenic (omega3) and linoleic (omega6) acid metabolism"
               },
               {
                  "name" : "Arachidonic acid metabolism",
                  "children" : [
                     {
                        "name" : "Synthesis of Prostaglandins (PG) and Thromboxanes (TX)",
                        "id" : "2162123"
                     },
                     {
                        "name" : "Synthesis of Leukotrienes (LT) and Eoxins (EX)",
                        "id" : "2142691"
                     },
                     {
                        "id" : "2142688",
                        "name" : "Synthesis of 5-eicosatetraenoic acids"
                     },
                     {
                        "id" : "2142770",
                        "name" : "Synthesis of 15-eicosatetraenoic acid derivatives"
                     },
                     {
                        "id" : "2142712",
                        "name" : "Synthesis of 12-eicosatetraenoic acid derivatives"
                     },
                     {
                        "name" : "Synthesis of Lipoxins (LX)",
                        "id" : "2142700"
                     },
                     {
                        "name" : "Synthesis of Hepoxilins (HX) and Trioxilins (TrX)",
                        "id" : "2142696"
                     },
                     {
                        "id" : "2142816",
                        "name" : "Synthesis of (16-20)-hydroxyeicosatetraenoic acids (HETE)"
                     },
                     {
                        "name" : "Synthesis of epoxy (EET) and dihydroxyeicosatrienoic acids (DHET)",
                        "id" : "2142670"
                     }
                  ],
                  "id" : "2142753"
               },
               {
                  "name" : "Sphingolipid metabolism",
                  "children" : [
                     {
                        "name" : "Sphingolipid de novo biosynthesis",
                        "id" : "1660661"
                     },
                     {
                        "name" : "Glycosphingolipid metabolism",
                        "id" : "1660662"
                     }
                  ],
                  "id" : "428157"
               },
               {
                  "name" : "Ubiquinol biosynthesis",
                  "id" : "2142789"
               }
            ],
            "name" : "Metabolism of lipids and lipoproteins",
            "id" : "556833"
         },
         {
            "id" : "163685",
            "children" : [
               {
                  "id" : "422356",
                  "name" : "Regulation of insulin secretion",
                  "children" : [
                     {
                        "name" : "Adrenaline,noradrenaline inhibits insulin secretion",
                        "id" : "400042"
                     },
                     {
                        "name" : "Acetylcholine regulates insulin secretion",
                        "id" : "399997"
                     },
                     {
                        "name" : "Free fatty acids regulate insulin secretion",
                        "children" : [
                           {
                              "name" : "Fatty Acids bound to GPR40 (FFAR1) regulate insulin secretion",
                              "id" : "434316"
                           }
                        ],
                        "id" : "400451"
                     },
                     {
                        "id" : "381676",
                        "name" : "Glucagon-like Peptide-1 (GLP1) regulates insulin secretion"
                     }
                  ]
               },
               {
                  "id" : "163359",
                  "name" : "Glucagon signaling in metabolic regulation",
                  "children" : [
                     {
                        "id" : "164378",
                        "name" : "PKA activation in glucagon signalling"
                     }
                  ]
               },
               {
                  "id" : "163358",
                  "name" : "PKA-mediated phosphorylation of key metabolic factors"
               },
               {
                  "name" : "Insulin effects increased synthesis of Xylulose-5-Phosphate",
                  "id" : "163754"
               },
               {
                  "name" : "AMPK inhibits chREBP transcriptional activation activity",
                  "id" : "163680"
               },
               {
                  "name" : "PP2A-mediated dephosphorylation of key metabolic factors",
                  "id" : "163767"
               },
               {
                  "id" : "163765",
                  "name" : "ChREBP activates metabolic gene expression"
               }
            ],
            "name" : "Integration of energy metabolism"
         },
         {
            "id" : "202131",
            "children" : [
               {
                  "name" : "eNOS activation and regulation",
                  "children" : [
                     {
                        "name" : "eNOS activation",
                        "id" : "203615"
                     },
                     {
                        "name" : "NOSIP mediated eNOS trafficking",
                        "id" : "203754"
                     },
                     {
                        "name" : "NOSTRIN mediated eNOS trafficking",
                        "id" : "203641"
                     },
                     {
                        "name" : "Tetrahydrobiopterin (BH4) synthesis, recycling, salvage and regulation",
                        "id" : "1474151"
                     }
                  ],
                  "id" : "203765"
               }
            ],
            "name" : "Metabolism of nitric oxide"
         },
         {
            "name" : "The citric acid (TCA) cycle and respiratory electron transport",
            "children" : [
               {
                  "name" : "Pyruvate metabolism and Citric Acid (TCA) cycle",
                  "children" : [
                     {
                        "id" : "70268",
                        "children" : [
                           {
                              "id" : "204174",
                              "name" : "Regulation of pyruvate dehydrogenase (PDH) complex"
                           }
                        ],
                        "name" : "Pyruvate metabolism"
                     },
                     {
                        "id" : "71403",
                        "name" : "Citric acid cycle (TCA cycle)"
                     },
                     {
                        "id" : "880009",
                        "name" : "Interconversion of 2-oxoglutarate and 2-hydroxyglutarate"
                     }
                  ],
                  "id" : "71406"
               },
               {
                  "children" : [
                     {
                        "id" : "611105",
                        "children" : [
                           {
                              "name" : "Complex I biogenesis",
                              "id" : "6799198"
                           }
                        ],
                        "name" : "Respiratory electron transport"
                     },
                     {
                        "id" : "163210",
                        "name" : "Formation of ATP by chemiosmotic coupling"
                     },
                     {
                        "id" : "166187",
                        "children" : [
                           {
                              "id" : "167826",
                              "name" : "The fatty acid cycling model"
                           },
                           {
                              "name" : "The proton buffering model",
                              "id" : "167827"
                           }
                        ],
                        "name" : "Mitochondrial Uncoupling Proteins"
                     }
                  ],
                  "name" : "Respiratory electron transport, ATP synthesis by chemiosmotic coupling, and heat production by uncoupling proteins.",
                  "id" : "163200"
               }
            ],
            "id" : "1428517"
         },
         {
            "id" : "15869",
            "name" : "Metabolism of nucleotides",
            "children" : [
               {
                  "id" : "73847",
                  "name" : "Purine metabolism",
                  "children" : [
                     {
                        "id" : "73817",
                        "name" : "Purine ribonucleoside monophosphate biosynthesis"
                     },
                     {
                        "name" : "Purine salvage",
                        "id" : "74217"
                     },
                     {
                        "name" : "Purine catabolism",
                        "id" : "74259"
                     }
                  ]
               },
               {
                  "id" : "73848",
                  "children" : [
                     {
                        "name" : "Pyrimidine biosynthesis",
                        "id" : "500753"
                     },
                     {
                        "id" : "73614",
                        "name" : "Pyrimidine salvage reactions"
                     },
                     {
                        "id" : "73621",
                        "name" : "Pyrimidine catabolism"
                     }
                  ],
                  "name" : "Pyrimidine metabolism"
               },
               {
                  "name" : "Synthesis and interconversion of nucleotide di- and triphosphates",
                  "id" : "499943"
               },
               {
                  "name" : "Phosphate bond hydrolysis by NUDT proteins",
                  "id" : "2393930"
               }
            ]
         },
         {
            "children" : [
               {
                  "id" : "196849",
                  "children" : [
                     {
                        "id" : "196836",
                        "name" : "Vitamin C (ascorbate) metabolism"
                     },
                     {
                        "id" : "196819",
                        "name" : "Vitamin B1 (thiamin) metabolism"
                     },
                     {
                        "name" : "Vitamin B2 (riboflavin) metabolism",
                        "id" : "196843"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Coenzyme A biosynthesis",
                              "id" : "196783"
                           }
                        ],
                        "name" : "Vitamin B5 (pantothenate) metabolism",
                        "id" : "199220"
                     },
                     {
                        "name" : "Vitamins B6 activation to pyridoxal phosphate",
                        "id" : "964975"
                     },
                     {
                        "name" : "Cobalamin (Cbl, vitamin B12) transport and metabolism",
                        "id" : "196741"
                     },
                     {
                        "name" : "Biotin transport and metabolism",
                        "id" : "196780"
                     },
                     {
                        "id" : "196807",
                        "name" : "Nicotinate metabolism",
                        "children" : [
                           {
                              "id" : "197264",
                              "name" : "Nicotinamide salvaging"
                           }
                        ]
                     },
                     {
                        "name" : "Metabolism of folate and pterines",
                        "id" : "196757"
                     },
                     {
                        "name" : "Molybdenum cofactor biosynthesis",
                        "id" : "947581"
                     }
                  ],
                  "name" : "Metabolism of water-soluble vitamins and cofactors"
               },
               {
                  "id" : "6806667",
                  "children" : [
                     {
                        "name" : "Metabolism of vitamin K",
                        "id" : "6806664"
                     },
                     {
                        "name" : "Retinoid metabolism and transport",
                        "id" : "975634"
                     },
                     {
                        "id" : "196791",
                        "name" : "Vitamin D (calciferol) metabolism"
                     }
                  ],
                  "name" : "Metabolism of fat-soluble vitamins"
               }
            ],
            "name" : "Metabolism of vitamins and cofactors",
            "id" : "196854"
         },
         {
            "id" : "71291",
            "children" : [
               {
                  "id" : "70614",
                  "children" : [
                     {
                        "name" : "Serine biosynthesis",
                        "id" : "977347"
                     }
                  ],
                  "name" : "Amino acid synthesis and interconversion (transamination)"
               },
               {
                  "children" : [
                     {
                        "id" : "71262",
                        "name" : "Carnitine synthesis"
                     }
                  ],
                  "name" : "Branched-chain amino acid catabolism",
                  "id" : "70895"
               },
               {
                  "children" : [
                     {
                        "name" : "Histidine catabolism",
                        "id" : "70921"
                     },
                     {
                        "name" : "Lysine catabolism",
                        "id" : "71064"
                     },
                     {
                        "id" : "71182",
                        "name" : "Phenylalanine and tyrosine catabolism"
                     },
                     {
                        "name" : "Proline catabolism",
                        "id" : "70688"
                     },
                     {
                        "id" : "71240",
                        "name" : "Tryptophan catabolism"
                     }
                  ],
                  "name" : "Histidine, lysine, phenylalanine, tyrosine, proline and tryptophan catabolism",
                  "id" : "6788656"
               },
               {
                  "id" : "351202",
                  "name" : "Metabolism of polyamines",
                  "children" : [
                     {
                        "id" : "351143",
                        "name" : "Agmatine biosynthesis"
                     },
                     {
                        "name" : "Interconversion of polyamines",
                        "id" : "351200"
                     },
                     {
                        "id" : "1237112",
                        "name" : "Methionine salvage pathway"
                     },
                     {
                        "name" : "Creatine metabolism",
                        "id" : "71288"
                     },
                     {
                        "name" : "Regulation of ornithine decarboxylase (ODC)",
                        "id" : "350562"
                     },
                     {
                        "name" : "Urea cycle",
                        "id" : "70635"
                     }
                  ]
               },
               {
                  "id" : "209776",
                  "children" : [
                     {
                        "id" : "209905",
                        "name" : "Catecholamine biosynthesis"
                     },
                     {
                        "children" : [
                           {
                              "id" : "350864",
                              "name" : "Regulation of thyroid hormone activity"
                           }
                        ],
                        "name" : "Thyroxine biosynthesis",
                        "id" : "209968"
                     },
                     {
                        "name" : "Serotonin and melatonin biosynthesis",
                        "id" : "209931"
                     }
                  ],
                  "name" : "Amine-derived hormones"
               },
               {
                  "id" : "389661",
                  "children" : [
                     {
                        "id" : "6783984",
                        "name" : "Glycine degradation"
                     }
                  ],
                  "name" : "Glyoxylate metabolism and glycine degradation"
               },
               {
                  "id" : "1614635",
                  "name" : "Sulfur amino acid metabolism",
                  "children" : [
                     {
                        "name" : "Methionine salvage pathway",
                        "id" : "1237112"
                     },
                     {
                        "id" : "1614603",
                        "name" : "Cysteine formation from homocysteine"
                     },
                     {
                        "id" : "1614558",
                        "name" : "Degradation of cysteine and homocysteine",
                        "children" : [
                           {
                              "name" : "Sulfide oxidation to sulfate",
                              "id" : "1614517"
                           }
                        ]
                     }
                  ]
               },
               {
                  "id" : "2408522",
                  "name" : "Selenoamino acid metabolism",
                  "children" : [
                     {
                        "id" : "2408508",
                        "name" : "Metabolism of ingested SeMet, Sec, MeSec into H2Se"
                     },
                     {
                        "id" : "5263617",
                        "name" : "Metabolism of ingested MeSeO2H into MeSeH"
                     },
                     {
                        "name" : "Methylation of MeSeH for excretion",
                        "id" : "2408552"
                     },
                     {
                        "id" : "2408499",
                        "name" : "Formation of selenosugars for excretion"
                     },
                     {
                        "id" : "2408550",
                        "name" : "Metabolism of ingested H2SeO4 and H2SeO3 into H2Se"
                     },
                     {
                        "id" : "2408517",
                        "name" : "SeMet incorporation into proteins"
                     },
                     {
                        "id" : "2408557",
                        "name" : "Selenocysteine synthesis"
                     }
                  ]
               },
               {
                  "name" : "Melanin biosynthesis",
                  "id" : "5662702"
               }
            ],
            "name" : "Metabolism of amino acids and derivatives"
         },
         {
            "id" : "189445",
            "name" : "Metabolism of porphyrins",
            "children" : [
               {
                  "name" : "Heme biosynthesis",
                  "id" : "189451"
               },
               {
                  "id" : "189483",
                  "name" : "Heme degradation"
               }
            ]
         },
         {
            "id" : "211859",
            "name" : "Biological oxidations",
            "children" : [
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "211976",
                              "name" : "Endogenous sterols",
                              "children" : [
                                 {
                                    "id" : "211994",
                                    "name" : "Sterols are 12-hydroxylated by CYP8B1"
                                 }
                              ]
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Aromatic amines can be N-hydroxylated or N-dealkylated by CYP1A2",
                                    "id" : "211957"
                                 },
                                 {
                                    "id" : "211999",
                                    "name" : "CYP2E1 reactions"
                                 }
                              ],
                              "name" : "Xenobiotics",
                              "id" : "211981"
                           },
                           {
                              "name" : "Fatty acids",
                              "id" : "211935"
                           },
                           {
                              "name" : "Eicosanoids",
                              "id" : "211979"
                           },
                           {
                              "id" : "211916",
                              "name" : "Vitamins"
                           },
                           {
                              "id" : "211958",
                              "name" : "Miscellaneous substrates"
                           }
                        ],
                        "name" : "Cytochrome P450 - arranged by substrate type",
                        "id" : "211897"
                     },
                     {
                        "id" : "217271",
                        "name" : "FMO oxidises nucleophiles"
                     },
                     {
                        "id" : "140180",
                        "name" : "COX reactions"
                     },
                     {
                        "id" : "140179",
                        "children" : [
                           {
                              "name" : "Biogenic amines are oxidatively deaminated to aldehydes by MAOA and MAOB",
                              "id" : "141333"
                           },
                           {
                              "id" : "141334",
                              "name" : "PAOs oxidise polyamines to amines"
                           }
                        ],
                        "name" : "Amine Oxidase reactions"
                     },
                     {
                        "id" : "71384",
                        "name" : "Ethanol oxidation"
                     }
                  ],
                  "name" : "Phase 1 - Functionalization of compounds",
                  "id" : "211945"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "Formation of the active cofactor, UDP-glucuronate",
                              "id" : "173599"
                           }
                        ],
                        "name" : "Glucuronidation",
                        "id" : "156588"
                     },
                     {
                        "name" : "Cytosolic sulfonation of small molecules",
                        "children" : [
                           {
                              "id" : "174362",
                              "name" : "Transport and synthesis of PAPS"
                           }
                        ],
                        "id" : "156584"
                     },
                     {
                        "id" : "156582",
                        "name" : "Acetylation"
                     },
                     {
                        "name" : "Methylation",
                        "id" : "156581"
                     },
                     {
                        "name" : "Glutathione conjugation",
                        "children" : [
                           {
                              "name" : "Glutathione synthesis and recycling",
                              "id" : "174403"
                           }
                        ],
                        "id" : "156590"
                     },
                     {
                        "id" : "156587",
                        "name" : "Amino Acid conjugation",
                        "children" : [
                           {
                              "id" : "159424",
                              "children" : [
                                 {
                                    "id" : "177135",
                                    "name" : "Conjugation of benzoate with glycine"
                                 },
                                 {
                                    "name" : "Conjugation of phenylacetate with glutamine",
                                    "id" : "177162"
                                 },
                                 {
                                    "id" : "177128",
                                    "name" : "Conjugation of salicylate with glycine"
                                 }
                              ],
                              "name" : "Conjugation of carboxylic acids"
                           }
                        ]
                     }
                  ],
                  "name" : "Phase II conjugation",
                  "id" : "156580"
               },
               {
                  "id" : "5423646",
                  "name" : "Aflatoxin activation and detoxification"
               }
            ]
         },
         {
            "name" : "Mitochondrial iron-sulfur cluster biogenesis",
            "children" : [
               {
                  "name" : "Electron transport from NADPH to Ferredoxin",
                  "id" : "2395516"
               }
            ],
            "id" : "1362409"
         },
         {
            "id" : "1480926",
            "children" : [
               {
                  "id" : "1237044",
                  "name" : "Erythrocytes take up carbon dioxide and release oxygen"
               },
               {
                  "id" : "1247673",
                  "name" : "Erythrocytes take up oxygen and release carbon dioxide"
               }
            ],
            "name" : "O2/CO2 exchange in erythrocytes"
         },
         {
            "id" : "2161522",
            "children" : [
               {
                  "name" : "Abacavir transmembrane transport",
                  "id" : "2161517"
               },
               {
                  "name" : "Abacavir metabolism",
                  "id" : "2161541"
               }
            ],
            "name" : "Abacavir transport and metabolism"
         },
         {
            "id" : "1475029",
            "name" : "Reversible hydration of carbon dioxide"
         },
         {
            "name" : "Cytosolic iron-sulfur cluster assembly",
            "id" : "2564830"
         },
         {
            "id" : "5660526",
            "children" : [
               {
                  "id" : "5661231",
                  "name" : "Metallothioneins bind metals"
               }
            ],
            "name" : "Response to metal ions"
         }
      ],
      "id" : "1430728"
   },
   {
      "children" : [
         {
            "children" : [
               {
                  "name" : "Eukaryotic Translation Initiation",
                  "children" : [
                     {
                        "id" : "72737",
                        "children" : [
                           {
                              "name" : "Formation of a pool of free 40S subunits",
                              "id" : "72689"
                           },
                           {
                              "name" : "Formation of the ternary complex, and subsequently, the 43S complex",
                              "id" : "72695"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Translation initiation complex formation",
                                    "id" : "72649"
                                 }
                              ],
                              "name" : "Activation of the mRNA upon binding of the cap-binding complex and eIFs, and subsequent binding to 43S",
                              "id" : "72662"
                           },
                           {
                              "id" : "72702",
                              "name" : "Ribosomal scanning and start codon recognition"
                           },
                           {
                              "name" : "GTP hydrolysis and joining of the 60S ribosomal subunit",
                              "id" : "72706"
                           },
                           {
                              "id" : "72731",
                              "name" : "Recycling of eIF2:GDP"
                           }
                        ],
                        "name" : "Cap-dependent Translation Initiation"
                     },
                     {
                        "id" : "156827",
                        "name" : "L13a-mediated translational silencing of Ceruloplasmin expression"
                     }
                  ],
                  "id" : "72613"
               },
               {
                  "id" : "1799339",
                  "name" : "SRP-dependent cotranslational protein targeting to membrane"
               },
               {
                  "id" : "156842",
                  "name" : "Eukaryotic Translation Elongation",
                  "children" : [
                     {
                        "name" : "Peptide chain elongation",
                        "id" : "156902"
                     }
                  ]
               },
               {
                  "id" : "72764",
                  "name" : "Eukaryotic Translation Termination"
               }
            ],
            "name" : "Translation",
            "id" : "72766"
         },
         {
            "id" : "391251",
            "name" : "Protein folding",
            "children" : [
               {
                  "id" : "390466",
                  "children" : [
                     {
                        "id" : "389958",
                        "name" : "Cooperation of Prefoldin and TriC/CCT  in actin and tubulin folding",
                        "children" : [
                           {
                              "id" : "389957",
                              "name" : "Prefoldin mediated transfer of substrate  to CCT/TriC"
                           },
                           {
                              "id" : "389960",
                              "name" : "Formation of tubulin folding intermediates by CCT/TriC"
                           },
                           {
                              "name" : "Folding of actin by CCT/TriC",
                              "id" : "390450"
                           }
                        ]
                     },
                     {
                        "name" : "Association of TriC/CCT with target proteins during biosynthesis",
                        "id" : "390471"
                     }
                  ],
                  "name" : "Chaperonin-mediated protein folding"
               },
               {
                  "name" : "Post-chaperonin tubulin folding pathway",
                  "id" : "389977"
               }
            ]
         },
         {
            "name" : "Post-translational protein modification",
            "children" : [
               {
                  "id" : "163841",
                  "name" : "Gamma carboxylation, hypusine formation and arylsulfatase activation",
                  "children" : [
                     {
                        "id" : "159854",
                        "name" : "Gamma-carboxylation, transport, and amino-terminal cleavage of proteins",
                        "children" : [
                           {
                              "id" : "159740",
                              "name" : "Gamma-carboxylation of protein precursors"
                           },
                           {
                              "id" : "159763",
                              "name" : "Transport of gamma-carboxylated protein precursors from the endoplasmic reticulum to the Golgi apparatus"
                           },
                           {
                              "id" : "159782",
                              "name" : "Removal of aminoterminal propeptides from gamma-carboxylated proteins"
                           }
                        ]
                     },
                     {
                        "name" : "Hypusine synthesis from eIF5A-lysine",
                        "id" : "204626"
                     },
                     {
                        "id" : "5358493",
                        "name" : "Synthesis of diphthamide-EEF2"
                     },
                     {
                        "name" : "The activation of arylsulfatases",
                        "id" : "1663150"
                     }
                  ]
               },
               {
                  "children" : [
                     {
                        "id" : "162699",
                        "name" : "Synthesis of dolichyl-phosphate mannose"
                     },
                     {
                        "name" : "Synthesis of glycosylphosphatidylinositol (GPI)",
                        "id" : "162710"
                     },
                     {
                        "id" : "162791",
                        "name" : "Attachment of GPI anchor to uPAR"
                     }
                  ],
                  "name" : "Post-translational modification: synthesis of GPI-anchored proteins",
                  "id" : "163125"
               },
               {
                  "children" : [
                     {
                        "id" : "446193",
                        "name" : "Biosynthesis of the N-glycan precursor (dolichol lipid-linked oligosaccharide, LLO) and transfer to a nascent protein",
                        "children" : [
                           {
                              "name" : "Synthesis of substrates in N-glycan biosythesis",
                              "children" : [
                                 {
                                    "id" : "446199",
                                    "name" : "Synthesis of Dolichyl-phosphate"
                                 },
                                 {
                                    "id" : "446210",
                                    "name" : "Synthesis of UDP-N-acetyl-glucosamine"
                                 },
                                 {
                                    "id" : "446205",
                                    "name" : "Synthesis of GDP-mannose"
                                 },
                                 {
                                    "name" : "Synthesis of dolichyl-phosphate mannose",
                                    "id" : "162699"
                                 },
                                 {
                                    "id" : "480985",
                                    "name" : "Synthesis of dolichyl-phosphate-glucose"
                                 },
                                 {
                                    "name" : "Sialic acid metabolism",
                                    "id" : "4085001"
                                 },
                                 {
                                    "id" : "6787639",
                                    "name" : "GDP-fucose biosynthesis"
                                 }
                              ],
                              "id" : "446219"
                           }
                        ]
                     },
                     {
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "ER Quality Control Compartment (ERQC)",
                                    "id" : "901032"
                                 }
                              ],
                              "name" : "Calnexin/calreticulin cycle",
                              "id" : "901042"
                           }
                        ],
                        "name" : "N-glycan trimming in the ER and Calnexin/Calreticulin cycle",
                        "id" : "532668"
                     },
                     {
                        "id" : "948021",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "5694530",
                                    "name" : "Cargo concentration in the ER"
                                 },
                                 {
                                    "name" : "COPII (Coat Protein 2) Mediated Vesicle Transport",
                                    "id" : "204005"
                                 },
                                 {
                                    "name" : "COPI-mediated anterograde transport",
                                    "id" : "6807878"
                                 }
                              ],
                              "name" : "ER to Golgi Anterograde Transport",
                              "id" : "199977"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Progressive trimming of alpha-1,2-linked mannose residues from Man9/8/7GlcNAc2 to produce Man5GlcNAc2",
                                    "id" : "964827"
                                 }
                              ],
                              "name" : "N-glycan trimming and elongation in the cis-Golgi",
                              "id" : "964739"
                           },
                           {
                              "name" : "N-glycan antennae elongation in the medial/trans-Golgi",
                              "children" : [
                                 {
                                    "id" : "975574",
                                    "name" : "Reactions specific to the hybrid N-glycan synthesis pathway"
                                 },
                                 {
                                    "id" : "975578",
                                    "name" : "Reactions specific to the complex N-glycan synthesis pathway"
                                 },
                                 {
                                    "id" : "975577",
                                    "name" : "N-Glycan antennae elongation"
                                 }
                              ],
                              "id" : "975576"
                           }
                        ],
                        "name" : "Transport to the Golgi and subsequent modification"
                     }
                  ],
                  "name" : "Asparagine N-linked glycosylation",
                  "id" : "446203"
               },
               {
                  "name" : "O-linked glycosylation",
                  "children" : [
                     {
                        "id" : "5173214",
                        "name" : "O-glycosylation of TSR domain-containing proteins"
                     },
                     {
                        "name" : "O-linked glycosylation of mucins",
                        "children" : [
                           {
                              "id" : "977068",
                              "name" : "Termination of O-glycan biosynthesis"
                           }
                        ],
                        "id" : "913709"
                     }
                  ],
                  "id" : "5173105"
               },
               {
                  "children" : [
                     {
                        "id" : "3215018",
                        "children" : [
                           {
                              "id" : "3065679",
                              "name" : "SUMO is proteolytically processed"
                           },
                           {
                              "name" : "SUMO is conjugated to E1 (UBA2:SAE1)",
                              "id" : "3065676"
                           },
                           {
                              "name" : "SUMO is transferred from E1 to E2 (UBE2I, UBC9)",
                              "id" : "3065678"
                           }
                        ],
                        "name" : "Processing and activation of SUMO"
                     },
                     {
                        "id" : "3108232",
                        "children" : [
                           {
                              "id" : "3232118",
                              "name" : "SUMOylation of transcription factors"
                           },
                           {
                              "id" : "3108214",
                              "name" : "SUMOylation of DNA damage response and repair proteins"
                           },
                           {
                              "name" : "SUMOylation of chromatin organization proteins",
                              "id" : "4551638"
                           },
                           {
                              "name" : "SUMOylation of RNA binding proteins",
                              "id" : "4570464"
                           },
                           {
                              "name" : "SUMOylation of DNA replication proteins",
                              "id" : "4615885"
                           }
                        ],
                        "name" : "SUMO E3 ligases SUMOylate target proteins"
                     }
                  ],
                  "name" : "SUMOylation",
                  "id" : "2990846"
               }
            ],
            "id" : "597592"
         },
         {
            "name" : "Mitochondrial protein import",
            "id" : "1268020"
         },
         {
            "children" : [
               {
                  "id" : "264876",
                  "name" : "Insulin processing"
               },
               {
                  "name" : "Synthesis, secretion, and deacylation of Ghrelin",
                  "id" : "422085"
               },
               {
                  "id" : "2022377",
                  "name" : "Metabolism of Angiotensinogen to Angiotensins"
               },
               {
                  "id" : "400508",
                  "children" : [
                     {
                        "id" : "381771",
                        "name" : "Synthesis, secretion, and inactivation of Glucagon-like Peptide-1 (GLP-1)"
                     },
                     {
                        "name" : "Synthesis, secretion, and inactivation of Glucose-dependent Insulinotropic Polypeptide (GIP)",
                        "id" : "400511"
                     }
                  ],
                  "name" : "Incretin synthesis, secretion, and inactivation"
               },
               {
                  "id" : "209952",
                  "name" : "Peptide hormone biosynthesis",
                  "children" : [
                     {
                        "id" : "209822",
                        "name" : "Glycoprotein hormones"
                     }
                  ]
               }
            ],
            "name" : "Peptide hormone metabolism",
            "id" : "2980736"
         },
         {
            "name" : "Regulation of Insulin-like Growth Factor (IGF) transport and uptake by Insulin-like Growth Factor Binding Proteins (IGFBPs)",
            "id" : "381426"
         },
         {
            "id" : "381119",
            "children" : [
               {
                  "id" : "381033",
                  "children" : [
                     {
                        "name" : "ATF6-alpha activates chaperone genes",
                        "id" : "381183"
                     }
                  ],
                  "name" : "ATF6-alpha activates chaperones"
               },
               {
                  "name" : "IRE1alpha activates chaperones",
                  "children" : [
                     {
                        "id" : "381038",
                        "name" : "XBP1(S) activates chaperone genes"
                     }
                  ],
                  "id" : "381070"
               },
               {
                  "name" : "PERK regulates gene expression",
                  "children" : [
                     {
                        "name" : "ATF4 activates genes",
                        "id" : "380994"
                     }
                  ],
                  "id" : "381042"
               }
            ],
            "name" : "Unfolded Protein Response (UPR)"
         },
         {
            "name" : "Protein repair",
            "id" : "5676934"
         },
         {
            "name" : "Surfactant metabolism",
            "id" : "5683826"
         },
         {
            "id" : "977225",
            "name" : "Amyloid fiber formation"
         }
      ],
      "name" : "Metabolism of proteins",
      "id" : "392499"
   },
   {
      "id" : "397014",
      "children" : [
         {
            "id" : "390522",
            "name" : "Striated Muscle Contraction"
         },
         {
            "id" : "445355",
            "name" : "Smooth Muscle Contraction"
         },
         {
            "id" : "5576891",
            "children" : [
               {
                  "id" : "5576886",
                  "name" : "Phase 4 - resting membrane potential"
               },
               {
                  "id" : "5576892",
                  "name" : "Phase 0 - rapid depolarisation"
               },
               {
                  "id" : "5576894",
                  "name" : "Phase 1 - inactivation of fast Na+ channels"
               },
               {
                  "name" : "Phase 2 - plateau phase",
                  "id" : "5576893"
               },
               {
                  "name" : "Phase 3 - rapid repolarisation",
                  "id" : "5576890"
               },
               {
                  "id" : "5578775",
                  "name" : "Ion homeostasis"
               },
               {
                  "id" : "5578768",
                  "name" : "Physiological factors"
               }
            ],
            "name" : "Cardiac conduction"
         }
      ],
      "name" : "Muscle contraction"
   },
   {
      "name" : "Neuronal System",
      "children" : [
         {
            "children" : [
               {
                  "name" : "Electric Transmission Across Gap Junctions",
                  "id" : "112303"
               }
            ],
            "name" : "Transmission across Electrical Synapses ",
            "id" : "112307"
         },
         {
            "id" : "112315",
            "children" : [
               {
                  "id" : "112308",
                  "name" : "Depolarization of the Presynaptic Terminal Triggers the Opening of Calcium Channels"
               },
               {
                  "id" : "112310",
                  "name" : "Neurotransmitter Release Cycle",
                  "children" : [
                     {
                        "name" : "Norepinephrine Neurotransmitter Release Cycle",
                        "id" : "181430"
                     },
                     {
                        "id" : "181429",
                        "name" : "Serotonin Neurotransmitter Release Cycle"
                     },
                     {
                        "name" : "Glutamate Neurotransmitter Release Cycle",
                        "id" : "210500"
                     },
                     {
                        "name" : "Dopamine Neurotransmitter Release Cycle",
                        "id" : "212676"
                     },
                     {
                        "name" : "Acetylcholine Neurotransmitter Release Cycle",
                        "id" : "264642"
                     },
                     {
                        "children" : [
                           {
                              "name" : "GABA synthesis",
                              "id" : "888568"
                           },
                           {
                              "name" : "Reuptake of GABA",
                              "id" : "888593"
                           },
                           {
                              "name" : "Degradation of GABA",
                              "id" : "916853"
                           }
                        ],
                        "name" : "GABA synthesis, release, reuptake and degradation",
                        "id" : "888590"
                     }
                  ]
               },
               {
                  "id" : "112311",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "Enzymatic degradation of dopamine by COMT",
                              "id" : "379397"
                           },
                           {
                              "name" : "Enzymatic degradation of Dopamine by monoamine oxidase",
                              "id" : "379398"
                           }
                        ],
                        "name" : "Dopamine clearance from the synaptic cleft",
                        "id" : "379401"
                     },
                     {
                        "name" : "Serotonin clearance from the synaptic cleft",
                        "children" : [
                           {
                              "id" : "380612",
                              "name" : "Metabolism of serotonin"
                           }
                        ],
                        "id" : "380615"
                     }
                  ],
                  "name" : "Neurotransmitter Clearance In The Synaptic Cleft"
               },
               {
                  "children" : [
                     {
                        "id" : "210455",
                        "name" : "Astrocytic Glutamate-Glutamine Uptake And Metabolism"
                     }
                  ],
                  "name" : "Neurotransmitter uptake and Metabolism In Glial Cells",
                  "id" : "112313"
               },
               {
                  "name" : "Neurotransmitter Receptor Binding And Downstream Transmission In The  Postsynaptic Cell",
                  "children" : [
                     {
                        "name" : "Acetylcholine Binding And Downstream Events",
                        "children" : [
                           {
                              "name" : "Activation of Nicotinic Acetylcholine Receptors",
                              "children" : [
                                 {
                                    "id" : "622323",
                                    "name" : "Presynaptic nicotinic acetylcholine receptors",
                                    "children" : [
                                       {
                                          "name" : "Highly calcium permeable nicotinic acetylcholine receptors",
                                          "id" : "629597"
                                       },
                                       {
                                          "name" : "Highly sodium permeable acetylcholine nicotinic receptors",
                                          "id" : "629587"
                                       }
                                    ]
                                 },
                                 {
                                    "name" : "Postsynaptic nicotinic acetylcholine receptors",
                                    "children" : [
                                       {
                                          "id" : "629594",
                                          "name" : "Highly calcium permeable postsynaptic nicotinic acetylcholine receptors"
                                       },
                                       {
                                          "name" : "Highly sodium permeable acetylcholine nicotinic receptors",
                                          "id" : "629587"
                                       }
                                    ],
                                    "id" : "622327"
                                 }
                              ],
                              "id" : "629602"
                           }
                        ],
                        "id" : "181431"
                     },
                     {
                        "name" : "Glutamate Binding, Activation of AMPA Receptors and Synaptic Plasticity",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "416993",
                                    "name" : "Trafficking of GluR2-containing AMPA receptors"
                                 }
                              ],
                              "name" : "Trafficking of AMPA receptors",
                              "id" : "399719"
                           },
                           {
                              "name" : "Activation of AMPA receptors",
                              "id" : "399710"
                           }
                        ],
                        "id" : "399721"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Unblocking of NMDA receptor, glutamate binding and activation",
                              "id" : "438066"
                           },
                           {
                              "children" : [
                                 {
                                    "id" : "442742",
                                    "children" : [
                                       {
                                          "name" : "Ras activation uopn Ca2+ infux through NMDA receptor",
                                          "id" : "442982"
                                       },
                                       {
                                          "id" : "444257",
                                          "name" : "RSK activation"
                                       }
                                    ],
                                    "name" : "CREB phosphorylation through the activation of Ras"
                                 },
                                 {
                                    "id" : "442720",
                                    "name" : "CREB phosphorylation through the activation of Adenylate Cyclase"
                                 },
                                 {
                                    "name" : "CREB phosphorylation through the activation of CaMKII",
                                    "id" : "442729"
                                 },
                                 {
                                    "name" : "CREB phosphorylation through the activation of CaMKK",
                                    "children" : [
                                       {
                                          "name" : "Activation of CaMK IV",
                                          "id" : "442745"
                                       }
                                    ],
                                    "id" : "442717"
                                 }
                              ],
                              "name" : "Post NMDA receptor activation events",
                              "id" : "438064"
                           }
                        ],
                        "name" : "Activation of NMDA receptor upon glutamate binding and postsynaptic events",
                        "id" : "442755"
                     },
                     {
                        "id" : "451326",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "451307",
                                    "name" : "Activation of Na-permeable Kainate Receptors"
                                 },
                                 {
                                    "name" : "Activation of Ca-permeable Kainate Receptor",
                                    "id" : "451308"
                                 }
                              ],
                              "name" : "Ionotropic activity of Kainate Receptors",
                              "id" : "451306"
                           },
                           {
                              "name" : "Presynaptic function of Kainate receptors",
                              "id" : "500657"
                           }
                        ],
                        "name" : "Activation of Kainate Receptors upon glutamate binding"
                     },
                     {
                        "id" : "977443",
                        "children" : [
                           {
                              "name" : "GABA A receptor activation",
                              "id" : "977441"
                           },
                           {
                              "children" : [
                                 {
                                    "id" : "991365",
                                    "name" : "Activation of GABAB receptors",
                                    "children" : [
                                       {
                                          "id" : "997269",
                                          "name" : "Inhibition of adenylate cyclase pathway",
                                          "children" : [
                                             {
                                                "id" : "170670",
                                                "name" : "Adenylate cyclase inhibitory pathway"
                                             }
                                          ]
                                       },
                                       {
                                          "id" : "997272",
                                          "name" : "Inhibition  of voltage gated Ca2+ channels via Gbeta/gamma subunits"
                                       }
                                    ]
                                 }
                              ],
                              "name" : "GABA B receptor activation",
                              "id" : "977444"
                           },
                           {
                              "id" : "977442",
                              "name" : "GABA A (rho) receptor activation"
                           }
                        ],
                        "name" : "GABA receptor activation"
                     }
                  ],
                  "id" : "112314"
               }
            ],
            "name" : "Transmission across Chemical Synapses"
         },
         {
            "name" : "Potassium Channels",
            "children" : [
               {
                  "name" : "Ca2+ activated K+ channels",
                  "id" : "1296052"
               },
               {
                  "id" : "1296061",
                  "name" : "HCN channels"
               },
               {
                  "id" : "1296065",
                  "children" : [
                     {
                        "id" : "1296059",
                        "children" : [
                           {
                              "id" : "1296041",
                              "name" : "Activation of G protein gated Potassium channels"
                           }
                        ],
                        "name" : "G protein gated Potassium channels"
                     },
                     {
                        "id" : "1296067",
                        "name" : "Potassium transport channels"
                     },
                     {
                        "name" : "ATP sensitive Potassium channels",
                        "id" : "1296025"
                     },
                     {
                        "id" : "1296053",
                        "name" : "Classical Kir channels"
                     }
                  ],
                  "name" : "Inwardly rectifying K+ channels"
               },
               {
                  "id" : "1296072",
                  "name" : "Voltage gated Potassium channels"
               },
               {
                  "id" : "1296346",
                  "children" : [
                     {
                        "name" : "Tandem of pore domain in a weak inwardly rectifying K+ channels (TWIK)",
                        "id" : "1299308"
                     },
                     {
                        "id" : "1299503",
                        "name" : "TWIK related potassium channel (TREK)"
                     },
                     {
                        "name" : "TWIK-releated acid-sensitive K+ channel (TASK)",
                        "id" : "1299316"
                     },
                     {
                        "id" : "1299361",
                        "name" : "TWIK-related alkaline pH activated K+ channel (TALK)"
                     },
                     {
                        "name" : "TWIK-related spinal cord K+ channel (TRESK)",
                        "id" : "1299344"
                     },
                     {
                        "id" : "1299287",
                        "name" : "Tandem pore domain halothane-inhibited K+ channel (THIK)"
                     }
                  ],
                  "name" : "Tandem pore domain potassium channels"
               }
            ],
            "id" : "1296071"
         }
      ],
      "id" : "112316"
   },
   {
      "id" : "1852241",
      "children" : [
         {
            "id" : "1592230",
            "children" : [
               {
                  "id" : "2151209",
                  "name" : "Activation of PPARGC1A (PGC-1alpha) by phosphorylation"
               },
               {
                  "id" : "2151201",
                  "name" : "Transcriptional activation of mitochondrial biogenesis"
               }
            ],
            "name" : "Mitochondrial biogenesis"
         },
         {
            "children" : [
               {
                  "name" : "Mitochondrial translation initiation",
                  "id" : "5368286"
               },
               {
                  "name" : "Mitochondrial translation elongation",
                  "id" : "5389840"
               },
               {
                  "name" : "Mitochondrial translation termination",
                  "id" : "5419276"
               }
            ],
            "name" : "Mitochondrial translation",
            "id" : "5368287"
         },
         {
            "children" : [
               {
                  "name" : "Anchoring of the basal body to the plasma membrane",
                  "id" : "5620912"
               },
               {
                  "name" : "Cargo trafficking to the periciliary membrane",
                  "children" : [
                     {
                        "id" : "5620916",
                        "name" : "VxPx cargo-targeting to cilium"
                     },
                     {
                        "id" : "5620922",
                        "name" : "BBSome-mediated cargo-targeting to cilium"
                     },
                     {
                        "name" : "Trafficking of myristoylated proteins to the cilium",
                        "id" : "5624138"
                     },
                     {
                        "id" : "5624958",
                        "name" : "ARL13B-mediated ciliary trafficking of INPP5E"
                     }
                  ],
                  "id" : "5620920"
               },
               {
                  "name" : "Intraflagellar transport",
                  "id" : "5620924"
               }
            ],
            "name" : "Assembly of the primary cilium",
            "id" : "5617833"
         }
      ],
      "name" : "Organelle biogenesis and maintenance"
   },
   {
      "id" : "5357801",
      "name" : "Programmed Cell Death",
      "children" : [
         {
            "id" : "109581",
            "name" : "Apoptosis",
            "children" : [
               {
                  "name" : "Caspase activation via extrinsic apoptotic signalig pathway",
                  "children" : [
                     {
                        "id" : "140534",
                        "name" : "Ligand-dependent caspase activation",
                        "children" : [
                           {
                              "id" : "69416",
                              "name" : "Dimerization of procaspase-8"
                           },
                           {
                              "name" : "Regulation by c-FLIP",
                              "id" : "3371378"
                           }
                        ]
                     },
                     {
                        "name" : "Ligand-independent caspase activation via DCC",
                        "id" : "418889"
                     }
                  ],
                  "id" : "5357769"
               },
               {
                  "id" : "109606",
                  "name" : "Intrinsic Pathway for Apoptosis",
                  "children" : [
                     {
                        "id" : "75108",
                        "name" : "Activation, myristolyation of BID and translocation to mitochondria"
                     },
                     {
                        "id" : "114452",
                        "children" : [
                           {
                              "id" : "111447",
                              "name" : "Activation of BAD and translocation to mitochondria "
                           },
                           {
                              "name" : "Activation of NOXA and translocation to mitochondria",
                              "id" : "111448"
                           },
                           {
                              "name" : "Activation of PUMA and translocation to mitochondria",
                              "id" : "139915"
                           },
                           {
                              "id" : "111446",
                              "name" : "Activation of BIM and translocation to mitochondria "
                           },
                           {
                              "id" : "139910",
                              "name" : "Activation of BMF and translocation to mitochondria"
                           }
                        ],
                        "name" : "Activation of BH3-only proteins"
                     },
                     {
                        "name" : "BH3-only proteins associate with and inactivate anti-apoptotic BCL-2 members",
                        "id" : "111453"
                     },
                     {
                        "id" : "114294",
                        "name" : "Activation, translocation and oligomerization of BAX"
                     },
                     {
                        "id" : "111452",
                        "name" : "Activation and oligomerization of BAK protein"
                     },
                     {
                        "id" : "111457",
                        "name" : "Release of apoptotic factors from the mitochondria"
                     },
                     {
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "Formation of apoptosome",
                                    "id" : "111458"
                                 },
                                 {
                                    "name" : "Activation of caspases through apoptosome-mediated cleavage",
                                    "id" : "111459"
                                 }
                              ],
                              "name" : "Cytochrome c-mediated apoptotic response",
                              "id" : "111461"
                           },
                           {
                              "id" : "111469",
                              "name" : "SMAC-mediated apoptotic response",
                              "children" : [
                                 {
                                    "id" : "111463",
                                    "name" : "SMAC binds to IAPs "
                                 },
                                 {
                                    "id" : "111464",
                                    "name" : "SMAC-mediated dissociation of IAP:caspase complexes "
                                 }
                              ]
                           }
                        ],
                        "name" : "Apoptotic factor-mediated response",
                        "id" : "111471"
                     }
                  ]
               },
               {
                  "id" : "75153",
                  "children" : [
                     {
                        "name" : "Apoptotic cleavage of cellular proteins",
                        "children" : [
                           {
                              "id" : "264870",
                              "name" : "Caspase-mediated cleavage of cytoskeletal proteins"
                           },
                           {
                              "name" : "Apoptotic cleavage of cell adhesion  proteins",
                              "id" : "351906"
                           },
                           {
                              "name" : "Breakdown of the nuclear lamina",
                              "id" : "352238"
                           }
                        ],
                        "id" : "111465"
                     },
                     {
                        "children" : [
                           {
                              "id" : "211227",
                              "name" : "Activation of DNA fragmentation factor"
                           }
                        ],
                        "name" : "Apoptosis induced DNA fragmentation",
                        "id" : "140342"
                     },
                     {
                        "id" : "211736",
                        "name" : "Stimulation of the cell death response by PAK-2p34"
                     }
                  ],
                  "name" : "Apoptotic execution  phase"
               },
               {
                  "children" : [
                     {
                        "id" : "211733",
                        "name" : "Regulation of activated PAK-2p34 by proteasome mediated degradation"
                     },
                     {
                        "id" : "211728",
                        "name" : "Regulation of PAK-2p34 activity by PS-GAP/RHG10"
                     }
                  ],
                  "name" : "Regulation of Apoptosis",
                  "id" : "169911"
               }
            ]
         },
         {
            "id" : "5218859",
            "name" : "Regulated Necrosis",
            "children" : [
               {
                  "name" : "RIPK1-mediated regulated necrosis",
                  "children" : [
                     {
                        "name" : "Regulation of necroptotic cell death",
                        "children" : [
                           {
                              "name" : "CASP8 activity is inhibited",
                              "id" : "5218900"
                           }
                        ],
                        "id" : "5675482"
                     }
                  ],
                  "id" : "5213460"
               }
            ]
         }
      ]
   },
   {
      "children" : [
         {
            "id" : "1187000",
            "children" : [
               {
                  "id" : "1300642",
                  "name" : "Sperm Motility And Taxes"
               },
               {
                  "id" : "2534343",
                  "name" : "Interaction With Cumulus Cells"
               },
               {
                  "name" : "Interaction With The Zona Pellucida",
                  "id" : "1300644"
               },
               {
                  "name" : "Acrosome Reaction",
                  "id" : "1300645"
               },
               {
                  "id" : "1300652",
                  "name" : "Sperm:Oocyte Membrane Binding"
               }
            ],
            "name" : "Fertilization"
         }
      ],
      "name" : "Reproduction",
      "id" : "1474165"
   },
   {
      "children" : [
         {
            "id" : "177929",
            "name" : "Signaling by EGFR",
            "children" : [
               {
                  "id" : "212718",
                  "children" : [
                     {
                        "id" : "1489509",
                        "name" : "DAG and IP3 signaling",
                        "children" : [
                           {
                              "id" : "111997",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "PKA-mediated phosphorylation of CREB",
                                          "children" : [
                                             {
                                                "name" : "PKA activation",
                                                "id" : "163615"
                                             }
                                          ],
                                          "id" : "111931"
                                       },
                                       {
                                          "name" : "CaMK IV-mediated phosphorylation of CREB",
                                          "id" : "111932"
                                       },
                                       {
                                          "id" : "111957",
                                          "name" : "Cam-PDE 1 activation"
                                       }
                                    ],
                                    "name" : "Calmodulin induced events",
                                    "id" : "111933"
                                 }
                              ],
                              "name" : "CaM pathway"
                           }
                        ]
                     }
                  ],
                  "name" : "EGFR interacts with phospholipase C-gamma"
               },
               {
                  "name" : "GRB2 events in EGFR signaling",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "RAF activation",
                              "id" : "5673000"
                           },
                           {
                              "id" : "5674135",
                              "name" : "MAP2K and MAPK activation"
                           },
                           {
                              "id" : "5675221",
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ],
                              "name" : "Negative regulation of MAPK pathway"
                           },
                           {
                              "id" : "5658442",
                              "name" : "Regulation of RAS by GAPs"
                           }
                        ],
                        "name" : "RAF/MAP kinase cascade",
                        "id" : "5673001"
                     }
                  ],
                  "id" : "179812"
               },
               {
                  "name" : "SHC1 events in EGFR signaling",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "RAF activation",
                              "id" : "5673000"
                           },
                           {
                              "name" : "MAP2K and MAPK activation",
                              "id" : "5674135"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ],
                              "name" : "Negative regulation of MAPK pathway",
                              "id" : "5675221"
                           },
                           {
                              "name" : "Regulation of RAS by GAPs",
                              "id" : "5658442"
                           }
                        ],
                        "name" : "RAF/MAP kinase cascade",
                        "id" : "5673001"
                     }
                  ],
                  "id" : "180336"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "id" : "198323",
                              "name" : "AKT phosphorylates targets in the cytosol"
                           },
                           {
                              "name" : "AKT phosphorylates targets in the nucleus",
                              "id" : "198693"
                           },
                           {
                              "name" : "Negative regulation of the PI3K/AKT network",
                              "id" : "199418"
                           }
                        ],
                        "name" : "PIP3 activates AKT signaling",
                        "id" : "1257604"
                     }
                  ],
                  "name" : "GAB1 signalosome",
                  "id" : "180292"
               },
               {
                  "id" : "182971",
                  "name" : "EGFR downregulation"
               }
            ]
         },
         {
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "190242",
                        "children" : [
                           {
                              "id" : "190370",
                              "name" : "FGFR1b ligand binding and activation"
                           },
                           {
                              "id" : "190373",
                              "name" : "FGFR1c ligand binding and activation"
                           },
                           {
                              "id" : "190374",
                              "name" : "FGFR1c and Klotho ligand binding and activation"
                           }
                        ],
                        "name" : "FGFR1 ligand binding and activation"
                     },
                     {
                        "name" : "Downstream signaling of activated FGFR1",
                        "children" : [
                           {
                              "id" : "5654693",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "RAF activation",
                                          "id" : "5673000"
                                       },
                                       {
                                          "id" : "5674135",
                                          "name" : "MAP2K and MAPK activation"
                                       },
                                       {
                                          "id" : "5675221",
                                          "children" : [
                                             {
                                                "id" : "5674499",
                                                "name" : "Negative feedback regulation of MAPK pathway"
                                             }
                                          ],
                                          "name" : "Negative regulation of MAPK pathway"
                                       },
                                       {
                                          "id" : "5658442",
                                          "name" : "Regulation of RAS by GAPs"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade",
                                    "id" : "5673001"
                                 }
                              ],
                              "name" : "FRS-mediated FGFR1 signaling"
                           },
                           {
                              "id" : "5654219",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "CaM pathway",
                                          "children" : [
                                             {
                                                "id" : "111933",
                                                "children" : [
                                                   {
                                                      "id" : "111931",
                                                      "name" : "PKA-mediated phosphorylation of CREB",
                                                      "children" : [
                                                         {
                                                            "name" : "PKA activation",
                                                            "id" : "163615"
                                                         }
                                                      ]
                                                   },
                                                   {
                                                      "name" : "CaMK IV-mediated phosphorylation of CREB",
                                                      "id" : "111932"
                                                   },
                                                   {
                                                      "name" : "Cam-PDE 1 activation",
                                                      "id" : "111957"
                                                   }
                                                ],
                                                "name" : "Calmodulin induced events"
                                             }
                                          ],
                                          "id" : "111997"
                                       }
                                    ],
                                    "name" : "DAG and IP3 signaling",
                                    "id" : "1489509"
                                 }
                              ],
                              "name" : "Phospholipase C-mediated cascade: FGFR1"
                           },
                           {
                              "name" : "SHC-mediated cascade:FGFR1",
                              "id" : "5654688"
                           },
                           {
                              "name" : "PI-3K cascade:FGFR1",
                              "children" : [
                                 {
                                    "id" : "1257604",
                                    "name" : "PIP3 activates AKT signaling",
                                    "children" : [
                                       {
                                          "name" : "AKT phosphorylates targets in the cytosol",
                                          "id" : "198323"
                                       },
                                       {
                                          "name" : "AKT phosphorylates targets in the nucleus",
                                          "id" : "198693"
                                       },
                                       {
                                          "name" : "Negative regulation of the PI3K/AKT network",
                                          "id" : "199418"
                                       }
                                    ]
                                 }
                              ],
                              "id" : "5654689"
                           }
                        ],
                        "id" : "5654687"
                     },
                     {
                        "id" : "5654726",
                        "children" : [
                           {
                              "name" : "Spry regulation of FGF signaling",
                              "id" : "1295596"
                           }
                        ],
                        "name" : "Negative regulation of FGFR1 signaling"
                     }
                  ],
                  "name" : "Signaling by FGFR1",
                  "id" : "5654736"
               },
               {
                  "id" : "5654738",
                  "children" : [
                     {
                        "id" : "190241",
                        "name" : "FGFR2 ligand binding and activation",
                        "children" : [
                           {
                              "name" : "FGFR2b ligand binding and activation",
                              "id" : "190377"
                           },
                           {
                              "name" : "FGFR2c ligand binding and activation",
                              "id" : "190375"
                           }
                        ]
                     },
                     {
                        "name" : "Downstream signaling of activated FGFR2",
                        "children" : [
                           {
                              "id" : "5654700",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "RAF activation",
                                          "id" : "5673000"
                                       },
                                       {
                                          "id" : "5674135",
                                          "name" : "MAP2K and MAPK activation"
                                       },
                                       {
                                          "name" : "Negative regulation of MAPK pathway",
                                          "children" : [
                                             {
                                                "id" : "5674499",
                                                "name" : "Negative feedback regulation of MAPK pathway"
                                             }
                                          ],
                                          "id" : "5675221"
                                       },
                                       {
                                          "id" : "5658442",
                                          "name" : "Regulation of RAS by GAPs"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade",
                                    "id" : "5673001"
                                 }
                              ],
                              "name" : "FRS-mediated FGFR2 signaling"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "DAG and IP3 signaling",
                                    "children" : [
                                       {
                                          "children" : [
                                             {
                                                "name" : "Calmodulin induced events",
                                                "children" : [
                                                   {
                                                      "id" : "111931",
                                                      "name" : "PKA-mediated phosphorylation of CREB",
                                                      "children" : [
                                                         {
                                                            "id" : "163615",
                                                            "name" : "PKA activation"
                                                         }
                                                      ]
                                                   },
                                                   {
                                                      "id" : "111932",
                                                      "name" : "CaMK IV-mediated phosphorylation of CREB"
                                                   },
                                                   {
                                                      "id" : "111957",
                                                      "name" : "Cam-PDE 1 activation"
                                                   }
                                                ],
                                                "id" : "111933"
                                             }
                                          ],
                                          "name" : "CaM pathway",
                                          "id" : "111997"
                                       }
                                    ],
                                    "id" : "1489509"
                                 }
                              ],
                              "name" : "Phospholipase C-mediated cascade; FGFR2",
                              "id" : "5654221"
                           },
                           {
                              "id" : "5654699",
                              "name" : "SHC-mediated cascade:FGFR2"
                           },
                           {
                              "name" : "PI-3K cascade:FGFR2",
                              "children" : [
                                 {
                                    "name" : "PIP3 activates AKT signaling",
                                    "children" : [
                                       {
                                          "id" : "198323",
                                          "name" : "AKT phosphorylates targets in the cytosol"
                                       },
                                       {
                                          "name" : "AKT phosphorylates targets in the nucleus",
                                          "id" : "198693"
                                       },
                                       {
                                          "name" : "Negative regulation of the PI3K/AKT network",
                                          "id" : "199418"
                                       }
                                    ],
                                    "id" : "1257604"
                                 }
                              ],
                              "id" : "5654695"
                           }
                        ],
                        "id" : "5654696"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Spry regulation of FGF signaling",
                              "id" : "1295596"
                           }
                        ],
                        "name" : "Negative regulation of FGFR2 signaling",
                        "id" : "5654727"
                     }
                  ],
                  "name" : "Signaling by FGFR2"
               },
               {
                  "id" : "5654741",
                  "name" : "Signaling by FGFR3",
                  "children" : [
                     {
                        "id" : "190239",
                        "children" : [
                           {
                              "id" : "190371",
                              "name" : "FGFR3b ligand binding and activation"
                           },
                           {
                              "id" : "190372",
                              "name" : "FGFR3c ligand binding and activation"
                           }
                        ],
                        "name" : "FGFR3 ligand binding and activation"
                     },
                     {
                        "children" : [
                           {
                              "id" : "5654706",
                              "name" : "FRS-mediated FGFR3 signaling",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "id" : "5673000",
                                          "name" : "RAF activation"
                                       },
                                       {
                                          "id" : "5674135",
                                          "name" : "MAP2K and MAPK activation"
                                       },
                                       {
                                          "name" : "Negative regulation of MAPK pathway",
                                          "children" : [
                                             {
                                                "name" : "Negative feedback regulation of MAPK pathway",
                                                "id" : "5674499"
                                             }
                                          ],
                                          "id" : "5675221"
                                       },
                                       {
                                          "name" : "Regulation of RAS by GAPs",
                                          "id" : "5658442"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade",
                                    "id" : "5673001"
                                 }
                              ]
                           },
                           {
                              "children" : [
                                 {
                                    "id" : "1489509",
                                    "children" : [
                                       {
                                          "id" : "111997",
                                          "children" : [
                                             {
                                                "name" : "Calmodulin induced events",
                                                "children" : [
                                                   {
                                                      "children" : [
                                                         {
                                                            "name" : "PKA activation",
                                                            "id" : "163615"
                                                         }
                                                      ],
                                                      "name" : "PKA-mediated phosphorylation of CREB",
                                                      "id" : "111931"
                                                   },
                                                   {
                                                      "name" : "CaMK IV-mediated phosphorylation of CREB",
                                                      "id" : "111932"
                                                   },
                                                   {
                                                      "name" : "Cam-PDE 1 activation",
                                                      "id" : "111957"
                                                   }
                                                ],
                                                "id" : "111933"
                                             }
                                          ],
                                          "name" : "CaM pathway"
                                       }
                                    ],
                                    "name" : "DAG and IP3 signaling"
                                 }
                              ],
                              "name" : "Phospholipase C-mediated cascade; FGFR3",
                              "id" : "5654227"
                           },
                           {
                              "name" : "SHC-mediated cascade:FGFR3",
                              "id" : "5654704"
                           },
                           {
                              "id" : "5654710",
                              "name" : "PI-3K cascade:FGFR3",
                              "children" : [
                                 {
                                    "id" : "1257604",
                                    "children" : [
                                       {
                                          "name" : "AKT phosphorylates targets in the cytosol",
                                          "id" : "198323"
                                       },
                                       {
                                          "name" : "AKT phosphorylates targets in the nucleus",
                                          "id" : "198693"
                                       },
                                       {
                                          "id" : "199418",
                                          "name" : "Negative regulation of the PI3K/AKT network"
                                       }
                                    ],
                                    "name" : "PIP3 activates AKT signaling"
                                 }
                              ]
                           }
                        ],
                        "name" : "Downstream signaling of activated FGFR3",
                        "id" : "5654708"
                     },
                     {
                        "id" : "5654732",
                        "name" : "Negative regulation of FGFR3 signaling",
                        "children" : [
                           {
                              "name" : "Spry regulation of FGF signaling",
                              "id" : "1295596"
                           }
                        ]
                     }
                  ]
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "betaKlotho-mediated ligand binding",
                              "id" : "1307965"
                           }
                        ],
                        "name" : "FGFR4 ligand binding and activation",
                        "id" : "190322"
                     },
                     {
                        "id" : "5654716",
                        "name" : "Downstream signaling of activated FGFR4",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "5673001",
                                    "children" : [
                                       {
                                          "id" : "5673000",
                                          "name" : "RAF activation"
                                       },
                                       {
                                          "name" : "MAP2K and MAPK activation",
                                          "id" : "5674135"
                                       },
                                       {
                                          "id" : "5675221",
                                          "children" : [
                                             {
                                                "name" : "Negative feedback regulation of MAPK pathway",
                                                "id" : "5674499"
                                             }
                                          ],
                                          "name" : "Negative regulation of MAPK pathway"
                                       },
                                       {
                                          "id" : "5658442",
                                          "name" : "Regulation of RAS by GAPs"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade"
                                 }
                              ],
                              "name" : "FRS-mediated FGFR4 signaling",
                              "id" : "5654712"
                           },
                           {
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "CaM pathway",
                                          "children" : [
                                             {
                                                "id" : "111933",
                                                "name" : "Calmodulin induced events",
                                                "children" : [
                                                   {
                                                      "id" : "111931",
                                                      "children" : [
                                                         {
                                                            "id" : "163615",
                                                            "name" : "PKA activation"
                                                         }
                                                      ],
                                                      "name" : "PKA-mediated phosphorylation of CREB"
                                                   },
                                                   {
                                                      "id" : "111932",
                                                      "name" : "CaMK IV-mediated phosphorylation of CREB"
                                                   },
                                                   {
                                                      "name" : "Cam-PDE 1 activation",
                                                      "id" : "111957"
                                                   }
                                                ]
                                             }
                                          ],
                                          "id" : "111997"
                                       }
                                    ],
                                    "name" : "DAG and IP3 signaling",
                                    "id" : "1489509"
                                 }
                              ],
                              "name" : "Phospholipase C-mediated cascade; FGFR4",
                              "id" : "5654228"
                           },
                           {
                              "name" : "SHC-mediated cascade:FGFR4",
                              "id" : "5654719"
                           },
                           {
                              "children" : [
                                 {
                                    "id" : "1257604",
                                    "name" : "PIP3 activates AKT signaling",
                                    "children" : [
                                       {
                                          "id" : "198323",
                                          "name" : "AKT phosphorylates targets in the cytosol"
                                       },
                                       {
                                          "name" : "AKT phosphorylates targets in the nucleus",
                                          "id" : "198693"
                                       },
                                       {
                                          "name" : "Negative regulation of the PI3K/AKT network",
                                          "id" : "199418"
                                       }
                                    ]
                                 }
                              ],
                              "name" : "PI-3K cascade:FGFR4",
                              "id" : "5654720"
                           }
                        ]
                     },
                     {
                        "name" : "Negative regulation of FGFR4 signaling",
                        "children" : [
                           {
                              "id" : "1295596",
                              "name" : "Spry regulation of FGF signaling"
                           }
                        ],
                        "id" : "5654733"
                     }
                  ],
                  "name" : "Signaling by FGFR4",
                  "id" : "5654743"
               }
            ],
            "name" : "Signaling by FGFR",
            "id" : "190236"
         },
         {
            "name" : "Signaling by Insulin receptor",
            "children" : [
               {
                  "name" : "Insulin receptor signalling cascade",
                  "children" : [
                     {
                        "name" : "IRS activation",
                        "id" : "74713"
                     },
                     {
                        "name" : "IRS-mediated signalling",
                        "children" : [
                           {
                              "id" : "109704",
                              "children" : [
                                 {
                                    "name" : "Activation of AKT2",
                                    "id" : "165158"
                                 },
                                 {
                                    "children" : [
                                       {
                                          "name" : "PDE3B signalling",
                                          "id" : "165160"
                                       },
                                       {
                                          "children" : [
                                             {
                                                "name" : "Inhibition of TSC complex formation by PKB",
                                                "id" : "165181"
                                             },
                                             {
                                                "id" : "166208",
                                                "name" : "mTORC1-mediated signalling"
                                             },
                                             {
                                                "id" : "380972",
                                                "name" : "Energy dependent regulation of mTOR by LKB1-AMPK"
                                             }
                                          ],
                                          "name" : "mTOR signalling",
                                          "id" : "165159"
                                       }
                                    ],
                                    "name" : "PKB-mediated events",
                                    "id" : "109703"
                                 }
                              ],
                              "name" : "PI3K Cascade"
                           },
                           {
                              "id" : "112412",
                              "name" : "SOS-mediated signalling",
                              "children" : [
                                 {
                                    "name" : "RAF/MAP kinase cascade",
                                    "children" : [
                                       {
                                          "id" : "5673000",
                                          "name" : "RAF activation"
                                       },
                                       {
                                          "name" : "MAP2K and MAPK activation",
                                          "id" : "5674135"
                                       },
                                       {
                                          "id" : "5675221",
                                          "children" : [
                                             {
                                                "name" : "Negative feedback regulation of MAPK pathway",
                                                "id" : "5674499"
                                             }
                                          ],
                                          "name" : "Negative regulation of MAPK pathway"
                                       },
                                       {
                                          "name" : "Regulation of RAS by GAPs",
                                          "id" : "5658442"
                                       }
                                    ],
                                    "id" : "5673001"
                                 }
                              ]
                           }
                        ],
                        "id" : "112399"
                     },
                     {
                        "id" : "74749",
                        "name" : "Signal attenuation"
                     }
                  ],
                  "id" : "74751"
               },
               {
                  "id" : "77387",
                  "name" : "Insulin receptor recycling"
               }
            ],
            "id" : "74752"
         },
         {
            "id" : "166520",
            "name" : "Signalling by NGF",
            "children" : [
               {
                  "name" : "NGF processing",
                  "id" : "167060"
               },
               {
                  "name" : "p75 NTR receptor-mediated signalling",
                  "children" : [
                     {
                        "id" : "205017",
                        "name" : "NFG and proNGF binds to p75NTR"
                     },
                     {
                        "name" : "Cell death signalling via NRAGE, NRIF and NADE",
                        "children" : [
                           {
                              "name" : "NRAGE signals death through JNK",
                              "id" : "193648"
                           },
                           {
                              "id" : "205043",
                              "name" : "NRIF signals cell death from the nucleus"
                           },
                           {
                              "id" : "205025",
                              "name" : "NADE modulates death signalling"
                           }
                        ],
                        "id" : "204998"
                     },
                     {
                        "id" : "193670",
                        "name" : "p75NTR negatively regulates cell cycle via SC1"
                     },
                     {
                        "children" : [
                           {
                              "name" : "p75NTR recruits signalling complexes",
                              "id" : "209543"
                           },
                           {
                              "name" : "NF-kB is activated and signals survival",
                              "id" : "209560"
                           }
                        ],
                        "name" : "p75NTR signals via NF-kB",
                        "id" : "193639"
                     },
                     {
                        "name" : "Ceramide signalling",
                        "id" : "193681"
                     },
                     {
                        "children" : [
                           {
                              "id" : "209563",
                              "name" : "Axonal growth stimulation"
                           },
                           {
                              "name" : "Axonal growth inhibition (RHOA activation)",
                              "id" : "193634"
                           }
                        ],
                        "name" : "p75NTR regulates axonogenesis",
                        "id" : "193697"
                     },
                     {
                        "id" : "193692",
                        "name" : "Regulated proteolysis of p75NTR"
                     }
                  ],
                  "id" : "193704"
               },
               {
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "TRKA activation by NGF",
                              "id" : "187042"
                           },
                           {
                              "id" : "187024",
                              "name" : "NGF-independant TRKA activation"
                           }
                        ],
                        "name" : "Activation of TRKA receptors",
                        "id" : "187015"
                     },
                     {
                        "name" : "Signalling to ERKs",
                        "children" : [
                           {
                              "id" : "167044",
                              "name" : "Signalling to RAS",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "id" : "5673000",
                                          "name" : "RAF activation"
                                       },
                                       {
                                          "name" : "MAP2K and MAPK activation",
                                          "id" : "5674135"
                                       },
                                       {
                                          "name" : "Negative regulation of MAPK pathway",
                                          "children" : [
                                             {
                                                "id" : "5674499",
                                                "name" : "Negative feedback regulation of MAPK pathway"
                                             }
                                          ],
                                          "id" : "5675221"
                                       },
                                       {
                                          "id" : "5658442",
                                          "name" : "Regulation of RAS by GAPs"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade",
                                    "id" : "5673001"
                                 },
                                 {
                                    "name" : "Feedback control in the MAPK signaling module",
                                    "id" : "197529"
                                 },
                                 {
                                    "id" : "171007",
                                    "name" : "p38MAPK events"
                                 }
                              ]
                           },
                           {
                              "id" : "187706",
                              "name" : "Signalling to p38 via RIT and RIN",
                              "children" : [
                                 {
                                    "id" : "5673001",
                                    "children" : [
                                       {
                                          "name" : "RAF activation",
                                          "id" : "5673000"
                                       },
                                       {
                                          "id" : "5674135",
                                          "name" : "MAP2K and MAPK activation"
                                       },
                                       {
                                          "id" : "5675221",
                                          "name" : "Negative regulation of MAPK pathway",
                                          "children" : [
                                             {
                                                "name" : "Negative feedback regulation of MAPK pathway",
                                                "id" : "5674499"
                                             }
                                          ]
                                       },
                                       {
                                          "name" : "Regulation of RAS by GAPs",
                                          "id" : "5658442"
                                       }
                                    ],
                                    "name" : "RAF/MAP kinase cascade"
                                 }
                              ]
                           },
                           {
                              "id" : "169893",
                              "children" : [
                                 {
                                    "id" : "170968",
                                    "name" : "Frs2-mediated activation",
                                    "children" : [
                                       {
                                          "children" : [
                                             {
                                                "id" : "5673000",
                                                "name" : "RAF activation"
                                             },
                                             {
                                                "name" : "MAP2K and MAPK activation",
                                                "id" : "5674135"
                                             },
                                             {
                                                "children" : [
                                                   {
                                                      "name" : "Negative feedback regulation of MAPK pathway",
                                                      "id" : "5674499"
                                                   }
                                                ],
                                                "name" : "Negative regulation of MAPK pathway",
                                                "id" : "5675221"
                                             },
                                             {
                                                "name" : "Regulation of RAS by GAPs",
                                                "id" : "5658442"
                                             }
                                          ],
                                          "name" : "RAF/MAP kinase cascade",
                                          "id" : "5673001"
                                       }
                                    ]
                                 },
                                 {
                                    "name" : "ARMS-mediated activation",
                                    "children" : [
                                       {
                                          "children" : [
                                             {
                                                "name" : "RAF activation",
                                                "id" : "5673000"
                                             },
                                             {
                                                "id" : "5674135",
                                                "name" : "MAP2K and MAPK activation"
                                             },
                                             {
                                                "id" : "5675221",
                                                "children" : [
                                                   {
                                                      "name" : "Negative feedback regulation of MAPK pathway",
                                                      "id" : "5674499"
                                                   }
                                                ],
                                                "name" : "Negative regulation of MAPK pathway"
                                             },
                                             {
                                                "name" : "Regulation of RAS by GAPs",
                                                "id" : "5658442"
                                             }
                                          ],
                                          "name" : "RAF/MAP kinase cascade",
                                          "id" : "5673001"
                                       }
                                    ],
                                    "id" : "170984"
                                 }
                              ],
                              "name" : "Prolonged ERK activation events"
                           }
                        ],
                        "id" : "187687"
                     },
                     {
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "id" : "111933",
                                          "name" : "Calmodulin induced events",
                                          "children" : [
                                             {
                                                "id" : "111931",
                                                "name" : "PKA-mediated phosphorylation of CREB",
                                                "children" : [
                                                   {
                                                      "name" : "PKA activation",
                                                      "id" : "163615"
                                                   }
                                                ]
                                             },
                                             {
                                                "name" : "CaMK IV-mediated phosphorylation of CREB",
                                                "id" : "111932"
                                             },
                                             {
                                                "id" : "111957",
                                                "name" : "Cam-PDE 1 activation"
                                             }
                                          ]
                                       }
                                    ],
                                    "name" : "CaM pathway",
                                    "id" : "111997"
                                 }
                              ],
                              "name" : "DAG and IP3 signaling",
                              "id" : "1489509"
                           }
                        ],
                        "name" : "PLC-gamma1 signalling",
                        "id" : "167021"
                     },
                     {
                        "id" : "198203",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "AKT phosphorylates targets in the cytosol",
                                    "id" : "198323"
                                 },
                                 {
                                    "id" : "198693",
                                    "name" : "AKT phosphorylates targets in the nucleus"
                                 },
                                 {
                                    "name" : "Negative regulation of the PI3K/AKT network",
                                    "id" : "199418"
                                 }
                              ],
                              "name" : "PIP3 activates AKT signaling",
                              "id" : "1257604"
                           }
                        ],
                        "name" : "PI3K/AKT activation"
                     },
                     {
                        "name" : "Signalling to STAT3",
                        "id" : "198745"
                     },
                     {
                        "name" : "Signalling to ERK5",
                        "id" : "198765"
                     },
                     {
                        "name" : "Retrograde neurotrophin signalling",
                        "id" : "177504"
                     },
                     {
                        "name" : "Nuclear Events (kinase and transcription factor activation)",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "ERKs are inactivated",
                                    "id" : "202670"
                                 }
                              ],
                              "name" : "ERK/MAPK targets",
                              "id" : "198753"
                           },
                           {
                              "id" : "199920",
                              "name" : "CREB phosphorylation"
                           }
                        ],
                        "id" : "198725"
                     }
                  ],
                  "name" : "NGF signalling via TRKA from the plasma membrane",
                  "id" : "187037"
               }
            ]
         },
         {
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "1257604",
                        "children" : [
                           {
                              "name" : "AKT phosphorylates targets in the cytosol",
                              "id" : "198323"
                           },
                           {
                              "id" : "198693",
                              "name" : "AKT phosphorylates targets in the nucleus"
                           },
                           {
                              "id" : "199418",
                              "name" : "Negative regulation of the PI3K/AKT network"
                           }
                        ],
                        "name" : "PIP3 activates AKT signaling"
                     },
                     {
                        "name" : "DAG and IP3 signaling",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "111933",
                                    "children" : [
                                       {
                                          "children" : [
                                             {
                                                "name" : "PKA activation",
                                                "id" : "163615"
                                             }
                                          ],
                                          "name" : "PKA-mediated phosphorylation of CREB",
                                          "id" : "111931"
                                       },
                                       {
                                          "id" : "111932",
                                          "name" : "CaMK IV-mediated phosphorylation of CREB"
                                       },
                                       {
                                          "id" : "111957",
                                          "name" : "Cam-PDE 1 activation"
                                       }
                                    ],
                                    "name" : "Calmodulin induced events"
                                 }
                              ],
                              "name" : "CaM pathway",
                              "id" : "111997"
                           }
                        ],
                        "id" : "1489509"
                     },
                     {
                        "children" : [
                           {
                              "name" : "RAF activation",
                              "id" : "5673000"
                           },
                           {
                              "name" : "MAP2K and MAPK activation",
                              "id" : "5674135"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ],
                              "name" : "Negative regulation of MAPK pathway",
                              "id" : "5675221"
                           },
                           {
                              "name" : "Regulation of RAS by GAPs",
                              "id" : "5658442"
                           }
                        ],
                        "name" : "RAF/MAP kinase cascade",
                        "id" : "5673001"
                     }
                  ],
                  "name" : "Downstream signal transduction",
                  "id" : "186763"
               }
            ],
            "name" : "Signaling by PDGF",
            "id" : "186797"
         },
         {
            "id" : "194138",
            "name" : "Signaling by VEGF",
            "children" : [
               {
                  "id" : "194313",
                  "name" : "VEGF ligand-receptor interactions",
                  "children" : [
                     {
                        "id" : "195399",
                        "name" : "VEGF binds to VEGFR leading to receptor dimerization"
                     }
                  ]
               },
               {
                  "children" : [
                     {
                        "id" : "5218920",
                        "name" : "VEGFR2 mediated vascular permeability"
                     },
                     {
                        "name" : "VEGFR2 mediated cell proliferation",
                        "children" : [
                           {
                              "id" : "5673001",
                              "children" : [
                                 {
                                    "id" : "5673000",
                                    "name" : "RAF activation"
                                 },
                                 {
                                    "name" : "MAP2K and MAPK activation",
                                    "id" : "5674135"
                                 },
                                 {
                                    "children" : [
                                       {
                                          "id" : "5674499",
                                          "name" : "Negative feedback regulation of MAPK pathway"
                                       }
                                    ],
                                    "name" : "Negative regulation of MAPK pathway",
                                    "id" : "5675221"
                                 },
                                 {
                                    "id" : "5658442",
                                    "name" : "Regulation of RAS by GAPs"
                                 }
                              ],
                              "name" : "RAF/MAP kinase cascade"
                           }
                        ],
                        "id" : "5218921"
                     }
                  ],
                  "name" : "VEGFA-VEGFR2 Pathway",
                  "id" : "4420097"
               },
               {
                  "name" : "Neurophilin interactions with VEGF and VEGFR",
                  "id" : "194306"
               }
            ]
         },
         {
            "id" : "1433557",
            "children" : [
               {
                  "id" : "1257604",
                  "children" : [
                     {
                        "name" : "AKT phosphorylates targets in the cytosol",
                        "id" : "198323"
                     },
                     {
                        "name" : "AKT phosphorylates targets in the nucleus",
                        "id" : "198693"
                     },
                     {
                        "name" : "Negative regulation of the PI3K/AKT network",
                        "id" : "199418"
                     }
                  ],
                  "name" : "PIP3 activates AKT signaling"
               },
               {
                  "name" : "RAF/MAP kinase cascade",
                  "children" : [
                     {
                        "name" : "RAF activation",
                        "id" : "5673000"
                     },
                     {
                        "name" : "MAP2K and MAPK activation",
                        "id" : "5674135"
                     },
                     {
                        "id" : "5675221",
                        "name" : "Negative regulation of MAPK pathway",
                        "children" : [
                           {
                              "id" : "5674499",
                              "name" : "Negative feedback regulation of MAPK pathway"
                           }
                        ]
                     },
                     {
                        "name" : "Regulation of RAS by GAPs",
                        "id" : "5658442"
                     }
                  ],
                  "id" : "5673001"
               },
               {
                  "name" : "Regulation of KIT signaling",
                  "id" : "1433559"
               }
            ],
            "name" : "Signaling by SCF-KIT"
         },
         {
            "id" : "1227986",
            "name" : "Signaling by ERBB2",
            "children" : [
               {
                  "id" : "1250196",
                  "name" : "SHC1 events in ERBB2 signaling",
                  "children" : [
                     {
                        "id" : "5673001",
                        "children" : [
                           {
                              "name" : "RAF activation",
                              "id" : "5673000"
                           },
                           {
                              "id" : "5674135",
                              "name" : "MAP2K and MAPK activation"
                           },
                           {
                              "id" : "5675221",
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ],
                              "name" : "Negative regulation of MAPK pathway"
                           },
                           {
                              "id" : "5658442",
                              "name" : "Regulation of RAS by GAPs"
                           }
                        ],
                        "name" : "RAF/MAP kinase cascade"
                     }
                  ]
               },
               {
                  "id" : "1963640",
                  "children" : [
                     {
                        "name" : "RAF/MAP kinase cascade",
                        "children" : [
                           {
                              "id" : "5673000",
                              "name" : "RAF activation"
                           },
                           {
                              "name" : "MAP2K and MAPK activation",
                              "id" : "5674135"
                           },
                           {
                              "id" : "5675221",
                              "name" : "Negative regulation of MAPK pathway",
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ]
                           },
                           {
                              "id" : "5658442",
                              "name" : "Regulation of RAS by GAPs"
                           }
                        ],
                        "id" : "5673001"
                     }
                  ],
                  "name" : "GRB2 events in ERBB2 signaling"
               },
               {
                  "children" : [
                     {
                        "id" : "1257604",
                        "children" : [
                           {
                              "id" : "198323",
                              "name" : "AKT phosphorylates targets in the cytosol"
                           },
                           {
                              "name" : "AKT phosphorylates targets in the nucleus",
                              "id" : "198693"
                           },
                           {
                              "id" : "199418",
                              "name" : "Negative regulation of the PI3K/AKT network"
                           }
                        ],
                        "name" : "PIP3 activates AKT signaling"
                     }
                  ],
                  "name" : "PI3K events in ERBB2 signaling",
                  "id" : "1963642"
               },
               {
                  "children" : [
                     {
                        "name" : "DAG and IP3 signaling",
                        "children" : [
                           {
                              "name" : "CaM pathway",
                              "children" : [
                                 {
                                    "children" : [
                                       {
                                          "name" : "PKA-mediated phosphorylation of CREB",
                                          "children" : [
                                             {
                                                "name" : "PKA activation",
                                                "id" : "163615"
                                             }
                                          ],
                                          "id" : "111931"
                                       },
                                       {
                                          "id" : "111932",
                                          "name" : "CaMK IV-mediated phosphorylation of CREB"
                                       },
                                       {
                                          "id" : "111957",
                                          "name" : "Cam-PDE 1 activation"
                                       }
                                    ],
                                    "name" : "Calmodulin induced events",
                                    "id" : "111933"
                                 }
                              ],
                              "id" : "111997"
                           }
                        ],
                        "id" : "1489509"
                     }
                  ],
                  "name" : "PLCG1 events in ERBB2 signaling",
                  "id" : "1251932"
               },
               {
                  "name" : "GRB7 events in ERBB2 signaling",
                  "id" : "1306955"
               },
               {
                  "id" : "1358803",
                  "name" : "Downregulation of ERBB2:ERBB3 signaling"
               }
            ]
         },
         {
            "id" : "1236394",
            "name" : "Signaling by ERBB4",
            "children" : [
               {
                  "id" : "1250347",
                  "name" : "SHC1 events in ERBB4 signaling",
                  "children" : [
                     {
                        "id" : "5673001",
                        "name" : "RAF/MAP kinase cascade",
                        "children" : [
                           {
                              "id" : "5673000",
                              "name" : "RAF activation"
                           },
                           {
                              "name" : "MAP2K and MAPK activation",
                              "id" : "5674135"
                           },
                           {
                              "id" : "5675221",
                              "name" : "Negative regulation of MAPK pathway",
                              "children" : [
                                 {
                                    "id" : "5674499",
                                    "name" : "Negative feedback regulation of MAPK pathway"
                                 }
                              ]
                           },
                           {
                              "name" : "Regulation of RAS by GAPs",
                              "id" : "5658442"
                           }
                        ]
                     }
                  ]
               },
               {
                  "id" : "1250342",
                  "name" : "PI3K events in ERBB4 signaling",
                  "children" : [
                     {
                        "id" : "1257604",
                        "children" : [
                           {
                              "id" : "198323",
                              "name" : "AKT phosphorylates targets in the cytosol"
                           },
                           {
                              "id" : "198693",
                              "name" : "AKT phosphorylates targets in the nucleus"
                           },
                           {
                              "name" : "Negative regulation of the PI3K/AKT network",
                              "id" : "199418"
                           }
                        ],
                        "name" : "PIP3 activates AKT signaling"
                     }
                  ]
               },
               {
                  "name" : "Nuclear signaling by ERBB4",
                  "children" : [
                     {
                        "name" : "Prolactin receptor signaling",
                        "id" : "1170546"
                     }
                  ],
                  "id" : "1251985"
               },
               {
                  "id" : "1253288",
                  "name" : "Downregulation of ERBB4 signaling"
               }
            ]
         },
         {
            "name" : "DAG and IP3 signaling",
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "111933",
                        "name" : "Calmodulin induced events",
                        "children" : [
                           {
                              "id" : "111931",
                              "name" : "PKA-mediated phosphorylation of CREB",
                              "children" : [
                                 {
                                    "name" : "PKA activation",
                                    "id" : "163615"
                                 }
                              ]
                           },
                           {
                              "id" : "111932",
                              "name" : "CaMK IV-mediated phosphorylation of CREB"
                           },
                           {
                              "id" : "111957",
                              "name" : "Cam-PDE 1 activation"
                           }
                        ]
                     }
                  ],
                  "name" : "CaM pathway",
                  "id" : "111997"
               }
            ],
            "id" : "1489509"
         },
         {
            "name" : "PIP3 activates AKT signaling",
            "children" : [
               {
                  "id" : "198323",
                  "name" : "AKT phosphorylates targets in the cytosol"
               },
               {
                  "id" : "198693",
                  "name" : "AKT phosphorylates targets in the nucleus"
               },
               {
                  "name" : "Negative regulation of the PI3K/AKT network",
                  "id" : "199418"
               }
            ],
            "id" : "1257604"
         },
         {
            "name" : "MAPK family signaling cascades",
            "children" : [
               {
                  "id" : "5684996",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "RAF activation",
                              "id" : "5673000"
                           },
                           {
                              "id" : "5674135",
                              "name" : "MAP2K and MAPK activation"
                           },
                           {
                              "id" : "5675221",
                              "name" : "Negative regulation of MAPK pathway",
                              "children" : [
                                 {
                                    "id" : "5674499",
                                    "name" : "Negative feedback regulation of MAPK pathway"
                                 }
                              ]
                           },
                           {
                              "id" : "5658442",
                              "name" : "Regulation of RAS by GAPs"
                           }
                        ],
                        "name" : "RAF/MAP kinase cascade",
                        "id" : "5673001"
                     },
                     {
                        "name" : "RAF-independent MAPK1/3 activation",
                        "children" : [
                           {
                              "name" : "MAPK3 (ERK1) activation",
                              "id" : "110056"
                           },
                           {
                              "id" : "112411",
                              "name" : "MAPK1 (ERK2) activation"
                           }
                        ],
                        "id" : "112409"
                     }
                  ],
                  "name" : "MAPK1/MAPK3 signaling"
               },
               {
                  "id" : "5687128",
                  "name" : "MAPK6/MAPK4 signaling"
               }
            ],
            "id" : "5683057"
         },
         {
            "children" : [
               {
                  "id" : "194840",
                  "name" : "Rho GTPase cycle"
               },
               {
                  "id" : "195258",
                  "name" : "RHO GTPase Effectors",
                  "children" : [
                     {
                        "name" : "RHO GTPases Activate ROCKs",
                        "id" : "5627117"
                     },
                     {
                        "name" : "RHO GTPases activate PAKs",
                        "id" : "5627123"
                     },
                     {
                        "id" : "5625740",
                        "children" : [
                           {
                              "name" : "Activated PKN1 stimulates transcription of AR (androgen receptor) regulated genes KLK2 and KLK3",
                              "id" : "5625886"
                           }
                        ],
                        "name" : "RHO GTPases activate PKNs"
                     },
                     {
                        "id" : "5625900",
                        "name" : "RHO GTPases activate CIT"
                     },
                     {
                        "id" : "5625970",
                        "name" : "RHO GTPases activate KTN1"
                     },
                     {
                        "id" : "5626467",
                        "name" : "RHO GTPases activate IQGAPs"
                     },
                     {
                        "id" : "5627083",
                        "name" : "RHO GTPases regulate CFTR trafficking"
                     },
                     {
                        "id" : "5663213",
                        "name" : "RHO GTPases Activate WASPs and WAVEs"
                     },
                     {
                        "id" : "5663220",
                        "name" : "RHO GTPases Activate Formins"
                     },
                     {
                        "name" : "RHO GTPases Activate Rhotekin and Rhophilins",
                        "id" : "5666185"
                     },
                     {
                        "name" : "RHO GTPases Activate NADPH Oxidases",
                        "id" : "5668599"
                     }
                  ]
               }
            ],
            "name" : "Signaling by Rho GTPases",
            "id" : "194315"
         },
         {
            "id" : "201451",
            "name" : "Signaling by BMP"
         },
         {
            "id" : "170834",
            "children" : [
               {
                  "id" : "2173789",
                  "name" : "TGF-beta receptor signaling activates SMADs",
                  "children" : [
                     {
                        "id" : "2173788",
                        "name" : "Downregulation of TGF-beta receptor signaling"
                     }
                  ]
               },
               {
                  "name" : "TGF-beta receptor signaling in EMT (epithelial to mesenchymal transition)",
                  "id" : "2173791"
               },
               {
                  "name" : "Transcriptional activity of SMAD2/SMAD3:SMAD4 heterotrimer",
                  "children" : [
                     {
                        "name" : "SMAD2/SMAD3:SMAD4 heterotrimer regulates transcription",
                        "id" : "2173796"
                     },
                     {
                        "id" : "2173795",
                        "name" : "Downregulation of SMAD2/3:SMAD4 transcriptional activity"
                     }
                  ],
                  "id" : "2173793"
               }
            ],
            "name" : "Signaling by TGF-beta Receptor Complex"
         },
         {
            "id" : "157118",
            "name" : "Signaling by NOTCH",
            "children" : [
               {
                  "children" : [
                     {
                        "name" : "Pre-NOTCH Transcription and Translation",
                        "id" : "1912408"
                     },
                     {
                        "name" : "Pre-NOTCH Processing in the Endoplasmic Reticulum",
                        "id" : "1912399"
                     },
                     {
                        "id" : "1912420",
                        "name" : "Pre-NOTCH Processing in Golgi"
                     }
                  ],
                  "name" : "Pre-NOTCH Expression and Processing",
                  "id" : "1912422"
               },
               {
                  "name" : "Signaling by NOTCH1",
                  "children" : [
                     {
                        "id" : "2122948",
                        "name" : "Activated NOTCH1 Transmits Signal to the Nucleus"
                     },
                     {
                        "name" : "NOTCH1 Intracellular Domain Regulates Transcription",
                        "id" : "2122947"
                     }
                  ],
                  "id" : "1980143"
               },
               {
                  "children" : [
                     {
                        "name" : "NOTCH2 Activation and Transmission of Signal to the Nucleus",
                        "id" : "2979096"
                     },
                     {
                        "id" : "2197563",
                        "name" : "NOTCH2 intracellular domain regulates transcription"
                     }
                  ],
                  "name" : "Signaling by NOTCH2",
                  "id" : "1980145"
               },
               {
                  "name" : "Signaling by NOTCH3",
                  "id" : "1980148"
               },
               {
                  "name" : "Signaling by NOTCH4",
                  "id" : "1980150"
               }
            ]
         },
         {
            "id" : "372790",
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "373076",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "380108",
                                    "name" : "Chemokine receptors bind chemokines"
                                 },
                                 {
                                    "name" : "Tachykinin receptors bind tachykinins",
                                    "id" : "380095"
                                 },
                                 {
                                    "name" : "Vasopressin-like receptors",
                                    "id" : "388479"
                                 },
                                 {
                                    "id" : "389397",
                                    "name" : "Orexin and neuropeptides FF and QRFP bind to their respective receptors"
                                 },
                                 {
                                    "name" : "Formyl peptide receptors bind formyl peptides and many other ligands",
                                    "id" : "444473"
                                 },
                                 {
                                    "name" : "Relaxin receptors",
                                    "id" : "444821"
                                 }
                              ],
                              "name" : "Peptide ligand-binding receptors",
                              "id" : "375276"
                           },
                           {
                              "name" : "Amine ligand-binding receptors",
                              "children" : [
                                 {
                                    "id" : "390648",
                                    "name" : "Muscarinic acetylcholine receptors"
                                 },
                                 {
                                    "name" : "Adrenoceptors",
                                    "id" : "390696"
                                 },
                                 {
                                    "name" : "Dopamine receptors",
                                    "id" : "390651"
                                 },
                                 {
                                    "name" : "Histamine receptors",
                                    "id" : "390650"
                                 },
                                 {
                                    "name" : "Serotonin receptors",
                                    "id" : "390666"
                                 }
                              ],
                              "id" : "375280"
                           },
                           {
                              "name" : "Hormone ligand-binding receptors",
                              "id" : "375281"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Prostanoid ligand receptors",
                                    "id" : "391908"
                                 },
                                 {
                                    "name" : "Leukotriene receptors",
                                    "id" : "391906"
                                 }
                              ],
                              "name" : "Eicosanoid ligand-binding receptors",
                              "id" : "391903"
                           },
                           {
                              "id" : "418038",
                              "name" : "Nucleotide-like (purinergic) receptors",
                              "children" : [
                                 {
                                    "name" : "P2Y receptors",
                                    "id" : "417957"
                                 },
                                 {
                                    "id" : "417973",
                                    "name" : "Adenosine P1 receptors"
                                 }
                              ]
                           },
                           {
                              "name" : "Hydroxycarboxylic acid-binding receptors",
                              "id" : "3296197"
                           },
                           {
                              "name" : "Lysosphingolipid and LPA receptors",
                              "id" : "419408"
                           },
                           {
                              "name" : "Opsins",
                              "id" : "419771"
                           },
                           {
                              "id" : "444209",
                              "name" : "Free fatty acid receptors"
                           }
                        ],
                        "name" : "Class A/1 (Rhodopsin-like receptors)"
                     },
                     {
                        "id" : "373080",
                        "name" : "Class B/2 (Secretin family receptors)",
                        "children" : [
                           {
                              "id" : "419812",
                              "name" : "Calcitonin-like ligand receptors"
                           },
                           {
                              "name" : "Glucagon-type ligand receptors",
                              "id" : "420092"
                           }
                        ]
                     },
                     {
                        "name" : "Class C/3 (Metabotropic glutamate/pheromone receptors)",
                        "id" : "420499"
                     }
                  ],
                  "name" : "GPCR ligand binding",
                  "id" : "500792"
               },
               {
                  "name" : "GPCR downstream signaling",
                  "children" : [
                     {
                        "id" : "418555",
                        "name" : "G alpha (s) signalling events"
                     },
                     {
                        "name" : "G alpha (i) signalling events",
                        "id" : "418594"
                     },
                     {
                        "name" : "G alpha (z) signalling events",
                        "id" : "418597"
                     },
                     {
                        "id" : "416476",
                        "name" : "G alpha (q) signalling events",
                        "children" : [
                           {
                              "id" : "114508",
                              "children" : [
                                 {
                                    "id" : "426048",
                                    "name" : "Arachidonate production from DAG"
                                 }
                              ],
                              "name" : "Effects of PIP2 hydrolysis"
                           }
                        ]
                     },
                     {
                        "name" : "G alpha (12/13) signalling events",
                        "id" : "416482"
                     },
                     {
                        "children" : [
                           {
                              "name" : "G beta:gamma signalling through PI3Kgamma",
                              "id" : "392451"
                           },
                           {
                              "id" : "418217",
                              "name" : "G beta:gamma signalling through PLC beta"
                           }
                        ],
                        "name" : "G-protein beta:gamma signalling",
                        "id" : "397795"
                     },
                     {
                        "id" : "381753",
                        "name" : "Olfactory Signaling Pathway"
                     }
                  ],
                  "id" : "388396"
               },
               {
                  "children" : [
                     {
                        "name" : "G-protein activation",
                        "id" : "202040"
                     },
                     {
                        "name" : "G-protein mediated events",
                        "children" : [
                           {
                              "name" : "PLC beta mediated events",
                              "children" : [
                                 {
                                    "name" : "Ca-dependent events",
                                    "children" : [
                                       {
                                          "name" : "phospho-PLA2 pathway",
                                          "id" : "111995"
                                       },
                                       {
                                          "id" : "111997",
                                          "children" : [
                                             {
                                                "children" : [
                                                   {
                                                      "children" : [
                                                         {
                                                            "id" : "163615",
                                                            "name" : "PKA activation"
                                                         }
                                                      ],
                                                      "name" : "PKA-mediated phosphorylation of CREB",
                                                      "id" : "111931"
                                                   },
                                                   {
                                                      "id" : "111932",
                                                      "name" : "CaMK IV-mediated phosphorylation of CREB"
                                                   },
                                                   {
                                                      "id" : "111957",
                                                      "name" : "Cam-PDE 1 activation"
                                                   }
                                                ],
                                                "name" : "Calmodulin induced events",
                                                "id" : "111933"
                                             }
                                          ],
                                          "name" : "CaM pathway"
                                       }
                                    ],
                                    "id" : "111996"
                                 }
                              ],
                              "id" : "112043"
                           },
                           {
                              "name" : "Adenylate cyclase activating pathway",
                              "id" : "170660"
                           },
                           {
                              "name" : "Adenylate cyclase inhibitory pathway",
                              "id" : "170670"
                           }
                        ],
                        "id" : "112040"
                     },
                     {
                        "name" : "DARPP-32 events",
                        "id" : "180024"
                     }
                  ],
                  "name" : "Opioid Signalling",
                  "id" : "111885"
               },
               {
                  "id" : "881907",
                  "children" : [
                     {
                        "name" : "G alpha (q) signalling events",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "id" : "426048",
                                    "name" : "Arachidonate production from DAG"
                                 }
                              ],
                              "name" : "Effects of PIP2 hydrolysis",
                              "id" : "114508"
                           }
                        ],
                        "id" : "416476"
                     },
                     {
                        "name" : "EGFR Transactivation by Gastrin",
                        "id" : "2179392"
                     },
                     {
                        "name" : "RAF/MAP kinase cascade",
                        "children" : [
                           {
                              "id" : "5673000",
                              "name" : "RAF activation"
                           },
                           {
                              "id" : "5674135",
                              "name" : "MAP2K and MAPK activation"
                           },
                           {
                              "id" : "5675221",
                              "children" : [
                                 {
                                    "name" : "Negative feedback regulation of MAPK pathway",
                                    "id" : "5674499"
                                 }
                              ],
                              "name" : "Negative regulation of MAPK pathway"
                           },
                           {
                              "name" : "Regulation of RAS by GAPs",
                              "id" : "5658442"
                           }
                        ],
                        "id" : "5673001"
                     }
                  ],
                  "name" : "Gastrin-CREB signalling pathway via PKC and MAPK"
               }
            ],
            "name" : "Signaling by GPCR"
         },
         {
            "id" : "195721",
            "children" : [
               {
                  "id" : "3238698",
                  "name" : "WNT ligand biogenesis and trafficking"
               },
               {
                  "name" : "Degradation of beta-catenin by the destruction complex",
                  "children" : [
                     {
                        "name" : "Beta-catenin phosphorylation cascade",
                        "id" : "196299"
                     },
                     {
                        "name" : "Repression of WNT target genes",
                        "id" : "4641265"
                     }
                  ],
                  "id" : "195253"
               },
               {
                  "id" : "201681",
                  "children" : [
                     {
                        "id" : "201688",
                        "name" : "WNT mediated activation of DVL"
                     },
                     {
                        "name" : "Disassembly of the destruction complex and recruitment of AXIN to the membrane",
                        "id" : "4641262"
                     },
                     {
                        "id" : "201722",
                        "name" : "Formation of the beta-catenin:TCF transactivating complex",
                        "children" : [
                           {
                              "id" : "4411364",
                              "name" : "Binding of TCF/LEF:CTNNB1 to target gene promoters"
                           }
                        ]
                     },
                     {
                        "name" : "Deactivation of the beta-catenin transactivating complex",
                        "id" : "3769402"
                     },
                     {
                        "id" : "4641258",
                        "name" : "Degradation of DVL"
                     },
                     {
                        "id" : "4641257",
                        "name" : "Degradation of AXIN"
                     },
                     {
                        "name" : "Regulation of FZD by ubiquitination",
                        "id" : "4641263"
                     },
                     {
                        "id" : "3772470",
                        "name" : "Negative regulation of TCF-dependent signaling by WNT ligand antagonists"
                     },
                     {
                        "name" : "Negative regulation of TCF-dependent signaling by DVL-interacting proteins",
                        "id" : "5368598"
                     }
                  ],
                  "name" : "TCF dependent signaling in response to WNT"
               },
               {
                  "name" : "Beta-catenin independent WNT signaling",
                  "children" : [
                     {
                        "id" : "4086400",
                        "children" : [
                           {
                              "name" : "Asymmetric localization of PCP proteins",
                              "id" : "4608870"
                           },
                           {
                              "id" : "5099900",
                              "name" : "WNT5A-dependent internalization of FZD4"
                           },
                           {
                              "name" : "WNT5A-dependent internalization of FZD2, FZD5 and ROR2",
                              "id" : "5140745"
                           }
                        ],
                        "name" : "PCP/CE pathway"
                     },
                     {
                        "name" : "Ca2+ pathway",
                        "id" : "4086398"
                     }
                  ],
                  "id" : "3858494"
               }
            ],
            "name" : "Signaling by Wnt"
         },
         {
            "name" : "Signaling by Hippo",
            "id" : "2028269"
         },
         {
            "id" : "2404192",
            "children" : [
               {
                  "id" : "2428924",
                  "name" : "IGF1R signaling cascade",
                  "children" : [
                     {
                        "id" : "2428933",
                        "name" : "SHC-related events triggered by IGF1R"
                     },
                     {
                        "children" : [
                           {
                              "id" : "112399",
                              "children" : [
                                 {
                                    "id" : "109704",
                                    "children" : [
                                       {
                                          "id" : "165158",
                                          "name" : "Activation of AKT2"
                                       },
                                       {
                                          "id" : "109703",
                                          "children" : [
                                             {
                                                "id" : "165160",
                                                "name" : "PDE3B signalling"
                                             },
                                             {
                                                "id" : "165159",
                                                "name" : "mTOR signalling",
                                                "children" : [
                                                   {
                                                      "name" : "Inhibition of TSC complex formation by PKB",
                                                      "id" : "165181"
                                                   },
                                                   {
                                                      "id" : "166208",
                                                      "name" : "mTORC1-mediated signalling"
                                                   },
                                                   {
                                                      "id" : "380972",
                                                      "name" : "Energy dependent regulation of mTOR by LKB1-AMPK"
                                                   }
                                                ]
                                             }
                                          ],
                                          "name" : "PKB-mediated events"
                                       }
                                    ],
                                    "name" : "PI3K Cascade"
                                 },
                                 {
                                    "id" : "112412",
                                    "children" : [
                                       {
                                          "id" : "5673001",
                                          "name" : "RAF/MAP kinase cascade",
                                          "children" : [
                                             {
                                                "name" : "RAF activation",
                                                "id" : "5673000"
                                             },
                                             {
                                                "name" : "MAP2K and MAPK activation",
                                                "id" : "5674135"
                                             },
                                             {
                                                "id" : "5675221",
                                                "children" : [
                                                   {
                                                      "name" : "Negative feedback regulation of MAPK pathway",
                                                      "id" : "5674499"
                                                   }
                                                ],
                                                "name" : "Negative regulation of MAPK pathway"
                                             },
                                             {
                                                "name" : "Regulation of RAS by GAPs",
                                                "id" : "5658442"
                                             }
                                          ]
                                       }
                                    ],
                                    "name" : "SOS-mediated signalling"
                                 }
                              ],
                              "name" : "IRS-mediated signalling"
                           }
                        ],
                        "name" : "IRS-related events triggered by IGF1R",
                        "id" : "2428928"
                     }
                  ]
               }
            ],
            "name" : "Signaling by Type 1 Insulin-like Growth Factor 1 Receptor (IGF1R)"
         },
         {
            "name" : "Signaling by Activin",
            "children" : [
               {
                  "id" : "2473224",
                  "name" : "Antagonism of Activin by Follistatin"
               }
            ],
            "id" : "1502540"
         },
         {
            "name" : "Visual phototransduction",
            "children" : [
               {
                  "name" : "Retinoid metabolism and transport",
                  "id" : "975634"
               },
               {
                  "children" : [
                     {
                        "name" : "Biosynthesis of A2E, implicated in retinal degradation",
                        "id" : "2466712"
                     }
                  ],
                  "name" : "The canonical retinoid cycle in rods (twilight vision)",
                  "id" : "2453902"
               },
               {
                  "name" : "The retinoid cycle in cones (daylight vision)",
                  "id" : "2187335"
               },
               {
                  "id" : "2514856",
                  "name" : "The phototransduction cascade",
                  "children" : [
                     {
                        "id" : "2485179",
                        "name" : "Activation of the phototransduction cascade"
                     },
                     {
                        "name" : "Inactivation, recovery and regulation of the phototransduction cascade",
                        "id" : "2514859"
                     }
                  ]
               }
            ],
            "id" : "2187338"
         },
         {
            "id" : "5362517",
            "children" : [
               {
                  "id" : "5365859",
                  "name" : "RA biosynthesis pathway"
               }
            ],
            "name" : "Signaling by Retinoic Acid"
         },
         {
            "id" : "2586552",
            "children" : [
               {
                  "children" : [
                     {
                        "id" : "5673000",
                        "name" : "RAF activation"
                     },
                     {
                        "id" : "5674135",
                        "name" : "MAP2K and MAPK activation"
                     },
                     {
                        "name" : "Negative regulation of MAPK pathway",
                        "children" : [
                           {
                              "id" : "5674499",
                              "name" : "Negative feedback regulation of MAPK pathway"
                           }
                        ],
                        "id" : "5675221"
                     },
                     {
                        "id" : "5658442",
                        "name" : "Regulation of RAS by GAPs"
                     }
                  ],
                  "name" : "RAF/MAP kinase cascade",
                  "id" : "5673001"
               }
            ],
            "name" : "Signaling by Leptin"
         },
         {
            "children" : [
               {
                  "id" : "354194",
                  "name" : "GRB2:SOS provides linkage to MAPK signaling for Integrins "
               },
               {
                  "name" : "p130Cas linkage to MAPK signaling for integrins",
                  "id" : "372708"
               }
            ],
            "name" : "Integrin alphaIIb beta3 signaling",
            "id" : "354192"
         },
         {
            "name" : "Signaling by Hedgehog",
            "children" : [
               {
                  "id" : "5358346",
                  "children" : [
                     {
                        "id" : "5362798",
                        "name" : "Release of Hh-Np from the secreting cell"
                     }
                  ],
                  "name" : "Hedgehog ligand biogenesis"
               },
               {
                  "id" : "5610787",
                  "children" : [
                     {
                        "name" : "GLI3 is processed to GLI3R by the proteasome",
                        "id" : "5610785"
                     },
                     {
                        "name" : "Degradation of GLI2 by the proteasome",
                        "id" : "5610783"
                     },
                     {
                        "name" : "Degradation of GLI1 by the proteasome",
                        "id" : "5610780"
                     }
                  ],
                  "name" : "Hedgehog 'off' state"
               },
               {
                  "children" : [
                     {
                        "name" : "Ligand-receptor interactions",
                        "id" : "5632681"
                     },
                     {
                        "id" : "5635838",
                        "name" : "Activation of SMO"
                     },
                     {
                        "id" : "5635851",
                        "name" : "GLI proteins bind promoters of Hh responsive genes to promote transcription"
                     }
                  ],
                  "name" : "Hedgehog 'on' state",
                  "id" : "5632684"
               }
            ],
            "id" : "5358351"
         },
         {
            "children" : [
               {
                  "name" : "FasL/ CD95L signaling",
                  "id" : "75157"
               },
               {
                  "id" : "75893",
                  "name" : "TNF signaling",
                  "children" : [
                     {
                        "id" : "5357956",
                        "name" : "TNFR1-induced NFkappaB signaling pathway"
                     },
                     {
                        "id" : "5357786",
                        "name" : "TNFR1-induced proapoptotic signaling"
                     },
                     {
                        "id" : "5626978",
                        "name" : "TNFR1-mediated ceramide production"
                     },
                     {
                        "name" : "Regulation of TNFR1 signaling",
                        "id" : "5357905"
                     }
                  ]
               },
               {
                  "id" : "75158",
                  "name" : "TRAIL  signaling"
               }
            ],
            "name" : "Death Receptor Signalling",
            "id" : "73887"
         }
      ],
      "name" : "Signal Transduction",
      "id" : "162582"
   },
   {
      "name" : "Transmembrane transport of small molecules",
      "children" : [
         {
            "children" : [
               {
                  "name" : "ABC transporters in lipid homeostasis",
                  "id" : "1369062"
               },
               {
                  "name" : "Mitochondrial ABC transporters",
                  "id" : "1369007"
               }
            ],
            "name" : "ABC-family proteins mediated transport",
            "id" : "382556"
         },
         {
            "id" : "425407",
            "name" : "SLC-mediated transmembrane transport",
            "children" : [
               {
                  "id" : "425393",
                  "name" : "Transport of inorganic cations/anions and amino acids/oligopeptides",
                  "children" : [
                     {
                        "name" : "Bicarbonate transporters",
                        "id" : "425381"
                     },
                     {
                        "name" : "Sodium/Calcium exchangers",
                        "id" : "425561"
                     },
                     {
                        "id" : "425986",
                        "name" : "Sodium/Proton exchangers"
                     },
                     {
                        "name" : "Cation-coupled Chloride cotransporters",
                        "id" : "426117"
                     },
                     {
                        "id" : "427601",
                        "name" : "Multifunctional anion exchangers"
                     },
                     {
                        "children" : [
                           {
                              "name" : "Type II Na+/Pi cotransporters",
                              "id" : "427589"
                           }
                        ],
                        "name" : "Sodium-coupled phosphate cotransporters",
                        "id" : "427652"
                     },
                     {
                        "name" : "Amino acid transport across the plasma membrane",
                        "id" : "352230"
                     },
                     {
                        "name" : "Organic anion transporters",
                        "id" : "428643"
                     },
                     {
                        "name" : "Proton-coupled neutral amino acid transporters",
                        "id" : "428559"
                     },
                     {
                        "name" : "Proton/oligopeptide cotransporters",
                        "id" : "427975"
                     }
                  ]
               },
               {
                  "children" : [
                     {
                        "id" : "70153",
                        "children" : [
                           {
                              "name" : "Regulation of Glucokinase by Glucokinase Regulatory Protein",
                              "id" : "170822"
                           }
                        ],
                        "name" : "Glucose transport"
                     }
                  ],
                  "name" : "Hexose transport",
                  "id" : "189200"
               },
               {
                  "name" : "Transport of glucose and other sugars, bile salts and organic acids, metal ions and amine compounds",
                  "children" : [
                     {
                        "id" : "428790",
                        "name" : "Facilitative Na+-independent glucose transporters",
                        "children" : [
                           {
                              "id" : "428776",
                              "name" : "Class II GLUTs"
                           }
                        ]
                     },
                     {
                        "name" : "Na+-dependent glucose transporters",
                        "id" : "428808"
                     },
                     {
                        "id" : "429593",
                        "name" : "Inositol transporters"
                     },
                     {
                        "name" : "Sodium-coupled sulphate, di- and tri-carboxylate transporters",
                        "id" : "433137"
                     },
                     {
                        "id" : "433692",
                        "name" : "Proton-coupled monocarboxylate transport"
                     },
                     {
                        "id" : "425410",
                        "name" : "Metal ion SLC transporters",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "Zinc efflux and compartmentalization by the SLC30 family",
                                    "id" : "435368"
                                 },
                                 {
                                    "id" : "442380",
                                    "name" : "Zinc influx into cells by the SLC39 gene family"
                                 }
                              ],
                              "name" : "Zinc transporters",
                              "id" : "435354"
                           }
                        ]
                     },
                     {
                        "id" : "442660",
                        "name" : "Na+/Cl- dependent neurotransmitter transporters"
                     },
                     {
                        "id" : "444411",
                        "name" : "Rhesus glycoproteins mediate ammonium transport."
                     },
                     {
                        "id" : "549132",
                        "children" : [
                           {
                              "name" : "Organic cation transport",
                              "id" : "549127"
                           },
                           {
                              "name" : "Organic anion transport",
                              "id" : "561048"
                           }
                        ],
                        "name" : "Organic cation/anion/zwitterion transport"
                     }
                  ],
                  "id" : "425366"
               },
               {
                  "name" : "Transport of vitamins, nucleosides, and related molecules",
                  "children" : [
                     {
                        "name" : "Transport of nucleosides and free purine and pyrimidine bases across the plasma membrane",
                        "id" : "83936"
                     },
                     {
                        "id" : "727802",
                        "name" : "Transport of nucleotide sugars"
                     },
                     {
                        "id" : "804914",
                        "name" : "Transport of fatty acids"
                     },
                     {
                        "name" : "Transport of organic anions",
                        "id" : "879518"
                     }
                  ],
                  "id" : "425397"
               }
            ]
         },
         {
            "name" : "Aquaporin-mediated transport",
            "children" : [
               {
                  "id" : "432047",
                  "name" : "Passive transport by Aquaporins"
               },
               {
                  "id" : "432040",
                  "name" : "Vasopressin regulates renal water homeostasis via Aquaporins"
               },
               {
                  "id" : "432030",
                  "name" : "Transport of glycerol from adipocytes to the liver by Aquaporins"
               }
            ],
            "id" : "445717"
         },
         {
            "id" : "917937",
            "children" : [
               {
                  "id" : "917977",
                  "name" : "Transferrin endocytosis and recycling"
               }
            ],
            "name" : "Iron uptake and transport"
         },
         {
            "name" : "Ion channel transport",
            "children" : [
               {
                  "name" : "Ion transport by P-type ATPases",
                  "id" : "936837"
               },
               {
                  "id" : "975298",
                  "name" : "Ligand-gated ion channel transport"
               },
               {
                  "children" : [
                     {
                        "name" : "TRP channels",
                        "id" : "3295583"
                     }
                  ],
                  "name" : "Stimuli-sensing channels",
                  "id" : "2672351"
               }
            ],
            "id" : "983712"
         },
         {
            "name" : "Miscellaneous transport and binding events",
            "id" : "5223345"
         }
      ],
      "id" : "382551"
   },
   {
      "children" : [
         {
            "children" : [
               {
                  "id" : "199977",
                  "children" : [
                     {
                        "id" : "5694530",
                        "name" : "Cargo concentration in the ER"
                     },
                     {
                        "name" : "COPII (Coat Protein 2) Mediated Vesicle Transport",
                        "id" : "204005"
                     },
                     {
                        "id" : "6807878",
                        "name" : "COPI-mediated anterograde transport"
                     }
                  ],
                  "name" : "ER to Golgi Anterograde Transport"
               },
               {
                  "children" : [
                     {
                        "id" : "199997",
                        "name" : "COPI Mediated Transport"
                     }
                  ],
                  "name" : "Golgi to ER Retrograde Transport",
                  "id" : "199983"
               },
               {
                  "id" : "199992",
                  "name" : "trans-Golgi Network Vesicle Budding",
                  "children" : [
                     {
                        "children" : [
                           {
                              "name" : "Golgi Associated Vesicle Biogenesis",
                              "id" : "432722"
                           },
                           {
                              "name" : "Lysosome Vesicle Biogenesis",
                              "id" : "432720"
                           }
                        ],
                        "name" : "Clathrin derived vesicle budding",
                        "id" : "421837"
                     }
                  ]
               },
               {
                  "name" : "Gap junction trafficking and regulation",
                  "children" : [
                     {
                        "id" : "190828",
                        "children" : [
                           {
                              "children" : [
                                 {
                                    "name" : "Transport of connexins along the secretory pathway",
                                    "id" : "190827"
                                 },
                                 {
                                    "id" : "190704",
                                    "name" : "Oligomerization of connexins into connexons"
                                 },
                                 {
                                    "id" : "190872",
                                    "children" : [
                                       {
                                          "id" : "190840",
                                          "name" : "Microtubule-dependent trafficking of connexons from Golgi to the plasma membrane"
                                       }
                                    ],
                                    "name" : "Transport of connexons to the plasma membrane"
                                 }
                              ],
                              "name" : "Gap junction assembly",
                              "id" : "190861"
                           },
                           {
                              "children" : [
                                 {
                                    "name" : "Formation of annular gap junctions",
                                    "id" : "196025"
                                 }
                              ],
                              "name" : "Gap junction degradation",
                              "id" : "190873"
                           }
                        ],
                        "name" : "Gap junction trafficking"
                     },
                     {
                        "id" : "191650",
                        "name" : "Regulation of gap junction activity",
                        "children" : [
                           {
                              "name" : "c-src mediated regulation of Cx43 function and closure of gap junctions",
                              "id" : "191647"
                           }
                        ]
                     }
                  ],
                  "id" : "157858"
               },
               {
                  "name" : "Endosomal Sorting Complex Required For Transport (ESCRT)",
                  "id" : "917729"
               },
               {
                  "name" : "Translocation of GLUT4 to the plasma membrane",
                  "id" : "1445148"
               }
            ],
            "name" : "Membrane Trafficking",
            "id" : "199991"
         },
         {
            "id" : "2173782",
            "name" : "Binding and Uptake of Ligands by Scavenger Receptors",
            "children" : [
               {
                  "name" : "Scavenging of heme from plasma",
                  "id" : "2168880"
               },
               {
                  "id" : "3000480",
                  "name" : "Scavenging by Class A Receptors"
               },
               {
                  "name" : "Scavenging by Class B Receptors",
                  "id" : "3000471"
               },
               {
                  "name" : "Scavenging by Class F Receptors",
                  "id" : "3000484"
               },
               {
                  "name" : "Scavenging by Class H Receptors",
                  "id" : "3000497"
               }
            ]
         }
      ],
      "name" : "Vesicle-mediated transport",
      "id" : "5653656"
   }
]
;
exports.tree = pathways;
