const shortid = require('shortid');
var md5 = require('md5');
var multer  = require('multer');

var db = require('../db');
var upload = multer({ dest: './public/uploads/' });



module.exports.index = (req, res)=>{
    res.render('users/index',{
        users:db.get('users').value()
    })
};

module.exports.create = (req,res)=>{
    res.render('users/create');
};

module.exports.edit =(req,res)=>{
    var id = req.params.id;
    res.render('users/edit',{
        user: db.get('users').find({id:id}).value()
    })
}

module.exports.delete = (req, res)=>{
    var id = req.params.id;
    db.get('users').remove({id:id}).write();
    res.redirect('/users');
}
module.exports.profile =(req,res)=>{
    var id =req.params.id;
    res.render('users/profile',{
        user:user = db.get('users').find({id:id}).value()
    })
}

module.exports.postCreate = (req,res)=>{
    req.body.id = shortid.generate();
    req.body.isAdmin=false;
    req.body.img=req.file.path.split('/').slice(1).join('/');
    req.body.pass = md5(req.body.pass);
    db.get('users').push(req.body).write();
    res.redirect('/users');
}

module.exports.postEdit = (req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var user = db.get('users').find({id:id}).value();
    user.name = name;
    res.redirect('/users');
}

module.exports.postProfile = (req, res)=>{
    var id = req.params.id;
    var user = db.get('users').find({id:id}).value();
    
    user.img = req.file.path.split('/').slice(1).join('/');
    db.get('users').write();
    res.redirect("/users");
}