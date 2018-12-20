'use strict';

// DESCRIPTION:
// This function accepts the called function makeLavsAPI which returns constructed lavatories to populate into the apitbl

// INPUTS:
// the array (lavatories) of objects (new Lavatory) generated from makeLavsAPI

// OUTPUTS:
// DB results:  [ { API table data } ]

// DEPENDENCIES:
// makeLavsAPI.js = creates an array of new Lavatory objects
// postgres is needed to save to db

// CHANGE LOG:
// 12-19-2018 4:45pm (Meggan) Initial build.  



// FUNCTION:
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(er));

const makeLavsAPI = require('./makeLavsAPI');


function getPlacesAPI (makeLavsAPI) {
  makeLavsAPI.forEach(lavatory => {
    const SQL = `INSERT INTO apitbl VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);`;
    const values = [this.lat, this.lng, this.name, this.vicinity, this.deadoralive, this.statusreason, this.votestotal, this.avgtotal, this.avgclean, this.avgeasytofind, this.notoiletpaper, this.notoiletseatcovers, this.genderspecific, this.restingarea, this.mothersroom, this.changingstation, this.bidet, this.feminineproducts, this.homedb];

    client.query(SQL, values);
  });
};

module.exports = getPlacesAPI;

// TEST: (run in server.js to access DB)
// check if database is populated with new not seed data



