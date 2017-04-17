var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Stuart Express',
    name: 'Stuart',
    condition:false,
    anyArray:[1,2,3]
  });
});

router.get('/foo', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
