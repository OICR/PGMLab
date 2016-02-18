import vis from '../lib/vis-4.14.0/dist/vis.js';

function render(pairwiseInteractions) {
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
        nodes.push({ 'id': pairwiseInteractions.nodes[i].name,
                     'label': label,
                     'title': 'Name: '+ pairwiseInteractions.nodes[i].name +'<br>' +
                              'LongName' + pairwiseInteractions.nodes[i].longname,
                     'shape': pairwiseInteractions.nodes[i].shape });
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
