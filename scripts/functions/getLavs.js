
'use strict';

// DESCRIPTION:
// This function accepts lat and lng, searches the DB by radius (increasing as needed to get min 5), returns array of objects for 5 closest lavs.

// INPUTS:
// (request) where location = {lat: 47.618294, lng: -122.351190}

// OUTPUTS:
// DB results:  [ { API table data }, { User table data} ]

// DEPENDENCIES:
// lookup.js = looks up lavs in DB by search radius
// reduceLavs.js = reduces to 5 closest lavs
// makeLavs.js = builds lav objects and returns them in an array

// CHANGE LOG:
// 12-17-2018 3:30pm (Gwen) Initial build.  Need DB build to test.


// FUNCTION:
function getLavs (location) {
  let lavs = []; // array to hold final array of 5 lav objects
  let radius = {lat: .00362, lng: .00534};
  // get local results and put 
  lavs.push(lookup(location, radius, 'api').rows);
  lavs.push(lookup(location, radius, 'user').rows);
  // sort by distance
  lavs.sort((a,b) => {
    let distance = (val) => {
      let x = location.lat - val.lat;
      let y = location.lng - val.lng;
      return Math.sqrt(x*x + y*y);
    };
    return distance(a) - distance(b);
  });
  return lavs.slice(0,5);
}

// TEST: (run in server.js to access DB)
let latLng = {lat: 47.618365, lng: -122.351126};

console.log(getLavs(latLng));
