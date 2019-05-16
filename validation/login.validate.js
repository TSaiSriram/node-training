const joi = require('joi');
const loginUser = {
    // Taking data from the req.body and checking email and password
    body: {
        email: joi.string().email().required(),
        password: joi.string().required(),
    }
}

module.exports = { loginUser : loginUser }