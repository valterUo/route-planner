const initialState = {from: '', to: '', line: ''}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_FILTER_FROM':
        const filter = {to: state.to, from: action.filter, line: state.line}
          return filter
        case 'NEW_FILTER_TO':
            const filter1 = {from: state.from, to: action.filter, line: state.line}
          return filter1
          case 'NEW_FILTER_LINE':
          const filter2 = {from: state.from, to: state.to, line: action.filter}
          return filter2
        case 'EMPTY':
          return initialState
        default:
          return state
      }
}

export default filterReducer