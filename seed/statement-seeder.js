/**
 * Created by stuartbrown on 20/04/2017.
 */
//var finance = require('../data/convertcsv.json');
var statements= require('../data/convertcsv.json');
var Statement = require('../models/statement');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('localhost:27017/statement');
console.log('ready state is '+mongoose.connection.readyState);

var parseDate = require('../helpers/parseDate');
//console.log(statements);


var done = 0;
for( var i = 0; i < statements.length; i++ ) {
    var newStatement = new Statement();
    newStatement.date = parseDate.stringToDate(statements[i].FIELD1);
    newStatement.name = statements[i].FIELD2;
    newStatement.amount = Number(statements[i].FIELD3);
    //newStatement.save();

    newStatement.save(function(err, result){
        done++;
        if(done === statements.length){
            exit();
        }
    });

}

function exit(){
    mongoose.disconnect();
};
