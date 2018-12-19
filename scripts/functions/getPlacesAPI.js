'use strict';

// DESCRIPTION:
// This function accepts the called function makeLavsAPI which returns constructed lavatories to populate into the apitbl

// INPUTS:
// the array (lavatories) of objects (new Lavatory) generated from makeLavsAPI

// OUTPUTS:
// DB results:  [ { API table data } ]

// DEPENDENCIES:
// makeLavsAPI.js = creates an array of new Lavatory objects

// CHANGE LOG:
// 12-17-2018 4:00am (Meggan) Initial build.  



// FUNCTION:
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(er));

const makeLavsAPI = require('./makeLavsAPI');

function getPlacesAPI (makeLavsAPI) {
  makeLavsAPI();
  save: function() {
    const SQL = `INSERT INTO apitbl (lat, lng, name, vicinity, deadOrAlive, statusReason, votesTotal, votesClean, avgTotal, avgClean, avgEasyToFind, noToiletPaper, noToiletSeatCovers, genderSpecific, restingArea, mothersRoom, changingStation, bidet, feminineProducts, homeDB) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) ON CONFLICT DO NOTHING RETURNING id;`;
    const values = [this.lat, this.lng, this.name, this.vicinity, this.deadOrAlive, this.statusReason, this.votesTotal, this.avgTotal, this.avgClean, this.avgEasyToFind, this.noToiletPaper, this.noToiletSeatCovers, this.genderSpecific, this.restingArea, this.mothersRoom, this.changingStation, this.bidet, this.feminineProducts, this.homeDB];
  
    client.query(SQL, values);
  };
};

// TEST: (run in server.js to access DB)
// check if database is populated with new not seed data



