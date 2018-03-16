const initialState = []

const allStopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ALL_STOPS':
      return action.stops
    case 'DELETE_ALL_STOPS':
      return initialState
    default:
      return state
  }
}

export default allStopsReducer