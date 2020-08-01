var md5 = require('md5');
var db = require('../db');

module.exports.index = function(req, res){
    res.render('login/index');
}

module.exports.postIndex=function(req, res){
    var cookie = parseInt(req.cookies.countLogin);
    if(!req.cookies.countLogin){
        res.cookie('countLogin',0);
    }
    else{
        
        
        res.clearCookie('countLogin',cookie);
        res.cookie('countLogin', cookie+1);
    }
    
    var errors =[];
    var values;
    var user = db.get('users').find({email:req.body.email}).value();
    if(cookie>4){
        errors.push('login wrongly more than 4 times !!!');
        res.render('login/index',{
            errors:errors,
            values:req.body
        })
        return;
    }
    if(!user){
        errors.push("email does not exist !!!");
        res.render('login/index',{
            errors:errors,
            values:req.body
        })
        return;
    }
    var pass = md5(req.body.pass);
    if(pass !== user.pass){
        errors.push("pass is wrong !!!");
        res.render('login/index',{
            errors:errors,
            values:req.body

        })
        return;

    }
    res.cookie('userId',123);
    if(user.isAdmin === true){
        
        res.render('users/index',{
            users: db.get('users').value()
        });
        return;
    }
    res.render('home/index');
}