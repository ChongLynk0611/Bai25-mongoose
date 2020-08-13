
var Book = require('../model/books.model');
var User = require('../model/users.model');
var Transaction = require('../model/transaction.model');
var Book = require('../model/books.model');
module.exports.postIndex =async  function(req,res,next){
    var errors=[];
    var id_Book =  await Book.findById(req.body.idBook);
    var id_User = await User.findById(req.body.idUser);
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