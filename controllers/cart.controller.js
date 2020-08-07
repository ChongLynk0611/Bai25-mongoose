
var db = require('../db');


module.exports.listBooks = (req,res)=>{
    res.render('cart/index',{
        books:db.get('books').value()
    });
}
module.exports.cart = (req,res)=>{

}