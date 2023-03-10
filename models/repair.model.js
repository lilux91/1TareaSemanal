const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Repair = db.define('repair', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  date: {
    type: DataTypes.STRING,
    allowNull: false, //no quiero que sea nulo
  },

  status: {
    //type: DataTypes.STRING,
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
    enum: 'pending', //['completed', 'cancelled'],
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Repair;
