const { DataTypes } = require("sequelize");
const sequelize = require("../config/userDB");

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
        allowNull: false,
        unique: true,
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
        default: false,
        allowNull: true,
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: true,
    },
}, {
    timestamps: true,
});


module.exports = User;