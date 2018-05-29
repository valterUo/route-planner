import React from 'react'
import RouteService from './services/RouteService'
import SearchStops from './components/SearchStop'  // eslint-disable-line
import SearchRoutes from './components/SearchRoutes'  // eslint-disable-line
import PrintRoutes from './components/PrintRoutes'  // eslint-disable-line
import SearchSchedulesForLine from './components/SearchSchedulesForLine'  // eslint-disable-line
import Alerts from './components/Alerts'  // eslint-disable-line
import Map from './components/Map'  // eslint-disable-line
import Markers from './components/Markers'  // eslint-disable-line
import LoginForm from './components/LoginForm'  // eslint-disable-line
import CreateNewUser from './components/CreateNewUser'  // eslint-disable-line
import UserInfo from './components/UserInfo'  // eslint-disable-line
import { BrowserRouter as Router, Route } from 'react-router-dom'  // eslint-disable-line
import { Navbar, Nav, NavItem } from 'react-bootstrap'  // eslint-disable-line
import { LinkContainer } from 'react-router-bootstrap'  // eslint-disable-line
import { addUser } from './actions/actionCreators'
import LocationService from './services/LocationService'
import Notification from './components/Notification' // eslint-disable-line
import { notify } from './actions/actionCreators'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			toggleLoginForm: true
		}
	}

	componentDidMount() {
		try {
			RouteService.getAllStops().then(response =>
				this.props.store.dispatch({
					type: 'ADD_ALL_STOPS',
					stops: response.data.stops
				}))
		} catch (error) {
			console.log(error)
			this.props.store.dispatch(notify('Stops loading failed!', 'danger'))
		}

		try {
			RouteService.getAlerts().then(response =>
				this.props.store.dispatch({
					type: 'ADD_ALERTS',
					alerts: response.data.alerts
				}))
		} catch (error) {
			console.log(error)
			this.props.store.dispatch(notify('Alerts loading failed!', 'danger'))
		}

		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			this.props.store.dispatch(addUser(user))
			LocationService.setToken(user.token)
		}
	}

	render() {
		return (
			<div className="container">
				<Router>
					<div>
						<div>
							<Navbar inverse collapseOnSelect>
								<Navbar.Header>
									<Navbar.Brand>
      							Route Planner 2018
									</Navbar.Brand>
									<Navbar.Toggle />
								</Navbar.Header>
								<Navbar.Collapse>
									<Nav>
										<LinkContainer to="/">
											<NavItem>Home</NavItem>
										</LinkContainer> &nbsp;

										<LinkContainer to="/lines">
											<NavItem>Line Search</NavItem>
										</LinkContainer> &nbsp;


										<LinkContainer to="/stops">
											<NavItem>Stop Search</NavItem>
										</LinkContainer> &nbsp;


										<LinkContainer to="/alerts">
											<NavItem>Alerts</NavItem>
										</LinkContainer> &nbsp;

										<LinkContainer to="/user">
											<NavItem>Profile</NavItem>
										</LinkContainer> &nbsp;

										<LinkContainer to="/login">
											<NavItem>Login</NavItem>
										</LinkContainer> &nbsp;

										<LinkContainer to="/createuser">
											<NavItem>Sign up</NavItem>
										</LinkContainer> &nbsp;

									</Nav>
								</Navbar.Collapse>
							</Navbar>

						</div>
						<Notification />
						<Route exact path="/" render={() =>
							<div>
								<SearchRoutes store = {this.props.store} />
								<p></p>
								<PrintRoutes />
							</div> }/>
						<Route path="/login" render={() => <LoginForm />} />
						<Route path="/createuser" render={() => <CreateNewUser/>} />
						<Route path="/lines" render={() =>
							<div>
								<SearchSchedulesForLine />
							</div>} />
						<Route path="/stops" render={() =>
							<div>
								<SearchStops />
							</div>} />
						<Route path="/alerts" render={() => <Alerts />} />
						<Route path="/user" render={() => <UserInfo />} />
					</div>
				</Router>
				<p></p>
				<Map store = {this.props.store} />
				<p></p>
				<Markers store = {this.props.store}/>
			</div>
		)
	}
}

export default App
