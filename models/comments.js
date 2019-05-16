const Sequelize = require("sequelize");

const sequelize = require("../util/db.util");

const Comments =  sequelize.define("comments",{
commentId : {
    type : Sequelize.INTEGER,
    primaryKey : true,
    allowNull :false,
    autoIncrement : true
},
postPostId : {
    type : Sequelize.INTEGER,
    allowNull : false
},
userName : {
    type : Sequelize.STRING,
    allowNull : false
},
userId : {
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
  tableName: "comments"
});

module.exports = Comments;