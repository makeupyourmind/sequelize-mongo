'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Company, {foreignKey: 'CompanyId', as: 'company'});
    User.belongsToMany(models.Groups, {
      through: 'GroupUsers',
      as: 'groups',
      foreignKey: 'UserId'
    });
  };
  return User;
};