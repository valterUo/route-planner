import React from 'react'
import {convertTime} from '../reducers/scheduleReducer'

class PrintRoutes extends React.Component {
    

    printRoutes() {
        console.log(this.props.store.getState().routes)
        return(
            <div>
            {this.props.store.getState().routes.map(route => 
            <div key = {route.id}>
                <div>----------------------------------</div>
                <p>Walking distance: {route.walkDistance.toFixed(1)}. Total traveling time: {convertTime(route.duration)}</p>
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
                            <th>{new Date(leg.startTime).toString()}</th>
                            <th>{leg.mode}</th>
                            <th>{leg.route===null ? 'Walking' : leg.route.shortName}</th>
                            <th>{leg.to.name}</th>
                            <th>{convertTime(Math.floor((leg.endTime - leg.startTime)/1000))}</th>
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