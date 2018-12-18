
'use strict';

// DESCRIPTION:
// This function updates 'user' based on user inputs.
// If record not in 'api': add record to 'user, delete record from 'api', redirect to home.
// If record not in 'api' or 'user: add record to 'user, redirect to home.

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
function whereIsLavData (request,response) {
  if (request.params.homeDB === 'user') {
    updateLav(request,response)
      .then(response.redirect('/'))
      .catch( error => handleError(error)); // un-comment before running
  } else if (request.params.homeDB === 'api') {
    deleteLav(request,response);
    addLav(request,response)
      .then(response.redirect('/'))
      .catch( error => handleError(error)); // un-comment before running
  } else {
    addLav(request,response)
      .then(response.redirect('/'))
      .catch( error => handleError(error)); // un-comment before running
  }
}

// TEST: (run in server.js to access DB)
let latLng = {lat: 47.618365, lng: -122.351126};

console.log(getLavs(latLng));
