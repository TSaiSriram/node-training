const User = require('../models/users');

exports.postUsers = async (req, res) => {
    try {
        const result = await User.findAll({where : {IsDeleted : 0}});
        res.status(200).send({ data: result })
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

exports.putUser = async (req, res) => {
    try {
        const data = {
            "Name": req.body.name,
            "UpdatedBy": req.body.name,
            "UpdatedOn": new Date()
        }
        const result = await User.update(data, { where: { email: req.params.email } });
        if (result)
            res.status(200).send({ Data: "Update Sucessfully", StatusCode: 200 })
        else
            res.status(500).send({ Data: "User not found", StatusCode: 500 })
    } catch (err) {
        console.log(err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const data = {
            "IsDeleted": 1
        }
        const result = await User.update(data, { where: { email: req.body.email } })
        if (result)
            res.status(200).send({ Data: "Deleted Sucessfully", StatusCode: 200 })
        else
            res.status(500).send({ Data: "User not found", StatusCode: 500 })
    } catch (error) {
        console.log(error)
    }
}