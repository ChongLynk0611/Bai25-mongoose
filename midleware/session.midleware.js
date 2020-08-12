const shortid = require('shortid');
var Session = require('../model/sessions.model');
module.exports = async(req, res, next)=>{
    
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed:true
        })
        await Session.create({id:sessionId});
    }
    
    next();
}