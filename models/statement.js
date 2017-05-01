/**
 * Created by stuartbrown on 20/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var statementSchema = new Schema({
   date : {type:Date, required:true},
   name: {type:String, required:true},
   method: {type:String},
   amount: {type: Currency, required:true},
   category: {type:String, default:'Not Set'},
   importDate: {type : Date, default:Date.now, required:true}
});

statementSchema.index({"date":1, "name":1, "amount":1}, {unique: true});

module.exports = mongoose.model('Statement', statementSchema);