/**
 * Created by stuartbrown on 25/04/2017.
 */
var express = require("express");
var multer = require('multer');
var router = express.Router();
var path = require('path');


//Get root route
router.get('/', function(req, res, next) {
    console.log(req.body, 'Body');
    res.render('upload');
});

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './data')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        //callback(null, req.body.bank + '-' + Date.now() + path.extname(file.originalname))

    }
});

//router.post('/', multer({ des: './data/' }).single('statement'), function(req,res){
//    console.log(req.body); //form fields
//
//    console.log(req.file); //form files
//
//    res.status(204).end();
//});

router.post('/',
    multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    })
        .single('statement'),
    function(req, res) {
    //console.log(req.body, 'Body');
        console.log(req.body.bank, 'Body');

        console.log(req.files, 'files');
        res.end('File is uploaded')

});

//router.post('/', function(req, res) {
//    console.log(req.body, 'Body');
//    console.log(req.files, 'files');
//    var upload = multer({
//        storage: storage,
//        fileFilter: function(req, file, callback) {
//            var ext = path.extname(file.originalname)
//            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//                return callback(res.end('Only images are allowed'), null)
//            }
//            callback(null, true)
//        }
//    }).single('statement');
//    upload(req, res, function(err) {
//        res.end('File is uploaded')
//    })
//})




//
//
//var express = require('express');
//
//var multer = require('multer');
//var storage = multer.diskStorage({
//    destination: './data/',
//    filename: function (req, file, cb) {
//        crypto.pseudoRandomBytes(16, function (err, raw) {
//            if (err) return cb(err)
//
//            cb(null, raw.toString('hex') + path.extname(file.originalname))
//        })
//    }
//});
//
////var upload = multer({ storage: storage });
//
//var path = require('path')
////var multer = require('multer')
//
//
//
////Get root route
//router.get('/', function(req, res, next) {
//
//    res.render('upload');
//});
//
////router.post('/', upload.any(), function(req, res, next){
////    //res.send(req.files)
////    console.log(req.body, 'Body');
////    console.log(req.files, 'files');
////    res.end();
////});
//
//router.post('/', multer({ storage: storage }).single('statement'), function(req,res){
//    console.log(req.body); //form fields
//
//    console.log(req.file); //form files
//
//    res.status(204).end();
//});


//router.post('/saveBlog', upload.any(), function(req, res, next) {
//    console.log(req.body, 'Body');
//    console.log(req.files, 'files');
//    res.end();
//});
module.exports = router;
