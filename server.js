'use strict';

// get dependencies
const express = require ('express');
const ejs = require ('ejs');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');

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
