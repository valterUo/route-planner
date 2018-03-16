import React from 'react'
import RouteService from '../services/RouteService'

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
            modes: '', 
            date: '', 
            time: '', 
            numItineraries: 4,
            walk: true,
            bus: true,
            rail: true,
            subway: true,
            tram: true,
            ferry: true
        }
      }

      componentDidMount() {
        this.setState({date: this.getToday(), time: this.getThisTime()})
        RouteService.getAllStops().then(response =>
        this.props.store.dispatch({
            type: 'ADD_ALL_STOPS',
            stops: response.data.stops
        }))
    }

      getToday = () => {
        const d = new Date()
        let n = d.getMonth() + 1
        if(n < 10){ n = "0" + n }
        const a = d.getFullYear()
        let e = d.getDate()
        if(e < 10){ e = "0" + e }
        return a + "-" + n + "-" + e
      }

      getThisTime = () => {
        const today = new Date();
        let h = today.getHours();
        if(h < 10) {h = "0" + h}
        let m = today.getMinutes();
        if(m < 10) {m = "0" + m}
        let s = today.getSeconds();
        if(s < 10) {s = "0" + s}
        return h + ":" + m + ":" + s
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
            return null
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
          return null
        }
        const filteredStops = this.props.store.getState().allStops.filter(stop => stop.name.toLowerCase().includes(filter))
        if(filteredStops.length < 20) {
            return filteredStops
        }
        return null
    }

      handleOnclickChangeFrom = (name, lat, lon) => {
        this.setState({fromPlace: name, 
        fromLat: lat, 
        fromLon: lon, })
      }

      handleOnclickChangeTo = (name, lat, lon) => {
        this.setState({toPlace: name, 
        toLat: lat, 
        toLon: lon, })
      }

      handleEventChanges = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({[name]: value})
      }

      searchRoutes = (event) => {
        event.preventDefault()
        let modes = ''
        if(this.state.walk === true) {modes = modes + 'WALK,'}
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
        }))
      }

      render(){
          return(
              <div>
                  <div>
                  <form>
                      <div>The starting point</div>
                      <input value={this.state.newStop} onChange={this.handleStopChange}></input>
                  </form>
                  <div>
                      {this.FromStopsToShow() === null ? 'Too many matches.' : this.FromStopsToShow().map(stop => <div key={stop.gtfsId} onClick = {() => this.handleOnclickChangeFrom(stop.name, stop.lat, stop.lon)}>{stop.name}</div>)}
                  </div>
                  </div>
                  <p></p>
                  <div>
                  <form>
                      <div>The arrival point</div>
                      <input value={this.state.newStop2} onChange={this.handleStopChange2}></input>
                  </form>
                  <div>
                      {this.ToStopsToShow() === null ? 'Too many matches.' : this.ToStopsToShow().map(stop => <div key={stop.gtfsId} onClick = {() => this.handleOnclickChangeTo(stop.name, stop.lat, stop.lon)}>{stop.name}</div>)}
                  </div>
                  </div>
                  <p></p>
                  <div>
                      <form onSubmit={this.searchRoutes}>
                        <input name="walk" type="checkbox" defaultChecked={this.state.walk} onChange={this.handleEventChanges} />Walk
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
                        <label htmlFor="numItineraries">Number of routes (1–4): </label>
                        <input id="numItineraries" name = "numItineraries" type="number" value = {this.state.numItineraries} onChange={this.handleEventChanges} min="1" max="4"/>
                        <p></p>
                        <input type="submit" value="Search"/>
                      </form>
                  </div>
              </div>
          )
      }
    }

export default SearchRoutes