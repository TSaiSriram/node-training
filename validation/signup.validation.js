var joi = require('joi');
var joi = joi.extend(require('joi-phone-number'));
const signupUser = {
    // Checking login for vallidation and return
    body : {
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string(),
        name: joi.string().min(3).max(30).required(),
        gender : joi.string().min(4).max(5).required(),
        age : joi.number().min(1).max(200).required(),
        mobile :  joi.number().min(1000000000).max(9999999999).required(),
        createdBy: joi.string().min(3).max(30).required(),
        updatedBy: joi.string().min(3).max(30).required()
    }
};

module.exports = {signupUser : signupUser }