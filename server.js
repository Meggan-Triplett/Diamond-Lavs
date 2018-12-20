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
app.get(('/searchresults'), fetchLocation);
app.put(('/updateLav/:lav_id'), (request,response) => {  // deleteLav
  console.log('(update) request.body: ',request.body);
  console.log('(update) request.params: ', request.params);
  console.log('(update) request.query: ', request.query);
});
// app.post(('/addLav'), addLav);
app.put(('/deleteLav/:lav_id'), (request) => {  // deleteLav
  console.log('(delete) request.params: ',request.params);
  console.log('(delete) request.query: ',request.body);
  deleteLav(request,response);
});

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
  // console.log('query = ',request.query.address);
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
      // console.log('(lookup) SQL results: ', results.rows.length);
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
  // console.log('(makeLavs) lavsArray = ', lavsArray);
  return lavsArray;
}

function deleteLav(request, response) {
  let id = request.params.split('-')[0];
  let homedb = request.params.split('-')[1];
  if (homedb === 'api'){
    let SQLadd = `INSERT INTO usertbl SELECT * FROM api WHERE id=$1`
    let SQLdelete = `DELETE FROM apitbl WHERE id=$1;`;
    let values = [id];
    // console.log('', values);
    client.query(SQLadd, values)
      .then(client.query(SQLdelete,values))
      .then(response.redirect(`/`))
      .catch(error => handleError(error));
  } else {
    let SQL = 'UPDATE usertbl SET homedb=$1,deadoralive=$2 where id=$3;';
    let values = ['usertbl','dead',id];
    client.query(SQL,values)
      .then(response.redirect(('/')))
      .catch(error => handleError(error));
  }
}

function updateLav (request,response) {
  let id = request.params.split('-')[0];
  let homedb = request.params.split('-')[1];
  let {voteoverall, voteclean, voteeasytofind, notoiletpaper, notoiletseatcovers, genderspecific, restingarea, mothersroom, changingstation, bidet, feminineproducts} = request.body;

  let avgtotal = `${(avgtotal*votestotal+voteoverall)/(votestotal+1)}`;
  let avgclean = `${(avgtotal*votestotal+voteclean)/(votestotal+1)}`;
  let avgeasytofind = `${(avgtotal*votestotal+voteeasytofind)/(votestotal+1)}`;
  notoiletpaper = `${(notoiletpaper/100*votestotal+notoiletpaper)*100}`;
  notoiletseatcovers = `${(notoiletseatcovers/100*votestotal+$5)*100}`;
  let votestotal = `${votestotal+1}`;

  let valuesupdate = [avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers,genderspecific,restingarea,mothersroom,changingstation,bidet,feminineproducts,votestotal,'usertbl','alive',id];
  let SQLupdate = 'UPDATE userbl SET avgtotal=$1,avgclean=$2,avgeasytofind=$3,notoiletpaper=$4,notoiletseatcovers=$5,genderspecific=$6,restingarea=$7,mothersroom=$8,changingstation=$9,bidet=$10,feminineproducts=$11,votestotal=$12,homedb=$13,deadoralive=$14 where id=$13;';

  if  (homedb === 'api'){
    let SQLadd = `INSERT INTO usertbl SELECT * FROM apitbl WHERE id=$1`
    let valuesadd = [id];
    let SQLdelete = `DELETE FROM apitbl WHERE id=$1;`;
    // console.log('', values);
    client.query(SQLadd,valuesadd)
      .then(client.query(SQLdelete,valuesadd)) 
      .then(() => {
        client.query(SQLupdate,valuesupdate)
          .then(response.redirect(('/')))
          .catch(error => handleError(error));
      })
  } else {
    client.query(SQLupdate,valuesupdate)
      .catch(error => handleError(error));
  }
}

function addLav (request,response) {
  let {voteoverall, voteclean, voteeasytofind, notoiletpaper, notoiletseatcovers, genderspecific, restingarea, mothersroom, changingstation, bidet, feminineproducts} = request.body;

  let avgtotal = voteoverall;
  let avgclean = voteclean;
  let avgeasytofind = voteeasytofind;
  notoiletpaper = notoiletpaper/100;
  notoiletseatcovers = notoiletseatcovers/100;
  let votestotal = 1;

  let values = [avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers,genderspecific,restingarea,mothersroom,changingstation,bidet,feminineproducts,votestotal,'usertbl','alive'];
  let SQL = 'INSERT INTO userbl (avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers,genderspecific,restingarea,mothersroom,changingstation,bidet,feminineproducts,votestotal,homedb,deadoralive) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) returning id;';

  client.query(SQL,values)
    .then(response.redirect(('/')))
    .catch(error => handleError(error));
}
