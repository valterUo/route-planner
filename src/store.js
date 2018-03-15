import {createStore, combineReducers} from 'redux'
import stopsReducer from './reducers/stopsReducer'
import scheduleReducer from './reducers/scheduleReducer'

const reducer = combineReducers({
    stops: stopsReducer,
    schedules: scheduleReducer
  })

const store = createStore(reducer)

export default store
