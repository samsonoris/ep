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

				client.query('SELECT content FROM test ORDER BY rev_date DESC LIMIT 1', function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					if (result.rows.length)
						data.content = result.rows[0].content;
					console.log(result.rows);

					client.end();
					callback(data);
				});
			});
		});
/*
*/

	});
}

function saveToBase(pageData){
	pg.connect(connect, function(err, client, done) {
		if(err) {
			console.error('could not connect to postgres', err);
		}
		
		if (pageData.theme) {
			client.query('UPDATE info SET theme = (SELECT theme_id FROM theme WHERE theme_url = ' + pageData.theme + ')', function(err, result) {
				done();
                if(err) console.error('error saving theme', err);
                console.log("Theme Success!!");
			});
		}
		if (pageData.style) {
			client.query('INSERT INTO style (rev_date,rules) VALUES (now(),$1)',[pageData.style], function(err, result) {
				done();
                if(err) console.error('error saving style', err);
                console.log("Style Success!!");
			});
		}
		if (pageData.content) {
			client.query('INSERT INTO test (rev_date,content) VALUES (now(),$1)',[pageData.content], function(err, result) {
				done();
                if(err) console.error('error saving content', err);
                console.log("Content Success!!");
			});
		}

	});
}

function createBlog(name){
	var client = new pg.Client(connect);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('CREATE TABLE "' + name + '" (blog_id serial primary key, author text, blog xml)', function(err, result) {
			if(err) return console.error('error creating blog', err);
			console.log("Success!!");
			client.end();
		});
	});
}

function createBlogPost(postData){
	var client = new pg.Client(connect);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('INSERT INTO "' + postData.name + '" (author,blog) VALUES ($1,$2)',[postData.author,postData.blog], function(err, result) {
			if(err) return console.error('error posting to blog', err);
			console.log("Success!!");
			client.end();
		});
	});
}

function readBlog(req, res){
	var client = new pg.Client(connect);
	client.connect(function(err) {
		if (err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('SELECT blog FROM "' + req.params.name + '"', function(err, result) {
			if (err) return console.error('error reading blog',err);
			console.log("Success getting blog!");
			console.log(result.rows);
			client.end();
			res.json(result.rows);
		});
	});
}

module.exports = {
  	getIndexContent: getIndexContent,
	saveToBase: saveToBase,
	createBlog: createBlog,
	createBlogPost: createBlogPost,
	readBlog: readBlog
};
