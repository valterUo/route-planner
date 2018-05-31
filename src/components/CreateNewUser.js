import React from 'react'
import UserService from '../services/UserService'
import { Button, FormGroup, FormControl } from 'react-bootstrap'  // eslint-disable-line
import { connect } from 'react-redux'
import { notify } from '../actions/actionCreators'

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
    		if (newUser.data.username) {
    		this.props.notify('New user "' + this.state.username + '" has been created!', 'success')
    		this.setState({
    			username: '',
    			password: '',
    			name: ''
    			})
    		} else {
    			this.props.notify('Failed to create a new user! Password must be at least 8 characters and username must be unique.', 'danger')
    		}
    	} catch (error) {
    		console.log(error)
    		this.props.notify('Failed to create a new user! Password must be at least 8 characters and username must be unique.', 'danger')
    	}
    }
    render() {
    	return(
    		<div>
    			<h4>Sign up</h4>
    			<form onSubmit = {this.createNewUser}>
    				<FormGroup style={{ width: 350 }}>
    				<div>
                    Name
    					<FormControl name = "name" type="text" value = {this.state.name} onChange = {this.handleEventChanges}/>
    				</div>
    				<div>
                    Userame
    					<FormControl name = "username" type="text" value = {this.state.username} onChange = {this.handleEventChanges}/>
    				</div>
    				<div>
                    Password
    					<FormControl name = "password" type="password" value = {this.state.password} onChange = {this.handleEventChanges}/>
    				</div>
    				<Button type="submit">Sign up</Button>
    				</FormGroup>
    			</form>
    		</div>
    	)
    }
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const mapDispatchToProps = {
	notify
}

const ConnectedCreateNewUser = connect(mapStateToProps, mapDispatchToProps)(CreateNewUser)

export default ConnectedCreateNewUser