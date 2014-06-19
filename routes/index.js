var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MyEasyPress' });
});

router.get('/admin', function(req, res) {
  res.render('admin', { title: 'EasyPress - admin'});
});

module.exports = router;
