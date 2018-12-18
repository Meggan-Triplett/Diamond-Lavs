'use strict';

// // DESCRIPTION:
// // This function accepts a user-defined location search, requests location from Google Geocoding, and returns lat and lng to client.

// // INPUTS:
// // (request, response) request.body.search_query  -  format: '2901 3rd ave'

// // OUTPUTS:
// // response.render( (route), {lat: 47.618294, lng: -122.351190, lavs: lavs )
// //      where "lavs" is an array of 5 lav objects: [{lav_1},{lav_2},{lav_3},{lav_4},{lav_5}]

// // CHANGE LOG:
// // 12-17-2018 12:30pm (Gwen) Initial build and test.


// // FUNCTION:
// function fetchLocation (request,response) {  // change (request) to (request,response) before running
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GEOCODE_API_KEY}`; // hard-code API key to test
//   return superagent.get(url)
//     .then( apiData => {
//       // if no data: throw error
//       if (!apiData.body.results.length) {
//         throw 'No Data from API'
//         // if data: save, send to front
//       } else {
//         let location = {lat: apiData.body.results[0].geometry.location.lat, lng: apiData.body.results[0].geometry.location.lng};
//         console.log(`location: lat = ${location.lat}; location:lng = ${location.lng}`);
//         let lavs = getLavs(location);
//         response.render(('/urhere'), {lat: location.lat, lng: location.lng, lavs: lavs});  // un-comment before running
//       }
//     })
//     .catch( error => handleError(error)); // un-comment before running
// }



// // TEST:
// // let request = {query: { data: '2901 3rd ave'} };

// // fetchLocation (request);



function fetchLocation(event) {
  event.preventDefault();
  let searchQuery = $('#input-search').val();

  $.ajax({
    url: `${__API_URL__}/location`,
    method: 'GET',
    data: {data: searchQuery}
  })
    .then(location => {
      displayMap(location);
      getResource('weather', location);
      getResource('movies', location);
      getResource('yelp', location);
      getResource('meetups', location);
      getResource('trails', location);
    })
    .catch(error => {
      compileTemplate([error], 'error-container', 'error-template');
      $('#map').addClass('hide');
      $('section, div').addClass('hide');
    });
}

function displayMap(location) {
  $('.query-placeholder').text(`Here are the results for ${location.formatted_query}`);

  $('#map').removeClass('hide');
  $('section, div').removeClass('hide');

  $('#map').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude}%2c%20${location.longitude}&zoom=13&size=600x300&maptype=roadmap
  &key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`)
}

function getResource(resource, location) {
  $.get(`${__API_URL__}/${resource }`, {data: location})
    .then(result => {
      compileTemplate(result, `${resource}-results`, `${resource}-results-template`);
    })
    .catch(error => {
      compileTemplate([error], 'error-container', 'error-template');
    })
}

function compileTemplate(input, sectionClass, templateId) {
  $(`.${sectionClass}`).empty();

  let template = Handlebars.compile($(`#${templateId}`).text());

  input.forEach(element => {
    $(`.${sectionClass}`).append(template(element));
  })
}