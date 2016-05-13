import React from 'react'

// import {PathwayNames} from './PathwayNames.jsx'

export class SelectPathways extends React.Component {
  constructor (props) {
    super();

    this.state = {
      filterText: '', // For filtering by text input
      filterChecked: false // For hiding/showing unselected
    };
    this.filterTextUpdate = this.filterTextUpdate.bind(this);
    this.filterCheckedUpdate = this.filterCheckedUpdate.bind(this);
    this.handleSelect=this.handleSelect.bind(this);
    this.handleCheckAll=this.handleCheckAll.bind(this);
    this.handleUncheckAll=this.handleUncheckAll.bind(this);

  }
  componentDidupdate() {
      // $('.collapsibleLearning').collapsible({accordion : true})
  }
  filterTextUpdate(event) {
      this.setState({
          filterText: event.target.value
      })
  }
  filterCheckedUpdate(event){
    this.setState({
      filterChecked: !this.state.filterChecked
    });
  }


  // For onClick event when hiding/showing all unselected pathways
  handleSelect(pathwayID){
    let input = this.refs[pathwayID];
    switch (input.checked) {
      case true:
        // input.checked=false;
        this.props.removeSelectedPathways([pathwayID], this.props.runType);
        break;
      case false:
        // input.checked=true;
        this.props.selectPathways([pathwayID], this.props.runType);
        break;
    };
  }
  // For onClick event when checking all pathways
  handleCheckAll(){
    // for (let pathway of this.props.pathways) {
    //   this.refs[pathway.id].checked=true;
    //   this.props.selectPathway(pathway.id);
    // };
    const toSelect = this.props.pathways.map((pathway)=>{return pathway.id});
    this.props.selectPathways(toSelect, this.props.runType);
    // console.log(this.props.selectedPathways);
  }
  // For onClick event when unchecking all pathways
  handleUncheckAll(){
    // console.log(this.props.selectedPathways);
    const selected = this.props.selectedPathways;
    // console.log(selected);
    this.props.removeSelectedPathways(selected, this.props.runType);
  }

  // RENDERING //
  pathwayListItem(pathway){
    const checked = this.props.selectedPathways.includes(pathway.id);
    return (
      <li key={pathway.id} href="#!" className="collection-item black-text" onClick={()=>{this.handleSelect(pathway.id)}}>
        <input ref={pathway.id} id={pathway.id} type="checkbox" className="filled-in" checked={checked}/>
        <label htmlFor={pathway.id} className="black-text">{pathway.name}</label>
      </li>
    );
  }
  pathwayList(){
    let self = this;
    const input = (isNaN(self.state.filterText)) ? self.state.filterText.toLowerCase() : self.state.filterText;
    const pathways = self.props.pathways;
    const selectedPathwayIDs = self.props.selectedPathways;
    const pathwayList = pathways.map((pathway)=>{
      const textFilter = pathway.name.toLowerCase().indexOf(input) && (pathway.id.indexOf(input) == -1);
      const checkedFilter = self.state.filterChecked && !selectedPathwayIDs.includes(pathway.id);
      return (
        (textFilter) ? undefined :
          (checkedFilter) ? undefined : self.pathwayListItem(pathway)
      );
    });
    return (
      <ul className="collection left-align">{pathwayList}</ul>
    )
  }
  render () {
    // var filterText = this.state.filterText
    // const checkedText = this.state.filterChecked ? "Show Unselected" : "Hide Unselected";
    // console.log(checkedText);
    return (
      <div id="selectPathwayModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s6 btn waves-effect center-align" onClick={this.filterCheckedUpdate}>
                {this.state.filterChecked ? "Show Unselected" : "Hide Unselected"}
            </div>
            <div className="col s3 center-align" onClick={this.handleCheckAll}>
              <a className="btn-floating waves-effect">
                <i className="material-icons">check_box</i>
              </a>
            </div>
            <div className="col s3 center-align" onClick={this.handleUncheckAll}>
              <a className="btn-floating waves-effect">
                <i className="material-icons">check_box_outline_blank</i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <form className="pathway-filter">
                  {/* binding the input value to state */}
                  <input type='text' ref='filterInput' placeholder='Type to filter..'
                    value={this.state.filterText} onChange={this.filterTextUpdate} />
               </form>
             </div>
          </div>
          <div className="row">
            <div className="col s12">
                {this.pathwayList()}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close btn-flat">Close</a>
        </div>
      </div>
    )
  }
}
