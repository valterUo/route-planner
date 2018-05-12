import React from 'react'
import LocationService from '../services/LocationService'
import { addSearchDataTo, addSearchDataFrom, removeAllLayers } from '../actions/actionCreators'

class Markers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			points: [],
			visibility: false
		}
	}

    handleSearchDataFromChange = (element) => {
    	this.props.store.dispatch(addSearchDataFrom(element))
    }

    handleSearchDataToChange = (element) => {
    	this.props.store.dispatch(addSearchDataTo(element))
    }

    removePoints = () => {
    	this.setState({ points: [] })
    	this.props.store.dispatch(removeAllLayers())
    }

	addPointToFavourites = (point) => {
		LocationService.addPointToFavourites(point)
	}

	makeHomeLocation = (point) => {
		LocationService.makeHomeLocation(point)
	}

	render() {
    	this.props.store.subscribe(() => {
			const map = this.props.store.getState().map
    		if(map.type === 'point') {
    			if (this.state.points[0] === undefined || (map.data.lat !== this.state.points[this.state.points.length - 1].lat && map.data.lon !== this.state.points[this.state.points.length - 1].lon)) {
    				const savedData = map.data //Because this.setState is an asyncronous operation, we need to save data to variable in this part of the code
    				this.setState((prevState) => {
    					return { points: prevState.points.concat(savedData) }
    				})
    			}
    		}
    	})

    	return(
    		<div>
    			<h3>Points on the map:</h3>
    			{(this.state.points[0] === undefined || window.localStorage.getItem('loggedUser') === null) ? 'No points on the map.' : this.state.points.map(element =>
    				<p key={element.lat}>{element.name}
    					<button onClick={() => this.handleSearchDataFromChange(element)}> Route from here </button>
    					<button onClick={() => this.handleSearchDataToChange(element)}> Route to here </button>
						<button style={{ visibility: this.state.visibility }} onClick = {() => this.addPointToFavourites(element)}> Add point to your favourites </button>
						<button style={{ visibility: this.state.visibility }} onClick = {() => this.makeHomeLocation(element)}> Make this your home location </button>
    				</p>)}
    			<div><button onClick={() => this.removePoints()}>Remove all points from the list and the map.</button></div>
    		</div>
    	)
	}
}

export default Markers