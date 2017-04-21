/**
 * Created by stuartbrown on 20/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statementSchema = new Schema({
   date : {type:Date, required:true},
   name: {type:String, required:true},
   method: {type:String},
   amount: {type:Number, required:true}
});

module.exports = mongoose.model('Statement', statementSchema);