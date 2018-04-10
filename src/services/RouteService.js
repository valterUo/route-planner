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

const getBussesByStopID = async (id, numberOfDepartures) => {
    const fullQuery = {
        query: "query getBussesByStopID($input: String!, $numberOfDepartures: Int!){stop(id: $input){name, stoptimesWithoutPatterns(numberOfDepartures: $numberOfDepartures) {scheduledArrival, headsign, trip {id, route {id, shortName}}}}}",
        variables: {"input": id, "numberOfDepartures": numberOfDepartures}
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

const getAllLines = async () => {
    const fullQuery = {
        query: "query {routes {id, shortName, longName, patterns {id, code}}}"
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const getPatternAndTimesBasedOnLine = async (code, numberOfDepartures) => {
    const fullQuery = {
        query: "query patterSearch ($id: String! $numberOfDepartures: Int!){pattern(id: $id) {id, name, geometry {lat, lon}, stops {id, name, lat, lon, stopTimesForPattern(id: $id numberOfDepartures: $numberOfDepartures) {scheduledArrival, realtimeArrival, arrivalDelay, scheduledDeparture, realtimeDeparture, departureDelay, realtime, realtimeState, serviceDay, headsign}}}}",
        variables: {"id": code, "numberOfDepartures": numberOfDepartures}
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const getAlerts = async () => {
    const fullQuery = {
        query: "query {alerts {id, alertDescriptionText}}"
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

const getLineRoute = async (code) => {
    const fullQuery = {
        query: "query getLineGeometry($id: String!){pattern(id: $id) {id, name, geometry {lat, lon}}}",
        variables: {"id": code}
    }
    const response = await axios.post(baseUrl, fullQuery)
    return response.data
}

export default {getAllStops, getStopById, getStopsByName, getBussesByStopID, planRoute, getAllLines, getPatternAndTimesBasedOnLine, getAlerts, getLineRoute}