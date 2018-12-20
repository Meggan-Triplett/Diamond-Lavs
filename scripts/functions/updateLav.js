'use strict';

// DESCRIPTION:
// This function accepts a user inputs for existing lavs and updates the 'user' table accordingly. 
// If the lav lives in the 'api' table, record is copied to 'user' with updates, and deleted from 'api'.

// INPUTS:
// (request, response) request.body/.params  -  format: '<see EJS for integ>'

// OUTPUTS:
// DB updates and redirect to home

// CHANGE LOG:
// 12-17-2018 6:15pm (Gwen) Initial build and test.


// FUNCTION:

function updateLav (request,response) {
  let SQL = 'UPDATE user SET votestotal=$1,avgtotal=$4,avgclean=$5,avgeasytofind=$6,notoiletpaper=$7,notoiletseatcovers=$8,genderspecific=$9,restingarea=$10,mothersroom=$11,changingstation=$12,bidet=$13,feminineproducts=$14 where id=$15;';
  let {votesTotal,votesClean,votesEasyToFind,avgVotesTotal,avgVotesClean,avgVotesEasyToFind,noToiletPaper,noToiletSeatCovers,genderSpecific,restingArea,mothersRoom,changingStation,bidet,feminineProducts,id} = request.params;
  let values = [votesTotal,votesClean,votesEasyToFind,avgVotesTotal,avgVotesClean,avgVotesEasyToFind,noToiletPaper,noToiletSeatCovers,genderSpecific,restingArea,mothersRoom,changingStation,bidet,feminineProducts,id];

  client.query(SQL,values);
}



// TEST:
// N/A - check DB


