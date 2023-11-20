const Sequelize = require("sequelize");

const connection = new Sequelize('bdblog', 'root', 'Cachaça123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;