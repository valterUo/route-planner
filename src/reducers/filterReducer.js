const initialState = {from: '', to: ''}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_FILTER_FROM':
        const filter = {to: state.to, from: action.filter}
          return filter
        case 'NEW_FILTER_TO':
            const filter1 = {from: state.from, to: action.filter}
          return filter1
        case 'EMPTY':
          return initialState
        default:
          return state
      }
}

export default filterReducer