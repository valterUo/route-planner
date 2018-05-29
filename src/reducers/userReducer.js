const initialState = {}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'ADD_USER':
		return action.user
	case 'DELETE_USER':
		return initialState
	default:
		return state
	}
}

export default userReducer