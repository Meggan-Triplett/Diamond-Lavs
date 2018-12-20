'use strict';

// DESCRIPTION:
// This function accepts a user inputs for existing lavs and deletes a lavatory. 
// If the lav lives in the 'api' table, record is copied to 'user' with updates, and deleted from 'api'.

// INPUTS:
// (request, response) request.body/.params  -  format: '<see EJS for integ>'

// OUTPUTS:
// DB updates and redirect to home

// CHANGE LOG:
// 12-17-2018 6:15pm (Gwen) Initial build and test.
// 12-18-2018 11:00 (Guru) Intial build and test. Code used from Gwen's updateLav function and updated to perform delete.


// FUNCTION:
function deleteLav(request, response) {
  let id = request.params.split('-')[0];
  let homedb = request.params.split('-')[1];
  if  (homedb = 'api'){
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


// TEST:
// N/A - check DB

