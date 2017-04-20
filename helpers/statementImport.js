/**
 * Created by stuartbrown on 20/04/2017.
 */
var Statement = require('../models/statement');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('localhost:27017/finance');
var finance = require('../data/convertcsv.json');

// populate the statement collection from json data
var done = 0;
for( var i = 0; i < finance.length; i++ ) {
    new Statement( finance[ i ] ).save(function(err, result){
        done++;
        if(done === finance.length){
            exit();
        }
    });
}


function exit(){
    mongoose.disconnect();
};
