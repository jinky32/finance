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
            name : 1,
            amount : 1
          }
        },
        {
          $group : {
            _id : {
              year : "$year",
              month : "$month",
              week : "$week",
              day : "$day"
            },
            totalDailyAmount : {
              $sum : "$amount"
            }
          }
        },
        {
          $group : {

            _id : {
              year : "$_id.year",
              month : "$_id.month",
              week : "$_id.week"
            },
            totalWeeklyAmount : {
              $sum : "$totalDailyAmount"
            },
            totalDayAmount : {
              $push : {
                totalDayAmount : "$totalDailyAmount",
                dayOfWeek : "$_id.day"
              }
            }
          }
        },
        {
          $match : {
            "_id.month" : 3,
            "_id.week" : 12
          }
        }
      ],
      function(err, results){
        console.log("this is the result: ", results); // logs a result if the there is one, and [] if there is no result.
        console.log("THIS IS THE WEEKLY AMOUNT "+results.totalWeeklyAmount);
      });
      res.render('index', {
        results: results
      });

});



router.get('/foo', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
