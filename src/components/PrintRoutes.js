import React from 'react'
import {getTimefromDateWithoutSec, convertTimeFromSec} from '../converters/timeConverter'

class PrintRoutes extends React.Component {

    printRoutes() {
        return(
            <div>
            {this.props.store.getState().routes.map(route => 
            <div key = {route.id}>
                <div>----------------------------------</div>
                <p>Walking distance: {route.walkDistance.toFixed(1)}. Total traveling time: {convertTimeFromSec(route.duration)}</p>
                <table>
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
                </table>
                <div>----------------------------------</div>
            </div>)}
        </div>
        )
    }

    render() {
        return(
            <div>
                {this.props.store.getState().routes.length === 0 ? "Search for routes." : this.printRoutes()}
            </div>
        )
    }
}

export default PrintRoutes