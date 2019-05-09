const User = require('../models/users');
const logger = require('../util/logger.util');

exports.getLogin = (req, res) => {
    // Sending the response to user
    res.render('auth/login', { title: "Login" });
}

exports.postLogin = async (req, res, next) => {
    try {
        // Checking user email is in DB or not
        const result = await User.findOne({ where: { email: req.body.email, isDeleted: 0 } })
        if (result) {
            // Checking user is authenticated or not
            if (result.password === req.body.password) {
                // If authenticated
                logger.info(result.email + " is logged in");
                res.status(200).send({ Data: "User Authenticated", StatusCode: 200 });
            }
            else {
                // If not authenticated
                logger.error(result.email + " not authenticated");
                const err = {
                    statusCode: 400,
                    message: "Wrong Password"
                }
                next(err);
            }
        } else {
            // If user not found
            logger.error("invalid email");
            const err = {
                statusCode: 404,
                message : "User not found"
            }
            next(err);
        }
    } catch (err) {
        logger.error(err);
        next(err);
    }
}