const sequelize = require('../config/userDB'); // Correctly import sequelize instance
const User = require('../models/userModel'); // Correctly import the User model

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models
        await sequelize.sync({ alter: true }); // Use { force: true } only if you want to drop existing tables
        console.log('All models were synchronized successfully.');



    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
})();
