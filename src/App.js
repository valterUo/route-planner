import React from 'react'
import SearchStops from './components/SearchStop'

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
      <SearchStops store = {this.props.store} />
    )
  }
}

export default App
