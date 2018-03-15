const initialState = []

const stopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STOPS':
      return action.stops
    case 'DELETE_STOPS':
      return initialState
    default:
      return state
  }
}

export default stopsReducer