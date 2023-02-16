const User = require('./user.model');
const Repair = require('./repair.model');

const initModel = () => {};

/* 1User <--------> M repairs */
User.hasMany(Repair);
Repair.belongsTo(User);

/*1Repair <----->  1User*/
User.hasOne(Repair);
Repair.belongsTo(User);

module.exports = initModel;
