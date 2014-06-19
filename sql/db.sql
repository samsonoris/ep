
DROP TABLE IF EXISTS account;

CREATE TABLE account (
	userid		serial PRIMARY KEY,
	firstname	text,
	lastname	text,
	email		text,
	password	text,
	username	text
);
