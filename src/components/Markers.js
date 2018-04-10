import React from 'react'

class Markers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            points: []
        }
    }

    handleSearchDataFromChange = (element) => {
        this.props.store.dispatch({
            type: 'ADD_SEARCH_DATA_FROM',
            data: {fromLat: element.lat, fromLon: element.lon, fromPlace: element.name}
        })
    }

    handleSearchDataToChange = (element) => {
        this.props.store.dispatch({
            type: 'ADD_SEARCH_DATA_TO',
            data: {toLat: element.lat, toLon: element.lon, toPlace: element.name}
        })
    }

    emptyList = () => {
        this.setState({ points: [] })
        this.props.store.dispatch({
            type: 'REMOVE_ALL_LAYERS'
        })
    }

    render() {
        this.props.store.subscribe(() => {
            if(this.props.store.getState().map.type === 'point') {
                if (this.state.points[0] === undefined || (this.props.store.getState().map.data.lat !== this.state.points[this.state.points.length - 1].lat && this.props.store.getState().map.data.lon !== this.state.points[this.state.points.length - 1].lon)) {
                    const savedData = this.props.store.getState().map.data //Because this.setState is an asyncronous operation, we need to save data to variable in this part of the code 
                    this.setState((prevState) => {
                        return {points: prevState.points.concat(savedData)} 
                    })
                }
            }
        })

        return(
            <div>
                <h3>Points on the map:</h3>
                {this.state.points[0] === undefined ? 'No points on the map.' : this.state.points.map(element =>
                    <p key={element.lat}>{element.name} <button onClick={() => this.handleSearchDataFromChange(element)}>Route from here.</button> <button onClick={() => this.handleSearchDataToChange(element)}>Route to here.</button></p>)}
            <div><button onClick={() => this.emptyList()}>Remove all points from the list and the map.</button></div>
            </div>
        )
    }
}

export default Markers