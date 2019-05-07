const User = require('../models/users');

exports.getSignUp = (req,res) => {
    res.render('auth/signup', {title : "Sign Up"})
}

exports.postSignup = (req,res) => {
    User.create({
        UserId : 4,
        email : req.body.email,
        name : req.body.name,
        password : req.body.password,
        gender : req.body.gender,
        age : req.body.age,
        mobile : req.body.mobile,
        isDeleted : 0
    }).then(() => {
        res.end("User Created Sucessfully")
        console.log("User Created")
    })
}