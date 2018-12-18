'use strict';
// DESCRIPTION:
// This function accepts data from other functions to construct Lavatory Object.

// INPUTS:
// (data) data.lat, data.lng  -  format: 'defined by other functions'.

// OUTPUTS:
// Lavatory(data), {lat: 47.618294, lng: -122.351190, address: 2901 3rd ave,  . . . . } 

// CHANGE LOG:
// 12-17-2018 12:40pm (Guru) Initial build and test.
// 12-17-2018 1:10pm (Guru) Added the avg properties to the Lavatory constructor and changed 'status' propoerty to 'deadOrAlive'.
// 12-17-2018 4:05pm (Guru) Added default values to the Lavatory object.
// 12-17-2018 4:20pm (Guru) Fixed few default values types for the Lavatory object.



function Lavatory(data) {
  this.lat = data.lat || 47.6062;
  this.lng = data.lng || -122.3321;
  this.vicinity = data.vicinity || '';
  this.votesTotal = data.votesTotal || 0;
  this.votesClean = data.votesClean || 0;
  this.votesEasyToFind = data.votesEasyToFind || 0;
  this.avgVotesTotal = data.avgVotesTotal || 0;
  this.angVotesClean = data.angVotesClean || 0;
  this.avgVotesEasyToFind = data.avgVotesEasyToFind || 0;
  this.homeDB = data.homeDB || 'api';
  this.deadOrAlive = data.deadOrAlive || 'alive';
  this.statusReason = data.statusReason || '';
}



// Test 
// var dataTest = {lat:"5", lng:"7", address:"2901 3rd ave", votesTotal: "500", votesClean: "200", votesEasyToFind: "100", homeDB; "some data", status:"Great!", statusReason:'cause life is great!'};
// var dataTest = {}
// let testLav = new Lavatory(dataTest);
// console.log (testLav);
