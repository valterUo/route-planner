import axios from 'axios'
const baseUrl = '/login'

const login = async (username, password) => {
	try {
		const user = await axios.post(baseUrl, {
			username: username,
			password: password
		})
		return user.data
	} catch(error) {
		console.log(error)
	}
}

export default { login }