const initialState = {
    fromPlace: '', 
    fromLat: null, 
    fromLon: null, 
    toPlace: '', 
    toLat: null, 
    toLon: null,
    readyToSearch: false}

const searchRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_DATA_FROM':
      var readyToSearch = false
      if(state.toPlace !== '') {readyToSearch = true}
      return {fromPlace: action.data.fromPlace, 
      fromLat: action.data.fromLat, 
      fromLon: action.data.fromLon, 
      toPlace: state.toPlace, 
      toLat: state.toLat, 
      toLon: state.toLon,
      readyToSearch: readyToSearch}
    case 'ADD_SEARCH_DATA_TO':
      if(state.fromPlace !== '') {readyToSearch = true}
      return {fromPlace: state.fromPlace, 
      fromLat: state.fromLat, 
      fromLon: state.fromLon, 
      toPlace: action.data.toPlace, 
      toLat: action.data.toLat, 
      toLon: action.data.toLon,
      readyToSearch: readyToSearch}
    case 'READY_TO_SEARCH':
      return {...state, readyToSearch: false}
    case 'DELETE_SEARCH_DATA':
      return initialState
    default:
      return state
  }
}

export default searchRouteReducer