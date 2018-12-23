# Lav Nav
Find public restrooms nearby

**Author**: Guru Batth, Gwen Zubatch, Meggan Triplett & Ray Johnson
**Version**: 5.1.1

## Overview
This app allows users to enter their location and find nearby public bathrooms they can use. Users can add new public restrooms to the database. Users can also rate the bathroom on cleanliness, accessibility, and mark down any additional features. API sources will be utilized to grab location data and existing restrooms.

We hope to provide an answer to the age old question of, where is the nearest restroom?

## Getting Started
Back end:
Build a basic Express server with dependencies listed in Architecture (below). Include routes with the following callbacks:
'/' - Render index.ejs, and include (partial) address input form (single input with submit button, routes to /searchresults).
'/searchresults' - Send user's search to Google's Geocoding API to retrieve user's lat/lng. Query the database (see Architecture below) for records with lat/lng within small radius (.0005). Sort results by nearest lat/lng (use Pythagorean Theorem to calculate distances), and push the 5 closest into an array. Render index.ejs, and include partials for location details, add/update form (methods: POST/PUT), and delete form (method: PUT). The location details partial is a div with text tags to contain all data for a single location - include forEach in locations array and inject the location data into each on render (include database ID in hidden tag). The forms should remain blank until the user selects which location to manipulate.
'/error' - Render index.ejs with a partial including an error message. Use this route to redirect for all .catch.
'/addLav' - Call Geocoding API for lat/lng of new location based on user's address/vicinity input. Insert user's inputs with lat/lng into the user-sourced DB table. Redirect to '/'.
'/deleteLav' - If record is from API-sourced table: move the record to the user-sourced table. Once in user-sourced table: change its status to 'dead', and insert the user's selected reason into the designated column. Redirect to '/'.
'/updateLav' - Update columns for selected record. Again, if record is from the API-sourced table, move it to the user-sourced table first. Columns that average user inputs (ie - votes, % of users reporting no toilet paper, etc) require math processing using total votes prior to input, and total votes must also be updated with each vote.
'/refreshdb' - (This route is intended for website maintenance, not for user access.) Call Google Places API for locations to seed the database. The API returns only 20 results per search, and each request includes a centerpoint (lat/lng), a radius, and a search keyword. Select centerpoints, radii, and search keywords such that the expected results list will be around 20 (ex: a smaller radius for searching 'starbucks' in the middle of Seattle where their population is dense, a larger radius for searching 'starbucks' in Bellingham where their population is less dense). Use a constructor to distill and condition the results for DB storage (ie - content and data formats), and insert the results into the DB's table for API-sourced data.
Database: Build in a SQL database (use Postgres or similar) with 2 tables - one to hold API-sourced 'seed' data, and one to hold user-sourced and modified records. Both should contain the same columns:
  id SERIAL PRIMARY KEY,
  lat VARCHAR(255),
  lng VARCHAR(255),
  name VARCHAR(255),
  vicinity VARCHAR(255),
  deadoralive VARCHAR(255),
  statusreason VARCHAR(255),
  votestotal INTEGER,
  avgtotal NUMERIC(2,1),
  avgclean NUMERIC(2,1),
  avgeasytofind NUMERIC(2,1),
  notoiletpaper NUMERIC(3),
  notoiletseatcovers NUMERIC(3),
  genderspecific BOOLEAN,
  restingarea BOOLEAN,
  mothersroom BOOLEAN,
  changingstation BOOLEAN,
  bidet BOOLEAN,
  feminineproducts BOOLEAN,
  homedb VARCHAR(10)
Note that SQL stores numbers as strings, so they must be parsed on retrieval before performing calculations with them.

Front end:
Since most of the rendering is server-side, the front end needs only an app for event handling, DOM manipulation, data scraping, and map rendering. 
Set event listeners on each of the 5 listed results - callback should display its 'location details' div. Set event listeners on 'Add' element (in index.ejs) and on 'location details' elements for 'Update' and 'Delete' - callbacks for each should display the appropriate form. For 'Update', callback should scrape data from the 'location details' div and pre-populate the form (including database ID and table). 
Render map with pins using lat/lng in hidden p-tags in 'location details' divs. Map rendering instructions are at Google Maps Javascript API's developer's guide:  https://developers.google.com/maps/documentation/javascript/tutorial

## Architecture
This application accepts user free-form input of current location, returns a fully rendered package containing data about the 5 nearest restroom locations, and client-renders a map with pins indicating the user's location and the locations of the 5 restrooms.

Client: Client-side consists only of an app (JS/JQuery) to handle events and render the map. The rendered package delivered after a query contains all forms and divs needed for user interface (ie - showing details for a location, updating or deleting a location, adding a new location).

Server: The express/nodeJS server includes routes for:
  '/' - home
  '/searchresults' - display request results
  '/error' - display error page
  '/refreshdb' - re-seed database
On query, it requests lat/long data from Google's Geocoding API, and it queries the local database for restroom locations nearby (sorted distances by lat/long). The query results are injected into HTML templates (using EJS as templating engine) - including detail sheets for each location and forms for user actions (all provisions required for user interaction with those locations).

Database: The database contains 2 tables - 1 for user-sourced data, and 1 for API-sourced 'seed' data.  The API-sourced table is occasionally refreshed with name, vicinity, lat, long data from Google Places API. Refresh runs a series of requests for specified lat/lng centerpoints, radii, and keywords (currently 'starbucks' and 'mcdonald\'s'). When a user updates an API-sourced record, it is moved to the user-sourced table along with the user's input. The API table refresh repopulates with all API-returned records, with no duplication check.

Dependencies:
  Express - server environment
  Superagent - middleware for handling API calls
  EJS - templating engine
  Postgres - database environment
  Method Override - expands functionality to full CRUD
  cors - cross-domain sharing
  dotenv - environment variables manager


## Change Log
12-15-2018 1:45pm - Added user stories and planning phase docs in wip
12-16-2018 11:15am - Added architecture and wireframes
12-17-2018 1:15pm - Scripts and partials directories built out. Planning phase docs completed. Basic server running with needed dependencies all added. Lavatory constructor created. Heroku set up.
12-17-2018 6:15pm - EJS partials built out. SQL database set up, Lavtory constructor adjusted to accept correct data types. Buttons added for ui. Functions to call geocode API return results and find closest bathrooms in comparasion to user location: fetchLocation, lookup, getLavs and makeLavs added. 
12-18-2018 1:15pm - Updated EJS partials, add get/ route to render home page, render map with user current location search, updated db structure and added seed data. 
12-18-2018 6:15pm - fetchAPI to call Places API added. Updated server.js to run all existing functions. Updated all existing functions due to issue with datatypes used in db.
12-19-2018 1:15pm  - Function makeLavsAPI added to use Lavatory constructor to structure raw data form the Places API. Updated .ejs and DB columns to reflect only necessary data.
12-19-2018 6:15pm - Base deleteLav function created. Base getPlacesAPI to populate lavatory locations. Wired all front in files to properly render. 
12-20-2018 1:15pm - Updated add update and delete functions. Fonts added to front end. Added location pins to map. Fixed the refreshdb to run a local database refresh. Basic styling added.
12-20-2018 6:15pm - Fixed database logic issues with all functions that used the Places API. Corrected datatype issues when moving lavatory data from apitbl to usertbl. Added query parameters to generate all seed locations for the apitbl.
12-21-2018 - Finalized css styles. Added loop to run all Places API queries. Fixed addLav retrival issue.



## Credits and Collaborations
This application is a the result of a collaborative effort by:
Ray Johnson - https://github.com/rjjohnson1204
Guru Batth - https://github.com/GurinderB
Meggan Triplett - https://github.com/Megga-Miister
Gwen Zubatch - https://github.com/GwennyB

<!-- <!-- 
Clearly defined API endpoints with sample responses -->
## Resources  

Google GeoCoding API: https://developers.google.com/maps/documentation/geocoding/intro
  Sample Geocoding Request: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&    key=YOUR_API_KEY

  Sample Geocoding Response: {
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "1600",
               "short_name" : "1600",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Amphitheatre Pkwy",
               "short_name" : "Amphitheatre Pkwy",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Santa Clara County",
               "short_name" : "Santa Clara County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "California",
               "short_name" : "CA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "94043",
               "short_name" : "94043",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
         "geometry" : {
            "location" : {
               "lat" : 37.4224764,
               "lng" : -122.0842499
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 37.4238253802915,
                  "lng" : -122.0829009197085
               },
               "southwest" : {
                  "lat" : 37.4211274197085,
                  "lng" : -122.0855988802915
               }
            }
         },
         "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
}

Google Places API: https://developers.google.com/places/web-service/search
  Sample Nearby Search Request: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
  Sample Nearby Search Response: {
   "html_attributions" : [],
   "results" : [
      {
         "geometry" : {
            "location" : {
               "lat" : -33.870775,
               "lng" : 151.199025
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
         "id" : "21a0b251c9b8392186142c798263e289fe45b4aa",
         "name" : "Rhythmboat Cruises",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 270,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8",
               "width" : 519
            }
         ],
         "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
         "scope" : "GOOGLE",
         "alt_ids" : [
            {
               "place_id" : "D9iJyWEHuEmuEmsRm9hTkapTCrk",
               "scope" : "APP"
            }
         ],
         "reference" : "CoQBdQAAAFSiijw5-cAV68xdf2O18pKIZ0seJh03u9h9wk_lEdG-cP1dWvp_QGS4SNCBMk_fB06YRsfMrNkINtPez22p5lRIlj5ty_HmcNwcl6GZXbD2RdXsVfLYlQwnZQcnu7ihkjZp_2gk1-fWXql3GQ8-1BEGwgCxG-eaSnIJIBPuIpihEhAY1WYdxPvOWsPnb2-nGb6QGhTipN0lgaLpQTnkcMeAIEvCsSa0Ww",
         "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
         "vicinity" : "Pyrmont Bay Wharf Darling Dr, Sydney"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.866891,
               "lng" : 151.200814
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "45a27fd8d56c56dc62afc9b49e1d850440d5c403",
         "name" : "Private Charter Sydney Habour Cruise",
         "photos" : [
            {
               "height" : 426,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAAL3n0Zu3U6fseyPl8URGKD49aGB2Wka7CKDZfamoGX2ZTLMBYgTUshjr-MXc0_O2BbvlUAZWtQTBHUVZ-5Sxb1-P-VX2Fx0sZF87q-9vUt19VDwQQmAX_mjQe7UWmU5lJGCOXSgxp2fu1b5VR_PF31RIQTKZLfqm8TA1eynnN4M1XShoU8adzJCcOWK0er14h8SqOIDZctvU",
               "width" : 640
            }
         ],
         "place_id" : "ChIJqwS6fjiuEmsRJAMiOY9MSms",
         "scope" : "GOOGLE",
         "reference" : "CpQBhgAAAFN27qR_t5oSDKPUzjQIeQa3lrRpFTm5alW3ZYbMFm8k10ETbISfK9S1nwcJVfrP-bjra7NSPuhaRulxoonSPQklDyB-xGvcJncq6qDXIUQ3hlI-bx4AxYckAOX74LkupHq7bcaREgrSBE-U6GbA1C3U7I-HnweO4IPtztSEcgW09y03v1hgHzL8xSDElmkQtRIQzLbyBfj3e0FhJzABXjM2QBoUE2EnL-DzWrzpgmMEulUBLGrtu2Y",
         "types" : [ "restaurant", "food", "establishment" ],
         "vicinity" : "Australia"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.870943,
               "lng" : 151.190311
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "30bee58f819b6c47bd24151802f25ecf11df8943",
         "name" : "Bucks Party Cruise",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 600,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAA48AX5MsHIMiuipON_Lgh97hPiYDFkxx_vnaZQMOcvcQwYN92o33t5RwjRpOue5R47AjfMltntoz71hto40zqo7vFyxhDuuqhAChKGRQ5mdO5jv5CKWlzi182PICiOb37PiBtiFt7lSLe1SedoyrD-xIQD8xqSOaejWejYHCN4Ye2XBoUT3q2IXJQpMkmffJiBNftv8QSwF4",
               "width" : 800
            }
         ],
         "place_id" : "ChIJLfySpTOuEmsRsc_JfJtljdc",
         "scope" : "GOOGLE",
         "reference" : "CoQBdQAAANQSThnTekt-UokiTiX3oUFT6YDfdQJIG0ljlQnkLfWefcKmjxax0xmUpWjmpWdOsScl9zSyBNImmrTO9AE9DnWTdQ2hY7n-OOU4UgCfX7U0TE1Vf7jyODRISbK-u86TBJij0b2i7oUWq2bGr0cQSj8CV97U5q8SJR3AFDYi3ogqEhCMXjNLR1k8fiXTkG2BxGJmGhTqwE8C4grdjvJ0w5UsAVoOH7v8HQ",
         "types" : [ "restaurant", "food", "establishment" ],
         "vicinity" : "37 Bank St, Pyrmont"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.867591,
               "lng" : 151.201196
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
         "id" : "a97f9fb468bcd26b68a23072a55af82d4b325e0d",
         "name" : "Australian Cruise Group",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 242,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAABjeoPQ7NUU3pDitV4Vs0BgP1FLhf_iCgStUZUr4ZuNqQnc5k43jbvjKC2hTGM8SrmdJYyOyxRO3D2yutoJwVC4Vp_dzckkjG35L6LfMm5sjrOr6uyOtr2PNCp1xQylx6vhdcpW8yZjBZCvVsjNajLBIQ-z4ttAMIc8EjEZV7LsoFgRoU6OrqxvKCnkJGb9F16W57iIV4LuM",
               "width" : 200
            }
         ],
         "place_id" : "ChIJrTLr-GyuEmsRBfy61i59si0",
         "scope" : "GOOGLE",
         "reference" : "CoQBeQAAAFvf12y8veSQMdIMmAXQmus1zqkgKQ-O2KEX0Kr47rIRTy6HNsyosVl0CjvEBulIu_cujrSOgICdcxNioFDHtAxXBhqeR-8xXtm52Bp0lVwnO3LzLFY3jeo8WrsyIwNE1kQlGuWA4xklpOknHJuRXSQJVheRlYijOHSgsBQ35mOcEhC5IpbpqCMe82yR136087wZGhSziPEbooYkHLn9e5njOTuBprcfVw",
         "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
         "vicinity" : "32 The Promenade, King Street Wharf 5, Sydney"
      }
   ],
   "status" : "OK"
}


Google Maps API: https://developers.google.com/maps/documentation/javascript/tutorial
  Sample Javascript API Script to Build Map/Request: 
    <!--<html>
      <head>
        <title>Simple Map</title>
        <meta name="viewport" content="initial-scale=1.0">
        <meta charset="utf-8">
        <style>
          /* Always set the map height explicitly to define the size of the div
          * element that contains the map. */
          #map {
            height: 100%;
          }
          /* Optional: Makes the sample page fill the window. */
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map;
          function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -34.397, lng: 150.644},
              zoom: 8
            });
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        async defer></script>
      </body>
    </html> -->
  Sample JavaScript API Response:
    View - Google Maps JavaScript API Sample Response.JPG


Utilized https://www.postgresql.org/ for SQL queries and data types.
Utilized https://www.w3schools.com/ for CSS examples and resources.
