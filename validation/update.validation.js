const joi = require('joi');
const updateSchema = {
    // Getting data from req.params to validate the user data
    params: {
        userId : joi.number().required()
        }
}

module.exports = { updateSchema : updateSchema }