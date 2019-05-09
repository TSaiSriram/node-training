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
// Login and Sign Up routes
app.use('/auth', authRouter);

//User Service routes
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.isBoom) {
    var error = {
      "statusCode": 400,
      "info": "Check Request Payload",
      "error": err.data[0].message.replace(/\"/g, '')
    };
    res.status(400).send(error);

  }
  //Error Handling other than Joi Validations
  else {
    //Invalid Database column Error / Field not Defined Error 
    if (err.name == "SequelizeDatabaseError") {
      log.error("Invalid Column")
      var errorMessage = {
        "statusCode": 404,
        "info": "Invalid Column Name / Check DB Columns",
        "error": err
      };
      res.status(404).send(errorMessage);
    }
    //DB Credentials Error
    else if (err.name == "SequelizeAccessDeniedError") {
      log.error("Invalid Password")
      var errorMessage = {
        "status": 500,
        "info": "DB Credentials Error",
        "error": err
      };
      res.status(500).send(errorMessage);
    }

    else if(err.name == "SequelizeValidationError"){
      log.error("Feild missing");
      const errorMessage = {
        "status" : 500,
        "info" : "DB feilds mismatch",
        "error" : err.message
      }
      res.status(500).send(errorMessage)
    }

    //404 Error
    else if (err.statusCode == 404) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "error": err.message
      };
      res.status(404).json(errorMessage);
    }
    //400 Error
    else if (err.statusCode == 400) {
      log.error("Bad request");
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "info": "Bad Request",
        "error": err.message
      };
      res.status(400).json(errorMessage);
    }
    //500 Error
    else {
      res.status(500).send(err);
    }
  }
});

sequelize.authenticate().then( () => {
  // Database connected
});

module.exports = app;
