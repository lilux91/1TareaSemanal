const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('user', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client',
    //enum: ['client', 'employee'], //que valores van en roles
  },

  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available', //valor por defecto Client
    enum: ['available', 'unavailable'],
  },
});

module.exports = User;

//https://sequelize.org/api/v6/class/src/data-types.js~enum
