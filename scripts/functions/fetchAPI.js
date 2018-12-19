'use strict';

// DESCRIPTION:
// This function is essential a helper function that will take in place holder query values. This function can later be called with actual dev query data to get different restrooms.

// INPUT:
// (request, response)
//  input composition: location ${ lat,lng }, radius ${ desired meters < 50000 }, keyword ${ desired company }, key ${ api key }

// OUTPUT:
// raw data object from Google Places API

// CHANGE LOGS:
// 12-18-2018 2:00pm (Meggan) Initial build and test.
// 12-18-2018 3:40pm (Meggan) Troubleshoot function issue.
// 12-18-2018 5:000pm (Meggan) Completed function

// FUNCTION:
const superagent = require('superagent');
require('dotenv').config();

function fetchAPI () {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${search_query.location.lat},${search_query.location.lng}&radius=${search_query.location.radius}&keyword=${search_query.location.keyword}&key=${process.env.GEOCODE_API_KEY}`;
  return superagent.get(url)
  .then ( apiData => apiData)
  .catch( error => handleError(error));
}

// TEST:
// calling fetchAPI should return the raw data from the Google Places API

// fetchAPI ();