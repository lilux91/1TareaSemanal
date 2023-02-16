const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Category = db.define('categories', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false, //no quiero que sea nulo
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 'true',
  },
});

module.exports = Category;
