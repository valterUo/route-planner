const initialState = []

const lineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ALL_LINES':
      return action.lines
    case 'DELETE_ALL_LINES':
      return initialState
    default:
      return state
  }
}

export default lineReducer