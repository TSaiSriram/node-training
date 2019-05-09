const joi = require('joi');
const deleteSchema = {
    params: {
        userId : joi.number().required()
        }
}

module.exports = { deleteSchema : deleteSchema }