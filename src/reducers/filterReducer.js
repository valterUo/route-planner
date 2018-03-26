const initialState = {from: '', to: '', line: '', stop: ''}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_FILTER_FROM':
        const filter = {to: state.to, from: action.filter, line: state.line, stop: state.stop}
          return filter
        case 'NEW_FILTER_TO':
            const filter1 = {from: state.from, to: action.filter, line: state.line, stop: state.stop}
          return filter1
        case 'NEW_FILTER_LINE':
          const filter2 = {from: state.from, to: state.to, line: action.filter, stop: state.stop}
          return filter2
        case 'NEW_FILTER_STOP':
          const filter3 = {from: state.from, to: state.to, line: state.line, stop: action.filter}
          return filter3
        case 'EMPTY':
          return initialState
        default:
          return state
      }
}

export default filterReducer