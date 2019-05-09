const joi = require('joi');
const loginSchema = {
    // Taking data from the req.body and checking email and password
    body: {
        email: joi.string().email().required(),
        password: joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    }
}

module.exports = { loginSchema : loginSchema }