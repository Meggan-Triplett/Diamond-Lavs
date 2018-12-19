DROP TABLE IF EXISTS backuptbl;

SELECT * INTO backuptbl FROM apitbl;

DROP TABLE IF EXISTS apitbl;

CREATE TABLE apitbl (
  id SERIAL PRIMARY KEY,
  lat FLOAT(53),
  lng FLOAT(53),
  name VARCHAR(255),
  vicinity VARCHAR(255),
  deadOrAlive VARCHAR(255),
  statusReason VARCHAR(255),
  votesTotal INTEGER,
  avgTotal NUMERIC(2,1),
  avgClean NUMERIC(2,1),
  avgEasyToFind NUMERIC(2,1),
  noToiletPaper NUMERIC(3),
  noToiletSeatCovers NUMERIC(3),
  genderSpecific BOOLEAN,
  restingArea BOOLEAN,
  mothersRoom BOOLEAN,
  changingStation BOOLEAN,
  bidet BOOLEAN,
  feminineProducts BOOLEAN,
  homeDB VARCHAR(10)
);

INSERT INTO apitbl (lat, lng, name, vicinity, deadOrAlive, statusReason, votesTotal, votesClean, votesEasyToFind, avgVotesTotal, avgVotesClean, avgVotesEasyToFind, noToiletPaper, noToiletSeatCovers, genderSpecific, restingArea, mothersRoom, changingStation, bidet, feminineProducts,homeDB) VALUES (
  47.6100898,
  -122.3424699,
  'First Starbucks',
  '1912 Pike Place',
  'alive',
  '',
  100,
  3.5,
  2.5,
  4.1,
  100,
  100,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  'api'
);