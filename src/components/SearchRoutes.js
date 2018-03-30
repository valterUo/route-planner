import React from 'react'
import RouteService from '../services/RouteService'
import {getToday, getTimefromDate, getDayFromDate} from '../converters/timeConverter'

class SearchRoutes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newStop: '',
            newStop2: '',
            fromPlace: '', 
            fromLat: null, 
            fromLon: null, 
            toPlace: '', 
            toLat: null, 
            toLon: null, 
            date: '', 
            time: '', 
            numItineraries: 4,
            bus: true,
            rail: true,
            subway: true,
            tram: true,
            ferry: true,
            intervalId: 2
        }
      }

      componentDidMount() {
        this.handleInterval()
    }

    handleInterval = () => {
        const interval = setInterval(() => {this.setState({date: getToday(), time: getTimefromDate(new Date())})}, 1000)
        this.setState({intervalId: interval})
    }

      handleStopChange = (event) => {
          this.props.store.dispatch({
              type: 'NEW_FILTER_FROM',
              filter: event.target.value
          })
          this.setState({newStop: event.target.value})
      }

      handleStopChange2 = (event) => {
        this.props.store.dispatch({
            type: 'NEW_FILTER_TO',
            filter: event.target.value
        })
        this.setState({newStop2: event.target.value})
    }

      FromStopsToShow = () => {
          const filter = this.props.store.getState().filter.from.toLowerCase()
        if (filter === '') {
            return []
          }
          const filteredStops = this.props.store.getState().allStops.filter(stop => stop.name.toLowerCase().includes(filter))
          if(filteredStops.length < 20) {
              return filteredStops
          }
          return null
        }

      ToStopsToShow = () => {
        const filter = this.props.store.getState().filter.to.toLowerCase()
        if (filter === '') {
          return []
        }
        const filteredStops = this.props.store.getState().allStops.filter(stop => stop.name.toLowerCase().includes(filter))
        if(filteredStops.length < 20) {
            return filteredStops
        }
        return null
        }

      handleOnclickChangeFrom = (name, lat, lon, id) => {
        this.setState({fromPlace: name, 
        fromLat: lat, 
        fromLon: lon, 
        newStop: name + ' ' + id })
        this.props.store.dispatch({
            type: 'NEW_FILTER_FROM',
            filter: ''
        })
      }

      handleOnclickChangeTo = (name, lat, lon, id) => {
        this.setState({toPlace: name, 
        toLat: lat, 
        toLon: lon, 
        newStop2: name + ' ' + id})
        this.props.store.dispatch({
            type: 'NEW_FILTER_TO',
            filter: ''
        })
      }

      handleEventChanges = (event) => {
        const target = event.target
        if(target.type === 'time') {clearInterval(this.state.intervalId)}
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({[name]: value})
      }

      searchPrevious = () => {
        clearInterval(this.state.intervalId)          
        const timeAndDate = this.props.store.getState().routes[0].legs[0].startTime - 400000
        const d = new Date(timeAndDate)
        console.log(getTimefromDate(d))
        this.setState({time: getTimefromDate(d), date: getDayFromDate(d)}, function () {
            this.searchRoutes()
        })
      }

      searchNext = () => {
        clearInterval(this.state.intervalId)
        const routes = this.props.store.getState().routes
        const legs = routes[routes.length - 1].legs
        const timeAndDate = legs[legs.length - 1].startTime + 300000
        const d = new Date(timeAndDate)
        this.setState({time: getTimefromDate(d), date: getDayFromDate(d)}, function () {
            this.searchRoutes()
        })
      }

      searchRoutes = (event) => {
        if(event !== undefined) {
            event.preventDefault()
            this.handleInterval()
        }
        let modes = 'WALK, '
        if(this.state.bus === true) {modes = modes +  'BUS,'}
        if(this.state.subway === true) {modes = modes +  'SUBWAY,'}
        if(this.state.rail === true) {modes = modes +  'RAIL,'}
        if(this.state.ferry === true) {modes = modes +  'FERRY,'}
        if(this.state.tram === true) {modes = modes +  'TRAM,'}
        const {fromPlace, fromLat, fromLon, toPlace, toLat, toLon, date, time, numItineraries} = this.state
        RouteService.planRoute(fromPlace, fromLat, fromLon, toPlace, toLat, toLon, modes, date, time, numItineraries).then(response => 
            this.props.store.dispatch({
                type: 'ADD_ROUTES',
                routes: response.data.plan.itineraries
            })//.then(() => {console.log( this.props.store.getState().routes[0]) })
        )
            /*this.props.store.dispatch({
            type:'ADD_ROUTE_ON_MAP',
            data: this.props.store.getState().routes[0]
        }) console.log(this.props.store.getState().routes[0]))*/
      }

      render(){
          return(
              <div>
                  <div>
                      <h3>Search routes</h3>
                  <form>
                      <div>The starting point</div>
                      <input value={this.state.newStop} onChange={this.handleStopChange}></input>
                  </form>
                  <div>
                      {this.FromStopsToShow() === null ? 'Too many matches.' : this.FromStopsToShow().map(stop => <div key={stop.gtfsId} onClick = {() => this.handleOnclickChangeFrom(stop.name, stop.lat, stop.lon, stop.gtfsId)}>{stop.name}, {stop.gtfsId}</div>)}
                  </div>
                  </div>
                  <p></p>
                  <div>
                  <form>
                      <div>The arrival point</div>
                      <input value={this.state.newStop2} onChange={this.handleStopChange2}></input>
                  </form>
                  <div>
                      {this.ToStopsToShow() === null ? 'Too many matches.' : this.ToStopsToShow().map(stop => <div key={stop.gtfsId} onClick = {() => this.handleOnclickChangeTo(stop.name, stop.lat, stop.lon, stop.gtfsId)}>{stop.name}, {stop.gtfsId}</div>)}
                  </div>
                  </div>
                  <p></p>
                  <div>
                      <form onSubmit={this.searchRoutes}>
                        <input name="bus" type="checkbox" defaultChecked={this.state.bus} onChange={this.handleEventChanges} />Bus
                        <input name="subway" type="checkbox" defaultChecked={this.state.subway} onChange={this.handleEventChanges} />Metro
                        <input name="tram" type="checkbox" defaultChecked={this.state.tram} onChange={this.handleEventChanges} />Tram
                        <input name="rail" type="checkbox" defaultChecked={this.state.rail} onChange={this.handleEventChanges} />Train
                        <input name="ferry" type="checkbox" defaultChecked={this.state.ferry} onChange={this.handleEventChanges} />Ferry
                        <p></p>
                        <label htmlFor="date"> Date  </label>
                        <input id="date" name="date" type="date" value= {this.state.date} onChange={this.handleEventChanges}/>
                        <p></p>
                        <label htmlFor="time"> Time  </label>
                        <input id="time" name="time" type="time" value= {this.state.time} onChange={this.handleEventChanges}/>
                        <p></p>
                        <label htmlFor="numItineraries"> Number of routes (1–4): </label>
                        <input id="numItineraries" name = "numItineraries" type="number" value = {this.state.numItineraries} onChange={this.handleEventChanges} min="1" max="4"/>
                        <p></p>
                        <input type="submit" value="Search"/>
                      </form>
                  </div>
                  <p style ={{visibility: this.props.store.getState().routes[0] === undefined ? 'hidden' : 'visible'}}>
                      <input type="button" value="Previous" onClick={this.searchPrevious}/> 
                      <input type="button" value="Next" onClick={this.searchNext}/>
                  </p>
              </div>
          )
      }
    }

export default SearchRoutes