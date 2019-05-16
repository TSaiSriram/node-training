const Sequelize = require("sequelize");

const sequelize = require("../util/db.util");

const Comment =  sequelize.define("comments",{
commentId : {
    type : Sequelize.INTEGER,
    primaryKey : true,
    allowNull :false,
    autoIncrement : true
},
postId : {
    type : Sequelize.INTEGER,
    allowNull : false
}
,
comment : {
    type : Sequelize.STRING,
    allowNull : false
}
},
{
  timestamps: false,
  freezeTableName: true, // Model tableName will be the same as the model name
  tableName: "users"
});

module.exports = Comment;