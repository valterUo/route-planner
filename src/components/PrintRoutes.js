import React from 'react'
import { getTimefromDateWithoutSec, convertTimeFromSec } from '../converters/timeConverter'
import { connect } from 'react-redux'
import { addRouteOnMap } from '../actions/actionCreators'
import { Table } from 'react-bootstrap' // eslint-disable-line

class PrintRoutes extends React.Component {

	printRoutes() {
		return(
			<div>
				{this.props.routes.map(route =>
					<div key = {route.id} onClick={() => this.props.addRouteOnMap(route)}>
						<p>Walking distance: {route.walkDistance.toFixed(1)}. Total traveling time: {convertTimeFromSec(route.duration)}</p>
						<Table>
							<tbody>
								<tr>
									<th>Starting point</th>
									<th>Starting time</th>
									<th>Type</th>
									<th>Number of transport</th>
									<th>Destination</th>
									<th>Duration</th>
								</tr>
								{route.legs.map(leg =>
									<tr key={leg.startTime}>
										<th>{leg.from.name}</th>
										<th>{getTimefromDateWithoutSec(new Date(leg.startTime))}</th>
										<th>{leg.mode}</th>
										<th>{leg.route===null ? '' : leg.route.shortName}</th>
										<th>{leg.to.name}</th>
										<th>{convertTimeFromSec(Math.floor((leg.endTime - leg.startTime)/1000))}</th>
									</tr>)}
							</tbody>
						</Table>
					</div>)}
			</div>
		)
	}

	render() {
		return(
			<div>
				{this.props.routes.length === 0 ? '' : this.printRoutes()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		routes: state.routes
	}
}

const mapDispatchToProps = {
	addRouteOnMap
}

const ConnectedPrintRoutes = connect(mapStateToProps, mapDispatchToProps)(PrintRoutes)

export default ConnectedPrintRoutes