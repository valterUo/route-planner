import React from 'react'

class Alerts extends React.Component {
    render() {
        return(
            <div>
            <h3>Alerts:</h3>
            <div>
            {this.props.store.getState().alerts === undefined ? "No alerts." : this.props.store.getState().alerts.map(alert => <p key={alert.id}>{alert.alertDescriptionText}</p>)}
            </div>
            </div>
        )
    }
}

export default Alerts