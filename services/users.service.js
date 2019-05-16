const User = require("../models/users").default;
const logger = require("../util/logger.util");
const statusCode = require("../config/HTTP_CODES");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
exports.postUsers = async (req, res, next) => {
  try {
    // Finding all the users to send the data
    const result = await User.findAll({ where: { isDeleted: 0 } });
    logger.info("Sending all users data to the server");
    res.status(statusCode.OK).send({
      metadata: {
        statusCode: statusCode.OK,
        info: "List of users",
        count: result.length
      },
      users: result
    });
  } catch (err) {
    // Logging the error
    logger.error(err);
    next(err);
  }
};

exports.postSearchUsers = async (req, res, next) => {
  try {
    let name, email;
    req.body.name != undefined && req.body.name != null
      ? (name = req.body.name)
      : (name = "");
    req.body.email != undefined && req.body.email != null
      ? (email = req.body.email)
      : (email = "");
    const result = await User.findAll({
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: "%" + name + "%"
            }
          },
          {
            email: {
              [Op.like]: "%" + email + "%"
            }
          }
        ]
      }
    });

    if (result) {
      res.status(statusCode.OK).send({
        metadata: {
          statusCode: statusCode.OK,
          info: "List of users",
          count: result.length
        },
        Users: result
      });
    } else {
      const err = {
        statusCode: statusCode.NOT_FOUND,
        message: "The name not found"
      };
      next(err);
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

exports.putUser = async (req, res, next) => {
  try {
    // Creating update info
    const data = {
      name: req.body.name,
      updatedBy: req.body.name,
      updatedOn: new Date()
    };
    // checking the user existed or not
    const result = await User.findOne({
      where: { userId: req.params.userId, isDeleted: 0 }
    });
    if (result) {
      if (result.name == data.name)
        return res.status(statusCode.BAD_REQUEST).send("Same User name found");

      // Updating the user.
      logger.info("Fetching User data to Update User");
      await User.update(data, { where: { userId: req.params.userId } });
      res.status(statusCode.OK).send("Update Sucessfully");
    } else {
      // Responding if the user not found
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

exports.deleteUser = async (req, res, next) => {
  try {
    // making to update for soft delete
    const data = {
      isDeleted: 1,
      updatedBy: req.body.name,
      updatedOn: new Date()
    };
    // checking if user exists
    const result = await User.update(data, {
      where: { userId: req.params.userId, isDeleted: 0 }
    });
    if (result[0] == 1)
      // If the user exists we will delete him
      res
        .status(statusCode.OK)
        .send({ Data: "Deleted Sucessfully", StatusCode: statusCode.OK });
    else {
      const err = {
        statusCode: statusCode.BAD_REQUEST,
        message: "User already deleted"
      };
      next(err);
    }
  } catch (error) {
    logger.error(error);
    next(err);
  }
};
