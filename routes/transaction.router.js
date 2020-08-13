var express  = require('express');
var router = express.Router();
var validate = require('../validate/transaction.validate');
var countCookie = require('../cookie/Count');
var db = require('../db');
var controller = require('../controllers/transaction.controller');
router.get('/' ,countCookie.Count, controller.index);
router.get('/create',countCookie.Count,controller.create);
router.get('/:id/completed' , controller.completed);

router.post('/' ,countCookie.Count,validate.postIndex, controller.postIndex );

module.exports = router;
