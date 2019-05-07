const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const User = sequelize.define('users', {
    UserId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Mobile: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IsDeleted: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CreatedBy : {
        type : Sequelize.STRING,
        allowNull : false
    },
    UpdatedBy : {
        type : Sequelize.STRING,
        allowNull :false
    },
    CreatedOn : {
        type : Sequelize.DATE,
        allowNull : false
    },
    UpdatedOn : {
        type : Sequelize.DATE,
        allowNull : false
    }
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'users'
    });



module.exports = User;