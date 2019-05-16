const Sequelize = require("sequelize");

const sequelize = require("../util/db.util");

const Post = sequelize.define("posts", {
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
  postedBy : {
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
    tableName: "users"
  }
 );

module.exports = Post;