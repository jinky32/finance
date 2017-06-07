/**
 * Created by stuartbrown on 25/04/2017.
 */
var express = require("express");
var multer = require('multer');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var util = require('util');

var statementImport = require('../helpers/statement-seeder');
var convertJSON = require('../helpers/convertJSON');
var Statement = require('../models/statement');



//Get root route
router.get('/', function(req, res, next) {
    console.log(req.body, 'Body');


//START OF CATEGORY MATCH - NEEDS TO GO INTO POST ROUTE
    //var categoriesCallback = function(docs){
    //    //console.log(docs);
    //    for(i=0; i < docs.length; i++){
    //        console.log("THIS IS THE ARRAY"+docs[i].name);
    //        const needle = "AMERICAN EXP 3717";
    //        const isInArray = docs[i].name.includes(needle);
    //        console.log("THE VALUE IS IN THE ARRAY = "+isInArray + " and its in "+docs[i]._id);
    //        console.log(docs[i].name);
    //    }
    //};
    //
    //var getCategories = function(categoriesCallback){
    //    // find all the distinct catgories in the db
    //    Statement.aggregate(
    //        [
    //            { $group : { _id : "$category", name: { $push: "$name" } } }
    //        ]
    //        , function(err, docs){
    //            categoriesCallback(docs);
    //        });
    //    //console.log(util.inspect(categories));
    //};
    //getCategories(categoriesCallback);



    //END OF CATEGORY MATCH

    res.render('upload');
});

//can below be deleted?
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './data')
    },
    filename: function(req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        callback(null, req.body.bank + '-' + Date.now() + path.extname(file.originalname))

    }
});


router.post('/',
    multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.csv') {
                return callback(res.end('Only csvs are allowed'), null)
            }
            callback(null, true)
        }
    })
        .single('statement'),

    function(req, res) {
        convertJSON.convertJSON(req.file.filename, function(err, file){
    if (err){
        console.log('frikkin error');
    } else {
        statementImport.statementSeeder(file, function (err) {
            //if (err) throw err;
            if(err){
                console.log('OH NO, THERE WAS AN ERROR');
            }
            console.log('finished running some-script.js');
            //res.redirect('/upload/today');
        });
        console.log('upload.js says all was good');

    }
            res.redirect('/upload/today');
        });
  }
);

/* GET todays uploads page. */
router.get('/today', function(req, res, next) {

    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);
    //res.send("Hello");

    Statement.find({importDate: {$gte: start, $lt: end}},
        function(err, data){
            if (err) throw err;
            //var first = data[0];
            console.log("HERE IS DATA IN TODAY "+util.inspect(data));
            //console.log(util.inspect(first));
            res.render('upload-today', {
                data: data,
                title:"Stuart Page"
                //data: first
            });
        });
});


//allow user to modify records
router.post('/today', function(req, res, next) {

    var item = {
        name : req.body.name,
        amount : req.body.amount,
        category : req.body.category
    };
    var id = req.body.id;

    Statement.updateOne({"_id":mongoose.Types.ObjectId(id)}, {$set:item}, function(err, result) {
        if (err) {
            console.error('error, no entry found');
        }
       //assert.equal(null, err)
        console.log("Item updated");
    });
    res.redirect('/upload/today');
});

module.exports = router;
