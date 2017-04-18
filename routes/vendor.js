/**
 * Created by stuartbrown on 18/04/2017.
 */
var express = require('express');
var router = express.Router();
var finance = require('../data/convertcsv.json');
//TODO sort out requiring the parseDate function from the helper dir
var parseDate = require('../helpers/parseDate');

// TODO remove the below and import from helper dir as above
// parse a date in dd/mm/yyyy format
//function parseDate(input) {
//    var parts = input.split('/');
//    console.log(parts);
//    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
//    return new Date(parts[2], parts[1]-1, parts[0]);
//}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('You need to add the name of a vendor to the URL e.g. Tesco (vendor/tesco)');
});

router.get('/:vendor?', function(req, res, next) {

    var vendorName = req.params.vendor;

    //initialise empty array to push matched vendors and records to
    var shop = [];

    //loop through the json objects which have been assigned to finance var above
    for(var i = 0; i < finance.length; i++){

    // check if the vendorName (from the URL param is equal to field 2 in the json object
        if (vendorName ==  finance[i].FIELD2){

            //push matching records into the shop array which is passed as a value in the res.render below
            shop.push({date:parseDate.stringToDate(finance[i].FIELD1), name:finance[i].FIELD2, amount:parseInt(finance[i].FIELD3)});

            console.log(finance[i].FIELD2 + ' is equal to ' + vendorName);
            console.log(shop);

        } else {
            //console.log('hmm, for some reason they are different');
        }
    }
    // define which view to use and pass required parameters
    res.render('vendor', {
        vendor: vendorName,
        shop:shop
    });

});

module.exports = router;
