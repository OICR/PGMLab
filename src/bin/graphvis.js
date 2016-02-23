import vis from '../lib/vis-4.14.0/dist/vis.js';


function render(pairwiseInteractions, mutatedGenes, posteriorProbabilities) {
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

    console.log("posteriorProbabilities", posteriorProbabilities);
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
                             'Reactome Class:' + pairwiseInteractions.nodes[i].type, 
                    'shape': pairwiseInteractions.nodes[i].shape };
        if ((mutatedGenes !== undefined) &&(mutatedGenes.length > 0)) {
            var foundMutation = $.grep(mutatedGenes, function(e){ return e.name == node["id"]; })
 
            if (foundMutation.length != 0) {
               node["color"]["border"] = '#ff0000';   
            }      
        }
        console.log("pplen", node, posteriorProbabilities);
        if ((posteriorProbabilities !== undefined) &&(posteriorProbabilities[node["id"]] != undefined)) {
            var stateProbs = posteriorProbabilities[node["id"]];
            var r = Math.ceil(stateProbs[0]*255);
            var g = Math.ceil(stateProbs[1]*255);
            var b = Math.ceil(stateProbs[2]*255);

            node["title"] += "<br>Probabilities:<br>"+
                             "State 1 (down regulated): " + stateProbs[0] + "<br>" +
                             "State 2 (no change):      " + stateProbs[1] + "<br>" +
                             "State 3 (up regulated):   " + stateProbs[2] + "<br>" 

            node["color"]["background"] =  "rgba(" + r + "," + g + "," + b + ",0.5)"
        }

        nodes.push(node);
    }

    var datasetnodes = new vis.DataSet(nodes);
    var datasetedges = new vis.DataSet(edges);

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
    var network = new vis.Network( container, data, options);
}

exports.render = render;
