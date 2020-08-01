var db = require('../db');

module.exports.index = function(req, res){
    res.render('login/index');
}

module.exports.postIndex=function(req, res){
    var error =[];
    var user = db.get('users').find({email:req.body.email}).value();
    if(!user){
        error.push("email does not exist !!!");
        res.render('login/index',{
            error:error,
            values:values
        })
        return;
    }

    res.render('home/index');
}