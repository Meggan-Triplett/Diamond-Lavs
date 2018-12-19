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
  this.name = data.name || '';
  this.vicinity = data.vicinity || '';
  this.deadOrAlive = data.deadOrAlive || 'alive';
  this.statusReason = data.statusReason || '';
  this.votesTotal = data.votesTotal || 0;
  this.votesClean = data.votesClean || 0;
  this.votesEasyToFind = data.votesEasyToFind || 0;
  this.avgVotesTotal = data.avgVotesTotal || 0;
  this.angVotesClean = data.angVotesClean || 0;
  this.avgVotesEasyToFind = data.avgVotesEasyToFind || 0;
  this.noToiletPaper = data.noToiletPaper || false;
  this.noToiletSeatCovers = data.noToiletSeatCovers || false;
  this.genderSpecific = data.genderSpecific || false;
  this.restingArea = data.restingArea || false;
  this.mothersRoom = data.mothersRoom || false;
  this.changingStation = data.changingStation || false;
  this.bidet = data.bidet || false;
  this.feminineProducts = data.feminineProducts || false;
  this.homeDB = data.homeDB || 'api';
}

module.exports = LavatoryConstructor();

// Test 
// var dataTest = {
//   lat: 47.6062,
//   lng: -122.3321,
//   name: 'Armory',
//   vicinity: 'Seattle Center',
//   deadOrAlive: 'alive',
//   statusReason: 'closed to the public',
//   votesTotal: 100,
//   votesClean: 100,
//   votesEasyToFind: 100,
//   avgVotesTotal: 3.2,
//   angVotesClean: 2.9,
//   avgVotesEasyToFind: 4.2,
//   noToiletPaper: 7,
//   noToiletSeatCovers: 18,
//   genderSpecific: false,
//   restingArea: false,
//   mothersRoom: false,
//   changingStation: false,
//   bidet: false,
//   feminineProducts: false,
//   homeDB: 'api',  
// };

// let testLav = new Lavatory(dataTest);
// console.log (testLav);
