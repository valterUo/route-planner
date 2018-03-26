import React, { Component } from 'react'
import L from 'leaflet'
import vectorGrid from 'leaflet.vectorgrid'
import polyline from 'polyline'

class Map extends Component {

    componentDidMount() {
      this.map()
    }
  
    map() {
        const map = L.map('map').setView([60.205499178, 24.958662832], 16)

        L.tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
            id: 'hsl-map'}).addTo(map)
    
            const stopsUrl = 'https://cdn.digitransit.fi/map/v1/hsl-stop-map/{z}/{x}/{y}.pbf'
            const ticketSalesUrl = 'https://cdn.digitransit.fi/map/v1/hsl-ticket-sales-map/{z}/{x}/{y}.pbf'
    
            const stopStyles = {stops: {fill: true,
              weight: 1,
              fillColor: '#0101DF',
              color: '#10cccc',
              fillOpacity: 0.2,
              opacity: 0.4}}

              const ticketSalesStyles = {stops: {fill: true,
                weight: 1,
                fillColor: '#FE2E64',
                color: '#10cccc',
                fillOpacity: 0.2,
                opacity: 0.4}}
    
            const stopsLayer = L.vectorGrid.protobuf(stopsUrl, {
              vectorTileLayerStyles: stopStyles})
    
            const ticketSalesLayer = L.vectorGrid.protobuf(ticketSalesUrl,  {
                vectorTileLayerStyles: ticketSalesStyles})
    
            map.addLayer(stopsLayer)
            map.addLayer(ticketSalesLayer)

            const line = polyline.decode("wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@HDHDjBt@^N|@`@JDHNFB`@RHDJFD@PD^fBDNNp@@JBPHl@FdA@d@@TFrCDnATpEL~CBnA@pADpELbQ?pB?nBC~@DdC?R?LDtC?P?j@@XG~@Ef@CPCHGHoAtAQT_@f@w@rAc@~@g@lAi@fBc@hBWvASzAWrBUtBQxBOtBMhCOvEEhCCfC@vB@fBDrCFlCJnCb@xIfFl_APdDr@dMd@bIV~D\\bFPnCjAtMt@~GxAhMlBfOz@jHVjCR~BNpCHrBFjCDdC?`CC`DIfDSxDUhDe@fFu@tHMzA{AlOcBtPCXE`@sCrY_BbPShCeAxJc@pDg@nECJi@~Di@dDUbAkA~Gk@bD_@vBUbB]lBe@lDY~B[rCWbC_@~DYfDW|BQ~Am@tGOfBOxAWlCKzAMvAIbAMpBIpAAd@GhACp@EhAEtAA~ACfCAnC@fA?rAClDC`G@`BCxHKlCMhIK~FE|CA~@@|@BxB@^?@DtAHbBLzALjBHbBFlAF|ADxAD|BNrEPjCTtHdAhVp@jSVlPFjJ?dC?hE?dJ?xC?vLDfKDpEF|CFnDPjHZvH\\xH|@jQXnF\\nFBXdAtSJtCZrG@^b@`K^dJLnDLtDj@bRT`IAb@?~@?dA@~A?fA?|@AjAE~BA`BBdABd@Bh@HfARnBPpBl@zFt@lGr@vE\\|Cz@dHrA|JdAtHPpAl@dEjA~I~AvNv@tIx@vKTtD`@nHTrENtDRzEPvHR|J\\`VNdKAjEFpLBlFDjCBfCFxBNjE`@nH@j@An@Cr@I^O^y@l@iAt@S@IAIGMKCICIKIKEI?MDILKVQVW^WVUPSJuAT??_ANaALg@No@ZkAz@a@ZKR]j@a@h@i@fA[f@Q`@u@dCmAvEw@dCk@nAe@z@S\\iAnAeA`Ai@f@eAfBy@rBu@rCMf@WfAU`Ac@`Bi@`CKh@ANUdBq@~GW|BQdAK^M\\IROVMLs@d@q@\\]P}@R{@BaA@_@Iu@E]?CAU?M?W@i@DKBg@NUDq@V}@^g@XQJk@h@EDQPeBnBIHILU\\")
            const pointList = []
            for (var i=0; i < line.length; i++) {
                const point = new L.LatLng(line[i][0], line[i][1])
                pointList[i] = point
                }
            const firstpolyline = new L.Polyline(pointList, {
                color: 'red',
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1.5
                })
            firstpolyline.addTo(map);

        }

    render() {
        return <div id="map" style={{height: 400}}></div>
      }
}

export default Map