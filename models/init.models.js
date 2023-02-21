const User = require('./user.model');
const Repair = require('./repair.model');

const initModel = () => {};

/* 1User <--------> M repairs */
User.hasMany(Repair);
Repair.belongsTo(User);

module.exports = initModel;
