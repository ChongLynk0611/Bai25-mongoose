const shortid = require('shortid');

var Books = require('../model/books.model');

module.exports.index = async (req, res)=>{
    var books = await  Books.find();
    res.render('books/index',{
        books: books
    });
   
    
}
module.exports.create = (req, res)=>{
    
    res.render('books/create');
}

module.exports.delete = async (req,res)=>{
    var id = req.params.id;
    await Books.findById(id).deleteOne();
    res.redirect('/books');
}

module.exports.edit =async (req,res)=>{
    var id = req.params.id;
    var book = await Books.findById(id).exec();
    res.render('books/edit' , {
        book:book
    })
}

module.exports.postCreate = (req,res)=>{
    req.body.img = req.file.path.split('/').slice(1).join('/');
    Books.create(req.body);
    res.redirect('/books');
}
module.exports.postEdit = async (req,res)=>{
    var id = req.params.id;
    var book = await Books.findById(id);
    await book.update({title: req.body.title}) ;
    res.redirect('/books'); 
}