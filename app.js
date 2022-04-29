var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/chat');
var apiRouter = require('./routes/api')
var exphbs = require('express-handlebars');
const async = require('hbs/lib/async');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
  defaultLayout: 'layout.hbs',
  helpers: {
    senderOrReceiver: function(email, emailAccount) {
      if(email == emailAccount)
        return 'sent'
      return 'received'
    },

    nameOfSender : function(email, emailAccount, name) {
      if(email == emailAccount)
        return 'me'
      return name
    }
  }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}))
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next) => {
  res.locals.falseRegister = req.session.falseRegister
  delete req.session.falseRegister
  next()
})

app.use('/', indexRouter);
app.use('/chat', usersRouter);
app.use('/api', apiRouter);

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
