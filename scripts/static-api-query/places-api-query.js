'use strict';

// This is the object that gets used to feed the query parameters for the Google Places API
// These key value pairs will go on to populate the API DB in the getPlacesAPI function
// lat/lng should indicate which centerpoint (ideally which neighborhood) to run a search of restrooms for 
// radius will indicate the breadth of the search area
// keyword will indicate what business/places with known public restrooms that are being search for in that area

const search_query = {
  location: [{
    lat: 47.6100898,
    lng: -122.3424699,
    radius: 5000,
    keyword: ['Starbucks'],
  }]
};