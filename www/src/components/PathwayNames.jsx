import React from 'react'
var classNames = require("classnames");

export class PathwayNames extends React.Component {
  handleCheck(pathwayID){
    // console.log(this.props.selectedPathways);
    // console.log("pathway id:", pathwayID,evt);
    // console.log("input:", this.refs[pathwayID]);
    // const checked = evt.target.checked;
    let input = this.refs[pathwayID];
    // const checked = input.checked;
    // console.log(checked);
    switch (input.checked) {
      case true:
        input.checked=false;
        this.props.removeSelectedPathway(pathwayID);
        break;
      case false:
        input.checked=true;
        this.props.selectPathway(pathwayID);
        break;
    };
    // console.log(this.props.selectedPathways);
  }
  handleUncheckAll(){
    const pathways = self.props.pathways;
    for (let pathway of pathways) {
      this.refs[pathway.id].checked=false;
      this.props.removeSelectedPathway(pathway.id);
    };
  }
  handleCheckAll(){
    const pathways = self.prop.pathways;
    for (let pathway of pathways) {
      this.refs[pathway.id].checked=true;
      this.props.selectPathway(pathway.id);
    };
  }
  pathwayListItem(pathway){
    // Only use pathway.id as key
    // const typeKey=this.props.runType.concat(pathway.id);
    return (
      <li key={pathway.id} href="#!" className="collection-item black-text" onClick={()=>{this.handleCheck(pathway.id)}}>
        <input ref={pathway.id} id={pathway.id} type="checkbox" className="filled-in"/>
        <label htmlFor={pathway.id} className="black-text">{pathway.name}</label>
      </li>
    );
  }
  render(){
    let self = this;
    const input = (isNaN(self.props.filterText)) ? self.props.filterText.toLowerCase() : self.props.filterText;
    const pathways = self.props.pathways;
    const selectedPathwayIDs = self.props.selectedPathways;
    const pathwayList = pathways.map((pathway)=>{
      const textFilter = pathway.name.toLowerCase().indexOf(input) && (pathway.id.indexOf(input) == -1);
      const checkedFilter = self.props.filterChecked && !selectedPathwayIDs.includes(pathway.id);
      return (
        (textFilter) ? undefined :
          (checkedFilter) ? undefined : self.pathwayListItem(pathway)
      );
    });
    return (
      <ul className="collection left-align">
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
