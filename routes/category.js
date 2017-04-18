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

router.get('/foo', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
