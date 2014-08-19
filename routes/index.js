var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var fs = require('fs');
var db = require('./db');

/* PASSPORT */

passport.use(new LocalStrategy(
  function(username, password, done) {
	db.login(username,password,done);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
	
var auth = function(req, res, next){
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

/* LOGIN AND REGISTER */

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("In /Login");
  res.send(req.user);
});

router.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

router.post('/register', function(req, res){
	db.register(req, res);
});

router.post('/account', function(req, res){
	db.register(req, res);
});

/* GET PAGE CONTENT */

var pageData = {}; 
var setContent = function(data){
	pageData.title = data.title;
	pageData.theme = data.theme;
	pageData.style = data.style;
	//pageData.script = data.script;
	pageData.content = data.content;
	console.log(pageData);
};

db.getIndexContent(setContent);

router.get('/', function(req, res) {
	res.render('index', { 
		title: pageData.title, 
		theme: pageData.theme, 
		style: pageData.style,
		//script: pageData.script,
		content: pageData.content 
	});
});

/* UPLOAD */

var imagePath = path.join(__dirname, "../public/images/");
router.post('/image', upload);

/* SAVE MODIFICATIONS */

router.post('/save', function(req, res) {
	console.log("Saving style...");
	db.saveToBase(req.body);
	db.getIndexContent(setContent);
});

/* BLOG INTERFACE */

router.get('/blog/:name', function(req, res) {
	console.log("Blog name: ",req.params.name);
	db.readBlog(req, res);
});
router.post('/make-blog-db', function(req, res) {
	console.log("Making table...");
	db.createBlog(req.body.name);
});

router.post('/make-blog-post', function(req, res) {
	console.log("Making blog post...");
	db.createBlogPost(req.body);
});

function upload(req, res) {
	
	var type = req.originalUrl;
	var uploadPath;
	var fstream;
	req.pipe(req.busboy);

	req.busboy.on('file', function(field, file, filename){

		switch (type) {
			case "/image":
				uploadPath = imagePath;
				frontEndPath = "../images/";
				break;
		}
		console.log("Uploading: ", uploadPath + filename);

		fstream = fs.createWriteStream(uploadPath + filename)
		file.pipe(fstream);

		fstream.on('close', function() {
			res.json({file: frontEndPath + filename});
		});

		fstream.on('error', function(err) {
			console.log("Stream error: ", err);
			res.json({"error":"Stream error"});
		});

	});
	
	req.busboy.on('error', function(err) {
		console.log("Upload error: ", err);
		res.json({"error":"Upload error"});
	});
};
module.exports = router;
