'use strict';

// user selects a lav from the displayed list
$('h4.picklav').on('click', function(event) {
  event.preventDefault();
  
  $(`.details`).css('display','none');
  let chosenlav = $(this).attr("id");
  $(`div#${chosenlav}`).css('display','block');

  console.log('picked: ', $(this))
  
});

// user selects 'add' from results view
// do not pre-populate 'add-update' form
$('#useradd').on('click', function(event) {
  event.preventDefault();

  $('#add-update-form').css('display','block');
});

// user selects 'delete' from lav details
$('#userdelete').on('click', function(event) {
  event.preventDefault();

});

// user selects 'update' from lav details
// pre-populate 'add-update' form
$('.userupdate').on('click', function(event) {
  event.preventDefault();

  $(`.details`).css('display','none');

  let selected = $(this).parent();

  $('input[name="name"]').val(selected.find('[name="name"]').text());
  $('input[name="vicinity"]').val(selected.find('[name="vicinity"]').text());

  
  let checks = ['genderspecific', 'restingarea', 'mothersroom', 'changingstation', 'bidet', 'feminineproducts'];


  checks.forEach( val  => {
    if ( selected.find(`[name="${val}"]`).text() === 'true') {
      console.log(`test: ${selected.find(`[name="${val}"]`).text()}`)
      console.log(`${val}: turn me on`);
      $(`input[name="${val}"]`).attr("checked", true);
    } else if ( !selected.find(`[name="${val}"]`).text() === 'false') {
      console.log(`${val}: shut me off`);
      $(`input[name="${val}"]`).attr("checked", false);
    } else {
      console.log('no change for ',val);
    }
    console.log(`${val}`, $(`input[name="${val}"]`));
  })


  // $('input[name="genderspecific"]').val( selected.find('[name="genderspecific"]').text() ? 'on' : 'off');
  // $('input[name="restingarea"]').val( selected.find('[name="restingarea"]').text() ? 'on' : 'off');
  // $('input[name="mothersroom"]').val( selected.find('[name="mothersroom"]').text() ? 'on' : 'off');
  // $('input[name="changingstation"]').val( selected.find('[name="changingstation"]').text() ? 'on' : 'off');
  // $('input[name="bidet"]').val( selected.find('[name="bidet"]').text() ? 'on' : 'off');
  // $('input[name="feminineproducts"]').val( selected.find('[name="feminineproducts"]').text() ? 'on' : 'off');
  
  $('#add-update-form').css('display','block');

})


