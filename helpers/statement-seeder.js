/**
 * Created by stuartbrown on 20/04/2017.
 */

var statementSeeder = function statementSeeder(statements) {
console.log("now in statement seeder");

var statements2= require('../data/boom.json');
    var Statement = require('../models/statement');
    var mongoose = require('mongoose');
//connect to mongodb
//    mongoose.connect('localhost:27017/statement');
//console.log('ready state is '+mongoose.connection.readyState);

    var parseDate = require('./parseDate');
    var splitName = require('./splitName');

//console.log('THIS IS THE NEW OBJECT '+ statements);
//    console.log('THIS SIS STATEMENTS '+JSON.stringify(statements));
//    console.log('AND THIS SIS STATEMENTS2 '+JSON.stringify(statements2));

//TODO figure out why all records from the json aren't being imported.  Is it because the amunt values have commas in ?
    var done = 0;
// set substring to three space.  This will be used to check for those spaces in the name values
// in the source data
    substring = "   ";
    //console.log(statements.length);
    for( var i = 0; i < statements.length; i++ ) {
        console.log("now in statement seeder for loop");
        // create new statement object
        var newStatement = new Statement();
        //use the stringToDate helper function to cast the string in imput file to a Date
        newStatement.date = parseDate.stringToDate(statements[i].date);

        //check the name field to see it includes the spaces defined in substring var above
        if(statements[i].vendor.includes(substring)){
            //if it does contain spaces then we want to get the last three chars of the entire string
            //and store those in method var which will then go into db.
            //we trim to remove any white space for methods that are only 2 chars long
            var method = statements[i].vendor.substr(statements[i].vendor.length - 3).trim();

            //for some reason HSBC often appends ))) to the end of strings. We want to chuck away those away!
            if(method !==')))'){

                //if the value isn't ))) and meets the criteria above we can inset into the db
                newStatement.method = statements[i].vendor.substr(statements[i].vendor.length - 3).trim();
            }
        }
        newStatement.name = splitName.splitName(statements[i].vendor);
        //newStatement.amount = Number(statements[i].amount);
        newStatement.amount = Number(statements[i].amount.replace(/,/g, ''));

        //console.log('imported record ' + i + 'of ' + statements.length);
        //newStatement.save();
        newStatement.save(function(err, result){
            done++;
            if(done === statements.length){
                console.log('Im done');
                //callback(err,func);
                exit();
            }
            else {
                console.log('imported '+ statements[done].vendor)
            }
        });

    }
    console.log("now out statement seeder for loop");
    function exit(){
        console.log("now in statement seeder fexit function");
        mongoose.disconnect();
    };

};


module.exports = {
    statementSeeder: statementSeeder
};