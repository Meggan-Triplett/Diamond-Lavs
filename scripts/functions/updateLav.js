'use strict';

// DESCRIPTION:
// This function accepts a user inputs for existing lavs and updates the 'user' table accordingly. 
// If the lav lives in the 'api' table, record is copied to 'user' with updates, and deleted from 'api'.

// INPUTS:
// (request, response) request.body/.params  -  format: '<see EJS for integ>'

// OUTPUTS:
// DB updates and redirect to home

// CHANGE LOG:
// 12-17-2018 6:15pm (Gwen) Initial build and test.


// FUNCTION:

function updateLav (request,response) {
  let id = request.params.split('-')[0];
  let homedb = request.params.split('-')[1];
  let {voteoverall, voteclean, voteeasytofind, notoiletpaper, notoiletseatcovers, genderspecific, restingarea, mothersroom, changingstation, bidet, feminineproducts} = request.body;

  let avgtotal = `${(avgtotal*votestotal+voteoverall)/(votestotal+1)}`;
  let avgclean = `${(avgtotal*votestotal+voteclean)/(votestotal+1)}`;;
  let avgeasytofind = `${(avgtotal*votestotal+voteeasytofind)/(votestotal+1)}`;
  notoiletpaper = `${(notoiletpaper/100*votestotal+notoiletpaper)*100}`;
  notoiletseatcovers = `${(notoiletseatcovers/100*votestotal+$5)*100}`;
  let votestotal = `${votestotal+1}`;

  let values = [avgtotal,avgclean,avgeasytofind,notoiletpaper,notoiletseatcovers,genderspecific,restingarea,mothersroom,changingstation,bidet,feminineproducts,votestotal,'usertbl','alive',id];

  if  (homedb = 'api'){
    let SQLadd = `INSERT INTO usertbl SELECT * FROM api WHERE id=$1`
    let SQLdelete = `DELETE FROM apitbl WHERE id=$1;`;
    let values = [id];
    // console.log('', values);
    client.query(SQLadd, values)
      .then(client.query(SQLdelete,values)) 
      .then(() => {
        let SQLupdate = 'UPDATE userbl SET avgtotal=$1,avgclean=$2,avgeasytofind=$3,notoiletpaper=$4,notoiletseatcovers=$5,genderspecific=$6,restingarea=$7,mothersroom=$8,changingstation=$9,bidet=$10,feminineproducts=$11,votestotal=$12,homedb=$13,deadoralive=$14 where id=$13;';
        client.query(SQL,values)
          .then(response.redirect(('/')))
          .catch(error => handleError(error));

  client.query(SQL,values);
}



// TEST:
// N/A - check DB


