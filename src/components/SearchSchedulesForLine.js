import React from 'react'
import RouteService from '../services/RouteService'
import { convertTimeFromSec } from '../converters/timeConverter'

class SearchSchedulesForLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            line: '',
            patterns: [],
            timetables: [],
            amountOfSchedules: 3
        }
    }

    componentDidMount() {
        RouteService.getAllLines().then(response =>
            this.props.store.dispatch({
                type: 'ADD_ALL_LINES',
                lines: response.data.routes
            })
        )
    }

    lineOnChange = (event) => {
        if(event.target.value === '') {this.setState({timetables: [], patterns: []})}
        this.props.store.dispatch({
            type: 'NEW_FILTER_LINE',
            filter: event.target.value
        })
        this.setState({line: event.target.value})
    }

    handelPatternsChange = (patterns) => {
        this.setState({patterns: patterns}, function() {
            this.getScheduleForLine()
        })
    }

    amountOfSchedulesOnChange = (event) => {
        if(this.state.timetables === []) {this.setState({amountOfSchedules: event.target.value})}
        this.setState({amountOfSchedules: event.target.value}, function() {
            this.getScheduleForLine()
        })
    }

    linesToShow = () => {
        const filter = this.props.store.getState().filter.line.toLowerCase()
        if (filter === '') {
            return []
          }
          const filteredLines = this.props.store.getState().lines.filter(line => line.shortName.toLowerCase().includes(filter) || line.longName.toLowerCase().includes(filter))
          if(filteredLines.length < 50) {
              return filteredLines
          }
          return null
    }

    getScheduleForLine = async () => {
        this.setState({timetables: []})
        this.state.patterns.forEach(pattern => {
            RouteService.getPatternAndTimesBasedOnLine(pattern.code, this.state.amountOfSchedules).then(response => {
                if(response.data.pattern.stops[0].stopTimesForPattern[0] !== undefined) {
                    this.setState((prevState) => {
                        return {timetables: prevState.timetables.concat(response.data.pattern)}
                    })
                }
            })
        })
    }

    drawLineToMap = (timetable) => {
        this.props.store.dispatch({
            type: 'ADD_ROUTE_NON_POLYLINE_DATA',
            data: timetable.geometry
        })
    }

    drawStopOnMap = (stop) => {
        this.props.store.dispatch({
            type: 'ADD_POINT_ON_MAP',
            data: {lat: stop.lat, lon: stop.lon, name: stop.name}
        })
    }

    render() {
        return(
            <div>
                <h3>Search timetables for each stop for the given public transport line</h3>
                <form>
                   <input type= "text" value={this.state.line} onChange={this.lineOnChange}></input>
                   <div> Number of timetables: <input type="number" value={this.state.amountOfSchedules} onChange={this.amountOfSchedulesOnChange} min="1" max="10"></input></div>
                </form>
                <div>
                    {this.linesToShow() === null ? "Too many mathces." : this.linesToShow().map(line => <div key={line.id} onClick={() => this.handelPatternsChange(line.patterns)}> {line.shortName}, {line.longName}</div>)}
                </div>
                <div>
                    {this.state.timetables[0] === undefined ? "" : this.state.timetables.map(timetable => 
                        <div key= {timetable.id}><h4 onClick = {() => this.drawLineToMap(timetable)}>{timetable.name} </h4> {timetable.stops.map(stop => 
                            <div key={stop.id} onClick={() => this.drawStopOnMap(stop)}> <p></p> {stop.name}: Arriving times: {stop.stopTimesForPattern.map(time => 
                                <div key = {time.scheduledArrival}>{convertTimeFromSec(time.scheduledArrival)}</div>)}</div>)}</div>)}
                </div>
            </div>
        )
    }


}

export default SearchSchedulesForLine