var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Statement = require('../models/statement');




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

router.get('/test', function(req, res, next) {

  Statement.aggregate([
        {
          $project : {
            year : {
              $year : "$date"
            },
            month : {
              $month : "$date"
            },
            week : {
              $week : "$date"
            },
            day : {
              $dayOfWeek : "$date"
            },
            _id : 1,
            name : 1
          }
        }
      ],
      function(err, results){
        console.log("this is the result: ", results); // logs a result if the there is one, and [] if there is no result.

      });
  res.send('You need to add the name of a vendor to the URL e.g. Tesco (vendor/tesco)');
  //Statement.aggregate(
  //    { $group : {
  //      _id : { month: { $month : "date" },day: { $dayOfMonth : "date" }},
  //      count : { $sum : 1 }}
  //    },
  //    //{ $group : {
  //    //  _id : { year: "$_id.year", month: "$_id.month" },
  //    //  dailyusage: { $push: { day: "$_id.day", count: "$count" }}}
  //    //},
  //    //{ $group : {
  //    //  _id : { year: "$_id.year" },
  //    //  monthlyusage: { $push: { month: "$_id.month", dailyusage: "$dailyusage" }}}
  //    //},
  //    function (err, res)
  //    { if (err) ; // TODO handle error
  //      console.log(res);
  //    });
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
