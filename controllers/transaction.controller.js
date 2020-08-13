var db = require('../db');
var Transaction = require('../model/transaction.model');
const shortid = require('shortid');
module.exports.index =  async (req, res)=>{
    var transactions  = await Transaction.find();
    
    res.render('transaction/transaction' , {
        transactions:transactions
    });
}

module.exports.create = (req,res)=>{
    res.render('transaction/create');
}

module.exports.postIndex = (req ,res)=>{
    req.body.iscomplete = false;
    req.body.id = shortid.generate();
    Transaction.create(req.body);
    res.redirect('/transaction');
}

module.exports.completed = async(req, res)=>{
    var id = req.params.id;
    var transaction = await Transaction.findById(id);
    if(transaction){
        transaction.iscomplete = true;
        transaction.save();
        res.redirect('/transaction');
        return;
    }
    res.render('error/error');

   

}