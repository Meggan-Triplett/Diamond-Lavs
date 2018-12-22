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
01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
This application is a the result of a collaborative effort by:
Ray Johnson - https://github.com/rjjohnson1204
Guru Batth - https://github.com/GurinderB
Meggan Triplett - https://github.com/Megga-Miister
Gwen Zubatch - https://github.com/GwennyB

<!-- 
Clearly defined API endpoints with sample responses
## Resources  

Utilized https://www.w3schools.com/ for CSS examples and resources.
