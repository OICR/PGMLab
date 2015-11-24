//Constants for the SVG
var width = 1000;
    height = 500;

//Set up the colour scale
var color = d3.scale.category20();

//Set up the force layout
var force = d3.layout.force()
    .charge(-300)
    .linkDistance(200)
    .size([width, height])
    .gravity(0.5);

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

/*//Set up tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
    return  d.name + "</span>";
})
svg.call(tip);
*/

//Adds capability to pin nodes, single click to release
var node_drag = d3.behavior.drag()
        .on("dragstart",dragstart)
        .on("drag",dragmove)
        .on("dragend",dragend);
    function dragstart(d, i) {
        force.stop() //stops the force auto positioning before you start dragging
    }
    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy;
    }
    function dragend(d, i) {
        d.fixed = true; //set the node to fixed so the force doesn't include the node in its auto positioning stuff
        force.resume();
    }
    function releasenode(d) {
        d.fixed = false; //set the node to fixed so the force doesn't include the node in its auto positioning stuff
        //force.resume();
    }

//Read the data from the mis element 
//var mis = document.getElementById('mis').innerHTML;
//graph = JSON.parse(mis);

//Creates the graph data structure out of the json data
force.nodes(graph.nodes)
    .links(graph.links)
    .start();

//Create all the line svgs but without locations yet
var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("marker-end",  "url(#suit)") // Modified line 
    .style("stroke-width", 1)//function(d) {return Math.sqrt(d.value);})
    .style("stroke", function(d) {if (d.value < 0){return "#b30000";} else{return "#999";};});

//Do the same with the shapes for the nodes 
 var node = svg.selectAll(".node")
           .data(graph.nodes)
           .enter().append("g")
           .attr("class", "node")
           .on('click', connectedNodes) //Added code for highlighting nodes
           .on('dblclick',releasenode) //Added code for releasing nodes
           .call(node_drag); //Added code for pinning nodes


 node.append("polygon")
    //.attr("transform", function(d) { return "translate(" + d + ")"; }) //for zoom
    .style("fill",color(1));

 /* .on('mouseover', tip.show) //Added for tooltip
    .on('mouseout', tip.hide) //Added for tooltip
*/
  
node.append("text")
      .attr("dx", 10)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });
      //.style("stroke", "gray");

//Toggle stores whether the highlighting is on
var toggle = 0;
//Create an array logging what is connected to what 
var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
	linkedByIndex[i + "," + i] = 1;
};
graph.links.forEach(function (d) {
	linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

//This function looks up whether a pair are neighbours
function neighboring(a,b) {
	return linkedByIndex[a.index + "," + b.index];
}
function connectedNodes() {
	if (toggle == 0) {
		//Reduce the opacity of all but the neighbouring nodes
		d = d3.select(this).node().__data__;
		node.style("opacity", function (o) {
			return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
		});
		link.style("opacity", function (o) {
			return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
		});
		//Reduce the op
		toggle = 1;
	} else {
		//Put them back to opacity = 1
		node.style("opacity", 1);
		link.style("opacity", 1);
		toggle = 0;
	}
}

//Search capability
var optArray = [];
for (var i = 0; i < graph.nodes.length - 1; i++) {
    optArray.push(graph.nodes[i].name);
}
optArray = optArray.sort();
$(function () {
    $("#search").autocomplete({
        source: optArray
    });
});

//Inference Button
var ramp=d3.scale.linear().domain([0,100]).range(["yellow","red"]);
function inferenceToggle() {
	var nodes = svg.selectAll(".node");
	posterior_probs[0].forEach(function(pp) {		
               var selected = node.filter(function (d, i){
 	              return d.name == pp.name;
	       });

	       var node_color = ramp(pp["probs"][0]*100);
	       selected.style("fill", node_color);
	});
}

//Search for Nodes
function searchNode() {
    //find the node
    var selectedVal = document.getElementById('search').value;
    var node = svg.selectAll(".node");
    if (selectedVal == "none") {
        node.style("stroke", "white").style("stroke-width", "1");
    } else {
        var selected = node.filter(function (d, i) {
            return d.name != selectedVal;
        });
        selected.style("opacity", "0");
        var link = svg.selectAll(".link")
	link.style("opacity","0");
	d3.selectAll(".node, .link").transition()
		.duration(5000)
		.style("opacity", 1);
   }
}

//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
force.on("tick", function () {
    var xdiamondpadding = 24;
    var ydiamondpadding = 12;
    var xrectpadding = 18;
    var yrectpadding = 9;
    
    link.attr("x1", function (d) {
          return d.source.x;
    })
        .attr("y1", function (d) {
	  return d.source.y;
    })
        .attr("x2", function (d) {
          return d.target.x;
    })
        .attr("y2", function (d) {
	  return d.target.y;
    });
    
    svg.selectAll("polygon").attr("points", function(d) { //node.attr(
         if (d.type == "logic") {
            var poly = [ {"x": d.x+xdiamondpadding, "y": d.y},
                         {"x": d.x, "y": d.y+ydiamondpadding},
            		 {"x": d.x-xdiamondpadding, "y": d.y},
            		 {"x": d.x, "y": d.y-ydiamondpadding} ];
            	return poly.map(function(point) {
            	       return [point.x, point.y].join(",")
                }).join(" ");
         } else {
            var poly = [ {"x": d.x+xrectpadding, "y": d.y+yrectpadding},
                         {"x": d.x-xrectpadding, "y": d.y+yrectpadding},
                         {"x": d.x-xrectpadding, "y": d.y-yrectpadding},
                         {"x": d.x+xrectpadding, "y": d.y-yrectpadding} ];
                return poly.map(function(point) {
                       return [point.x, point.y].join(",")
                }).join(" ");
         }
   }); 

    svg.selectAll("text").attr("x", function (d) { return d.x+11; })
                         .attr("y", function (d) { return d.y-11; });

});


svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 11)
    .attr("markerHeight", 11)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
    .style("stroke", "#4679BD")
    .style("opacity", "0.8");

//selectedVal = document.getElementById('search').value;
//    var node = svg.selectAll(".node");
//    if (selectedVal == "none") {
//        node.style("stroke", "white").style("stroke-width", "1");
//    } else {
//        var selected = node.filter(function (d, i) {
//            return d.name != selectedVal;
//        });

