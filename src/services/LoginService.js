import axios from 'axios'
const baseUrl = '/login'

const login = async (username, password) => {
	try {
		const response = await axios.post(baseUrl, {
			username: username,
			password: password
		})
		return response.data
	} catch(error) {
		console.log(error)
	}
}

export default { login }