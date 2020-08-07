const shortid = require('shortid');

var db = require('../db');

module.exports.index = (req, res)=>{
    
    res.render('books/index',{
        books: db.get('books').value()
    });
}
module.exports.create = (req, res)=>{
   
    res.render('books/create');
}

module.exports.delete = (req,res)=>{
    var id = req.params.id;
    db.get('books').remove({id:id}).write();
    res.redirect('/books');
}

module.exports.edit = (req,res)=>{
    var id = req.params.id;
    var book = db.get('books').find({id:id}).value();
    res.render('books/edit' , {
        book:book
    })
}

module.exports.postCreate = (req,res)=>{
    req.body.id=shortid.generate();
    req.body.img = req.file.path.split('/').slice(1).join('/');
    db.get('books').push(req.body).write();
    res.redirect('/books');
}
module.exports.postEdit = (req,res)=>{
    var id = req.params.id;
    var book = db.get('books').find({id:id}).value();
    book.title = req.body.title;
    db.get('books').write();
    res.redirect('/books'); 
}