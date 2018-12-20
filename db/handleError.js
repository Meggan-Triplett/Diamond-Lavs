'use strict';

// DESCRIPTION:
// This function accepts errors from other functions and redirects to error page.

// INPUTS:
// (request, response)

// OUTPUTS:
// console.log error message and redirect to error page

// CHANGE LOG:
// 12-17-2018 6:10pm (Gwen) Initial build and test.


// FUNCTION:
function handleError (error,response) {
  console.error(error);
  response.redirect('/error');
}

module.exports = handleError;

// TEST:
// N/A - check DB


