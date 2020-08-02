
var express = require("express");
var app = express();
var cookieParser = require('cookie-parser')
var db = require('./db');
var booksRouter = require('./routes/books.router');
var usersRouter = require('./routes/users.router');
var transaction = require('./routes/transaction.router');
var homeRouter = require('./routes/home.router');
var loginRouter = require('./routes/login.router');
var loginMidleware = require('./midleware/login.midleware');
// khai bao pug
app.set('view engine', 'pug');
app.set('views', './views');

//khai bao de lay duoc req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('sadbajhsgdjasbdcjkasbcjkgui12423547325'));
app.use('/books',loginMidleware.login, booksRouter);
app.use('/users',loginMidleware.login, usersRouter);
app.use('/transaction',loginMidleware.login, transaction);
app.use('/home',loginMidleware.login, homeRouter);
app.use('/login',loginRouter);

app.listen(3000 , function(){
    console.log("this is port 3000!!!");
});