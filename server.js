'use strict';

// get dependencies
const express = require ('express');
const superagent = require('superagent');
const ejs = require ('ejs');
const pg = require('pg');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

// set environment vars
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors()); // set cross-domain access mgmt
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')); // for serving static content
app.set('view engine', 'ejs'); // set templating engine
app.use(methodOverride((request, response) => { // use PUT and DELETE
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// connect DB client
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// set external function references
// const fetchLocation = require('./scripts/functions/fetchLocation');
// const addLav = require('./scripts/functions/addLav');
// const Lavatory = require('./scripts/functions/Lavatory');
// const lookup = require('./scripts/functions/lookup');
// const makeLavs = require('./scripts/functions/makeLavs');
// const updateLav = require('./scripts/functions/updateLav');
// const whereIsLavData = require('./scripts/functions/whereIsLavData');

// add client routes here
app.get(('/'), goHome);
app.get(('/urhere'), fetchLocation);

// add client-facing function calls here
function goHome(request,response) {
  response.render(('./pages/index'),{ pagename: 'home' });
}

// add route for DB refresh here

// add DB refresh function calls here




app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

function handleError (error,response) {
  console.error(error);
  // response.redirect('/error');
}

// SANDBOX
function fetchLocation (request,response) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.address}&key=${process.env.GEOCODE_API_KEY}`; // hard-code API key to test
  console.log('query = ',request.query.address);
  return superagent.get(url)
    .then( apiData => {
      // if no data: throw error
      if (!apiData.body.results.length) {
        throw 'No Data from API'
        // if data: save, send to front
      } else {
        let location = {lat: apiData.body.results[0].geometry.location.lat, lng: apiData.body.results[0].geometry.location.lng};
        console.log(`location: lat = ${location.lat}; location:lng = ${location.lng}`);
        getLavs(location,response);
      }
    })
    .catch( error => handleError(error,response)); // un-comment before running
}

function getLavs (location, response) {
  let lavs = []; // array to hold final array of 5 lav objects
  let radius ={lat: 1, lng: 1}; // {lat: .00362, lng: .00534};
  // get local results and put 
  lookup(location, radius, response)
    .then(results => {
      // console.log('(getLavs) lookup results: ', results.rows);
      lavs = makeLavs(location,results.rows); // for testing constructor
      return lavs;
    })
    .then(lavs => {
      // console.log('getLavs - fiveLavs = ', lavs);  // for testing constructor
      // response.render(('./pages/index'), {lat: location.lat, lng: location.lng, pagename: 'urhere'});
      response.render(('./pages/index'), {lat: location.lat, lng: location.lng, lavs, pagename: 'searchresults'}); 
    })
  // sort by distance
}

function lookup (latLng, radius, response) {
  const SQL = `SELECT * FROM apitbl WHERE lat BETWEEN $1 AND $2 AND ABS(lng) BETWEEN ABS($3) AND ABS($4) UNION SELECT * FROM usertbl WHERE lat BETWEEN $1 AND $2 AND ABS(lng) BETWEEN ABS($3) AND ABS($4)`;  // check API Data table name 
  const values = [latLng.lat-radius.lat, latLng.lat+radius.lat, latLng.lng+radius.lng, latLng.lng-radius.lng];
  return client.query( SQL, values)
    .then(results => {
      console.log('(lookup) SQL results: ', results.rows.length);
      return results;
    })
    .catch( error => handleError(error,response) );
}

function makeLavs (location,lavs) {
  console.log('inside makeLavs');
  lavs.sort((a,b) => {
    let distance = (val) => {
      let x = location.lat - val.lat;
      let y = location.lng - val.lng;
      return Math.sqrt(x*x + y*y);
    };
    return distance(a) - distance(b);
  });
  let lavsArray = lavs.slice(0,5);
  console.log('(makeLavs) lavsArray = ', lavsArray);
  return lavsArray;
}

function Lavatory(data) {
  this.lat = data.lat || 47.6062;
  this.lng = data.lng || -122.3321;
  this.name = data.name || '';
  this.vicinity = data.vicinity || '';
  this.deadoralive = data.deadoralive || 'alive';
  this.statusreason = data.statusreason || '';
  this.votestotal = data.votestotal || 0;
  this.avgtotal = data.avgtotal || 0;
  this.avgclean = data.avgclean || 0;
  this.avgeasytofind = data.avgeasytofind || 0;
  this.notoiletpaper = data.notoiletpaper || false;
  this.notoiletseatcovers = data.notoiletseatcovers || false;
  this.genderspecific = data.genderspecific || false;
  this.restingarea = data.restingarea || false;
  this.mothersroom = data.mothersroom || false;
  this.changingstation = data.changingstation || false;
  this.bidet = data.bidet || false;
  this.feminineproducts = data.feminineproducts || false;
  this.homedb = data.homedb || 'api';
}

