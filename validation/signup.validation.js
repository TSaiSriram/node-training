var joi = require('joi');
var joi = joi.extend(require('joi-phone-number'));
const signupSchema  = {
    // Checking login for vallidation and return
    body : {
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        name: joi.string().alphanum().min(3).max(30).required(),
        gender : joi.string().min(4).max(5).required(),
        age : joi.number().min(1).max(3).required(),
        mobile :  joi.number().min(1000000000).max(9999999999).required(),
        isDeleted : joi.number().min(1).max(1).integer().required(),
        createdBy: joi.string().alphanum().min(3).max(30).required(),
        updatedBy: joi.string().alphanum().min(3).max(30).required()
    }
};

module.exports = {signupSchema : signupSchema }