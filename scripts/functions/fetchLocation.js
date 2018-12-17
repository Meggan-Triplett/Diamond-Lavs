'use strict';

// DESCRIPTION:
// This function accepts a user-defined location search, requests location from Google Geocoding, and returns lat and lng to client.

// INPUTS:
// (request, response) request.body.search_query  -  format: '2901 3rd ave'

// OUTPUTS:
// response.render( (route), {lat: 47.618294, lng: -122.351190} )

// CHANGE LOG:
// 12-17-2018 12:30pm (Gwen) Initial build and test.


// FUNCTION:
function fetchLocation (request,response) {  // change (request) to (request,response) before running
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GEOCODE_API_KEY}`; // hard-code API key to test
  return superagent.get(url)
    .then( apiData => {
      // if no data: throw error
      if (!apiData.body.results.length) {
        throw 'No Data from API'
        // if data: save, send to front
      } else {
        let location = {lat: apiData.body.results[0].geometry.location.lat, lng: apiData.body.results[0].geometry.location.lng};
        response.render(('/urhere'), {lat: location.lat, lng: location.lng});  // un-comment before running
        console.log(`location: lat = ${location.lat}; location:lng = ${location.lng}`);
      }
    })
    .catch( error => handleError(error)); // un-comment before running
}



// TEST:
// let request = {query: { data: '2901 3rd ave'} };

// fetchLocation (request);


