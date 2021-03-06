import React, { Component } from 'react' // eslint-disable-line
import L from 'leaflet'
import vectorGrid from 'leaflet.vectorgrid' // eslint-disable-line
import polyline from 'polyline'
import GeoService from '../services/GeoService'
import { addPointToMap, deleteAllFromMap, notify } from '../actions/actionCreators'

class Map extends Component {

	componentDidMount() {
		this.map()
	}

	returnPointWithText(LatLng, text) {
		const element = `<div> ${text} </div>`
		return L.marker(LatLng).bindPopup(element)
	}

	returnPolyline(polylineData) {
		try {
			const line = polyline.decode(polylineData)
			const pointList = []
			for (var i=0; i < line.length; i++) {
				var point = new L.LatLng(line[i][0], line[i][1])
				pointList[i] = point
			}

			const route = new L.Polyline(pointList, {
				color: 'red',
				weight: 3,
				opacity: 0.5,
				smoothFactor: 1.5
			})
			return route
		} catch(error) {
			return 'Polyline decoding did not succeed.'
		}
	}

	returnRouteLayers(legs) {
		const routeLayer = L.featureGroup()
		legs.forEach(leg => {
			const point1 = this.returnPointWithText([leg.from.lat, leg.from.lon],leg.from.name === undefined ? 'Starting point.' : leg.from.name)
			routeLayer.addLayer(point1)
			const polyline = this.returnPolyline(leg.legGeometry.points)
			routeLayer.addLayer(polyline)
			const point2 = this.returnPointWithText([leg.to.lat, leg.to.lon], leg.to.name === undefined ? 'Ending point.' : leg.to.name)
			routeLayer.addLayer(point2)
		})
		return routeLayer
	}

	map() {
		const map = L.map('map').setView([60.205499178, 24.958662832], 13) //Kumpula
		const stopsUrl = 'https://cdn.digitransit.fi/map/v1/hsl-stop-map/{z}/{x}/{y}.pbf'
		const ticketSalesUrl = 'https://cdn.digitransit.fi/map/v1/hsl-ticket-sales-map/{z}/{x}/{y}.pbf'
		const stopStyles = { stops: { fill: true, fillColor: 'orange', weight: 1, color: 'purple', opacity: 0.85 } }
		const ticketSalesStyles = { ticketSales: { color: 'blue', fill: true, fillColor: 'blue' } }
		const stopsLayer = L.vectorGrid.protobuf(stopsUrl, { vectorTileLayerStyles: stopStyles })
		const ticketSalesLayer = L.vectorGrid.protobuf(ticketSalesUrl, { vectorTileLayerStyles: ticketSalesStyles })
		var layersOnMap = L.featureGroup()

		L.tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
			id: 'hsl-map' })
			.addTo(map)

		map.on('zoomend', function () {
			if(map.getZoom() > 15) {
				map.addLayer(stopsLayer)
				map.addLayer(ticketSalesLayer)
			} else {
				map.removeLayer(stopsLayer)
				map.removeLayer(ticketSalesLayer)
			}
		})

		map.on('click', (event) => {
			try {
				GeoService.getDestination(event.latlng.lat, event.latlng.lng, 1).then(response => {
					console.log(response)
					if(response.features.length > 0) {
						this.props.store.dispatch(addPointToMap({ lat: event.latlng.lat,
							lon: event.latlng.lng,
							name: response.features[0].properties.name + ', ' + response.features[0].properties.neighbourhood + ', ' + response.features[0].properties.postalcode + ', ' + response.features[0].properties.localadmin + ', ' + response.features[0].properties.region }
						))} else {
						this.props.store.dispatch(notify('Failed to get the location.', 'danger'))
					}
				}
				)
			} catch (error) {
				this.props.store.dispatch(notify('Failed to get the location.', 'danger'))
			}
		})

		this.props.store.subscribe(() => {
			const mapReducer = this.props.store.getState().map
			if( mapReducer.type !== undefined ){
				if( mapReducer.type === 'route') {
					layersOnMap.clearLayers()
					layersOnMap = this.returnRouteLayers(mapReducer.data.legs)
					layersOnMap.addTo(map)
					map.fitBounds(layersOnMap.getBounds())
				} else if (mapReducer.type === 'point') {
					const point = this.returnPointWithText([mapReducer.data.lat, mapReducer.data.lon], mapReducer.data.name)
					layersOnMap.addLayer(point)
					layersOnMap.addTo(map)
					map.fitBounds(layersOnMap.getBounds())
				} else if (mapReducer.type === 'route_non_polyline') {
					layersOnMap.clearLayers()
					const pointList = []
					mapReducer.data.forEach(element => {
						var point = new L.LatLng(element.lat, element.lon)
						pointList.push(point)
					})
					const route = new L.Polyline(pointList, {
						color: 'red',
						weight: 3,
						opacity: 0.5,
						smoothFactor: 1.5
					})
					layersOnMap.addLayer(route)
					const origin = L.marker(pointList[0]).bindPopup('Origin')
					const end = L.marker(pointList[pointList.length - 1]).bindPopup('End')
					layersOnMap.addLayer(origin)
					layersOnMap.addLayer(end)
					layersOnMap.addTo(map)
					map.fitBounds(layersOnMap.getBounds())
				} else if(mapReducer.type === 'remove_layers') {
					layersOnMap.clearLayers()
					map.setView([60.205499178, 24.958662832], 13) //Kumpula
				}
				this.props.store.dispatch(deleteAllFromMap())
			}
		})
	}

	render() {
		return <div><h3>Map</h3><div id="map" style={{ height: 400 }}></div></div>
	}
}

export default Map