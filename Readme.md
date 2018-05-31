# Route Planner

## Remarks:

All the features that I described below, did not complete fully. This is mostly because of time limits, not because of technical difficulties.

## Backend repository:

[Route Planner Backend](https://github.com/valterUo/route-planner_backend)

## Backround of the idea: 

The Route Planner is an optional version of [HSL Reittiopas](https://www.reittiopas.fi/). Reittiopas is built with React and it uses [Digitransit](https://digitransit.fi/en/developers/apis/) open source database to calculate itinaries. The database is built with [GraphQL](http://graphql.org/) which is a query language developed by Facebook. It automatically calculates itinaries between given destinations. Maps are created using [Leaflet](http://leafletjs.com/) Javascript library. My aim is, more or less, to use Digitransit to build a new "Reittiopas" so that it serves features that I have seen useful in my every day life. HSL Reittiopas is not practical when you want to make fast searches and espesically using your mobilephone. Also, Reittiopas (and HSL page which is supposed to be strongly connected to Reittiopas) is not very intutive once you have logged in there. My backend is mainly for handling user's personal data.

## Main features: 

Searches: An itinery from destination A to destination B, next public transport that pass the defined bus stop, a schedule of the defined transport line, (possible future feature: next busses that pass many defined stops in some defined area), adding favourite transport stops, lines, locations and homelocation (possible future feature: user can delete and update his information), real time alerts, map that shows locations and routes and works interactive way with searches

## Maps:

Original Reittiopas uses Leaflet maps and the points of interest are added onto the map using Mapbox Vector Tiles. The maps are described [here](https://digitransit.fi/en/developers/apis/3-map-api/) in detail. I tried to implement the maps so that they do not need Leaflet at all but they would use only Mapbox. After all, this was harder task than I tought and I did not manage to complete it. So I learned to use Leaflet. While studying Leaflet and building maps, I found out new features that I could add to the Route Planner. The first additional feature would be a map that shows real-time trasnport for a given transport line.

## Advantages compared to HSL Reittiopas:

(I wrote this section in the very beginning and I never implemented these features. Maybe in the future.) The Route Planner is a lighter version of Reittiopas. It is meant to be used by people who do not need map and who want simple layout. My own experience is that I often make similar searches so the Route Planner offers those searhes immeaditely on the front page. Reittiopas does not provide data for routes that goes beyond the HSL-area altough Digitransit service provides data for calculating futher routes also. I can try to add that data to my service.

## Future possibilities:

 There does not exist good mobile app for making searches in Reittiopas. There are several paid apps but they have bad recommendations in Apple store and Google Play. The next task would be create a simple app for making searches in public transport in HSL area. In fact, my original idea was to create a Telegram bot that uses Digitransit.

## Product version

The latest version: https://route-planner-2018.herokuapp.com/

## Working hours

[Working hours](Workinghours.md)

## Author

Valter Uotila