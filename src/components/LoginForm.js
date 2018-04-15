import React from 'react'
import LoginService from '../services/LoginService'
import LocationService from '../services/LocationService'

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
    		const result = await LoginService.login(this.state.username, this.state.password)
    		this.setState({
    			username: '',
    			password: '',
    			toggleLoginForm: false,
    			name: result.name
    		})
    		window.localStorage.setItem('loggedUser', JSON.stringify(result))
    		LocationService.setToken(result.token)
    	} catch (error) {
    		console.log(error)
    	}
    }

    handleUsernameChange = (event) => {this.setState({ username: event.target.value })}

    handlePasswordChange = (event) => {this.setState({ password: event.target.value })}

    logout = (event) => {
    	event.preventDefault()
    	window.localStorage.clear()
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

export default LoginForm