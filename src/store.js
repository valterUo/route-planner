import {createStore, combineReducers} from 'redux'
import stopsReducer from './reducers/stopsReducer'
import scheduleReducer from './reducers/scheduleReducer'
import allStopsReducer from './reducers/allStopsReducer'
import filterReducer from './reducers/filterReducer'
import routeReducer from './reducers/routeReducer'

const reducer = combineReducers({
    stops: stopsReducer,
    schedules: scheduleReducer,
    allStops: allStopsReducer,
    filter: filterReducer,
    routes: routeReducer
  })

const store = createStore(reducer)

export default store
