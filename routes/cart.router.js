var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');


router.get('/',controller.listBooks);
router.get('/cart',controller.cart);

module.exports = router;