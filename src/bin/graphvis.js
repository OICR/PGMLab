import vis from '../lib/vis-4.14.0/dist/vis.js';

var network;
var datasetnodes;
var datasetedges;

function render(pairwiseInteractions) {

    if (network !== undefined) {
        network.destroy();
        datasetnodes = null;
        datasetedges = null;
    }

    var container = document.getElementById('chart');
    var lengthLimit = 30;
    var edges = [];
    var numberEdges = pairwiseInteractions.links.length;
    for (let i = 0;  i<numberEdges; i++) {
        edges.push({from: pairwiseInteractions.links[i].source,
                    to: pairwiseInteractions.links[i].target,
                    'arrows':'to',
                   });
    }

    var nodes = [];
    var numbernodes = pairwiseInteractions.nodes.length;
    for (let i =0; i<numbernodes; i++) {
        var length = (pairwiseInteractions.nodes[i].longname != null)?
            pairwiseInteractions.nodes[i].longname.length: lengthLimit+1;
        var label =  ( length< lengthLimit)?
                       pairwiseInteractions.nodes[i].longname:
                       pairwiseInteractions.nodes[i].name;
        var node = {'id': pairwiseInteractions.nodes[i].name,
                    'label': label,
                    'color': {},
                    'title': 'ID: '+ pairwiseInteractions.nodes[i].name +'<br>' +
                             'Name:' + pairwiseInteractions.nodes[i].longname + '<br>' +
                             'Reactome Class:' + (pairwiseInteractions.nodes[i].type !== null)? pairwiseInteractions.nodes[i].type: "unknown" , 
                    'shape': pairwiseInteractions.nodes[i].shape,
                    'scaling': {'label': {'enabled':false} }};
        nodes.push(node);
    }

    datasetnodes = new vis.DataSet(nodes);
    datasetedges = new vis.DataSet(edges);

    var data = {
        nodes: datasetnodes,
        edges: datasetedges
    };

    var options = {
      height: "800px",
      interaction: {
        navigationButtons: true,
        keyboard: true,
        tooltipDelay: 200,
        hideEdgesOnDrag: true
      },
      layout: {
        randomSeed: undefined,
        improvedLayout:true,
        hierarchical: {
          enabled:true,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          direction: 'UD',        // UD, DU, LR, RL
          sortMethod: 'directed'   // hubsize, directed
        }
      }
    };

    // subscribe to any change in the DataSet
    datasetnodes.on('*', function (event, properties, senderId) {
       console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
    });
    datasetedges.on('*', function (event, properties, senderId) {
       console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
    });

    network = new vis.Network( container, data, options);
}

exports.render = render;

function mutateGene(gene) {
   datasetnodes.update({id: gene.name, "color": {"border": '#ff0000'} });
}

exports.mutateGene = mutateGene;

function removeMutatedGene(gene) {
   datasetnodes.update({id: gene.name, "color": {"border": '##2B7CE9'} });
}

exports.removeMutatedGene = removeMutatedGene;


function addPosteriorProbabilities(posteriorProbabilities) {
    var numPosteriorProbabilities = posteriorProbabilities.length;
    console.log("keys", posteriorProbabilities.keys());
    for (var ppid in posteriorProbabilities) {
        
        var stateProbs = posteriorProbabilities[ppid];
        var r = Math.ceil(stateProbs[0]*255);
        var g = Math.ceil(stateProbs[1]*255);
        var b = Math.ceil(stateProbs[2]*255);

        var node = datasetnodes.get(ppid);
console.log("node", ppid, datasetnodes, node);
        var title = node["title"];

        title += "<br>Probabilities:<br>" +
                 "State 1 (down regulated): " + stateProbs[0] + "<br>" +
                 "State 2 (no change):      " + stateProbs[1] + "<br>" +
                 "State 3 (up regulated):   " + stateProbs[2] + "<br>";

        var bgColor =  "rgba(" + r + "," + g + "," + b + ",0.5)";

        console.log("bgcolor", bgColor);
        datasetnodes.update({"id": ppid, "color" : {"background": bgColor}});
    }
}

exports.addPosteriorProbabilities = addPosteriorProbabilities;
