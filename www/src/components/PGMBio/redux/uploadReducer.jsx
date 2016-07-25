import {Map} from "immutable";

const readPathwayFile = (file) => {
  let reader = new FileReader();
  // let file = e.target.files[0];
  // let self = this;
  // reader.onload = function(upload) {
  //     const contents = upload.target.result;
  //     let lines = contents.split("\n")||[];
  //     lines.pop(); // There is one additional empty element on the end because of newlines on the end of the last line
  //
  //     // // Error handling
  //     // const numberOfLines = lines.length;
  //     // if (numberOfLines < 2) {
  //     //     self.props.uploadListAddFailure(file.name, "Pathway", "File does not follow the correct format");
  //     //     return;
  //     // }
  //     // else if (numberOfLines > (100 + 2) ) {
  //     //     self.props.uploadListAddFailure(file.name, "Pathway", "Max number of interactions allowed is 100. Larger pathways can be done on command line");
  //     //     return;
  //     // };
  //     // const numberOfInteractions = lines.length - 2
  //     // if (!self.isInteger(lines[0])) {
  //     //     self.props.uploadListAddFailure(file.name, "Pathway", "First line needs to be an integer representing the number of interactions");
  //     //     return;
  //     // }
  //     // else if (Number(lines[0]) !== numberOfInteractions ) {
  //     //     self.props.uploadListAddFailure(file.name, "Pathway", "Number of interactions does not match number at top of file");
  //     //     return;
  //     // }
  //     // else if (lines[1] !== "") {
  //     //     self.props.uploadListAddFailure(file.name, "Pathway", "Second line needs to be empty");
  //     //     return;
  //     // }
  //
  //     let nodes = {},
  //         nodesList = [],
  //         links = [],
  //         nodeCount = 0;
  //     for (let i=2; i < numberOfLines; i++) {
  //         const lineParts = lines[i].split("\t")
  //         if (lineParts.length < 2) {
  //              self.props.uploadListAddFailure(file.name, "Pathway",
  //                    "All lines must have format <nodeFrom>\\t<NodeToo> ; will use first two columns. Trouble line: ".concat(lines[i]))
  //              return
  //         }
  //         const source = lineParts[0].trim()
  //         if (!nodes.hasOwnProperty(source)) {
  //             nodes[source] = ++nodeCount
  //             nodesList.push({"name":     source,
  //                             "label":    source,
  //                             "longname": source,
  //                             "name":     source,
  //                             "leaf":     null,
  //                             "shape":    null,
  //                             "shape3":   null,
  //                             "type":     null })
  //         }
  //
  //         const target = lineParts[1].trim();
  //         if(!nodes.hasOwnProperty(target)) {
  //             nodes[target] = ++nodeCount
  //             nodesList.push({"name":     target,
  //                             "label":    target,
  //                             "longname": target,
  //                             "name":     target,
  //                             "leaf":     null,
  //                             "shape":    null,
  //                             "shape3":   null,
  //                             "type":     null })
  //        }
  //
  //        const logic = lineParts[2].trim();
  //        const value = lineParts[3].trim();
  //        links.push({source, target, logic, value});
  //     }
  //
  //     var pairwiseInteractions = { "nodes": nodesList,
  //                                  "links": links}
  //     // self.props.addNewPathway(file.name, pairwiseInteractions)
  // }
  reader.readAsText(file);
};

const uploadReducer = (state=Map(), action) => {
  console.log("...uploadReducer.action: ", action);
  switch (action.fileType) {
    case "PATHWAY":
      readPathwayFile(action.file)
      break;
    case "OBSERVATIONS":
      break;
    case "PARAMETERS":
      break;
    case "PROBABILITIES":
      break;
  };
  return state;
}
export default uploadReducer;
