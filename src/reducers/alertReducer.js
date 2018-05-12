const initialState = []

const alertReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'ADD_ALERTS':
		return action.alerts
	case 'DELETE_ALERTS':
		return initialState
	default:
		return state
	}
}

export default alertReducer