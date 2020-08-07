var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');


router.get('/',controller.listBooks);
router.get('/cart',controller.cart);

router.get('/cart/add/:idBook', controller.cartAdd);

module.exports = router;