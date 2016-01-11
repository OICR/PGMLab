import React from 'react'


export class Filter extends React.Component {
    filterTrigger() {
  //      this.props.filterUpdate(this.refs.filterInput.getDOMNode().value);
    }
    render () {
        return (
            <ul><li>
                <form className="pathway-filter">
                    <input 
                     type='text' 
                     ref='filterInput'
                     placeholder='Type to filter..' 
                     // binding the input value to state 
                     value={this.props.filterVal}
                     onChange={this.filterTrigger} />
                </form>
            </li></ul> )
    };
}
