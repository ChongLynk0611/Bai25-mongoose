var db = require('../db');

module.exports.postIndex = function(req,res,next){
    var errors=[];
    var id_Book = db.get('books').find({id:req.body.idBook}).value();
    var id_User = db.get('users').find({id:req.body.idUser}).value();
    if(!id_Book){
        errors.push("id_Book not found !!!");
    }
    if(!id_User){
        errors.push("id_User not found !!!");
    }
    if(errors.length > 0){
        res.render('transaction/create',{
            errors : errors,
            values : req.body
        })
        return;
        
    }
    next();
}