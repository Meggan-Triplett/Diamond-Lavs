# Lav Nav
Find public restrooms nearby

**Author**: Guru Batth, Gwen Zubatch, Meggan Triplett & Ray Johnson
**Version**: 5.1.1

## Overview
This app will allow users to enter their location and find nearby public bathrooms they can use. Users will be able to add new public restrooms to the database. Users will also be able to rate the bathroom on cleanliness, accessibility, and mark down any additional features. Such as if there is a baby changing station. API sources will be utilized to grab location data and existing restrooms.

We hope to provide an answer to the age old question of, where is the nearest restroom?

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

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
  Superagent - middlware for handling API calls
  EJS - templating engine
  Postgres - database environment
  Method Override - expands functionality to full CRUD
  cors - cross-domain sharing
  dotenv - environment variables manager


## Change Log
01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
Give credit (and a link) to other people or resources that helped you build this application.


<!-- 
The name of the project
Names of the team members
A description of the project
The overall problem domain and how the project solves those problems
Semantic versioning, beginning with version 1.0.0 and incremented as changes are made
A list of any libraries, frameworks, or packages that your application requires in order to properly function
Instructions that the user may need to follow in order to get your application up and running on their own computer
Clearly defined API endpoints with sample responses
Clearly defined database schemas --> 