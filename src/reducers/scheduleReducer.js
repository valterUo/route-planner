const initialState = []

const convertTime = (time) => {
    var sec_num = parseInt(time, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
    if(hours >= 24) {hours = hours - 24}
    if (hours   < 10) {hours   = "0" + hours}
    if (minutes < 10) {minutes = "0" + minutes}
    if (seconds < 10) {seconds = "0" + seconds}
    return hours + ':' + minutes + ':' + seconds;
}

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SCHEDULE':
    let infoList = []
         action.schedule.stoptimesWithoutPatterns.map(item => 
           infoList = infoList.concat({
                headsign: item.headsign,
                scheduledArrival: convertTime(item.scheduledArrival),
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