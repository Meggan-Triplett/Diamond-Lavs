
'use strict';

// DESCRIPTION:
// This function accepts a location object containing lat and lng, searches the DB by radius (increasing as needed to get min 5), returns array of objects for 5 closest lavs.

// INPUTS:
// (request) where location = {lat: 47.618294, lng: -122.351190}

// OUTPUTS:
// DB results:  [ { API table data }, { User table data} ]

// DEPENDENCIES:
// lookup.js = looks up lavs in DB by search radius
// makeLavs.js = reduces lavs list to 5 closest, builds lav objects and returns them in an array

// CHANGE LOG:
// 12-17-2018 3:30pm (Gwen) Initial build.  Need DB build to test.
// 12-17-2018 4:00pm (Gwen) Moved some calcs to makeLavs, added fxn call.


// FUNCTION:

const lookup = require('./lookup');
const makeLavs = require('./makeLavs');

function getLavs (location, response) {
  let lavs = []; // array to hold final array of 5 lav objects
  let radius ={lat: 1, lng: 1}; // {lat: .00362, lng: .00534};
  // get local results and put 
  lookup(location, radius, response)
    .then(results => {
      // console.log('(getLavs) lookup results: ', results.rows);
      lavs = makeLavs(location,results.rows); // for testing constructor
      return lavs;
    })
    .then(lavs => {
      // console.log('getLavs - fiveLavs = ', lavs);  // for testing constructor
      response.render(('./pages/index'), {lat: location.lat, lng: location.lng, pagename: 'urhere'});
    })
  // sort by distance
}

// TEST: (run in server.js to access DB)
// let latLng = {lat: 47.618365, lng: -122.351126};

// console.log(getLavs(latLng));

module.exports = getLavs;
