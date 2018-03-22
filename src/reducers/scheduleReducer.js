import {convertTimeFromSec} from '../converters/timeConverter'
const initialState = []

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SCHEDULE':
    let infoList = []
         action.schedule.stoptimesWithoutPatterns.map(item => 
           infoList = infoList.concat({
                headsign: item.headsign,
                scheduledArrival: convertTimeFromSec(item.scheduledArrival),
                busNumber: item.trip.route.shortName
                }))
        const schedules = {name: action.schedule.name, info: infoList}
      return schedules
    case 'DELETE_SCHEDULE':
      return initialState
    default:
      return state
  }
}

export default scheduleReducer