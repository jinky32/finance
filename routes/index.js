var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Statement = require('../models/statement');
const util = require('util');




/* GET home page. */
router.get('/', function(req, res, next) {
  //req.flash('success', 'This is a flash message using the express-flash module.');
  //Product.find(function (err, docs) {
  Statement.aggregate([{
    "$group": {_id: "$name", count: { "$sum": 1}}
  }, {
    "$sort": {count: -1}
  }], function(err, data){
    if (err) throw err;
    //var first = data[0];
    console.log(util.inspect(data));
    //console.log(util.inspect(first));
    res.render('index', {
      data: data,
      title:"Stuart Page"
      //data: first
    });
  })
});




router.get('/test/:vendor/:year/:month', function(req, res, next) {

  Statement.aggregate([
    { "$match": { "name": req.params.vendor } },
    {
      "$redact": {
        "$cond": [
          {
            "$and": [
              { "$eq": [{ "$year": "$date" },  parseInt(req.params.year)  ]},
              { "$eq": [{ "$month": "$date" }, parseInt(req.params.month) ]}
              //,
              //{ "$eq": [{ "$week": "$date" },  parseInt(req.params.week)  ]}
            ]
          },
          "$$KEEP",
          "$$PRUNE"
        ]
      }
    },
    {
      "$group": {
        "_id": {
          "name": "$name",
          "year": { "$year": "$date" },
          "month": { "$month": "$date" },
          "week": { "$week": "$date" }
        },
        "total": { "$sum": "$amount" }
      }
    },
    {
      "$group": {
        "_id": {
          "name": "$_id.name",
          "year": "$_id.year"
        },
        "YearlySpends": { "$push": "$total" },
        "totalYearlyAmount": { "$sum": "$total" },
        "data": { "$push": "$$ROOT" }
      }
    },
    { "$unwind": "$data" },
    {
      "$group": {
        "_id": {
          "name": "$_id.name",
          "month": "$data._id.month"
        },
        "YearlySpends": { "$first": "$YearlySpends" },
        "totalYearlyAmount": { "$first": "$totalYearlyAmount" },
        "MonthlySpends": { "$push": "$data.total" },
        "totalMonthlyAmount": { "$sum": "$data.total" },
        "data": { "$push": "$data" }
      }
    },
    { "$unwind": "$data" },
    {
      "$group": {
        "_id": {
          "name": "$_id.name",
          "week": "$data._id.week"
        },
        "YearlySpends": { "$first": "$YearlySpends" },
        "totalYearlyAmount": { "$first": "$totalYearlyAmount" },
        "MonthlySpends": { "$first": "$MonthlySpends" },
        "totalMonthlyAmount": { "$first": "$totalMonthlyAmount" },
        "WeeklySpends": { "$push": "$data.total" },
        "totalWeeklyAmount": { "$sum": "$data.total" },
        "data": { "$push": "$data" }
      }
    },
    { "$unwind": "$data" },
    {
      "$group": {
        "_id": "$data._id",
        "YearlySpends": { "$first": "$YearlySpends" },
        "totalYearlyAmount": { "$first": "$totalYearlyAmount" },
        "MonthlySpends": { "$first": "$MonthlySpends" },
        "totalMonthlyAmount": { "$first": "$totalMonthlyAmount" },
        "WeeklySpends": { "$first": "$WeeklySpends" },
        "totalWeeklyAmount": { "$first": "$totalWeeklyAmount" }
      }
    }
  ], function(err, data){
    if (err) throw err;
    var first = data[0];
    //console.log(util.inspect(data));
    console.log(util.inspect(first));
    res.render('index', {
      //data: data
      data: first
    });
  })



});



router.get('/foo', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
