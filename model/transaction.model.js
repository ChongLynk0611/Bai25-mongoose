var mongoose = require('mongoose');

var transactionSchema= new mongoose.Schema({
   idBook:String,
   iduser:String,
   iscomplete:Boolean 
})

var Transaction = mongoose.model('transaction' , transactionSchema , 'transactions');
module.exports = Transaction;