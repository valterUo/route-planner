const initialState = {}

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROUTE_ON_MAP':
        console.log('dataaaa tallentuu mapreduceriin')
      return {data: action.data, type: 'route'}
    case 'ADD_POINT_ON_MAP':
      return {data: action.data, type: 'point'}
    case 'DELETE_ALL':
      return initialState
    default:
      return state
  }
}

export default mapReducer