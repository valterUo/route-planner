import axios from 'axios'
const baseUrl = '/locations'
let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getLocation = async (id) => {
	try {
		const location = await axios.get(baseUrl + '/' + id)
		return location.data
	} catch (error) {
		console.log(error)
	}
}

const addPointToFavourites = async (point) => {
	console.log(token)
	const config = {
		headers: { 'Authorization': token }
	  }

	  const newLocation = {
		homeLocation: null,
		favouriteLocations: point,
		favouriteStops: null,
		favouriteLines: null,
	  }
	  await axios.post(baseUrl, newLocation, config)
}

const makeHomeLocation = async (point) => {
	console.log(token)
	const config = {
		headers: { 'Authorization': token }
	  }

	  const newLocation = {
		homeLocation: point,
		favouriteLocations: null,
		favouriteStops: null,
		favouriteLines: null,
	  }
	  await axios.post(baseUrl, newLocation, config)
}

const addLinetoFavourites = async (line) => {
	const config = {
		headers: { 'Authorization': token }
	  }

	  const newLocation = {
		homeLocation: null,
		favouriteLocations: null,
		favouriteStops: null,
		favouriteLines: line,
	  }
	  await axios.post(baseUrl, newLocation, config)
}

const addStoptoFavourites = async (stop) => {
	const config = {
		headers: { 'Authorization': token }
	  }

	  const newLocation = {
		homeLocation: null,
		favouriteLocations: null,
		favouriteStops: stop,
		favouriteLines: null,
	  }
	await axios.post(baseUrl, newLocation, config)
}

export default { setToken, makeHomeLocation, addStoptoFavourites,  addLinetoFavourites, addPointToFavourites, getLocation }