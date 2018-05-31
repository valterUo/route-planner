import React from 'react'
import RouteService from '../services/RouteService'
import LocationService from '../services/LocationService'
import { newFilterStop, addSchedule, addPointToMap, notify, addUser } from '../actions/actionCreators'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl } from 'react-bootstrap'  // eslint-disable-line

class SearchStops extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			newStop: '',
			numberOfTimes: 5,
			stop: ''
		}
	}

    searchStops = () => {
    	const filter = this.props.filter.stop.toLowerCase()
    	if (filter === '') {
    		return []
    	}
    	const filteredStops = this.props.allStops.filter(stop => stop.name.toLowerCase().includes(filter) || stop.gtfsId.toLowerCase().includes(filter))
    	if(filteredStops.length < 20) {
    		return filteredStops
    	}
    	return null
    }

     handleStopChange = (event) => {
     	this.setState({ newStop: event.target.value })
     	this.props.newFilterStop(event.target.value)
     }

     showNextBusses = (stop) => {
		 this.setState({ stop: stop })
		 try {
     	RouteService.getBussesByStopID(stop.gtfsId, this.state.numberOfTimes).then(response =>
			 this.props.addSchedule(response.data.stop))
		 } catch (error) {
     		console.log(error)
     		this.props.notify('Failed getting busses by stop id.', 'danger')
		 }
     	this.props.addPointToMap(stop)
     }

     numberOfTimesChange = (event) => {
     	if(this.state.stop === '') {this.setState({ numberOfTimes: event.target.value })}
     	this.setState({
     		numberOfTimes: event.target.value
     	}, function() {
     		this.showNextBusses(this.state.stop)
     	})
     }

     addStoptoFavourites = (stop) => {
		 try {
			 LocationService.addStoptoFavourites(stop)
			 const newUser = this.props.user
    		newUser.locations.favouriteStops = newUser.locations.favouriteStops.concat(stop)
    		this.props.addUser(newUser)
		 	this.props.notify('The stop is added to your favourites.', 'info')
		 } catch (error) {
     		console.log(error)
     		this.props.notify('Failed adding the stop to your favourites.', 'danger')
		 }
     }

     render() {
		 const schedules = this.props.schedules
     	return (
     		<div>
     			<h3>Search next public transport for the given stop</h3>
     			<form>
					 <FormGroup>
     				<FormControl style={{ width: 200 }} value={this.state.newStop} onChange={this.handleStopChange}/>
     				<div>
						 Number of timetables: <FormControl style={{ width: 80 }} type="number" value={this.state.numberOfTimes} onChange={this.numberOfTimesChange} min="1" max="10"/>
						 </div>
     			</FormGroup>
				 </form>
     			{this.searchStops() === null ? 'Too many mathes.' : this.searchStops().map(stop =>
				 <div><div key = {stop.gtfsId} onClick={() => this.showNextBusses(stop)}>{stop.name}, {stop.gtfsId}</div><Button onClick = {() => this.addStoptoFavourites(stop)}>Add to favourite stops</Button></div>)}
     			<div></div>
     			<h4>{schedules === undefined ? '' : schedules.name}</h4>
     			<div>
     				{schedules.info === undefined ? '' : schedules.info.map(item => <div key={item.scheduledArrival + item.busNumber}>{item.headsign === null ? 'The last stop' : item.headsign}, {item.scheduledArrival}, {item.busNumber}</div>)}
     			</div>
     		</div>
     	)
     }
}
const mapStateToProps = (state) => {
	return {
		allStops: state.allStops,
		filter: state.filter,
		schedules: state.schedules,
		user: state.user
	}
}

const mapDispatchToProps = {
	newFilterStop,
	addSchedule,
	addPointToMap,
	notify,
	addUser
}

const ConnectedSearchStops = connect(mapStateToProps, mapDispatchToProps)(SearchStops)

export default ConnectedSearchStops