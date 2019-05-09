const User = require('../models/users');
const logger = require('../util/logger.util');
const statusCode = require('../config/HTTP_CODES');

exports.getSignUp = (req, res) => {
    // Sending signup page as response
    res.render('auth/signup', { title: "Sign Up" })
}

exports.postSignup = async (req, res, next) => {
    try {
        // Creating user account in the database
        const result = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            gender: req.body.gender,
            age: req.body.age,
            mobile: req.body.mobile,
            isDeleted: 0,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            createdOn: new Date(),
            updatedOn: new Date(),

        })
        if (result) {
            // If the account created sucessfully
            logger.info("Created User " + result.email + " Sucessfully")
            res.status(statusCode.OK).send({ Data: "User Created Sucessfully", StatusCode: 200 })
        }
        else {
            // If the account not  created sucessfully
            logger.error("User Creation failed");
            const err =
            {
                statusCode: statusCode.INTERNAL_SERVER_ERROR,
                message: "User Creation Failed"
            }
            next(err);
        }
    } catch (err) {
        logger.error(err)
        next(err);
    }
}