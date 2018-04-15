import React from 'react'
import RouteService from './services/RouteService'
import LocationService from './services/LocationService'
import SearchStops from './components/SearchStop'
import SearchRoutes from './components/SearchRoutes'
import PrintRoutes from './components/PrintRoutes'
import SearchSchedulesForLine from './components/SearchSchedulesForLine'
import Alerts from './components/Alerts'
import Map from './components/Map'
import Markers from './components/Markers'
import LoginForm from './components/LoginForm'
import CreateNewUser from './components/CreateNewUser'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			toggleLoginForm: true
		}
	}

	componentDidMount() {
		RouteService.getAllStops().then(response =>
			this.props.store.dispatch({
				type: 'ADD_ALL_STOPS',
				stops: response.data.stops
			}))

		RouteService.getAlerts().then(response =>
			this.props.store.dispatch({
				type: 'ADD_ALERTS',
				alerts: response.data.alerts
			}))
	}

	render() {
		return (
			<div>
				<h2>Route Planner</h2>
				<LoginForm />
				<p></p>
				<CreateNewUser/>
				<p></p>
				<SearchSchedulesForLine store = {this.props.store} />
				<p></p>
				<SearchStops store = {this.props.store} />
				<p></p>
				<SearchRoutes store = {this.props.store} />
				<p></p>
				<PrintRoutes store = {this.props.store} />
				<p></p>
				<Map store = {this.props.store} />
				<p></p>
				<Markers store = {this.props.store}/>
				<p></p>
				<Alerts store = {this.props.store}/>
			</div>
		)
	}
}

export default App
