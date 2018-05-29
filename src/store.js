import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import scheduleReducer from './reducers/scheduleReducer'
import allStopsReducer from './reducers/allStopsReducer'
import filterReducer from './reducers/filterReducer'
import routeReducer from './reducers/routeReducer'
import lineReducer from './reducers/lineReducer'
import alertReducer from './reducers/alertReducer'
import mapReducer from './reducers/mapReducer'
import searchRouteReducer from './reducers/searchRouteReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
	schedules: scheduleReducer,
	allStops: allStopsReducer,
	filter: filterReducer,
	routes: routeReducer,
	lines: lineReducer,
	alerts: alertReducer,
	map: mapReducer,
	searchData: searchRouteReducer,
	user: userReducer,
	notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(), applyMiddleware(thunk))

export default store
