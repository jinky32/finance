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

//base vendor route. Shows all spends ever with a vendor
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


// year vendor route.  Shows all spends in a particular month in a particular year.
router.get('/:vendor/:year/', function(req, res, next) {


    // Sample request
    var request = {
        "name":req.params.vendor,
        "year": parseInt(req.params.year)
    };

// Build initial match document on name

    var match1 = {
        name: request["name"]
    };

// Build project & facet document for date based aggregation

    var addFields = {};
    var facet = {};

// Add year followed by year facet

    if (request["year"]) {
        addFields["year"] = { "$year": "$date" },
            facet["Yearly"] =
                [
                    {
                        "$match":{ "year": request["year"] }
                    },
                    {
                        "$group": {
                            "_id": {
                                "name": "$name",
                                "year": "$year"
                            },
                            spend:
                            { '$push':
                            { 'date': '$date' ,
                                'amount':'$amount'}
                            },
                            "total": { "$sum": "$amount" }
                        }
                    }
                ];
    }

// Use aggregate builder

    Statement.aggregate()
        .match(match1)
        .append({"$addFields": addFields}) // No addFields stage in mongoose builder
        .facet(facet)
        .exec(function(err, data) {
            if (err) throw err;
            console.log("this is plain consolelog "+data[0].Yearly[0]._id.name);
            //console.log(util.inspect(data));
            console.log(util.inspect(data[0].Yearly,{ depth: null }));

            //console.log(util.inspect(first));
            res.render('vendor-yearly', {
                data: data,
                name:data[0].Yearly[0]._id.name,
                year:data[0].Yearly[0]._id.year
                //data: first
            });
        });


});

//TODO some of the dates when shown by the template are wrong for example RINGGO { date: 2017-03-26T23:00:00 shows as Monday, March 27, 2017 when run through the template.  Only those with timestamp too?
// month vendor route.  Shows all spends in a particular month in a particular year.
router.get('/:vendor/:year/:month', function(req, res, next) {


    // Sample request
    var request = {
        "name":req.params.vendor,
        "year": parseInt(req.params.year),
        "month":parseInt(req.params.month)
        //,
        //"week":12
    };

// Build initial match document on name

    var match1 = {
        name: request["name"]
    };

// Build project & facet document for date based aggregation

    var addFields = {};
    var facet = {};

// Add year followed by year facet

    if (request["year"]) {
        addFields["year"] = { "$year": "$date" },
            facet["Yearly"] =
                [
                    {
                        "$match":{ "year": request["year"] }
                    },
                    {
                        "$group": {
                            "_id": {
                                "name": "$name",
                                "year": "$year"
                            },
                            spend:
                            { '$push':
                                { 'date': '$date' ,
                                    'amount':'$amount'}
                            },
                            "total": { "$sum": "$amount" }
                        }
                    }
                ];
    }

// Add month followed by month facet

    if (request["month"]) {
        addFields["month"] = { "$month": "$date" };
        facet["Monthly"] =
            [
                {
                    "$match":{ "month": request["month"] }
                },
                {
                    "$group": {
                        "_id": {
                            "name": "$name",
                            "month": "$month"
                        },
                        spend:
                        { '$push':
                        { 'date': '$date' ,
                            'amount':'$amount'}
                        },
                        "total": { "$sum": "$amount" }
                    }
                }
            ];
    }

// Add week followed by week facet

    //if (request["week"]) {
    //    addFields["week"] = { "$week": "$date" };
    //    facet["Weekly"] =
    //        [
    //            {
    //                "$match":{ "week": request["week"] }
    //            },
    //            {
    //                "$group": {
    //                    "_id": {
    //                        "name": "$name",
    //                        "week": "$week"
    //                    },
    //                    "spend": { "$push":"$amount" },
    //                    "total": { "$sum": "$amount" }
    //                }
    //            }
    //        ];
    //}

// Use aggregate builder

    Statement.aggregate()
        .match(match1)
        .append({"$addFields": addFields}) // No addFields stage in mongoose builder
        .facet(facet)
        .exec(function(err, data) {
            if (err) throw err;
            //console.log(data.Yearly);
            console.log("this is plain consolelog "+data[0].Monthly[0]._id.name);
            //console.log(util.inspect(data));
            console.log(util.inspect(data[0].Monthly[0]._id,{ depth: null }));
            res.render('vendor-monthly', {
                data: data,
                name:data[0].Monthly[0]._id.name,
                month:data[0].Monthly[0]._id.month,
                year:data[0].Yearly[0]._id.year

                //data: first
            });
        });


});




// week vendor route.  Shows all spends in a particular week in a particular month in a particular year.
router.get('/:vendor/:year/:month/:week', function(req, res, next) {


    // Sample request
    var request = {
        "name":req.params.vendor,
        "year": parseInt(req.params.year),
        "month":parseInt(req.params.month),
        "week":parseInt(req.params.week)
    };

// Build initial match document on name

    var match1 = {
        name: request["name"]
    };

// Build project & facet document for date based aggregation

    var addFields = {};
    var facet = {};

// Add year followed by year facet

    if (request["year"]) {
        addFields["year"] = { "$year": "$date" },
            facet["Yearly"] =
                [
                    {
                        "$match":{ "year": request["year"] }
                    },
                    {
                        "$group": {
                            "_id": {
                                "name": "$name",
                                "year": "$year"
                            },
                            spend:
                            { '$push':
                            { 'date': '$date' ,
                                'amount':'$amount'}
                            },
                            "total": { "$sum": "$amount" }
                        }
                    }
                ];
    }

// Add month followed by month facet

    if (request["month"]) {
        addFields["month"] = { "$month": "$date" };
        facet["Monthly"] =
            [
                {
                    "$match":{ "month": request["month"] }
                },
                {
                    "$group": {
                        "_id": {
                            "name": "$name",
                            "month": "$month"
                        },
                        spend:
                        { '$push':
                        { 'date': '$date' ,
                            'amount':'$amount'}
                        },
                        "total": { "$sum": "$amount" }
                    }
                }
            ];
    }

// Add week followed by week facet

    if (request["week"]) {
        addFields["week"] = { "$week": "$date" };
        facet["Weekly"] =
            [
                {
                    "$match":{ "week": request["week"] }
                },
                {
                    "$group": {
                        "_id": {
                            "name": "$name",
                            "week": "$week"
                        },
                        spend:
                        { '$push':
                        { 'date': '$date' ,
                            'amount':'$amount'}
                        },
                        "total": { "$sum": "$amount" }
                    }
                }
            ];
    }

// Use aggregate builder

    Statement.aggregate()
        .match(match1)
        .append({"$addFields": addFields}) // No addFields stage in mongoose builder
        .facet(facet)
        .exec(function(err, data) {
            if (err) throw err;
            //console.log(data.Yearly);
            console.log(util.inspect(data));
            //console.log(util.inspect(first));
            res.render('vendor-weekly', {
                data: data
                //data: first
            });
        });


});

//console.log('ready state is '+mongoose.connection.readyState);
module.exports = router;
