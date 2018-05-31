import React from 'react'
import LoginService from '../services/LoginService'
import LocationService from '../services/LocationService'
import { addPointToMap, removeAllLayers, addUser, deleteUser, notify } from '../actions/actionCreators'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl } from 'react-bootstrap'  // eslint-disable-line

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
			this.props.addUser(user)
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
    		if(user.locations.homeLocation !== null){ this.props.addPointToMap(user.locations.homeLocation) }
    		this.props.addUser(user)
    		this.props.notify(user.username + ' logged in!', 'success')
    	} catch (error) {
    		console.log(error)
    		this.props.notify('Invalid username or password', 'danger')
    	}
    }

    handleUsernameChange = (event) => {this.setState({ username: event.target.value })}

    handlePasswordChange = (event) => {this.setState({ password: event.target.value })}

    logout = (event) => {
    	event.preventDefault()
    	window.localStorage.clear()
    	this.props.removeAllLayers()
    	this.props.deleteUser()
    	this.setState({
    		toggleLoginForm: true,
    		name: ''
    	})
    	this.props.notify('You logged out!', 'info')
    }

    render() {
    	if(this.state.toggleLoginForm === false) {
    		return(
    			<div>
    				<div>Logged in user: {this.state.name}</div>
    				<Button onClick = {this.logout}>Log out</Button>
    			</div>
    		)
    	}
    	return(
    		<div>
    			<h4>Log in</h4>
    			<form onSubmit = {this.handleSubmit}>
    				<FormGroup style={{ width: 350 }}>
    				<div>
            Username
    					<FormControl type="text" value = {this.state.username} onChange = {this.handleUsernameChange}/>
    				</div>
    				<div>
            Password
    					<FormControl type= "password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
    				</div>
    				<Button type="submit">Log in</Button>
    				</FormGroup>
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
	removeAllLayers,
	addUser,
	deleteUser,
	notify
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm