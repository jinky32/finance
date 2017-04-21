/**
 * Created by stuartbrown on 20/04/2017.
 */
//var finance = require('../data/convertcsv.json');
var statements= require('../data/convertcsv.json');
var Statement = require('../models/statement');
var splitName = require('../helpers/splitName');
//var mongoose = require('mongoose');
////connect to mongodb
//mongoose.connect('localhost:27017/statement');
//console.log('ready state is '+mongoose.connection.readyState);

var parseDate = require('../helpers/parseDate');
//console.log(statements);

//var splitname = function splitname(input) {
//    var parts = input.split('  ');
//    //console.log(parts);
//    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
//    return parts[0];
//};
//var test = splitname('CORPORATE PERKS-GI       LONDON SE1               VIS');
//console.log(test);

//TODO figure out why all records from the json aren't being imported
var done = 0;
for( var i = 0; i < statements.length; i++ ) {
    //var newStatement = new Statement();
    var date = parseDate.stringToDate(statements[i].FIELD1);
    var three =  statements[i].FIELD2.substr(statements[i].FIELD2.length - 3);
   var name = splitName.splitName(statements[i].FIELD2);
    var amount = Number(statements[i].FIELD3);

    console.log('name is '+ name + 'three letters are ' + three);
    //console.log('imported record ' + i + 'of ' + statements.length);
    //newStatement.save();
    //newStatement.save(function(err, result){
    //    done++;
    //    if(done === statements.length){
    //        exit();
    //    }
    //    else {
    //        console.log('imported '+ statements[done].FIELD2)
    //    }
    //});

}
//
//function exit(){
//    mongoose.disconnect();
//};
