var express = require('express');
var router = express.Router();
var db = require('./db');

var content; 
var setContent = function(elements){
	content = elements;
	console.log("Content: ",content);
	console.log("Content[0].txt: ",content[0].txt);
};

db.getContents(setContent);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MyEasyPress', content: content });
});

router.get('/admin', function(req, res) {
  res.render('admin', { title: 'EasyPress - admin'});
});

module.exports = router;
