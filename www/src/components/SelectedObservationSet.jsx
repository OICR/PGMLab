import React from 'react'

export class SelectedObservationSet extends React.Component {

    render() {
        return (
                <ul className="collection">
                    <li className="collection-item">{this.props.selectedObservationSet.name}</li>
                </ul> )
    }
}
