const initialState = { notification: '', class: 'empty' }

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'NEW_NOTIFICATION':
		return { notification: action.notification, class: action.class }
	case 'DELETE_NOTIFICATION':
		return initialState
	default:
		return state
	}
}

export default notificationReducer