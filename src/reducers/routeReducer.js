const initialState = []

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROUTES':
      const routes2 = action.routes.map(route => route = {id: Math.floor((Math.random() * 100000)), walkDistance: route.walkDistance, duration: route.duration, legs: route.legs})
      return routes2
    case 'DELETE_ROUTES':
      return initialState
    default:
      return state
  }
}

export default routeReducer