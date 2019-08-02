'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tester = sequelize.define('Tester', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {});
  Tester.associate = function(models) {
    // associations can be defined here
  };
  return Tester;
};