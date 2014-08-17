var express = require('express');
var router = express.Router();
var db = require('./db');

var pageData = {}; 
var setContent = function(data){
	pageData.title = data.title;
	pageData.theme = data.theme;
	pageData.style = data.style;
	//pageData.script = data.script;
	//pageData.content = data.content;
	console.log(pageData);
};

db.getIndexContent(setContent);

/* GET home page. */

router.get('/', function(req, res) {
	res.render('index', { 
		title: pageData.title, 
		theme: pageData.theme, 
		style: pageData.style
		//script: pageData.script,
		//content: pageData.content 
	});
});

router.post('/save', function(req, res) {
	console.log("Saving style...");
	db.saveToBase(req.body);
	db.getIndexContent(setContent);
});

router.post('/make-blog-db', function(req, res) {
	console.log("Making table...");
	db.createBlog(req.body.name);
});

router.post('/make-blog-post', function(req, res) {
	console.log("Making blog post...");
	db.createBlogPost(req.body);
});

module.exports = router;
