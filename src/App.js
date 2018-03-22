import React from 'react'
import SearchStops from './components/SearchStop'
import SearchRoutes from './components/SearchRoutes'
import PrintRoutes from './components/PrintRoutes'
import SearchSchedulesForLine from './components/SearchSchedulesForLine'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
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
      </div>
    )
  }
}

export default App
