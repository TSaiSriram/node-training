const Sequelize = require("sequelize");

const sequelize = require("../util/db.util");

const Posts = sequelize.define("posts", {
  postId: {
      type : Sequelize.INTEGER,
      allowNull :false,
      autoIncrement: true,
      primaryKey: true
  },
  title : {
      type : Sequelize.STRING,
      allowNull : false
  },
  body : {
      type : Sequelize.STRING,
      allowNull : false
  }
  ,
  userUserId : {
    type : Sequelize.INTEGER,
    allowNull :false,
    foreignKey : true
  },
  postedOn : {
      type : Sequelize.DATE,
      allowNull :false,
  }
},
  {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    tableName: "posts"
  }
 );

module.exports = Posts;