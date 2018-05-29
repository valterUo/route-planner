import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap' // eslint-disable-line

class Notification extends React.Component {
	render() {
		const notification = this.props.notification
		if (notification.class === 'empty') {
			return (
				<div></div>
			)
		} else {
			return(
				<div>
					<Alert bsStyle = {notification.class}>
						{notification.notification}
					</Alert>
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification