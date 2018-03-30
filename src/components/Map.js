import React, { Component } from 'react'
import L from 'leaflet'
import vectorGrid from 'leaflet.vectorgrid'
import polyline from 'polyline'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
      this.map()
    }

    returnPointWithText(LatLng, text) {
        return L.marker(LatLng).bindPopup(text)
      }
    
      returnPolyline(polylineData) {
        try{
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
        const map = L.map('map').setView([60.205499178, 24.958662832], 14) //Kumpula
        const stopsUrl = 'https://cdn.digitransit.fi/map/v1/hsl-stop-map/{z}/{x}/{y}.pbf'
        const ticketSalesUrl = 'https://cdn.digitransit.fi/map/v1/hsl-ticket-sales-map/{z}/{x}/{y}.pbf'
        const stopStyles = {stops: { fill: true, fillColor: "orange", weight: 1, color: 'purple', opacity: 0.85}}
        const ticketSalesStyles = {ticketSales: {color: "blue", fill: true, fillColor: "blue"}}
        const stopsLayer = L.vectorGrid.protobuf(stopsUrl, { vectorTileLayerStyles: stopStyles })
        const ticketSalesLayer = L.vectorGrid.protobuf(ticketSalesUrl, { vectorTileLayerStyles: ticketSalesStyles })
        var layersOnMap = L.featureGroup()
        
        L.tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
            id: 'hsl-map'})
            .addTo(map)

            map.on('zoomend', function () {
                console.log(map.getZoom())
                if(map.getZoom() > 15) {
                  map.addLayer(stopsLayer)
                  map.addLayer(ticketSalesLayer)
                } else {
                  map.removeLayer(stopsLayer)
                  map.removeLayer(ticketSalesLayer)
                }
              })
          
              map.on('click', (event) => {
                  this.props.store.dispatch({
                      type: 'ADD_POINT_ON_MAP',
                      data: event.latlng
                  })
            })

            this.props.store.subscribe(() => {
                if( this.props.store.getState().map.data !== undefined){
                        if( this.props.store.getState().map.type === 'route') {
                            layersOnMap.clearLayers()
                            layersOnMap = this.returnRouteLayers(this.props.store.getState().map.data.legs)
                            layersOnMap.addTo(map)
                            map.fitBounds(layersOnMap.getBounds())
                        } else if (this.props.store.getState().map.type === 'point') {
                            const point = this.returnPointWithText([this.props.store.getState().map.data.lat, this.props.store.getState().map.data.lng], 'You are here.')
                            layersOnMap.addLayer(point)
                            console.log(layersOnMap)
                            layersOnMap.addTo(map)
                            map.fitBounds(layersOnMap.getBounds())
                    }
                }
            })
        }

    render() {
        return <div id="map" style={{height: 400}}></div>
      }
}

export default Map