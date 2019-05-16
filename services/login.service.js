const User = require("../models/users");
const logger = require("../util/logger.util");
const statusCode = require("../config/HTTP_CODES");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res) => {
  // Sending the response to user
  res.render("auth/login", { title: "Login" });
};

exports.postLogin = async (req, res, next) => {
  try {
    // Checking user email is in DB or not
    const result = await User.findOne({
      where: { email: req.body.email, isDeleted: 0 }
    });
    //Checking result
    if (result) {
      const hashedPassword = await bcrypt.compare(
        req.body.password,
        result.password
      );
      // Checking user is authenticated or not
      if (hashedPassword) {
        // If authenticated
        var token = jwt.sign({ email: result.email }, "ThisIsASecretKey");
        logger.info(result.email + " is logged in");
        res.status(statusCode.OK).send({
          StatusCode: statusCode.OK,
          Data: "User Authenticated",
          token: token
        });
      } else {
        // If not authenticated
        logger.error(result.email + " not authenticated");
        const err = {
          statusCode: statusCode.BAD_REQUEST,
          message: "Wrong Password"
        };
        next(err);
      }
    } else {
      // If user not found
      logger.error("invalid email");
      const err = {
        statusCode: statusCode.NOT_FOUND,
        message: "User not found"
      };
      next(err);
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
