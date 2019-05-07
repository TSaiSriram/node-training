const User = require('../models/users');

exports.getLogin = (req,res) => {
    res.render('auth/login', {title : "Login"});
}

exports.postLogin = async (req,res) => {
    try{
        const result = await User.findOne({where  : { email : req.body.email }})
        if(result.password === req.body.password){
            res.status(404).send({Data : "User Authenticated", StatusCode : 200});
        }
        else
            res.status(404).send({Data : "User Not Found", StatusCode : 404});
    }catch(err){
        next(err);
    } 
    
}

