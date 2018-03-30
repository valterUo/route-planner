import {createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import scheduleReducer from './reducers/scheduleReducer'
import allStopsReducer from './reducers/allStopsReducer'
import filterReducer from './reducers/filterReducer'
import routeReducer from './reducers/routeReducer'
import lineReducer from './reducers/lineReducer'
import alertReducer from './reducers/alertReducer'
import mapReducer from './reducers/mapReducer'

const reducer = combineReducers({
    schedules: scheduleReducer,
    allStops: allStopsReducer,
    filter: filterReducer,
    routes: routeReducer,
    lines: lineReducer,
    alerts: alertReducer,
    map: mapReducer
  })

const store = createStore(reducer, composeWithDevTools())

export default store
