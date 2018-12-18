DROP TABLE IF EXISTS backup;

CREATE TABLE IF NOT EXISTS backup ();

SELECT * INTO backup FROM api;

DROP TABLE IF EXISTS api;

CREATE TABLE IF NOT EXISTS api (
  id SERIAL PRIMARY KEY,
  lng NUMERIC,
  lat NUMERIC,
  name VARCHAR(255),
  vicinity VARCHAR(255),
  deadOrAlive VARCHAR(255),
  statusReason VARCHAR(255),
  votesTotal INTEGER,
  votesClean INTEGER,
  votesEasyToFind INTEGER,
  avgVotesTotal NUMERIC(2,1),
  avgVotesClean NUMERIC(2,1),
  avgVotesEasyToFind NUMERIC(2,1),
  noToiletPaper BOOLEAN,
  noToiletSeatCovers BOOLEAN,
  genderSpecific BOOLEAN,
  restingArea BOOLEAN,
  mothersRoom BOOLEAN,
  changingStation BOOLEAN,
  bidet BOOLEAN,
  feminineProducts BOOLEAN,
);

INSERT INTO api (lng, lat, name, vicinity, deadOrAlive, statusReason, votesTotal, votesClean, votesEasyToFind, avgVotesTotal, avgVotesClean, avgVotesEasyToFind, privateBiz, noTolietPaper, noTolietSeatCovers, genderSpecific, restingArea, mothersRoom, changingStation, bidet, feminineProducts) VALUES (
  47.6100898,
  -122.3424699,
  'First Starbucks',
  '1912 Pike Place',
  'alive',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
);

INSERT INTO user (lng, lat, name, vicinity, deadOrAlive, statusReason, votesTotal, votesClean, votesEasyToFind, avgVotesTotal, avgVotesClean, avgVotesEasyToFind, privateBiz, noTolietPaper, noTolietSeatCovers, genderSpecific, restingArea, mothersRoom, changingStation, bidet, feminineProducts) VALUES (
  47.6100898,
  -122.3424699,
  'First Starbucks',
  '1912 Pike Place',
  'alive',
  '',
  '1',
  '1',
  '1',
  '3.5',
  '3.5',
  '3.5',
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
);
