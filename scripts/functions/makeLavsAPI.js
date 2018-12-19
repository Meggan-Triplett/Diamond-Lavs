'use strict';

// DESCRIPTION:
// This function will run the raw data object that is returned from calling the Google Places API through the structuring constructor for each Lavatory

// INPUTS:
// Lavatory constructor to structure the raw data from the Google Places API
// placeholder for fetchAPI to get the fetch the raw data from the Google Places API

// OUTPUTS:
// new Lavatory objects

// DEPENDENCIES:
// fetchAPI.js the url get to run the Google Places API and returns the raw data the API spits out

// CHANGE LOG:
// 12-19-2018 3:00am (Meggan) Initial build. 

// FUNCTION:
const superagent = require('superagent');
require('dotenv').config();

const LavatoryConstructor = require('Lavatory.js');
const fetchAPI = require('fetchAPI.js');

fetchAPI();

function makeLavsAPI (fetchAPI) {
  let lavatories = [];
  fetchAPI.forEach(location => {
    lavatories.push(new LavatoryConstructor(location));
  });
  return lavatories;
};

module.exports = makeLavsAPI();

// TEST:
// const search_query = {
//   location: [{
//     lat: 47.6100898,
//     lng: -122.3424699,
//     radius: 5000,
//     keyword: ['Starbucks'],
//   }]
// };