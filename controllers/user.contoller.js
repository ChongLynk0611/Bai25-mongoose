const shortid = require('shortid');
var md5 = require('md5');
var multer  = require('multer');

var User = require('../model/users.model');

var upload = multer({ dest: './public/uploads/' });



module.exports.index = async (req, res)=>{
    var users = await User.find();
    res.render('users/index',{
        users:users
    })
};

module.exports.create = (req,res)=>{
    res.render('users/create');
};

module.exports.edit =async (req,res)=>{
    var id = req.params.id;
    var user = await User.findById(id);
    res.render('users/edit',{
        user: user
    })
}

module.exports.delete = async (req, res)=>{
    var id = req.params.id;
    await User.findByIdAndRemove(id);
    res.redirect('/users');
}
module.exports.profile =async (req,res)=>{
    var id =req.params.id;
    var user= await User.findById(id);
    res.render('users/profile',{
        user:user
    })
}

module.exports.postCreate = async(req,res)=>{
    req.body.id = shortid.generate();
    req.body.isAdmin=false;
    req.body.img=req.file.path.split('/').slice(1).join('/');
    req.body.pass = md5(req.body.pass);
    await User.create(req.body);
    res.redirect('/users');
}

module.exports.postEdit = async(req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var user = await User.findById(id);
    user.name = name;
    user.save();
    res.redirect('/users');
}

module.exports.postProfile = async(req, res)=>{
    var id = req.params.id;
    var user = await User.findById(id);
    user.img = req.file.path.split('/').slice(1).join('/');
    user.save();
    res.redirect("/users");
}