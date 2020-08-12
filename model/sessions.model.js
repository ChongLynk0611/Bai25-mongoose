var mongoose = require('mongoose');

var sessionSchame = new mongoose.Schema({
    id:String,
    cart:[
        {idBook:String,
         amount:Number
        }  
    ]
})

var Session = mongoose.model('session',sessionSchame , 'sessions');
module.exports = Session;