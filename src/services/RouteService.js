import axios from 'axios'
const baseUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

const getAllStops = async () => {
    const fullQuery = {
        query: "{stops{gtfsId, name, lat, lon}}"
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const getStopById = async (id) => {
    const fullQuery = {
        query: "query StopByID($input: String!){stop(id: $input){name}}",
        variables: {"input": id}
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const getStopsByName = async (name) => {
    const fullQuery = {
        query: "query getStopsByName($input: String!){stops(name: $input){id, gtfsId, name, lon, lat}}",
        variables: {"input": name}
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const getBussesByStopID = async (id) => {
    const fullQuery = {
        query: "query getBussesByStopID($input: String!){stop(id: $input){name, stoptimesWithoutPatterns {scheduledArrival, headsign, trip {id, route {id, shortName}}}}}",
        variables: {"input": id}
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const planRoute = async (fromPlace, fromLat, fromLon, toPlace, toLat, toLon, modes, date, time, numItineraries) => {
    const fullQuery = {
        query: "query planRoute($fromPlace: String!, $from: InputCoordinates!, $toPlace: String!, $to: InputCoordinates!, $date: String!, $time: String!, $numItineraries: Int!, $modes: String!, $walkReluctance: Float!, $walkBoardCost: Int!, $minTransferTime: Int!, $walkSpeed: Float!){plan(fromPlace: $fromPlace, from: $from, toPlace: $toPlace, to: $to, modes: $modes, date: $date, time: $time, numItineraries: $numItineraries, walkReluctance: $walkReluctance, walkBoardCost: $walkBoardCost, minTransferTime: $minTransferTime, walkSpeed: $walkSpeed) {itineraries{walkDistance, duration, legs {mode, route {shortName} startTime, endTime, from {lat, lon, name, stop {code, name}}, to {lat, lon, name}, distance, legGeometry {length, points}}}}}",
        variables: {"fromPlace": fromPlace, "from": {"lat": fromLat, "lon": fromLon}, "toPlace": toPlace, "to": {"lat": toLat, "lon": toLon}, "date": date, "time": time, "numItineraries": numItineraries, "modes": modes, "walkReluctance": 2.1, "walkBoardCost": 600, "minTransferTime": 180, "walkSpeed": 1.33 }
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

export default {getAllStops, getStopById, getStopsByName, getBussesByStopID, planRoute}