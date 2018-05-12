import React from 'react'
import LoginService from '../services/LoginService'
import LocationService from '../services/LocationService'
import { addPointToMap, deleteAllFromMap } from '../actions/actionCreators'
import { connect } from 'react-redux'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			toggleLoginForm: true,
			name: ''
		}
	}
	componentDidMount() {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			this.setState({
				name: user.name
			})
			this.setState({ toggleLoginForm: false })
			LocationService.setToken(user.token)
		}
	}

    handleSubmit = async (event) => {
    	event.preventDefault()
    	try{
    		const user = await LoginService.login(this.state.username, this.state.password)
    		this.setState({
    			username: '',
    			password: '',
    			toggleLoginForm: false,
    			name: user.name
    		})
    		window.localStorage.setItem('loggedUser', JSON.stringify(user))
    		LocationService.setToken(user.token)
    		const location = await LocationService.getLocation(user.locations)
    		this.props.addPointToMap(location.homeLocation)
    	} catch (error) {
    		console.log(error)
    	}
    }

    handleUsernameChange = (event) => {this.setState({ username: event.target.value })}

    handlePasswordChange = (event) => {this.setState({ password: event.target.value })}

    logout = (event) => {
    	event.preventDefault()
    	window.localStorage.clear()
    	this.props.deleteAllFromMap()
    	this.setState({
    		toggleLoginForm: true
    	})
    }

    render() {
    	if(this.state.toggleLoginForm === false) {
    		return(
    			<div>
    				<div>Logged in user: {this.state.name}</div>
    				<button onClick = {this.logout}>Log out</button>
    			</div>
    		)
    	}
    	return(
    		<div>
    			<h4>Log in</h4>
    			<form onSubmit = {this.handleSubmit}>
    				<div>
            Username
    					<input type="text" value = {this.state.username} onChange = {this.handleUsernameChange}/>
    				</div>
    				<div>
            Password
    					<input type= "password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
    				</div>
    				<button type="submit">Log in</button>
    			</form>
    		</div>
    	)
    }
}

const mapStateToProps = () => {
	return{}
}

const mapDispatchToProps = {
	addPointToMap,
	deleteAllFromMap
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm