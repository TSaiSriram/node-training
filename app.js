var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users.routes');
var app = express();
const sequelize = require('./util/db.util');
const authRouter = require('./routes/auth.routes');
// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Logging
const log = require('./util/logger.util');
//HTTP_CODES
const statusCode = require('./config/HTTP_CODES');
// Login and Sign Up routes
app.use('/', authRouter);

//User Service routes
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(statusCode.NOT_FOUND));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.isBoom) {
    var error = {
      "statusCode": statusCode.BAD_REQUEST,
      "info": "Check Request Payload",
      "error": err.data[0].message.replace(/\"/g, '')
    };
    res.status(statusCode.BAD_REQUEST).send(error);

  }
  //Error Handling other than Joi Validations
  else {
    //Invalid Database column Error / Field not Defined Error 
    if (err.name == "SequelizeDatabaseError") {
      log.error("Invalid Column")
      var errorMessage = {
        "statusCode": statusCode.NOT_FOUND,
        "info": "Invalid Column Name / Check DB Columns",
        "error": err
      };
      res.status(statusCode.NOT_FOUND).send(errorMessage);
    }
    //DB Credentials Error
    else if (err.name == "SequelizeAccessDeniedError") {
      log.error("Invalid Password")
      var errorMessage = {
        "status": statusCode.INTERNAL_SERVER_ERROR,
        "info": "DB Credentials Error",
        "error": err
      };
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(errorMessage);
    }

    else if(err.name == "SequelizeValidationError"){
      log.error("Feild missing");
      const errorMessage = {
        "status" : statusCode.INTERNAL_SERVER_ERROR,
        "info" : "DB feilds mismatch",
        "error" : err.message
      }
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(errorMessage)
    }

    //404 Error
    else if (err.statusCode == statusCode.NOT_FOUND) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "error": err.message
      };
      res.status(statusCode.NOT_FOUND).json(errorMessage);
    }
    //400 Error
    else if (err.statusCode == statusCode.BAD_REQUEST) {
      log.error("Bad request");
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "info": "Bad Request",
        "error": err.message
      };
      res.status(statusCode.BAD_REQUEST).json(errorMessage);
    }
    //500 Error
    else {
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
    }
  }
});

sequelize.authenticate().then( () => {
  // Database connected
});

module.exports = app;