/**
 * Created by stuartbrown on 20/04/2017.
 */

var statementSeeder = function statementSeeder(statements, callback) {
    console.log("now in statement seeder");

    var Statement = require('../models/statement');
    var mongoose = require('mongoose');
    var parseDate = require('./parseDate');
    var splitName = require('./splitName');

    //console.log('THIS IS THE NEW OBJECT '+ statements);
    //    console.log('THIS IS STRINGIFIED STATEMENTS '+JSON.stringify(statements));


    var done = 0;
// set substring to three space.  This will be used to check for those spaces in the name values
// in the source data
    substring = "   ";

    for( var i = 0; i < Object.keys(statements).length; i++ ) {
    //for( var i = 0; i < statements.length; i++ ) {
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
        newStatement.amount = Number(statements[i].amount.replace(/,/g, ''));

        //console.log('imported record ' + i + 'of ' + statements.length);

        newStatement.save(function(err, result){
            if(err){
                callback(err);
            };
            done++;
            if(done === statements.length){
                console.log('Im done');
                callback(undefined);
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