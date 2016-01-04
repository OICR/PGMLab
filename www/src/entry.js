import { Button, Badge, newIcon, Icon, Row } from 'react-materialize';

window.jquery = window.jQuery = window.$ = require('./lib/jquery');

import style from 'style';
require('imports?define=>false!blueimp-file-upload')

import resumable from 'resumable';
import autobahn from 'autobahn';

import navigator from 'navigator';

var pi = require('./data/HDRdec17pi.js');
var pp = require('./data/HDRdec17pp.js');

var graph = require('./bin/graph.js');

var vis = graph.render(pi);

require('hammerjs');

require('./lib/materialize.min.js');

import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

var observations_learning = [{id:"ol1", name:'one'},{id:"ol2", name:'two'},{id:"ol3", name:'three'}];
var observations_inference = [{id:"oi1", name:'one'},{id:"oi2", name:'two'},{id:"oi3", name:'three'}];


var pathways = [
    {id:1, name:'APC_C_Cdc20_mediated_degradation_of_Securin'},
    {id:2, name:'APC_C_Cdh1_mediated_degradation_of_Cdc20_and_other_APC_C_Cdh1_targeted_proteins_in_late_mitosis_early_G1'},
    {id:3, name:'AUF1_hnRNP_D0_binds_and_destabilizes_mRNA'},
    {id:4, name:'Autodegradation_of_Cdh1_by_Cdh1_APC_C'},
    {id:5, name:'CASP8_activity_is_inhibited'},
    {id:6, name:'Cdc20_Phospho-APC_C_mediated_degradation_of_Cyclin_A'},
    {id:7, name:'Cell-extracellular_matrix_interactions'},
    {id:8, name:'Citric_acid_cycle_TCA_cycle_'},
    {id:9, name:'Collagen_degradation'},
    {id:10, name:'Condensation_of_Prometaphase_Chromosomes'},
    {id:12, name:'Condensation_of_Prophase_Chromosomes'},
    {id:13, name:'Constitutive_Signaling_by_Aberrant_PI3K_in_Cancer'},
    {id:14, name:'CTLA4_inhibitory_signaling'},
    {id:15, name:'CYP2E1_reactions'},
    {id:16, name:'Cytochrome_P450_-_arranged_by_substrate_type'},
    {id:17, name:'Cytosolic_tRNA_aminoacylation'},
    {id:18, name:'Deadenylation-dependent_mRNA_decay'},
    {id:19, name:'Degradation_of_AXIN'},
    {id:20, name:'Degradation_of_DVL'},
    {id:21, name:'Dimerization_of_procaspase-8'},
    {id:22, name:'DNA_methylation'},
    {id:23, name:'Downregulation_of_ERBB2_ERBB3_signaling'},
    {id:24, name:'Downstream_TCR_signaling'},
    {id:25, name:'Dual_Incision_in_GG-NER'},
    {id:26, name:'Dual_incision_in_TC-NER'},
    {id:27, name:'Endosomal_Vacuolar_pathway'},
    {id:28, name:'Establishment_of_Sister_Chromatid_Cohesion'},
    {id:29, name:'Eukaryotic_Translation_Elongation'},
    {id:30, name:'Eukaryotic_Translation_Termination'},
    {id:31, name:'Fanconi_Anemia_Pathway'},
    {id:32, name:'Fatty_acids'},
    {id:33, name:'FCERI_mediated_NF-kB_activation'},
    {id:34, name:'FGFR1_mutant_receptor_activation'},
    {id:35, name:'Formation_of_HIV-1_elongation_complex_containing_HIV-1_Tat'},
    {id:36, name:'Formation_of_RNA_Pol_II_elongation_complex_'},
    {id:37, name:'Formation_of_the_ternary_complex,_and_subsequently,_the_43S_complex'},
    {id:38, name:'G0_and_Early_G1'},
    {id:39, name:'Gap-filling_DNA_repair_synthesis_and_ligation_in_GG-NER'},
    {id:40, name:'Gap-filling_DNA_repair_synthesis_and_ligation_in_TC-NER'},
    {id:41, name:'G_beta_gamma_signalling_through_PI3Kgamma'},
    {id:42, name:'G-protein_beta_gamma_signalling'},
    {id:43, name:'HDACs_deacetylate_histones'},
    {id:44, name:'HDR_through_MMEJ_alt-NHEJ_'},
    {id:45, name:'HDR_through_Single_Strand_Annealing_SSA_'},
    {id:46, name:'Hh_mutants_abrogate_ligand_secretion'},
    {id:47, name:'Hh_mutants_that_don_t_undergo_autocatalytic_processing_are_degraded_by_ERAD'},
    {id:48, name:'Homology_Directed_Repair'},
    {id:49, name:'IKK_complex_recruitment_mediated_by_RIP1'},
    {id:50, name:'Immunoregulatory_interactions_between_a_Lymphoid_and_a_non-Lymphoid_cell'},
    {id:51, name:'Integrin_cell_surface_interactions'},
    {id:52, name:'IRAK1_recruits_IKK_complex'},
    {id:53, name:'IRAK1_recruits_IKK_complex_upon_TLR7_8_or_9_stimulation'},
    {id:54, name:'JNK_c-Jun_kinases_phosphorylation_and_activation_mediated_by_activated_human_TAK1'},
    {id:55, name:'Meiotic_synapsis'},
    {id:56, name:'Mitochondrial_protein_import'},
    {id:57, name:'Mitochondrial_translation_initiation'},
    {id:58, name:'mRNA_Capping'},
    {id:59, name:'Negative_regulation_of_the_PI3K_AKT_network'},
    {id:60, name:'Nephrin_interactions'},
    {id:61, name:'Non-integrin_membrane-ECM_interactions'}
];


var SelectObservationLearning = React.createClass({
    render: function () {
        return (
            <Row> 
            </Row>
        );
    }
});

/*                <ul id='dropdown3' className='dropdown-content'>
                    {observations_learning.map(function(observation) {
                        return <li value={observation.id} key={observation.id}>{observation.name}</li>
                       })}
                </ul>
                <a className="btn dropdown-button" href="#!" data-activates="dropdown3">
                    Observations<Icon right>arrow_drop_down</Icon>
                </a>
               */

var SelectObservationInference = React.createClass({
    render: function () {
        return (
            <Row>
             </Row>
        );
    }
});
 /*              <ul id="dropdown2" className="dropdown-content">
                    {observations_inference.map(function(observation) {
                        return <li key={observation.id}>{observation.name}</li>
                       })}
                </ul>
                <a className="btn dropdown-button" href="#!" data-activates="dropdown2">
                    Observations<Icon right>arrow_drop_down</Icon>
                </a>
*/
var Inference = React.createClass({
    runInference: function() {
        graph.inferenceToggle(vis, pp);
        console.log("running inference");
    },
    render: function () {
        return (
            <div>
                <SelectObservationInference></SelectObservationInference>
                <Button node="a" waves='light' className="waves-effect waves-light orange btn white-text" onClick={this.runInference}>Run Inference</Button>
            </div>
        );
    }
});

var Learning = React.createClass({
    runInference: function() {
        graph.inferenceToggle(vis, pp);
        console.log("running inference");
    },
    render: function () {
        return (
            <Row>
                <SelectObservationLearning></SelectObservationLearning>
                <Button node="a" waves='light' className="waves-effect waves-light orange btn white-text" onClick={this.runInference}>Run Learning</Button>
            </Row>
        );
    }
});

var SelectGraph = React.createClass({
    render: function () {
        return (
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    {pathways.map(function(pathway) {
                        return <li key={pathway.id}>{pathway.name}</li>
                       })}
                </ul>
                <a className="btn dropdown-button" href="#!" data-activates="dropdown1">
                    Pathways<Icon right>arrow_drop_down</Icon>
                </a>
            </div>
        );
    }
});




var App = React.createClass({
  handleSelect: function (index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },
  render: function () {
    return (
        <Tabs onSelect={this.handleSelected} selectedIndex={0}>
        <TabList>
          <Tab>Select Graph</Tab>
          <Tab>Learning</Tab>
          <Tab>Inference</Tab>
        </TabList>
        <TabPanel>
          <SelectGraph></SelectGraph>
        </TabPanel>
        <TabPanel>
          <Learning></Learning>
        </TabPanel>
        <TabPanel>

        </TabPanel>
      </Tabs>
    );
  }
});


  //        <Inference></Inference>
render(<App />, document.getElementById('app'));

$(".button-collapse").sideNav({'edge': 'left'});
$( document ).ready(function(){});
