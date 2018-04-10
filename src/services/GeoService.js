import axios from 'axios'
const baseUrl = 'http://api.digitransit.fi/geocoding/v1/reverse'

const getDestination = async (lat, lon, size) => {
    const url = baseUrl + `?point.lat=${lat}&point.lon=${lon}&size=${size}`
    const response = await axios.get(url)
    return response.data
}

export default { getDestination }