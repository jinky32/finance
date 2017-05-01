/**
 * Created by stuartbrown on 25/04/2017.
 */
/**
 * Created by stuartbrown on 25/04/2017.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
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

//var upload = multer({ storage: storage });

var path = require('path')
//var multer = require('multer')



//Get root route
router.get('/', function(req, res, next) {

    res.render('upload');
});

//router.post('/', upload.any(), function(req, res, next){
//    //res.send(req.files)
//    console.log(req.body, 'Body');
//    console.log(req.files, 'files');
//    res.end();
//});

router.post('/', multer({ des: './data/' }).single('statement'), function(req,res){
    console.log(req.body); //form fields

    console.log(req.file); //form files

    res.status(204).end();
});


//router.post('/saveBlog', upload.any(), function(req, res, next) {
//    console.log(req.body, 'Body');
//    console.log(req.files, 'files');
//    res.end();
//});
module.exports = router;
