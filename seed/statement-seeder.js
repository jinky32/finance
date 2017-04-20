/**
 * Created by stuartbrown on 20/04/2017.
 */
/**
 * Created by stuartbrown on 20/04/2017.
 */
var finance = require('../data/convertcsv.json');
var Statement = require('../models/statement');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('localhost:27017/statement');

var statements = [
    new Statement({
        date:'firs title',
        name:'first description',
        amount:10
    }),
    new Statement({
        date:'second title',
        name:'firsecondst description',
        amount:10
    }),
    new Statement({
        date:'third title',
        name:'third description',
        amount:10
    }),new Statement({
        date:'fourth title',
        name:'fourth description',
        amount:10
    })

];

var done = 0;
for( var i = 0; i < statements.length; i++ ) {
    statements[i].save(function(err, result){
        done++;
        if(done === statements.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};
