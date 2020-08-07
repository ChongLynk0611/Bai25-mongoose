
var express = require("express");
var router = express.Router();
var countCookie = require('../cookie/Count');
// shortid de sinh ngau nhien id cua sach
const shortid = require('shortid');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/books' })

var controller = require('../controllers/books.controller');
var db = require('../db');
 // cac get
router.get('/' ,countCookie.Count,controller.index );
router.get('/create',countCookie.Count,controller.create);
router.get('/delete/:id' ,countCookie.Count,controller.delete);
router.get('/edit/:id',countCookie.Count,controller.edit);
// cac post
router.post('/create',upload.single('avatar'),countCookie.Count,controller.postCreate);
router.post('/edit/:id',countCookie.Count,controller.postEdit);

module.exports = router;