require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your database details from environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
});

module.exports = sequelize;
