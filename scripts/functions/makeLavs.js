
'use strict';

// DESCRIPTION:
// This function accepts lat and lng, searches the DB by radius (increasing as needed to get min 5), returns array of objects for 5 closest lavs.

// INPUTS:
// (lavs) = [{lav1},{lav2},...] <- combined api and user results.rows in a single array

// OUTPUTS:
// fiveLavs:  [{lav1},{lav2},{lav3},{lav4},{lav5}]

// DEPENDENCIES:
// none

// CHANGE LOG:
// 12-17-2018 4:15pm (Gwen) Initial build.  Need DB build to test.


// FUNCTION:
function makeLavs (lavs) {
  lavs.sort((a,b) => {
    let distance = (val) => {
      let x = location.lat - val.lat;
      let y = location.lng - val.lng;
      return Math.sqrt(x*x + y*y);
    };
    return distance(a) - distance(b);
  });
  let fiveLavs = lavs.slice(0,5).map((lav => new Lavatory(lav)));
  return fiveLavs;
}

// TEST: (run in server.js to access DB)
let allLavs = [{lav1},{lav2},{lav3},...]; // need object format to define fake data

console.log(getLavs(allLavs));
