var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LYAUTH = require('lvyii_auth')
var callbackFuncs = require('./users')

const appInfo = {
  appName: 'Lvyii_Demo',
  secret: 'kuiox2sExuYy3lXzTWdef2lCuiw3IKEF',
  serverURLs: {
    api: 'http://localhost:16803'
  },
  media: 'redis',
  mediaCfg: {
    redis_url: '120.77.220.234',
    redis_port: '6379',
    redis_db: '12',
    redis_auth: 'Simors2017',
  },
  verifyPhoneSmsTempId: '96732',
  
  fetchUserById: callbackFuncs.getUserById,
  loginWithMobilePhone: callbackFuncs.loginWithMobilephone,
  loginWithUsername: callbackFuncs.loginWithUsername
};

LYAUTH.init(appInfo);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(LYAUTH.express())

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
