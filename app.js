var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var flash = require('express-flash');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(cookieSession({
  name: 'session',
  keys: ['tst'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use('/', index);
app.use('/tasks', tasks);

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

const query_task =  'CREATE TABLE IF NOT EXISTS "tasks" ' +
                    '(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                    'name VARCHAR(255),' +
                    'email VARCHAR(255),' +
                    'title VARCHAR(255))'

db.run(query_task, function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = app;
