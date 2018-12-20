DROP TABLE IF EXISTS backuptbl;

SELECT * INTO backuptbl FROM apitbl;

DROP TABLE IF EXISTS apitbl;

CREATE TABLE apitbl (
  id SERIAL PRIMARY KEY,
  lat FLOAT(53),
  lng FLOAT(53),
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
);

INSERT INTO apitbl (lat, lng, name, vicinity, deadoralive, statusreason, votestotal, avgvotestotal, avgvotesclean, avgvoteseasytofind, notoiletpaper, notoiletseatcovers, genderspecific, restingarea, mothersroom, changingstation, bidet, feminineproducts, homedb) VALUES (
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
  50,
  50,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  FALSE,
  'api'
);