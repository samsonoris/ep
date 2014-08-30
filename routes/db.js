module.exports = {
	login: login,
	register: register,
	account: account,
  	getIndexContent: getIndexContent,
	saveToBase: saveToBase,
	createBlog: createBlog,
	createBlogPost: createBlogPost,
	readBlog: readBlog
};

var pg = require('pg');
var connect = "postgres://epadmin:hello@localhost/ep";

/* LOGIN */

function login(username,password,done){

	var client = new pg.Client(connect);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query("SELECT userid,firstname,lastname,email,username,credentials,alias FROM account WHERE username='" + username + "' AND password='" + password + "'",function(err, result){
			if(err) {
				return console.error('error checking login:', err);
			}
			if (result.rows.length) {
				console.log("From db: ",result.rows[0]);
				return done(null, result.rows[0]);
			}
			client.end();
			return done(null, false, { message: 'Incorrect username.' });
		});	
	});
}

function register(req, res){

	var u = req.bosy.userData;

	var client = new pg.Client(connect);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('INSERT INTO account(firstname,lastname,email,username,password,credentials,alias) VALUES($1,$2,$3,$4,$5,$6,$7)',
			[u.firstname,u.lastname,u.email,u.username,u.password,u.credentials,u.alias], function (err, result){

			if(err) {
				return console.error('error registering account:', err);
			}
			// return user data
			console.log("success registering new user");
			client.end()
		});
	});
}

function account(req, res){

	var u = req.body.userData;
	var id = u.userid;
	delete u.userid;
	var sql = "UPDATE account ";

	for (var i in u) {
		sql += "SET " + i + "='" + u[i] + "' ";
	}
	sql += "WHERE user_id='" + id + "'";

	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query(sql, function(err, result){
			if(err) {
				return console.error('error changing account:', err);
			}
			// return user data
			console.log("success changing account");
			client.end()
		});
	});
}

/* GET PAGE CONTENT */

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

				client.query('SELECT content FROM body ORDER BY rev_date DESC LIMIT 1', function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					if (result.rows.length)
						data.content = result.rows[0].content;
					console.log(result.rows);

					client.query("SELECT content FROM scripts WHERE name='editor'", function(err,result) {
						if(err) {
							return console.error('error getting scripts', err);
						}
						data.editor = result.rows[0].content;
						console.log(result.rows);

						client.end();
						callback(data);
					});
				});
			});
		});
	});
}

/* SAVE PAGE CONTENT */

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
			client.query('INSERT INTO body (rev_date,content) VALUES (now(),$1)',[pageData.content], function(err, result) {
				done();
                if(err) console.error('error saving content', err);
                console.log("Content Success!!");
			});
		}

	});
}

/* BLOG FUNCTIONS */ 

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

