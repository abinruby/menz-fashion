var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
const fileUpload = require("express-fileupload");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(session({ secret: "secret", saveUninitialized: true, resave: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use(fileUpload());



app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  "/productimage",
  express.static(path.join(__dirname, "/public/productimage")))
app.use(
  "/admin/productimage",
  express.static(path.join(__dirname, "/public/productimage"))
);
app.use('/admin', adminRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   let adminlog=req.session.adminlog;
   let userlog= req.session.userlogin
   res.render('include/404',{adminlog,userlog})
});

mongoose.connect('mongodb+srv://abinkruby:abin12345678@cluster0.gqa7vyt.mongodb.net/?retryWrites=true&w=majority').then(()=>{console.log('Database connected Successfully');})
.catch((err)=>{console.log(err);})

module.exports = app;
