# Route Planner

## Backround of the idea: 

The Route Planner is an optional version of [HSL Reittiopas](https://www.reittiopas.fi/). Reittiopas is built with React and it uses [Digitransit](https://digitransit.fi/en/developers/apis/) open source database to calculate itinaries. The database is built with [GraphQL](http://graphql.org/) which is a query language developed by Facebook. It automatically calculates itinaries between wanted destinations. Maps are created using [Leaflet](http://leafletjs.com/) Javascript library. My aim is, more or less, to use Digitransit to build a new "Reittiopas" so that it serves features that I have seen useful in my every day life. HSL Reittiopas is not practical when you want to make fast searches and espesically using your mobilephone. Also, Reittiops (and HSL page which is strongly connected to Reittiopas) is not very intutive once you have logged in there. My backend is mainly for logging purposes. Let see how I success.

## Main features: 

Searches: An itinery from destination A to destination B, next busses that pass the defined bus stop, a schedule of the defined bus line, (possible: next busses that pass many defined stops in some defined area), adding favourite bus stops

## Additional features: 

Alerts and maps

## Example of user experience: 

user loggs in
 
-> the user sees next busses that pass his "Favourite bus stops" (and maybe also busses)

-> the user can make searches between destinations and by clicking "Map", the map opens

-> by cliking "Add to favourites", the user can add more favourite bus stops (and maybe also busses)

-> by clicking "Alerts", the user sees alerts provided by HSL

## Advantages compared to HSL Reittiopas:

The Route Planner is a lighter version of Reittiopas. It is meant to be used by people who do not need map and who want simple layout. My own experience is that I often make similar searches so the Route Planner offers those searhes immeaditely on the front page. Reittiopas does not provide data for routes that goes beyond the HSL-area altough Digitransit service provides data for calculating futher routes also. I can try to add that data for my service.

## Future possibilities:

 There does not exist good mobile app for making searches in Reittiopas. There are several paid apps but they have bad recommendations in Apple store and Google Play. The next task would be create a simple app for making searches in public transport in HSL area. In fact, my original idea was to create a Telegram bot that uses Digitransit.

## Product version

You can find the very first version here: https://route-planner-ztnqdladow.now.sh/. It is build using [Zeit](https://zeit.co/).

The second version is here https://route-planner-hqptmifcrr.now.sh.

The third version: https://route-planner-itajhfkqaq.now.sh/.

## Working hours

[Working hours](Workinghours.md)

## Author

Valter