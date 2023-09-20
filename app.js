const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { default: mongoose } = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product/router');
const categoriesRouter = require('./routes/category/router');
const suppliersRouter = require('./routes/supplier/router');
const customersRouter = require('./routes/customer/router');
const employeesRouter = require('./routes/employee/router');
const ordersRouter = require('./routes/order/router');
const questionsRouter = require('./routes/questions/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// mongoose.connect('mongodb://127.0.0.1:27017/node-32-database');
mongoose.connect('mongodb+srv://huynhtrunghoa186:WX1JSFoNGSj4mMba@cluster0.ri78ryp.mongodb.net/node-32-database');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/orders', ordersRouter);
app.use('/questions', questionsRouter);

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
  res.render('error');
});

module.exports = app;