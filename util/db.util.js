const Sequelize = require('sequelize');
const DB = require('../config/dbConfig.json');
const logger = require('./logger.util');

const sequelize = new Sequelize(DB.name, DB.user, DB.pass,
    {
        dialect: DB.dialect,
        host: DB.host,
        port: DB.port,
        logging: false
    }
);

sequelize.authenticate()
    .then(function () {
        logger.info("MySql Connected");
        // logger.info("MariaDB Connection Established");
    })
    .catch(function (err) {
        logger.error("Error Connecting to Database" + err);
        //  logger.error("Error Connecting to Database" + err);
    })
    .done();

module.exports = sequelize;