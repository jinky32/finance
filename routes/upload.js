/**
 * Created by stuartbrown on 25/04/2017.
 */

var express = require('express');
var router = express.Router();

//Get root route
router.get('/', function(req, res, next) {

    res.render('upload', {
        vendor: 'test'
        //shop:doc
    });
});
//        res.render('upload', {
//            //vendor: vendorName,
//            //shop:doc
//        });
//    });
//});

module.exports = router;
