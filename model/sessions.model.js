var mongoose = require('mongoose');

var sessionSchame = new mongoose.Schema({
    sessionId: String,
    cart: {}
})

var Session = mongoose.model('session',sessionSchame , 'sessions');
module.exports = Session;