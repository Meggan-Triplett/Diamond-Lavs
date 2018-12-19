'use strict';

// DESCRIPTION:
// This function accepts a user-defined location search, requests location from Google Geocoding, and returns lat and lng to client.

// INPUTS:
// (request, response) request.body.search_query  -  format: '2901 3rd ave'

// OUTPUTS:
// response.render( (route), {lat: 47.618294, lng: -122.351190, lavs: lavs )
//      where "lavs" is an array of 5 lav objects: [{lav_1},{lav_2},{lav_3},{lav_4},{lav_5}]

// CHANGE LOG:
// 12-17-2018 12:30pm (Gwen) Initial build and test.


// FUNCTION:
const superagent = require('superagent');
require('dotenv').config();

const getLavs = require('./getLavs');
// const handleError = require('./handleError');

function fetchLocation (request,response) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.address}&key=${process.env.GEOCODE_API_KEY}`; // hard-code API key to test
  console.log('query = ',request.query.address);
  return superagent.get(url)
    .then( apiData => {
      // if no data: throw error
      if (!apiData.body.results.length) {
        throw 'No Data from API'
        // if data: save, send to front
      } else {
        let location = {lat: apiData.body.results[0].geometry.location.lat, lng: apiData.body.results[0].geometry.location.lng};
        console.log(`location: lat = ${location.lat}; location:lng = ${location.lng}`);
        getLavs(location,response);
      }
    })
    .catch( error => handleError(error,response)); // un-comment before running
  }


module.exports = fetchLocation;



// TEST:
// let request = {query: { data: '2901 3rd ave'} };

// fetchLocation (request);


