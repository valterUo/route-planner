import axios from 'axios'
const baseUrl = '/users'

const createUser = async (newUser) => {
	try {
		const user = await axios.post(baseUrl, newUser)
		return user
	} catch (error) {
		return error
	}
}

const getUser = async (userId) => {
	const user = await axios.get(baseUrl + '/' + userId)
	console.log(user)
	return user
}

export default { createUser, getUser }