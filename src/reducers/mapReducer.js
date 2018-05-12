const initialState = {}

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'ADD_ROUTE_ON_MAP':
		return { data: action.data, type: 'route' }
	case 'ADD_POINT_ON_MAP':
		return { data: action.data, type: 'point' }
	case 'ADD_ROUTE_NON_POLYLINE_DATA':
		return { data: action.data, type: 'route_non_polyline' }
	case 'REMOVE_ALL_LAYERS':
		return { data: action.data, type: 'remove_layers' }
	case 'DELETE_ALL_FROM_MAP_REDUCER':
		return initialState
	default:
		return state
	}
}

export default mapReducer