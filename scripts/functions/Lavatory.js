'use strict';
// DESCRIPTION:
// This function accepts data from other functions to construct Lavatory Object.

// INPUTS:
// (data) data.lat, data.lng  -  format: 'defined by other functions'.

// OUTPUTS:
// Lavatory(data), {lat: 47.618294, lng: -122.351190, address: 2901 3rd ave,  . . . . } 

// CHANGE LOG:
// 12-17-2018 12:40pm (Guru) Initial build and test.



function Lavatory(data) {
  this.lat = data.lat;
  this.lng = data.lng;
  this.address = data.address;
  this.votesTotal = data.votesTotal;
  this.votesClean = data.votesClean;
  this.votesEasyToFind = data.votesEasyToFind;
  this.homeDB = data.homeDB;
  this.status = data.status;
  this.statusReason = data.statusReason;
}



// Test 
// var dataTest = {lat:"5", lng:"7", address:"2901 3rd ave", votesTotal: "500", votesClean: "200", votesEasyToFind: "100", homeDB; "some data", status:"Great!", statusReason:'cause life is great!'};

// let testLav = new Lavatory(dataTest);
// console.log (testLav);
