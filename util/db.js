const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_training', 'root', 'dbpass',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        logging: false
    }
);

sequelize.authenticate()
    .then(function () {
        console.log("MySql Connected");
        // logger.info("MariaDB Connection Established");
    })
    .catch(function (err) {
        console.log("Error Connecting to Database" + err);
        //  logger.error("Error Connecting to Database" + err);
    })
    .done();

module.exports = sequelize;