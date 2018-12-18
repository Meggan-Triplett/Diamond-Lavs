'use strict';

// DESCRIPTION:
// This function is essential a helper function that will take in place holder query values. This function can later be called with actual dev query data to get different restrooms.

// INPUT:
// (request, response)
//  request composition: location ${ lat,lng }, radius ${ desired meters < 50000 }, keyword ${ desired company }, key ${ api key }

// OUTPUT:
// response object from api

// CHANGE LOGS:

// FUNCTION:
function fetchAPI (request, response) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.search_query.lat},${request.search_query.lng}&radius=${request.search_query.radius}&keyword=${request.search_query.keyword}&key=${process.env.GEOCODE_API_KEY}`;
  return superagent.get(url)
    .then ( apiLocationsData => {
      // throw error if the API returns no data
      if (!apiLocationsData.body.results.length) {
        throw 'No Data from Places API'
      } else {
        let apiResults = apiLocationsData.body;
        console.log(apiResults);
        return apiResults;
      }
    })
    // .catch( error => handleError(error));
}

// TEST:
// let request = {search_query: { lat: '47.6100898' } { lng: '-122.3424699 } { radius: '5000' } { keyword: 'Starbucks' }}

// fetchAPI (request);