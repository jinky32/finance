/**
 * Created by stuartbrown on 20/04/2017.
 */
//var finance = require('../data/convertcsv.json');
var statements= require('../data/convertcsv.json');
var Statement = require('../models/statement');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('localhost:27017/statement');

var parseDate = require('../helpers/parseDate');
//console.log(statements);

var statements2 = [
    {
        date:'firs title',
        name:'first description',
        amount:10
    },
    {
        date:'second title',
        name:'firsecondst description',
        amount:10
    },
    {
        date:'third title',
        name:'third description',
        amount:10
    },
    {
        date:'fourth title',
        name:'fourth description',
        amount:10
    }

];

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
