/**
 * Created by stuartbrown on 18/04/2017.
 */
var express = require('express');
var router = express.Router();
var parseDate = require('../helpers/parseDate');
var mongoose = require('mongoose');
//console.log('ready state is '+mongoose.connection.readyState);
var Statement = require('../models/statement');
const util = require('util');


/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO on this page I want to show a list of all vendors (no duplicates) with links to their pages
    res.send('You need to add the name of a vendor to the URL e.g. Tesco (vendor/tesco)');
});

router.get('/:vendor?', function(req, res, next) {

    var vendorName = req.params.vendor;
    console.log(req.params.vendor);

    Statement.find({name:req.params.vendor}, function(err, doc){
       if (err) {
           console.error('error no entries found');
       }
        console.log(doc);
        res.render('vendor', {
            vendor: vendorName,
            shop:doc
        });
    });
});

router.get('/:vendor/:year/:month', function(req, res, next) {

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
        res.render('vendor-monthly', {
            //data: data
            data: first
        });
    })



});

//console.log('ready state is '+mongoose.connection.readyState);
module.exports = router;
