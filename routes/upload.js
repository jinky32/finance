/**
 * Created by stuartbrown on 25/04/2017.
 */
var express = require("express");
var multer = require('multer');
var router = express.Router();
var path = require('path');
//childprocess is used in the runScript helper function.  But dose it go here or in the function file?
var childProcess = require('child_process');
var runScript = require('../helpers/runScript');
var statementImport = require('../helpers/statement-seeder');
var statements= require('../data/boom.json');
var Statement = require('../models/statement');
const util = require('util');


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
        //callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        callback(null, req.body.bank + '-' + Date.now() + path.extname(file.originalname))

    }
});


router.post('/',
    multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            //if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            if (ext !== '.csv') {
                return callback(res.end('Only csvs are allowed'), null)
            }
            callback(null, true)
        }
    })
        .single('statement'),
    function(req, res) {
    //console.log(req.body, 'Body');
        console.log(req.body.bank, 'Body');

        //console.log(req.files, 'files');
        console.log('THIS IS THE FILENAME - '+req.file.filename);
        var filename = req.file.filename;
        //res.end('File is uploaded')
        //res.send('File is uploaded')
//TODO add another param to the runscript function that will take the name of the file to be parsed (req.file.filename) by statement-seeder

        statementImport.statementSeeder(statements, function (err) {
            if (err) throw err;
            console.log('finished running some-script.js');
        });

        res.redirect('/upload/today');
        console.log('THIS IS THE FILENAME AGAIN! - '+ filename);


//TODO need to find a way to send a success message on successful upload
});



/* GET home page. */
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
            console.log(util.inspect(data));
            //console.log(util.inspect(first));
            res.render('upload-today', {
                data: data,
                title:"Stuart Page"
                //data: first
            });
        });




});

module.exports = router;
