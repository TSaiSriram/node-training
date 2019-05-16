const joi = require('joi');
const deleteUser = {
    params: {
        userId : joi.number().required()
        }
}

module.exports = { deleteUser : deleteUser }