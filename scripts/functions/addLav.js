'use strict';

// DESCRIPTION:
// This function accepts a user inputs for a non-existing lavs and creates a new record in the 'user' table accordingly. 

// INPUTS:
// (request, response) request.body/.params  -  format: '<see EJS for integ>'

// OUTPUTS:
// DB updates and redirect to home

// CHANGE LOG:
// 12-17-2018 6:10pm (Gwen) Initial build and test.


// FUNCTION:
// const handleError = require('handleError');

function addLav (request,response) {
  let SQL = 'INSERT INTO user (votesTotal,votesClean,votesEasyToFind,avgVotesTotal,avgVotesClean,avgVotesEasyToFind,noToiletPaper,noToiletSeatCovers,genderSpecific,restingArea,mothersRoom,changingStation,bidet,feminineProducts) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) returning id;';
  let {votesTotal,votesClean,votesEasyToFind,avgVotesTotal,avgVotesClean,avgVotesEasyToFind,noToiletPaper,noToiletSeatCovers,genderSpecific,restingArea,mothersRoom,changingStation,bidet,feminineProducts} = request.params;
  let values = [votesTotal,votesClean,votesEasyToFind,avgVotesTotal,avgVotesClean,avgVotesEasyToFind,noToiletPaper,noToiletSeatCovers,genderSpecific,restingArea,mothersRoom,changingStation,bidet,feminineProducts];

  client.query(SQL,values)
    .then(response.redirect('/'))
    // .catch( error => handleError(error,response)); // un-comment before running
}



// TEST:
// N/A - check DB


