import axios from 'axios'
const baseUrl = '/locations'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

export default { setToken }