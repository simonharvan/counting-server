let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let SequelizeStore = require('connect-session-sequelize')(session.Store);
var models = require('./models');
global.__root   = __dirname + '/';

let config = require('./config/config.json');


let apiAuthRouter = require('./routes/api/auth/auth');
let recordRouter = require('./routes/api/records');
let verifyApi = require('./routes/api/auth/verify');
let testApiRouter = require('./routes/api/test');

let indexRouter = require('./routes/web/index');
let authRouter = require('./routes/web/auth/auth');
let usersRouter = require('./routes/web/users');
let busesRouter = require('./routes/web/buses');
let nodesRouter = require('./routes/web/nodes');
let vehiclesRouter = require('./routes/web/vehicles');
let logsRouter = require('./routes/web/logs');
let logsApiRouter = require('./routes/api/logs');
let verify = require('./routes/web/auth/verify');
let scheduleNodeCheck = require('./cron/nodes-checker');
scheduleNodeCheck();
let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
let store = new SequelizeStore({
    db: models.sequelize
});
app.use(session({
    key: 'user_sid',
    secret: config.secret,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    },
    store: store,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true
}));

store.sync();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/buses', verify, busesRouter);
app.use('/users', verify, usersRouter);
app.use('/logs', verify, logsRouter);
app.use('/vehicles', verify, vehiclesRouter);
app.use('/nodes', verify, nodesRouter);

app.use('/api/test', testApiRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/records', verifyApi, recordRouter);
app.use('/api/logs', verifyApi, logsApiRouter);



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
  res.render('layouts/error');
});

module.exports = app;
