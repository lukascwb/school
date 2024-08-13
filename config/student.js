
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../database'); // Import your database configuration

const sequelize = new Sequelize(dbConfig.DATABASE_URL, {
    dialect: 'mysql',
    logging: false // You can uncomment this for debugging
});

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = {
    Student,
    sequelize
};