/**
 * Created by stuartbrown on 18/04/2017.
 */
var express = require('express');
var router = express.Router();
var parseDate = require('../helpers/parseDate');
var mongoose = require('mongoose');
console.log('ready state is '+mongoose.connection.readyState);
var Statement = require('../models/statement');



/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO on this page I want to show a list of all vendors (no duplicates) with links to their pages
    res.send('You need to add the name of a vendor to the URL e.g. Tesco (vendor/tesco)');
});

router.get('/:vendor?', function(req, res, next) {

    var vendorName = req.params.vendor;
    console.log('HERE IS PARAM' + req.params.vendor);
    //res.send('You need to add the name of a vendor to the URL e.g. Tesco (vendor/tesco)');
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
console.log('ready state is '+mongoose.connection.readyState);
module.exports = router;
