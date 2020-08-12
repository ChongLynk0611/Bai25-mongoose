
var Session = require('../model/sessions.model');
var Book = require('../model/books.model');
module.exports.listBooks = async(req,res)=>{
    var sessionId = req.signedCookies.sessionId;
    var session = await Session.find({sessionId:sessionId}).exec();
    var cart =  session.cart;
    // db
    //             .get('sessions')
    //             .find({sessionId:sessionId})
    //             .value()
    //             .cart;
    var count = 0;
    for(var book in cart){
        count =count + cart[book];
    }
    var books =await Book.find();
    res.render('cart/index',{
        books:books,
        count:count
    });
}
module.exports.cart = (req,res)=>{

}
module.exports.cartAdd = async (req,res)=>{
    if(!req.signedCookies.sessionId){
        res.redirect('/');
        return;
    }

    var sessionId = req.signedCookies.sessionId;
    var idBook = req.params.idBook;
    var session = await Session.findOne({id:sessionId});

    var book = session.cart.find(
        cartItem => cartItem.idBook === idBook
    )
    if(!book){
        await Session.findOneAndUpdate({id:sessionId},{$push:{cart:{idBook,amount:1}}});
    }
    else{
        book.amount +=1;
        session.save();
    }

    

    res.redirect('/');





    

}