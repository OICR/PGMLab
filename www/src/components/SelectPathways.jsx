import React from 'react'

// import {PathwayNames} from './PathwayNames.jsx'

export class SelectPathways extends React.Component {
  constructor (props) {
    super(props);

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
  filterTextUpdate(event) {
      this.setState({filterText: event.target.value})
  }
  filterCheckedUpdate(event){
    this.setState({filterChecked: !this.state.filterChecked});
  }

  // For onClick event when hiding/showing all unselected pathways
  handleSelect(pathwayID){
    const selected = this.refs[pathwayID].checked;
    switch (selected) {
      case true:
        this.props.removeSelectedPathways([pathwayID], this.props.runType);
        break;
      case false:
        this.props.selectPathways([pathwayID], this.props.runType);
        break;
    };
  }
  // For onClick event when checking all pathways
  handleCheckAll(){
    const toSelect = this.props.pathways.map((pathway)=>{return pathway.id});
    this.props.selectPathways(toSelect, this.props.runType);
  }
  // For onClick event when unchecking all pathways
  handleUncheckAll(){
    const selected = this.props.selectedPathways;
    this.props.removeSelectedPathways(selected, this.props.runType);
  }

  // RENDERING //
  pathwayListItem(pathway){
    const checked = this.props.selectedPathways.includes(pathway.id);
    return (
      <li key={pathway.id} className="collection-item black-text"
        onClick={(evt)=>{evt.preventDefault();this.handleSelect(pathway.id)}}>
        <input ref={pathway.id} id={pathway.id} type="checkbox" className="filled-in" checked={checked} readOnly={true}/>
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
    return (
      <div id="selectPathwayModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="col s10 btn waves-effect center-align" onClick={this.filterCheckedUpdate}>
                {this.state.filterChecked ? "Show Unselected" : "Hide Unselected"}
            </div>
            <div className="col s1 center-align" onClick={this.handleCheckAll}>
              <a className="btn-floating waves-effect">
                <i className="material-icons">check_box</i>
              </a>
            </div>
            <div className="col s1 center-align" onClick={this.handleUncheckAll}>
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
