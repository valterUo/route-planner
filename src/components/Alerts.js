import React from 'react'
import { connect } from 'react-redux'

class Alerts extends React.Component {
	render() {
		const alerts = this.props.alerts
		return(
			<div>
				<h3>Alerts: </h3>
				<div>
					{(alerts === undefined || alerts[0] === undefined) ? 'Surprise, everything seems to be fine.\n' : alerts.map(alert => <p key={alert.id}>{alert.alertDescriptionText}</p>)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		alerts: state.alerts
	}
}

const ConnectedAlerts = connect(mapStateToProps)(Alerts)

export default ConnectedAlerts