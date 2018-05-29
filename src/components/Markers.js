import React from 'react'
import LocationService from '../services/LocationService'
import { addSearchDataTo, addSearchDataFrom, removeAllLayers, notify } from '../actions/actionCreators'
import { Button, Table } from 'react-bootstrap'  // eslint-disable-line

class Markers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			points: [],
			visibility: false
		}
	}

	toggleButtonsVisibility = (bool) => {
		this.setState({
			visibility: bool
		})
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
		this.props.store.dispatch(notify('You added a location to favourites.', 'info'))
		LocationService.addPointToFavourites(point)
	}

	makeHomeLocation = (point) => {
		this.props.store.dispatch(notify('You updated your homelocation.', 'info'))
		LocationService.makeHomeLocation(point)
	}

	render() {
    	this.props.store.subscribe(() => {
			if (this.props.store.getState().user !== undefined) {
				this.toggleButtonsVisibility(true)
			} else {
				this.toggleButtonsVisibility(false)
			}
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
    			<h3>Locations on the map:</h3>
				{(this.state.points[0] === undefined) ? 'You need to log in before you can manage your locations.' :
					<Table><tbody>{this.state.points.map(element => <tr key={element.lat}>
    				<td>{element.name}</td>
    					<td><Button onClick={() => this.handleSearchDataFromChange(element)}> Route from here </Button></td>
    					<td><Button onClick={() => this.handleSearchDataToChange(element)}> Route to here </Button></td>
						<td><Button style={this.state.visibility ? {} : { display: 'none' }} onClick = {() => this.addPointToFavourites(element)}> Add point to your favourites </Button></td>
						<td><Button style={this.state.visibility ? {} : { display: 'none' }} onClick = {() => this.makeHomeLocation(element)}> Make this your home location </Button></td>
					</tr>)}
					</tbody>
					</Table>}
    			<div><Button onClick={() => this.removePoints()}>Remove all points from the list and the map.</Button></div>
    		</div>
    	)
	}
}

export default Markers