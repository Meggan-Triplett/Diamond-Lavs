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
app.use(methodOverride((request, response) => { // use PUT and DELETE in forms
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
  // console.log('(update) request.body: ',request.body);
  // console.log('(update) request.params: ', request.params);
  // console.log('(update) request.query: ', request.query);
  updateLav(request,response);
});

app.put(('/deleteLav/:lav_id'), (request,response) => {  // deleteLav
  // console.log('(delete) request.params: ',request.params);
  // console.log('(delete) request.query: ',request.body);
  deleteLav(request,response);
});

app.post(('/addLav'), (request,response) => {  // deleteLav
  // console.log('(delete) request.params: ',request.params);
  // console.log('(delete) request.query: ',request.body);
  addLav(request,response);
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
  // const SQL = `SELECT * FROM apitbl WHERE lat BETWEEN $1 AND $2 AND ABS(lng) BETWEEN ABS($3) AND ABS($4) AND deadoralive=$5 UNION SELECT * FROM usertbl WHERE lat BETWEEN $1 AND $2 AND ABS(lng) BETWEEN ABS($3) AND ABS($4) AND deadoralive=$5`;  // check API Data table name 
  const SQL = `SELECT * FROM apitbl WHERE deadoralive=$1 UNION SELECT * FROM usertbl WHERE deadoralive=$1`;
  const values = ['alive'];
  // const values = [latLng.lat-radius.lat, latLng.lat+radius.lat, latLng.lng+radius.lng, latLng.lng-radius.lng, 'alive'];
  // return client.query( SQL, values)
  return client.query( SQL,values)
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
  let lavsArray = lavs.slice(0,8); // TODO: replace 8 with 5
  // console.log('(makeLavs) lavsArray = ', lavsArray);
  return lavsArray;
}

function deleteLav(request, response) {
  let id = request.params.lav_id.split('-')[0];
  let homedb = request.params.lav_id.split('-')[1];
  if (homedb === 'apitbl'){
    let SQLadd = `INSERT INTO usertbl SELECT * FROM apitbl WHERE id=$1`
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
  let id = request.params.lav_id.split('-')[0];
  let whichdb = request.params.lav_id.split('-')[1];
  console.log('(update) request.body: ',request.body);
  let {name, vicinity, voteoverall, voteclean, voteeasytofind, restingarea, mothersroom, changingstation, bidet, feminineproducts} = request.body;

  let SQLgrab = `SELECT votestotal,avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers FROM ${whichdb} WHERE id=${id}`;
  client.query(SQLgrab)
    .then ( results => {
      let grabbed = results.rows[0];
      console.log('(SQLgrab) grabbed: ',grabbed);
      
      // parse stringified numbers before calcs
      grabbed.avgtotal = parseFloat(grabbed.avgtotal);
      grabbed.avgclean = parseFloat(grabbed.avgclean);
      grabbed.avgeasytofind = parseFloat(grabbed.avgeasytofind);
      grabbed.notoiletpaper = parseFloat(grabbed.notoiletpaper);
      grabbed.notoiletseatcovers = parseFloat(grabbed.notoiletseatcovers);
      voteoverall = parseFloat(voteoverall);
      voteclean = parseFloat(voteclean);
      voteeasytofind = parseFloat(voteeasytofind);

      let avgtotal = (grabbed.avgtotal*grabbed.votestotal+voteoverall)/(grabbed.votestotal+1)
      let avgclean = (grabbed.avgclean*grabbed.votestotal+voteclean)/(grabbed.votestotal+1);
      let avgeasytofind = (grabbed.avgeasytofind*grabbed.votestotal+voteeasytofind)/(grabbed.votestotal+1);
      let notoiletpaper = (request.body.notoiletpaper !== 'on') ? grabbed.notoiletpaper : ((grabbed.notoiletpaper/100*grabbed.votestotal+1)/(grabbed.votestotal+1))*100;
      let notoiletseatcovers = (request.body.notoiletseatcovers !== 'on') ? grabbed.notoiletseatcovers : ((grabbed.notoiletseatcovers/100*grabbed.votestotal+1)/(grabbed.votestotal+1))*100;
      let votestotal = grabbed.votestotal + 1;
      let genderspecific = request.body.genderspecific ? true : false;
      let restingarea = request.body.restingarea ? true : false;
      let mothersroom = request.body.mothersroom ? true : false;
      let changingstation = request.body.changingstation ? true : false;
      let bidet = request.body.bidet ? true : false;
      let feminineproducts = request.body.feminineproducts ? true : false;
      let homedb = 'usertbl';
      let deadoralive = 'alive';

      let valuesupdate = [avgtotal, avgclean, avgeasytofind, notoiletpaper, notoiletseatcovers, genderspecific, restingarea, mothersroom, changingstation, bidet, feminineproducts, votestotal, homedb, deadoralive, id, name, vicinity,];
      let SQLupdate = 'UPDATE usertbl SET name=$16, vicinity=$17, avgtotal=$1,avgclean=$2,avgeasytofind=$3,notoiletpaper=$4,notoiletseatcovers=$5,genderspecific=$6,restingarea=$7,mothersroom=$8,changingstation=$9,bidet=$10,feminineproducts=$11,votestotal=$12,homedb=$13,deadoralive=$14 where id=$15;';
      if  (whichdb === 'apitbl'){
        let SQLadd = `INSERT INTO usertbl SELECT * FROM apitbl WHERE id=$1 returning id`;
        let valuesadd = [id];
        let SQLdelete = `DELETE FROM apitbl WHERE id=$1;`;
        let new_id;
        // console.log('', values);
        client.query(SQLadd,valuesadd)
          .then(results => {
            console.log('returned ID: ', results);
            // valuesupdate.push(results.rows[0].id);
            client.query(SQLdelete,valuesadd)
          }) 
          .then(() => {
            client.query(SQLupdate,valuesupdate)
              .then(response.redirect(('/')))
              .catch(error => handleError(error));
          })
      } else {
        console.log(`SQLupate: ${SQLupdate}`);
        console.log(`valuesupdate: `,valuesupdate);
        client.query(SQLupdate,valuesupdate)
          .then(response.redirect(('/')))
          .catch(error => handleError(error));
      }
    })
    .catch(error => handleError(error));
}

function addLav (request,response) {
  let {name,vicinity,voteoverall, voteclean, voteeasytofind, notoiletpaper, notoiletseatcovers, genderspecific, restingarea, mothersroom, changingstation, bidet, feminineproducts} = request.body;

  let avgtotal = voteoverall;
  let avgclean = voteclean;
  let avgeasytofind = voteeasytofind;
  notoiletpaper = notoiletpaper ? 100 : 0;
  notoiletseatcovers = notoiletseatcovers ? 100 : 0;
  let votestotal = 1;

  let values = [name,vicinity,avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers,genderspecific,restingarea,mothersroom,changingstation,bidet,feminineproducts,votestotal,'usertbl','alive'];
  let SQL = 'INSERT INTO usertbl (name,vicinity,avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers,genderspecific,restingarea,mothersroom,changingstation,bidet,feminineproducts,votestotal,homedb,deadoralive) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) returning id;';

  client.query(SQL,values)
    .then(response.redirect(('/')))
    .catch(error => handleError(error));
}




// REFRESH SANDBOX

app.get(('/refreshdb'), (request,response) => {
  console.log('refreshing...');
  getPlacesAPI()
})

const search_query = {
  location: [{
    lat: 47.6100898,
    lng: -122.3424699,
    radius: 1000,
    keyword: 'starbucks',
  }]
};

function getPlacesAPI () {
  fetchAPI(search_query)
    .then( rawData => makeLavsAPI(rawData) )
    .then( lavatories => {
      console.log('lavatories to DB: ',lavatories[0]);
      lavatories.forEach(lavatory => {
        const SQL = `INSERT INTO apitbl VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);`;
        const values = [lavatory.lat, lavatory.lng, lavatory.name, lavatory.vicinity, lavatory.deadoralive, lavatory.statusreason, lavatory.votestotal, lavatory.avgtotal, lavatory.avgclean, lavatory.avgeasytofind, lavatory.notoiletpaper, lavatory.notoiletseatcovers, lavatory.genderspecific, lavatory.restingarea, lavatory.mothersroom, lavatory.changingstation, lavatory.bidet, lavatory.feminineproducts, lavatory.homedb];
        client.query(SQL, values);
      })
    })
}


function fetchAPI (search_query) {
  console.log('search_query: ',search_query);
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${search_query.location[0].lat},${search_query.location[0].lng}&radius=${search_query.location[0].radius}&keyword=${search_query.location[0].keyword}&key=${process.env.GEOCODE_API_KEY}`;
  console.log('url: ',url);
  return superagent.get(url)
    .then ( apiData => {
      console.log('superagent results: ',apiData.body.results);
      return apiData.body.results;
    })
    .catch( error => handleError(error));
}



function makeLavsAPI (rawData) {
  let lavatories = [];
  rawData.forEach(location => {
    lavatories.push(new Lavatory(location));
  });
  console.log('lavatories.length',lavatories.length);
  return lavatories;
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
