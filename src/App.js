import React from 'react'
import RouteService from './services/RouteService'
import SearchStops from './components/SearchStop'
import SearchRoutes from './components/SearchRoutes'
import PrintRoutes from './components/PrintRoutes'
import SearchSchedulesForLine from './components/SearchSchedulesForLine'
import Alerts from './components/Alerts'
import Map from './components/Map'

class App extends React.Component {

  componentDidMount() {
    RouteService.getAllStops().then(response =>
      this.props.store.dispatch({
          type: 'ADD_ALL_STOPS',
          stops: response.data.stops
      }))

      RouteService.getAlerts().then(response =>
      this.props.store.dispatch({
        type: 'ADD_ALERTS',
        alerts: response.data.alerts
      }))
  }

  render() {
    return (
      <div>
      <SearchSchedulesForLine store = {this.props.store} />
      <p></p>
      <SearchStops store = {this.props.store} />
      <p></p>
      <SearchRoutes store = {this.props.store} />
      <p></p>
      <PrintRoutes store = {this.props.store} />
      <p></p>
      <Map/>
      <p></p>
      <Alerts store = {this.props.store}/>
      </div>
    )
  }
}

export default App
