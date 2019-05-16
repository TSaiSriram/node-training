const Sequelize = require("sequelize");
const DB = require("../config/dbConfig.json");
const logger = require("./logger.util");

const sequelize = new Sequelize(DB.name, DB.user, DB.pass, {
  dialect: DB.dialect,
  host: DB.host,
  port: DB.port,
  logging: false,
  timezone: "+05:30"
});

module.exports = sequelize;
