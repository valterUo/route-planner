import React from 'react'
import RouteService from '../services/RouteService'
import { convertTimeFromSec } from '../converters/timeConverter'

class SearchSchedulesForLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            line: '',
            timetables: []
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
        this.props.store.dispatch({
            type: 'NEW_FILTER_LINE',
            filter: event.target.value
        })
        this.setState({line: event.target.value})
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

    getScheduleForLine = (patterns) => {
        this.setState({timetables: []})
        patterns.forEach(pattern => 
        RouteService.getPatternAndTimesBasedOnLine(pattern.code, 3).then(response =>
            this.setState((prevState) => {
               return {timetables: prevState.timetables.concat(response.data.pattern)}
            }, function() {
                console.table(this.state.timetables)
            })
        ))
    }

    render() {
        return(
            <div>
                <p>Search timetables for given line:</p>
                <form>
                   <input type= "text" value={this.state.line} onChange={this.lineOnChange}></input> 
                </form>
                <div>
                    {this.linesToShow() === null ? "Too many mathces." : this.linesToShow().map(line => <div key={line.id} onClick={() => this.getScheduleForLine(line.patterns)}> {line.shortName}, {line.longName}</div>)}
                </div>
                <div>
                    {this.state.timetables === [] ? "No timetables." : this.state.timetables.map(timetable => 
                        <div key= {timetable.id}><h4>{timetable.name}</h4> {timetable.stops.map(stop => 
                            <div key={stop.id}> <p></p> {stop.name}: Arriving times: {stop.stopTimesForPattern.map(time => 
                                <div key = {time.scheduledArrival}>{convertTimeFromSec(time.scheduledArrival)}</div>)}</div>)}</div>)}
                </div>
            </div>
        )
    }


}

export default SearchSchedulesForLine