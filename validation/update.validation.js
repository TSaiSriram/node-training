const joi = require("joi");
const updateUser = {
  // Getting data from req.params to validate the user data
  params: {
    userId: joi.number().required()
  }
};

module.exports = { updateUser: updateUser };
