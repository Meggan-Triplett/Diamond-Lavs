'use strict';
// get dependencies
const express = require ('express');
const ejs = require ('ejs');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

app.use(cors());


// set environment vars
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// use PUT and DELETE
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// add client routes here

// add client-facing function calls here


// add route for DB refresh here

// add DB refresh function calls here


// connect DB client
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));



app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

function getLocation(request, response) {
  Location.lookupLocation({
    tableName: Location.tableName,

    query: request.query.data,

    cacheHit: function(result) {
      response.send(result.rows[0]);
    },

    cacheMiss: function() {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.query}&key=${process.env.GEOCODE_API_KEY}`;

      return superagent.get(url)
        .then(result => {
          const location = new Location(this.query, result);
          // location.save()
            // .then(location => response.send(location));
        })
        .catch(error => handleError(error));
    }
  })
}

function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

function Location(query, res) {
  this.search_query = query;
  // this.formatted_query = res.body.results[0].formatted_address;
  // this.latitude = res.body.results[0].geometry.location.lat;
  // this.longitude = res.body.results[0].geometry.location.lng;
  this.created_at = Date.now();
}

Location.lookupLocation = (location) => {
  const SQL = ``;
  const values = [location.query];

  return client.query(SQL, values)
    .then(result => {
      if(result.rowCount > 0) {
        location.cacheHit(result);
      } else {
        location.cacheMiss();
      }
    })
    .catch(console.error);
}

app.get('/', getLocation);
