
var Session = require('../model/sessions.model');
var Book = require('../model/books.model');
module.exports.listBooks = async(req,res)=>{
    var sessionId = req.signedCookies.sessionId;
    var session = await Session.findById(sessionId);
    var cart = await session.cart;
    // db
    //             .get('sessions')
    //             .find({sessionId:sessionId})
    //             .value()
    //             .cart;
    var count = 0;
    for(var book in cart){
        count =count + cart[book];
    }
    res.render('cart/index',{
        books:Book.find(),
        count:count
    });
}
module.exports.cart = (req,res)=>{

}
module.exports.cartAdd = (req,res)=>{
    if(!req.signedCookies.sessionId){
        res.redirect('/');
        return;
    }

    var sessionId = req.signedCookies.sessionId;
    var idBook = req.params.idBook;
    
    var count = db
                .get('sessions')
                .find({sessionId:sessionId})
                .get("cart."+idBook,0);

    db.get('sessions')
    .find({sessionId:sessionId})
    .set("cart."+idBook,count+1)
    .write();

    res.redirect('/');





    

}