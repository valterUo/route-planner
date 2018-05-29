import React from 'react'
import UserService from '../services/UserService'
import { Button } from 'react-bootstrap'  // eslint-disable-line

class CreateNewUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			name: ''
		}
	}

    handleEventChanges = (event) => {
    	const name = event.target.name
      	this.setState({ [name]: event.target.value })
    }
    createNewUser = async (event) => {
    	event.preventDefault()
    	try {
    		const newUser = await UserService.createUser({
    			username: this.state.username,
    			password: this.state.password,
    			name: this.state.name
    		})
    		this.setState({
    			username: '',
    			password: '',
    			name: ''
    		})
    		console.log(newUser)
    	} catch (error) {
    		console.log(error)
    	}
    }
    render() {
    	return(
    		<div>
    			<h4>Create new user</h4>
    			<form onSubmit = {this.createNewUser}>
    				<div>
                    Name
    					<input name = "name" type="text" value = {this.state.name} onChange = {this.handleEventChanges}/>
    				</div>
    				<div>
                    Userame
    					<input name = "username" type="text" value = {this.state.username} onChange = {this.handleEventChanges}/>
    				</div>
    				<div>
                    Password
    					<input name = "password" type="password" value = {this.state.password} onChange = {this.handleEventChanges}/>
    				</div>
    				<Button type="submit">Sign up</Button>
    			</form>
    		</div>
    	)
    }
}

export default CreateNewUser