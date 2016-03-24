import React  from 'react'
//import Select from 'react-select'
import Dropdown from 'react-dropdown'


var css = require("../../assets/css/react-dropdown.css")
//require('../../node_modules/react-select/scss/select.scss');

const options = [
    { value: 1, label: "Decrease", state: 1},
    { value: 2, label: "Normal", state: 2 },
    { value: 3, label: "Increase", state: 3 }
];


export class SelectNodeState extends React.Component {
    render () {
        const defaultOption = options[0];
	var self = this;
        console.log("this.props.node.state", this.props.node.state);
        return (<Dropdown options={options}
                          onChange={self.props.setNodeState.bind(this, this.props.node)} 
                          value={options[this.props.node.state-1]} />)
    }
}
