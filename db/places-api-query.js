'use strict';

// This is the object that gets used to feed the query parameters for the Google Places API
// These key value pairs will go on to populate the API DB in the getPlacesAPI function
// lat/lng should indicate which centerpoint (ideally which neighborhood) to run a search of restrooms for 
// radius will indicate the breadth of the search area
// keyword will indicate what business/places with known public restrooms that are being search for in that area

const search_query = require('./places-api-query.js');

const search_query = {
  location: [
    // 47.647869,-122.398027
    {lat: 47.647869, lng: -122.398027, radius: 2000, keyword: ['starbucks']},
    {lat: 47.647869, lng: -122.398027, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.638886,-122.362216
    {lat: 47.638886, lng: -122.362216, radius: 2000, keyword: ['starbucks']},
    {lat: 47.638886, lng: -122.362216, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.616604,-122.334308
    {lat: 47.616604, lng: -122.334308, radius: 2000, keyword: ['starbucks']},
    {lat: 47.616604, lng: -122.334308, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.639242,-122.317306
    {lat: 47.639242, lng: -122.317306, radius: 2000, keyword: ['starbucks']},
    {lat: 47.639242, lng: -122.317306, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.632882,-122.276772
    {lat: 47.632882, lng: -122.276772, radius: 2000, keyword: ['starbucks']},
    {lat: 47.632882, lng: -122.276772, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.617142, -122.306478
    {lat: 47.617142, lng: -122.306478, radius: 2000, keyword: ['starbucks']},
    {lat: 47.617142, lng: -122.306478, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.602072, -122.327251
    {lat: 47.602072, lng: -122.327251, radius: 2000, keyword: ['starbucks']},
    {lat: 47.602072, lng: -122.327251, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.601724, -122.300822
    {lat: 47.601724, lng: -122.300822, radius: 2000, keyword: ['starbucks']},
    {lat: 47.601724, lng: -122.300822, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.585747, -122.323477
    {lat: 47.585747, lng: -122.323477, radius: 2000, keyword: ['starbucks']},
    {lat: 47.585747, lng: -122.323477, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.656446, -122.308194
    {lat: 47.656446, lng: -122.308194, radius: 2000, keyword: ['starbucks']},
    {lat: 47.656446, lng: -122.308194, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.661758, -122.278160
    {lat: 47.661758, lng: -122.278160, radius: 2000, keyword: ['starbucks']},
    {lat: 47.661758, lng: -122.278160, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.657364, -122.340125
    {lat: 47.657364, lng: -122.340125, radius: 2000, keyword: ['starbucks']},
    {lat: 47.657364, lng: -122.340125, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.671471, -122.329832
    {lat: 47.671471, lng: -122.329832, radius: 2000, keyword: ['starbucks']},
    {lat: 47.671471, lng: -122.329832, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.666847, -122.361415
    {lat: 47.666847, lng: -122.361415, radius: 2000, keyword: ['starbucks']},
    {lat: 47.666847, lng: -122.361415, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.678053, -122.389065
    {lat: 47.678053, lng: -122.389065, radius: 2000, keyword: ['starbucks']},
    {lat: 47.678053, lng: -122.389065, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.695271, -122.388714
    {lat: 47.695271, lng: -122.388714, radius: 2000, keyword: ['starbucks']},
    {lat: 47.695271, lng: -122.388714, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.695823, -122.357482
    {lat: 47.695823, lng: -122.357482, radius: 2000, keyword: ['starbucks']},
    {lat: 47.695823, lng: -122.357482, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.695823, -122.357482
    {lat: 47.695823, lng: -122.357482, radius: 2000, keyword: ['starbucks']},
    {lat: 47.695823, lng: -122.357482, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.682054, -122.299226
    {lat: 47.682054, lng: -122.299226, radius: 2000, keyword: ['starbucks']},
    {lat: 47.682054, lng: -122.299226, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.571600, -122.384542
    {lat: 47.571600, lng: -122.384542, radius: 2000, keyword: ['starbucks']},
    {lat: 47.571600, lng: -122.384542, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.563633, -122.323929
    {lat: 47.563633, lng: -122.323929, radius: 2000, keyword: ['starbucks']},
    {lat: 47.563633, lng: -122.323929, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.550088, -122.375804
    {lat: 47.550088, lng: -122.375804, radius: 2000, keyword: ['starbucks']},
    {lat: 47.550088, lng: -122.375804, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.541986, -122.338071
    {lat: 47.541986, lng: -122.338071, radius: 2000, keyword: ['starbucks']},
    {lat: 47.541986, lng: -122.338071, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.571108, -122.281234
    {lat: 47.571108, lng: -122.281234, radius: 2000, keyword: ['starbucks']},
    {lat: 47.571108, lng: -122.281234, radius: 2000, keyword: ['mcdonald\'s']},
    // 47.549872, -122.295627
    {lat: 47.549872, lng: -122.295627, radius: 2000, keyword: ['starbucks']},
    {lat: 47.549872, lng: -122.295627, radius: 2000, keyword: ['mcdonald\'s']},    
  ]
};

module.exports = search_query;
