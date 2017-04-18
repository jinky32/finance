/**
 * Created by stuartbrown on 18/04/2017.
 */
var express = require('express');
var router = express.Router();
var finance = require('../data/convertcsv.json');

//console.log(finance);
console.log(finance[0]);
console.log(finance[0].FIELD3);
var field3 = finance[0].FIELD3;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Stuart Express',
        name: 'Stuart',
        condition:false,
        anyArray:[1,2,3],
        field3:field3
    });
});

router.get('/:vendor?', function(req, res, next) {
    var vendorName = req.params.vendor;
    res.render('vendor', {
        vendor: vendorName,
        finance: finance,
        field3:field3
    });
    //res.send('this is the page for ' + vendorName);
});

module.exports = router;
