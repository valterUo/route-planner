import React from 'react'
import RouteService from '../services/RouteService'

class SearchStops extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newStop: '',
            numberOfTimes: 5,
            stop: ''
        }
      }

    searchStops = () => {
      const filter = this.props.store.getState().filter.stop.toLowerCase()
      if (filter === '') {
          return []
        }
        const filteredStops = this.props.store.getState().allStops.filter(stop => stop.name.toLowerCase().includes(filter) || stop.gtfsId.toLowerCase().includes(filter))
        if(filteredStops.length < 20) {
            return filteredStops
        }
        return null
      }
    
     handleStopChange = (event) => {
        this.setState({newStop: event.target.value})
        this.props.store.dispatch({
          type: 'NEW_FILTER_STOP',
          filter: event.target.value
        })
      }
    
     showNextBusses = (stop) => {
      this.setState({stop: stop})
      RouteService.getBussesByStopID(stop.gtfsId, this.state.numberOfTimes).then(response =>
        this.props.store.dispatch({
          type: 'ADD_SCHEDULE',
          schedule: response.data.stop
        }))
        this.showStopOnMap(stop)
     }

     showStopOnMap = (stop) => {
       this.props.store.dispatch({
         type: 'ADD_POINT_ON_MAP',
         data: stop
       })
     }

     numberOfTimesChange = (event) => {
       if(this.state.stop === '') {this.setState({ numberOfTimes: event.target.value })}
       this.setState({
         numberOfTimes: event.target.value
       }, function() {
         this.showNextBusses(this.state.stop)
       })
     }
    
     render() {
      return (
          <div>
            <h3>Search next public transport for the given stop</h3>
            <form>
              <input value={this.state.newStop} onChange={this.handleStopChange}></input>
              <div> Number of timetables: <input type="number" value={this.state.numberOfTimes} onChange={this.numberOfTimesChange} min="1" max="10"></input></div>
            </form>
            {this.searchStops() === null ? "Too many mathes." : this.searchStops().map(stop => <div key = {stop.gtfsId} onClick={() => this.showNextBusses(stop)}>{stop.name}, {stop.gtfsId}</div>)}
          <div></div>
          <h4>{this.props.store.getState().schedules === undefined ? '' : this.props.store.getState().schedules.name}</h4>
          <div>
          {this.props.store.getState().schedules.info === undefined ? '' : this.props.store.getState().schedules.info.map(item => <div key={item.scheduledArrival + item.busNumber}>{item.headsign === null ? 'The last stop' : item.headsign}, {item.scheduledArrival}, {item.busNumber}</div>)}
          </div>
        </div>      
      )
    }
}

export default SearchStops