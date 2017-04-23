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
var splitName = require('../helpers/splitName');

//console.log(statements);

//TODO figure out why all records from the json aren't being imported.  Is it because the amunt values have commas in ?
var done = 0;
// set substring to three space.  This will be used to check for those spaces in the name values
// in the source data
substring = "   ";
for( var i = 0; i < statements.length; i++ ) {
    // create new statement object
    var newStatement = new Statement();
    //use the stringToDate helper function to cast the string in imput file to a Date
    newStatement.date = parseDate.stringToDate(statements[i].FIELD1);

    //check the name field to see it includes the spaces defined in substring var above
    if(statements[i].FIELD2.includes(substring)){
        //if it does contain spaces then we want to get the last three chars of the entire string
        //and store those in method var which will then go into db.
        //we trim to remove any white space for methods that are only 2 chars long
        var method = statements[i].FIELD2.substr(statements[i].FIELD2.length - 3).trim();

        //for some reason HSBC often appends ))) to the end of strings. We want to chuck away those away!
        if(method !==')))'){

            //if the value isn't ))) and meets the criteria above we can inset into the db
            newStatement.method = statements[i].FIELD2.substr(statements[i].FIELD2.length - 3).trim();
        }
    }
    newStatement.name = splitName.splitName(statements[i].FIELD2);
    newStatement.amount = Number(statements[i].FIELD3);
    //console.log('imported record ' + i + 'of ' + statements.length);
    //newStatement.save();
    newStatement.save(function(err, result){
        done++;
        if(done === statements.length){
            exit();
        }
        else {
            console.log('imported '+ statements[done].FIELD2)
        }
    });

}

function exit(){
    mongoose.disconnect();
};
