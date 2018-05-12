const addPointToMap = (data) => {
	return {
		type: 'ADD_POINT_ON_MAP',
		data: data
	}
}

const deleteAllFromMap = () => {
	return {
		type: 'DELETE_ALL_FROM_MAP_REDUCER'
	}
}

const addSearchDataTo = (element) => {
	return {
		type: 'ADD_SEARCH_DATA_TO',
		data: { toLat: element.lat, toLon: element.lon, toPlace: element.name }
	}

}

const addSearchDataFrom = (element) => {
	return {
		type: 'ADD_SEARCH_DATA_FROM',
		data: { fromLat: element.lat, fromLon: element.lon, fromPlace: element.name }
	}
}

const removeAllLayers = () => {
	return {
		type: 'REMOVE_ALL_LAYERS'
	}
}

const addRouteOnMap = (route) => {
	return {
		type:'ADD_ROUTE_ON_MAP',
		data: route
	}
}

const newFilterTo = (value) => {
	return {
		type: 'NEW_FILTER_TO',
		filter: value
	}
}

const newFilterFrom = (value) => {
	return {
		type: 'NEW_FILTER_FROM',
		filter: value
	}
}

const addRoutes = (itineraries) => {
	return {
		type: 'ADD_ROUTES',
		routes: itineraries
	}
}

const readyToSearch = () => {
	return {
		type: 'READY_TO_SEARCH'
	}
}

const addRouteNonPolyline = (data) => {
	return {
		type: 'ADD_ROUTE_NON_POLYLINE_DATA',
		data: data
	}
}

const addAllLines = (lines) => {
	return {
		type: 'ADD_ALL_LINES',
		lines: lines
	}
}

const newFilterLine = (filter) => {
	return {
		type: 'NEW_FILTER_LINE',
		filter: filter
	}
}

const newFilterStop = (filter) => {
	return {
		type: 'NEW_FILTER_STOP',
		filter: filter
	}
}

const addSchedule = (schedule) => {
	return {
		type: 'ADD_SCHEDULE',
		schedule: schedule
	}
}

export { addPointToMap,
	deleteAllFromMap,
	addSearchDataFrom,
	addSearchDataTo,
	removeAllLayers,
	addRouteOnMap,
	newFilterTo,
	newFilterFrom,
	readyToSearch,
	addRoutes,
	addRouteNonPolyline,
	addAllLines,
	newFilterLine,
	newFilterStop,
	addSchedule }