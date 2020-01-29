const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');
const config = require('./configs/config');

const app = express();

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors()); // enable cors
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todo', todoRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(' err.message;', err.message);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
