var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
//app.use(testMid());
//var testMiddleware = require('./process/testMiddleware')
//testMiddleware();
// view engine setup
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1');
    //res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
// app.get('/public/reactStatic', function (request, response){
//   response.sendFile(path.resolve(__dirname, 'public/reactStatic', 'index.html'))
// })


app.use('/', routes);
app.use('/users', users);
app.use('/sendAgg', require("./dao/sendAgg"));
app.use('/getAllData', require("./dao/getAllData"));
app.use('/getField', require("./dao/getField"));
app.use('/getIndex', require("./dao/getIndex"));
app.use('/getType', require("./dao/getType"));
app.use('/relationship', require("./dao/relationship"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
