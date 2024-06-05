var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//database
require('./src/config/mongodb');

//router
const usersRouter = require('./src/routes/userRouter');
const productRouter = require('./src/routes/productRouter');

//middleware
const errorHandlingMiddleWare = require('./src/middlewares/errorHandlingMiddleWare');
const categoryRouter = require('./src/routes/categoryRouter');
const masterViewRouter = require('./src/routes/view/masterViewRouter');
const viewRouter = require('./src/routes/view/viewRouter');
const brandRouter = require('./src/routes/brandRouter');
//const filterRouter = require('./src/client/filter/filterRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

//app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/view',viewRouter)
app.use('/category',categoryRouter)
app.use('/masterView',masterViewRouter)
app.use('/brand',brandRouter)
//app.use('/filter',filterRouter)

// middleware error handler
app.use(errorHandlingMiddleWare)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;