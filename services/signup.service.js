const User = require('../models/users');

exports.getSignUp = (req,res) => {
    res.render('auth/signup', {title : "Sign Up"})
}

exports.postSignup = async (req,res) => {
try {
    const result = await User.create({
        Email : req.body.email,
        Name : req.body.name,
        Password : req.body.password,
        Gender : req.body.gender,
        Age : req.body.age,
        Mobile : req.body.mobile,
        IsDeleted : 0,
        CreatedBy : req.body.CreatedBy,
        UpdatedBy : req.body.UpdatedBy, 
        CreatedOn : new Date(),
        UpdatedOn : new Date(),
        
    })
    if(result)
    res.status(200).send({Data : "User Created Sucessfully", StatusCode : 200})
    else
    res.status(500).send({Data : "User Creation Failed", StatusCode : 500})
} catch (error) {
    console.log(error)
}
}