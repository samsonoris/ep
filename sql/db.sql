
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS body;
DROP TABLE IF EXISTS info;
DROP TABLE IF EXISTS scripts;
DROP TABLE IF EXISTS style;
DROP TABLE IF EXISTS theme;
DROP TABLE IF EXISTS elements;

CREATE TABLE account (
	userid		serial PRIMARY KEY,
	firstname	text,
	lastname	text,
	email		text,
	password	text,
	username	text,
	alias		text,
	credentials text
);

CREATE TABLE body (
	rev_id			serial PRIMARY KEY,
	rev_date		timestamp,
	content			text
);

CREATE TABLE info (
	site_id			serial PRIMARY KEY,
	rev_date		timestamp,
	title			text,
	theme			integer
);

CREATE TABLE scripts (
	name			text PRIMARY KEY,
	content			text
);

CREATE TABLE style (
	style_id		serial PRIMARY KEY,
	rev_date		timestamp,
	rules			text
);

CREATE TABLE theme (
	theme_id		serial PRIMARY KEY,
	theme_url		text,
	name			text
);

CREATE TABLE elements (
	id				serial,
	name			text primary key,
	content			text
);

INSERT INTO account (password,username,credentials) VALUES ('admin','admin','admin');
INSERT INTO account (firstname,lastname,password,username,credentials) VALUES ('Draw','Evermore','design','design','design');
INSERT INTO account (firstname,lastname,password,username,credentials) VALUES ('Bloggus','Wright','blog','blog','blog');

INSERT INTO scripts (name, content) VALUES ('editor',
	'<script src="admin/lib/rangy/rangy-core.js"></script>'
	'<script src="admin/lib/rangy/rangy-cssclassapplier.js"></script>'
	'<script src="admin/lib/rangy/rangy-selectionsaverestore.js"></script>'
	'<script src="admin/lib/rangy/rangy-serializer.js"></script>'
	'<script src="admin/lib/rangy/rangy-textrange.js"></script>'
	'<script src="admin/lib/undo/undo.js"></script>'
	'<script src="admin/lib/medium/medium.js"></script>'
);

INSERT INTO theme (name,theme_url) VALUES
	('Amelia','/admin/css/custom-theme/amelia.css'),
	('Cerulean','/admin/css/custom-theme/cerulean.css'),
	('Cosmo','/admin/css/custom-theme/cosmo.css'),
	('Cyborg','/admin/css/custom-theme/cyborg.css'),
	('Darkly','/admin/css/custom-theme/darkly.css'),
	('Flatly','/admin/css/custom-theme/flatly.css'),
	('Journal','/admin/css/custom-theme/journal.css'),
	('Lumen','/admin/css/custom-theme/lumen.css'),
	('Readable','/admin/css/custom-theme/readable.css'),
	('Simplex','/admin/css/custom-theme/simplex.css'),
	('Slate','/admin/css/custom-theme/slate.css'),
	('Spacelab','/admin/css/custom-theme/spacelab.css'),
	('Superhero','/admin/css/custom-theme/superhero.css');


INSERT INTO info (title, theme) VALUES ('Queen',6);
