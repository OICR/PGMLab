// Functions for normalizing Reactome/User uploaded pathways
// Reactome pathways have 'name',"id", uploaded pathways have 'filename',"_id"
const getSource = p => p.has("id") ? "reactome" : "user"
const getLabel = p => getName(p).length > 35 ? getName(p).substr(0,35).concat("...") : getName(p)
const getName = p => p.has("name") ? p.get("name") : p.get("filename")
const getID = p => p.has("id") ? p.get("id") : p.get("_id")

export {getSource, getLabel, getName, getID}
