var pg = require('pg');
var connect = "postgres://epadmin:hello@localhost/ep";

function getIndexContent(callback) {

	var client = new pg.Client(connect);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		
		var data = {};

		client.query('SELECT i.title, t.theme_url FROM info i INNER JOIN theme t ON i.theme = t.theme_id', function(err, result) {
			if(err) {
				return console.error('error running query 1', err);
			}
			data.title = result.rows[0].title
			data.theme = result.rows[0].theme_url;
			console.log(result.rows);

			client.query('SELECT rules FROM style ORDER BY rev_date DESC LIMIT 1', function(err, result) {
				if(err) {
					return console.error('error running query 2', err);
				}
				data.style = result.rows[0].rules;
				console.log(result.rows);
				client.end();
				callback(data);
			});
		});
/*
		client.query('SELECT title, theme FROM info', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			console.log(result.rows);
		});
*/

	});
}

function saveToBase(pageData){
	console.log(pageData.style);
	var client = new pg.Client(connect);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		if (pageData.style) {
			client.query('INSERT INTO style (rev_date,rules) VALUES (now(),$1)',[pageData.style], function(err, result) {
                if(err) return console.error('error saving style', err);
                console.log("Success!!");
				client.end();
			});
		}
	});
}

module.exports = {
  	getIndexContent: getIndexContent,
	saveToBase: saveToBase
};
