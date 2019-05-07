const User = require('../models/users');

exports.postUsers = async (req,res) => {
   try{
    const result = await User.fetchAll();
    return result;
   }
   catch(err){
       console.log(err);
   }
}