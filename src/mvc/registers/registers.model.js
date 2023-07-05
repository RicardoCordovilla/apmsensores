const { DataTypes } = require("sequelize")
const db=require('../../dabase')

const Registers = db.define('registers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    station: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    values: {
        type: DataTypes.JSON,
        allowNull: false
    }
})

module.exports = Registers