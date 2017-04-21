/**
 * Created by stuartbrown on 20/04/2017.
 */
var Product = require('../models/product');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
   imagePath:'footpath',
    title:'firs title',
    description:'first description',
    price:10
    }),
    new Product({
        imagePath:'aafa',
        title:'second title',
        description:'firsecondst description',
        price:10
    }),
    new Product({
        imagePath:'sdvsd',
        title:'third title',
        description:'third description',
        price:10
    }),new Product({
        imagePath:'footpath',
        title:'fourth title',
        description:'fourth description',
        price:10
    })

];



var done = 0;
for( var i = 0; i < products.length; i++ ) {
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};
