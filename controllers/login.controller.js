var md5 = require('md5');
var User = require('../model/users.model');
module.exports.index = function(req, res){
    res.render('login/index');
}

module.exports.postIndex=async function(req, res){
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
    var user = await User.findOne({email:req.body.email});
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
    res.cookie('userId',123,{
        signed:true
    });
    res.clearCookie('countLogin',cookie);
    if(user.isAdmin === true){
        var users = await User.find();
        res.render('users/index',{
            users: users
        });
        return;
    }
    res.render('home/index');
}