const User = require('../models/users');
const logger = require('../util/logger.util');
const statusCode  = require('../config/HTTP_CODES');

exports.postUsers = async (req, res, next) => {
    try {
        // Finding all the users to send the data
        const result = await User.findAll({ where: { isDeleted: 0 } });
        logger.info("Sending all users data to the server");
        res.status(200).send({ Users: result });
        return result;
    }
    catch (err) {
        // Logging the error
        logger.error(err);
        next(err);
    }
}

exports.putUser = async (req, res, next) => {
    try {
        // Creating update info
        const data = {
            "name": req.body.name,
            "updatedBy": req.body.name,
            "updatedOn": new Date()
        }
        // checking the user existed or not
        const result = await User.findOne({ where: { userId: req.params.userId, isDeleted: 0 } });
        if (result) {
            // Updating the user.
            logger.info("Fetching User data to Update User")
            await User.update(data, { where: { userId: req.params.userId } })
            const err = { statusCode: statusCode.OK, message: "Update Sucessfully" }
            next(err);
        }
        else {
            // Responding if the user not found
            const err = { statusCode: statusCode.NOT_FOUND, message: "User not found" }
            next(err);
        }
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        // making to update for soft delete
        const data = {
            "isDeleted": 1,
            "updatedBy": req.body.name,
            "updatedOn": new Date()
        }
        // checking if user exists
        const result = await User.update(data, { where: { userId: req.params.userId, isDeleted: 0 } })
        if (result)
            // If the user exists we will delete him
            res.status(statusCode.OK).send({ Data: "Deleted Sucessfully", StatusCode: 200 })
        else {
            const err = { statusCode: statusCode.NOT_FOUND, message: "User not found" }
            next(err);
        }
    } catch (error) {
        logger.error(error);
        next(err)
    }
}