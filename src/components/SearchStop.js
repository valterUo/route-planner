import React from 'react'
import RouteService from '../services/RouteService'

class SearchStops extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newStop: ''
        }
      }

    searchStops = () => {
      const filter = this.props.store.getState().filter.stop.toLowerCase()
      if (filter === '') {
          return []
        }
        const filteredStops = this.props.store.getState().allStops.filter(stop => stop.name.toLowerCase().includes(filter))
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
    
     showNextBusses = (gtfsId) => {
      RouteService.getBussesByStopID(gtfsId).then(response =>
        this.props.store.dispatch({
          type: 'ADD_SCHEDULE',
          schedule: response.data.stop
        }))
     }
    
     render() {
      return (
          <div>
            <p>Search next busses for the given stop:</p>
            <form>
              <input value={this.state.newStop} onChange={this.handleStopChange}></input>
            </form>
            {this.searchStops() === null ? "Too many mathes." : this.searchStops().map(stop => <div key = {stop.gtfsId} onClick={() => this.showNextBusses(stop.gtfsId)}>{stop.name}, {stop.gtfsId}</div>)}
          <div></div>
          <h4>{this.props.store.getState().schedules === undefined ? '' : this.props.store.getState().schedules.name}</h4>
          <div>
          {this.props.store.getState().schedules.info === undefined ? '' : this.props.store.getState().schedules.info.map(item => <div key={item.scheduledArrival}>{item.headsign === null ? 'The last stop' : item.headsign}, {item.scheduledArrival}, {item.busNumber}</div>)}
          </div>
        </div>      
      )
    }
}

export default SearchStops