'use strict';

// user selects a lav from the displayed list
$('h4.picklav').on('click', function(event) {
  event.preventDefault();
  
  $('.details').css('display','none');
  let chosenlav = $(this).attr("id");
  $(`div#${chosenlav}`).css('display','block');
  $('form').css('display','none');

});

// user selects 'add' from results view
// do not pre-populate 'add-update' form
$('#useradd').on('click', function(event) {
  event.preventDefault();

  $('.details').css('display','none');
  $('form').css('display','none');

  $('#add-update-form').css('display','block');
  
});

// user selects 'delete' from lav details
$('.userdelete').on('click', function(event) {
  event.preventDefault();

  $('.details').css('display','none');
  $('form').css('display','none');

  let selected = $(this).parent();

  $('p[name="id"]').val(selected.attr("id").split('-')[0]);
  // console.log('id: ', $('p[name="id"]').val());
  $('p[name="homedb"]').val(selected.attr("id").split('-')[1]);
  // console.log('homedb: ', $('p[name="homedb"]').val());
  $('#delete-form').css('display','block');

});

// user selects 'update' from lav details
// pre-populate 'add-update' form
$('.userupdate').on('click', function(event) {
  event.preventDefault();

  $('.details').css('display','none');
  $('form').css('display','none');

  let selected = $(this).parent();

  $('input[name="name"]').val(selected.find('[name="name"]').text());
  $('input[name="vicinity"]').val(selected.find('[name="vicinity"]').text());
  $('p[name="id"]').val(selected.find('[name="id"]').text());
  $('p[name="homedb"]').val(selected.find('[name="homedb"]').text());

  
  let checks = ['genderspecific', 'restingarea', 'mothersroom', 'changingstation', 'bidet', 'feminineproducts'];

  checks.forEach( val  => {
    if ( selected.find(`[name="${val}"]`).text() === 'true') {
      $(`input[name="${val}"]`).attr("checked", true);
    } else if ( !selected.find(`[name="${val}"]`).text() === 'false') {
      $(`input[name="${val}"]`).attr("checked", false);
    } else {
    }
    // console.log(`${val}`, $(`input[name="${val}"]`));
  })

  $('#add-update-form').css('display','block');

})


