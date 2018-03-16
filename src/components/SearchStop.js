import React from 'react'
import RouteService from '../services/RouteService'

class SearchStops extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newStop: ''
        }
      }

    searchStops = (event) => {
        event.preventDefault()
        this.props.store.dispatch({
          type: 'DELETE_SCHEDULE'
        })
        RouteService.getStopsByName(this.state.newStop).then(response => 
            this.props.store.dispatch({
            type: 'ADD_STOPS',
            stops: response.data.stops
          }))
      }
    
     handleStopChange = (event) => {
        this.setState({newStop: event.target.value})
      }
    
     showNextBusses = (event) => {
      event.preventDefault()
      RouteService.getBussesByStopID(event.target.value).then(response =>
        this.props.store.dispatch({
          type: 'ADD_SCHEDULE',
          schedule: response.data.stop
        }))
     }
    
     render() {
    if(this.props.store.getState().schedules.name === undefined) {
        return (
          <div>
          <p>Search next busses for the given stop:</p>
          <div>
            <form onSubmit={this.searchStops}>
            <input value={this.state.newStop} onChange={this.handleStopChange}/>
            <button type="submit">Search</button>
            </form>
          </div>
          <div>
            {this.props.store.getState().stops.map(stop => <div key = {stop.id}> <div>{stop.name}, {stop.gtfsId}</div><button value = {stop.gtfsId} onClick={this.showNextBusses}>Info</button></div>)}
          </div>
          </div>
        )
      }
      return (
        <div>
        <p>Search next busses for the given stop:</p>
        <div>
          <form onSubmit={this.searchStops}>
          <input value={this.state.newStop} onChange={this.handleStopChange}/>
          <button type="submit">Search</button>
          </form>
        </div>
        <div>
          {this.props.store.getState().stops.map(stop => <div key = {stop.id}> <div>{stop.name}, {stop.gtfsId}</div><button value = {stop.gtfsId} onClick={this.showNextBusses}>Info</button></div>)}
        </div>
        <div></div>
        <div>{this.props.store.getState().schedules.name}</div>
        <div>
          {this.props.store.getState().schedules.info.map(item => <div key={item.scheduledArrival}>{item.headsign === null ? 'The last stop' : item.headsign}, {item.scheduledArrival}, {item.busNumber}</div>)}
        </div>
        </div>
      )
    }
}

export default SearchStops