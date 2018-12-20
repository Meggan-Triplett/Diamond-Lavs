const 


const search_query = {
  location: [{
    lat: 47.6100898,
    lng: -122.3424699,
    radius: 5000,
    keyword: ['starbucks'],
  }]
};


function fetchAPI (search_query) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${search_query.location.lat},${search_query.location.lng}&radius=${search_query.location.radius}&keyword=${search_query.location.keyword}&key=${process.env.GEOCODE_API_KEY}`;
  return superagent.get(url)
    .then ( apiData => {
      return apiData;
    })
    .catch( error => handleError(error));
}



function makeLavsAPI (fetchAPI) {
  let lavatories = [];
  fetchAPI.forEach(location => {
    lavatories.push(new Lavatory(location));
  });
  return lavatories;
};


function getPlacesAPI (makeLavsAPI) {
  save: makeLavsAPI.forEach(lavatory => {
    const SQL = `INSERT INTO apitbl VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);`;
    const values = [this.lat, this.lng, this.name, this.vicinity, this.deadoralive, this.statusreason, this.votestotal, this.avgtotal, this.avgclean, this.avgeasytofind, this.notoiletpaper, this.notoiletseatcovers, this.genderspecific, this.restingarea, this.mothersroom, this.changingstation, this.bidet, this.feminineproducts, this.homedb];

    client.query(SQL, values);
  });
};


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

