import vis from '../lib/vis-4.14.0/dist/vis.js';

var network
var datasetnodes
var datasetedges

function render(pairwiseInteractions) {

    var container = document.getElementById('chart');
    var lengthLimit = 15;
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
        var reactomeClass  =  (pairwiseInteractions.nodes[i].type !== null)? pairwiseInteractions.nodes[i].type: "unknown";
        var node = {'id': pairwiseInteractions.nodes[i].name,
                    'label': label,
                    'color': {"background": '#ffffff',
                              "border":     '#000000'},
                    'title': 'ID: '+ pairwiseInteractions.nodes[i].name +'<br>' +
                             'Name: ' + pairwiseInteractions.nodes[i].longname + '<br>' +
                             'Reactome Class: ' + reactomeClass , 
                    'shape': 'dot',
                    'scaling': {'label': {'enabled':false}}};
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

    if (network === undefined ) {
        network = new vis.Network( container, data, options)
    } else {
        network.setData(data);
    }
    //    network.setData(data);
        // subscribe to any change in the DataSet
  /*      datasetnodes.on('*', function (event, properties, senderId) {
           console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
        });
        datasetedges.on('*', function (event, properties, senderId) {
           console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
        });*/
    

/*
        network.on( 'doubleClick', function(properties) {

            var nodes = datasetnodes.get(properties.nodes);
            var node = nodes[0];
            console.log("nodes", nodes, node);
            node["state"] = 0;
            setNodeState(node);
            console.log('double clicked node ' + properties.nodes, node);
        });
*/
     
}

exports.render = render;

function setNodeState(gene) {
   var stateColor=["", "red", "grey", "green"];
   datasetnodes.update({id: gene.name, "color": {"border": stateColor[gene.state]},
                                       "borderWidth": 3 });
}

exports.setNodeState = setNodeState;

function removeMutatedGene(gene) {
   datasetnodes.update({id: gene.name, "color": {"border": 'black'},
                                       "borderWidth": 1 });
}

exports.removeMutatedGene = removeMutatedGene;


function addPosteriorProbabilities(posteriorProbabilities) {
    var numPosteriorProbabilities = posteriorProbabilities.length;
    for (var ppid in posteriorProbabilities) {
               
        var stateProbs = posteriorProbabilities[ppid];
        var r = Math.ceil(stateProbs[0]*255);
        var b = Math.ceil(stateProbs[1]*255);
        var g = Math.ceil(stateProbs[2]*255);


        var dominantState;
        // This makes it so that we just pick to dominant state and have the color based on that state. Where state 1 is grey (all colors equal)
        if ((r > g) &&(r > b)) {
             g = 0
             b = 0
             dominantState = 1
        } 
        else if ((g> r) && (g> b)) {
             r = 0
             b = 0
             dominantState = 3
        } 
        else {
             b = 255 - b
             g = b
             r =  b
             dominantState = 2
        }
        var node = datasetnodes.get(ppid);
         
        var title = node["title"].split("<br>Probabilities:<br>")[0];
        node["dominantState"] = dominantState;

        title += "<br>Probabilities:<br>" +
                 "Dominant State: " + dominantState + "<br>" +
                 "State 1 (down regulated): " + stateProbs[0] + "<br>" +
                 "State 2 (no change):      " + stateProbs[1] + "<br>" +
                 "State 3 (up regulated):   " + stateProbs[2] + "<br>";

        var bgColor =  "rgba(" + r + "," + g + "," + b + ",.1)";

        datasetnodes.update({"id": ppid, "color" : {"background": bgColor},
                             "title": title});
    }
}

exports.addPosteriorProbabilities = addPosteriorProbabilities;
