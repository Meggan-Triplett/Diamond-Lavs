'use strict';

// DESCRIPTION:
// This function accepts lat, lng, search radius, and table name and returns local lavs from that db table.

// INPUTS:
// (location) where location = {lat: 47.618294, lng: -122.351190}

// OUTPUTS:
// DB results:  [ { API table data }, { User table data} ]

// CHANGE LOG:
// 12-17-2018 2:20pm (Gwen) Initial build.  Need DB build to test.


// FUNCTION:

const pg = require('pg');
// const handleError = require('handleError');

function lookup (latLng, radius, response) {
  const SQL = `SELECT * FROM apitbl WHERE lat BETWEEN $1 AND $2 AND ABS(lng) BETWEEN ABS($3) AND ABS($4) UNION SELECT * FROM usertbl WHERE lat BETWEEN $1 AND $2 AND ABS(lng) BETWEEN ABS($3) AND ABS($4)`;  // check API Data table name 
  const values = [latLng.lat-radius.lat, latLng.lat+radius.lat, latLng.lng+radius.lng, latLng.lng-radius.lng];
  return client.query( SQL, values)
    .then(results => {
      console.log('(lookup) SQL results: ',results.rows.length);
      return results;
    })
    .catch( error => handleError(error,response) );
}

module.exports = lookup;


// TEST: (run in server.js to access DB)
// let latLng = {lat: 47.618365, lng: -122.351126};
// let radius = {lat: .00362, lng: .00534};
// let tablename = 'api';

// console.log(lookup(latLng,radius,tablename));
