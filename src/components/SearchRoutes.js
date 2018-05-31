import React from 'react'
import RouteService from '../services/RouteService'
import { connect } from 'react-redux'
import { getToday, getTimefromDate, getDayFromDate } from '../converters/timeConverter'
import { newFilterFrom, newFilterTo, addRoutes, readyToSearch, notify } from '../actions/actionCreators'
import { Checkbox, FormGroup, FormControl, ControlLabel, Button, ButtonGroup } from 'react-bootstrap'  // eslint-disable-line

class SearchRoutes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			newStop: '',
			newStop2: '',
			fromPlace: '',
			fromLat: null,
			fromLon: null,
			toPlace: '',
			toLat: null,
			toLon: null,
			date: '',
			time: '',
			numItineraries: 4,
			bus: true,
			rail: true,
			subway: true,
			tram: true,
			ferry: true,
			intervalId: 2
		}
	}

	componentDidMount() {
		this.setState({ date: getToday(), time: getTimefromDate(new Date()) })
		this.handleSearchDataChange()
	}

    handleInterval = () => {
    	//I coded first the following interval that updates the date and time on the webpage constantly. It caused very much problems.
    	//const interval = setInterval(() => {this.setState({ date: getToday(), time: getTimefromDate(new Date()) })}, 1000)
    	//this.setState({ intervalId: interval })
    }

      handleStopChange = (event) => {
      	this.props.newFilterFrom(event.target.value)
      	this.setState({ newStop: event.target.value })
      }

      handleStopChange2 = (event) => {
      	this.props.newFilterTo(event.target.value)
      	this.setState({ newStop2: event.target.value })
      }

      FromStopsToShow = () => {
      	const filter = this.props.filter.from.toLowerCase()
      	if (filter === '') {
      		return []
      	}
      	const filteredStops = this.props.allStops.filter(stop => stop.name.toLowerCase().includes(filter))
      	if(filteredStops.length < 20) {
      		return filteredStops
      	}
      	return null
      }

      ToStopsToShow = () => {
      	const filter = this.props.filter.to.toLowerCase()
      	if (filter === '') {
      		return []
      	}
      	const filteredStops = this.props.allStops.filter(stop => stop.name.toLowerCase().includes(filter))
      	if(filteredStops.length < 20) {
      		return filteredStops
      	}
      	return null
      }

      handleOnclickChangeFrom = (name, lat, lon, id) => {
      	this.setState({ fromPlace: name,
      		fromLat: lat,
      		fromLon: lon,
      		newStop: name + ' ' + id })
      	this.props.newFilterFrom('')
      }

      handleOnclickChangeTo = (name, lat, lon, id) => {
      	this.setState({ toPlace: name,
      		toLat: lat,
      		toLon: lon,
      		newStop2: name + ' ' + id })
      	this.props.newFilterTo('')
      }

      handleEventChanges = (event) => {
      	const target = event.target
      	if(target.type === 'time') {clearInterval(this.state.intervalId)}
      	const value = target.type === 'checkbox' ? target.checked : target.value
      	const name = target.name
      	this.setState({ [name]: value })
      }

      searchPrevious = () => {
      	clearInterval(this.state.intervalId)
      	const timeAndDate = this.props.routes[0].legs[0].startTime - 400000
      	const d = new Date(timeAndDate)
      	this.setState({ time: getTimefromDate(d), date: getDayFromDate(d) }, function () {
      		this.searchRoutes()
      	})
      }

      searchNext = () => {
      	clearInterval(this.state.intervalId)
      	const routes = this.props.routes
      	const legs = routes[routes.length - 1].legs
      	const timeAndDate = legs[legs.length - 1].startTime + 300000
      	const d = new Date(timeAndDate)
      	this.setState({ time: getTimefromDate(d), date: getDayFromDate(d) }, function () {
      		this.searchRoutes()
      	})
      }

      searchRoutes = (event) => {
      	if(event !== undefined) {
      		event.preventDefault()
      		this.handleInterval()
      	}
      	let modes = 'WALK, '
      	if(this.state.bus === true) {modes = modes +  'BUS,'}
      	if(this.state.subway === true) {modes = modes +  'SUBWAY,'}
      	if(this.state.rail === true) {modes = modes +  'RAIL,'}
      	if(this.state.ferry === true) {modes = modes +  'FERRY,'}
      	if(this.state.tram === true) {modes = modes +  'TRAM,'}
		  const { fromPlace, fromLat, fromLon, toPlace, toLat, toLon, date, time, numItineraries } = this.state
      	try {
			  console.log('trying...')
      	RouteService.planRoute(fromPlace, fromLat, fromLon, toPlace, toLat, toLon, modes, date, time, numItineraries).then(response => {
      			if (response.data.plan.itineraries.length > 0) {
      				this.props.addRoutes(response.data.plan.itineraries)
      			} else {
      				this.props.notify('No routes! Check the locations.', 'danger')
      			}
      	})} catch (error) {
			  console.log(error)
			  this.props.notify('Route planning failed! Check the locations.', 'danger')
		  }
      }

      handleSearchDataChange = () => {
      	this.props.store.subscribe(() => {
      		const searchData = this.props.store.getState().searchData
      		if(searchData.readyToSearch === true) {
      			this.setState({
      				newStop: searchData.fromPlace,
      				newStop2: searchData.toPlace,
      				fromPlace: searchData.fromPlace,
      				fromLat: searchData.fromLat,
      				fromLon: searchData.fromLon,
      				toPlace: searchData.toPlace,
      				toLat: searchData.toLat,
      				toLon: searchData.toLon
      			}, function() {
      				this.props.readyToSearch()
      				this.searchRoutes()
      			})
      		}
      	})
      }

      render(){
      	return(
      		<div>
      			<div>
      				<h3>Search routes</h3>
      				<form>
      					<div><b>Starting point</b></div>
						  <FormGroup>
      					<FormControl style={{ width: 250 }} value={this.state.newStop} onChange={this.handleStopChange}></FormControl>
						  </FormGroup>
      				</form>
      				<div>
      					{this.FromStopsToShow() === null ? 'Too many matches.' : this.FromStopsToShow().map(stop => <div key={stop.gtfsId} onClick = {() => this.handleOnclickChangeFrom(stop.name, stop.lat, stop.lon, stop.gtfsId)}>{stop.name}, {stop.gtfsId}</div>)}
      				</div>
      			</div>
      			<p></p>
      			<div>
      				<form>
      					<div><b>Arrival point</b></div>
						  <FormGroup>
      					<FormControl style={{ width: 250 }} value={this.state.newStop2} onChange={this.handleStopChange2}></FormControl>
						  </FormGroup>
      				</form>
      				<div>
      					{this.ToStopsToShow() === null ? 'Too many matches.' : this.ToStopsToShow().map(stop => <div key={stop.gtfsId} onClick = {() => this.handleOnclickChangeTo(stop.name, stop.lat, stop.lon, stop.gtfsId)}>{stop.name}, {stop.gtfsId}</div>)}
      				</div>
      			</div>
      			<p></p>
      			<div>
      				<form onSubmit={this.searchRoutes}>
					  <FormGroup>
      					<Checkbox name="bus" type="checkbox" defaultChecked={this.state.bus} onChange={this.handleEventChanges}> Bus </Checkbox>
      					<Checkbox name="subway" type="checkbox" defaultChecked={this.state.subway} onChange={this.handleEventChanges} > Metro </Checkbox>
      					<Checkbox name="tram" type="checkbox" defaultChecked={this.state.tram} onChange={this.handleEventChanges} > Tram </Checkbox>
      					<Checkbox name="rail" type="checkbox" defaultChecked={this.state.rail} onChange={this.handleEventChanges} > Train </Checkbox>
      					<Checkbox name="ferry" type="checkbox" defaultChecked={this.state.ferry} onChange={this.handleEventChanges} > Ferry </Checkbox>
      					<ControlLabel htmlFor="date"> Date  </ControlLabel>
      					<FormControl style={{ width: 170 }} id="date" name="date" type="date" value= {this.state.date} onChange={this.handleEventChanges}/>
      					<ControlLabel htmlFor="time"> Time  </ControlLabel>
      					<FormControl style={{ width: 170 }} id="time" name="time" type="time" value= {this.state.time} onChange={this.handleEventChanges}/>
      					<ControlLabel htmlFor="numItineraries"> Number of routes (1–4): </ControlLabel>
      					<FormControl style={{ width: 70 }} id="numItineraries" name = "numItineraries" type="number" value = {this.state.numItineraries} onChange={this.handleEventChanges} min="1" max="4"/>
      					</FormGroup>
						  <Button type="submit" value="Search">Search</Button>
      				</form>
      			</div>
      			<ButtonGroup style ={{ visibility: this.props.routes[0] === undefined ? 'hidden' : 'visible' }}>
      				<Button type="button" value="Previous" onClick={this.searchPrevious}>Previous</Button>
      				<Button type="button" value="Next" onClick={this.searchNext}>Next</Button>
      			</ButtonGroup>
      		</div>
      	)
      }
}

const mapStateToProps = (state) => {
	return {
		searchData: state.searchData,
		routes: state.routes,
		allStops: state.allStops,
		filter: state.filter
	}
}

const mapDispatchToProps = {
	newFilterFrom,
	newFilterTo,
	addRoutes,
	readyToSearch,
	notify
}

const ConnectedSearchRoutes = connect(mapStateToProps, mapDispatchToProps)(SearchRoutes)

export default ConnectedSearchRoutes