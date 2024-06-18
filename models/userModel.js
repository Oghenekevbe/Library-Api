const { DataTypes } = require("sequelize");
const { sequelize } = new require("../config/userDB");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    libraryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    isStaff: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    books: {
        type: DataTypes.STRING, // Store as a string
        defaultValue: '{}', // Default value is an empty object
        allowNull: true,
        set(value) {
            this.setDataValue('books', JSON.stringify(value)); // Serialize object to string
        },
        get() {
            const value = this.getDataValue('books');
            return value ? JSON.parse(value) : {}; // Deserialize string to object
        }
    },

}, {
    timestamps: true,

});




module.exports = User;


