import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'  // eslint-disable-line

class UserInfo extends React.Component {

	render() {
		const user = this.props.user
		if(user.locations !== undefined) {
			return (
				<div>
					<h2>{user.username}'s profile</h2>
					<p><b>Username:</b> {user.username}</p>
					<p><b>Name:</b> {user.name}</p>
					<p>{user.locations.homeLocation !== null ? user.locations.homeLocation.name : ''}</p>
					<div>
						<Table responsive striped bordered condensed hover>
							<tbody>
								<tr>
									<td><b>Favourite locations: </b></td>
									{user.locations.favouriteLocations.map(location =>
										<td key={location.lat}>{location.name}</td>)}
								</tr>
								<tr>
									<td><b>Favourite stops: </b></td>
									{user.locations.favouriteStops.map(stop =>
										<td key= {stop.gtfsId}>{stop.name} {stop.gtfsId}</td>)}
								</tr>
								<tr>
									<td><b>Favourite lines: </b></td>
									{user.locations.favouriteLines.map(line =>
										<td key = {line.id}>{line.shortName} {line.longName}</td>)}
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
			)
		} else {
			return (
				<div><p>No user logged in.</p></div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
}

const ConnectedUserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfo)

export default ConnectedUserInfo