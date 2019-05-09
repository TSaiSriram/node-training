const Sequelize = require('sequelize');

const sequelize = require('../util/db.util');

const User = sequelize.define('users', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mobile: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdBy : {
        type : Sequelize.STRING,
        allowNull : false
    },
    updatedBy : {
        type : Sequelize.STRING,
        allowNull :false
    },
    createdOn : {
        type : Sequelize.DATE,
        allowNull : false
    },
    updatedOn : {
        type : Sequelize.DATE,
        allowNull : false
    }
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'users'
    });



module.exports = User;