var db = require('../db');

module.exports.index = function(req, res){
    res.render('login/index');
}

module.exports.postIndex=function(req, res){
    var errors =[];
    var values;
    var user = db.get('users').find({email:req.body.email}).value();
    if(!user){
        errors.push("email does not exist !!!");
        res.render('login/index',{
            errors:errors,
            values:req.body
        })
        return;
    }
    if(req.body.pass !== user.pass){
        errors.push("pass is wrong !!!");
        res.render('login/index',{
            errors:errors,
            values:req.body

        })
        return;

    }
    res.cookie('userId',123);
    console.log(typeof(user.isAdmin));
    if(user.isAdmin === true){
        
        res.render('users/index',{
            users: db.get('users').value()
        });
        return;
    }
    res.render('home/index');
}