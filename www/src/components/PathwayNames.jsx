import React from 'react'
var classNames = require("classnames");

export class PathwayNames extends React.Component {
  handleCheck(pathwayID,evt){
    console.log(this.props.selectedPathways);
    console.log("pathway id:", pathwayID,evt.target.checked);
    const checked = evt.target.checked;
    switch (checked) {
      case true:
        this.props.selectPathway(pathwayID);
        break;
      case false:
        this.props.removeSelectedPathway(pathwayID);
        break;
    };
    console.log(this.props.selectedPathways);
  }
  render() {
    let self = this;
    const input = (isNaN(self.props.filterText))? self.props.filterText.toLowerCase(): self.props.filterText;
    const pathways = self.props.pathways;
    const selectedPathwayIDs = self.props.selectedPathways;
    const activePathwayID = self.props.activePathway.id;
    const pathwayList = pathways.map((pathway)=>{
      const typeKey = self.props.runType.concat(pathway.id);
      const exists = pathway.name.toLowerCase().indexOf(input) && (pathway.id.indexOf(input) == -1);
      // const rowClass
      return (exists) ? undefined :
        <li key={typeKey} className="collection-item">
          <input id={pathway.id} type="checkbox" className="filled-in" onChange={(evt)=>{this.handleCheck(pathway.id,evt)}}/>
          <label htmlFor={pathway.id} className="black-text">{pathway.name}</label>
        </li>

    });
    return (
      <ul className="collection">
        {pathwayList}
      </ul>
    );
  }
}
{/*         <tr key={typeKey} className={(activePathwayID == pathway.id)? "pathway-item light-blue": "collection pathway-item"}>
          <td>
              <input type="checkbox" className="filled-in" id={pathway.id} onClick={(self.props.selectedPathways.indexOf(pathway.id) !== -1)?
                                                           self.props.removeSelectedPathway.bind(this, pathway.id):
                                                           self.props.selectPathway.bind(this, pathway.id)}/>
              <label htmlFor={pathway.id}  />
          </td>
          <td onClick={(activePathwayID === pathway.id)? undefined : self.props.setActivePathway.bind(this, pathway)}>{pathway.name}</td>
        </tr> */}
        {/*       <table>
                <tbody style={{display:"block", maxHeight:"800px", overflowY: "scroll"}}>
                  {pathwayList}
                </tbody>
              </table> */}
