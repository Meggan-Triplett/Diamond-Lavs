'use strict';

// user selects a lav from the displayed list
$('h4.picklav').on('click', function(event) {
  event.preventDefault();
  console.log('h4.picklav clicked');
  // hide all forms and details
  $('.details').css('display','none');
  let chosenlav = $(this).attr("id");
  $('form').css('display','none');
  // show details for selected lav
  $(`div#${chosenlav}`).css('display','block');

});

// user selects 'delete' from lav details
$('.userdelete').on('click', function(event) {

  event.preventDefault();
  console.log('userdelete clicked');

  $('.details').css('display','none');
  $('form').css('display','none');

  let selected = $(this).parent();
  $('p[name="id"]').val(selected.attr(`${selected.attr("id")}`));

  $('#delete-form').attr('action', `/deleteLav/${selected.attr("id")}`);
  console.log('form: ', $('#delete-form'));

  $('#delete-form').css('display','block');

});

// user selects 'add' from results view
// do not pre-populate 'add-update' form
$('#useradd').on('click', function(event) {
  event.preventDefault();

  $('.details').css('display','none');
  $('form').css('display','none');

  $('#add-update-form').attr('action', `/addLav`);
  $('#form-method').val('post');
  $('#add-update-form').attr('method', 'post');
  console.log('add form method: ',  $('#add-update-form').attr('method'));


  $('#add-update-form').css('display','block');
  
});

// user selects 'update' from lav details
// pre-populate 'add-update' form
$('.userupdate').on('click', function(event) {
  event.preventDefault();

  $('.details').css('display','none');
  $('form').css('display','none');

  let selected = $(this).parent();

  $('#add-update-form').attr('action', `/updateLav/${selected.attr("id")}`);
  $('#add-update-form').attr('method', 'post');
  $('#form-method').val('put');

  console.log('form: ', $('#add-update-form'));

  $('input[name="name"]').val(selected.find('[name="name"]').text());
  $('input[name="vicinity"]').val(selected.find('[name="vicinity"]').text());
  $('input[name="votestotal"]').val(selected.find('[name="votestotal"]').attr("value"));
  $('input[name="avgtotal"]').val(selected.find('[name="avgtotal"]').text());
  $('input[name="avgclean"]').val(selected.find('[name="avgclean"]').text());
  $('input[name="avgeasytofind"]').val(selected.find('[name="avgeasytofind"]').text());

  console.log('avgtotal: ',selected.find('[name="avgtotal"]').text());
  
  let checks = ['genderspecific', 'restingarea', 'mothersroom', 'changingstation', 'bidet', 'feminineproducts'];

  checks.forEach( val  => {
    if ( selected.find(`[name="${val}"]`).text() === 'true') {
      $(`input[name="${val}"]`).attr("checked", true);
    } else {
      $(`input[name="${val}"]`).attr("checked", false);
    }
    // console.log(`${val}`, $(`input[name="${val}"]`));
  })

  $('#add-update-form').css('display','block');

})


// draw map
var lavs = [ ['',0,0],['',0,0],['',0,0],['',0,0],['',0,0] ];

for (var i = 0; i<5; i++) {
  lavs[i][0] = $(`.details:eq(${i})`).find('[name="name"]').text();
  lavs[i][1] = parseFloat($(`.details:eq(${i})`).find('[name="lat"]').attr("value"));
  lavs[i][2] = parseFloat($(`.details:eq(${i})`).find('[name="lng"]').attr("value"));
}
console.log('lavs: ',lavs);


function initMap() {
  
  console.log('lavs[0].lat: ',lavs[0][1]);
  var mylocation = {lat: parseFloat($('#mylat').text()), lng: parseFloat($('#mylng').text()) }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(mylocation.lat, mylocation.lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  var infowindow = new google.maps.InfoWindow();
  
  var marker;
  
  for (var i = 0; i < lavs.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lavs[i][1], lavs[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(lavs[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

}





