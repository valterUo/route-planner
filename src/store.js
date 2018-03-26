import {createStore, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import scheduleReducer from './reducers/scheduleReducer'
import allStopsReducer from './reducers/allStopsReducer'
import filterReducer from './reducers/filterReducer'
import routeReducer from './reducers/routeReducer'
import lineReducer from './reducers/lineReducer'
import alertReducer from './reducers/alertReducer'

const reducer = combineReducers({
    schedules: scheduleReducer,
    allStops: allStopsReducer,
    filter: filterReducer,
    routes: routeReducer,
    lines: lineReducer,
    alerts: alertReducer
  })

const store = createStore(reducer, composeWithDevTools())

export default store
