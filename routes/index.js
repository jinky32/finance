var express = require('express');
var router = express.Router();
var finance = require('../data/convertcsv.json');
var Product = require('../models/product');
var Statement = require('../models/statement');


//console.log(finance);
console.log(finance[0]);
console.log(finance[0].FIELD3);
var field3 = finance[0].FIELD3;

/* GET home page. */
router.get('/', function(req, res, next) {
  //Product.find(function (err, docs) {
  Statement.find(function (err, docs) {
    res.render('index', {
      title: 'Stuart Express',
      name: 'Stuart',
      products: docs
    });
  });
});
  //console.log('woot this is products '+products);
//  res.render('index', {
//    title: 'Stuart Express',
//    name: 'Stuart',
//    products: products,
//    condition:false,
//    anyArray:[1,2,3],
//    field3:field3
//  });
//});

router.get('/foo', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
