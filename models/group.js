'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  Groups.associate = function(models) {
    // associations can be defined here
    Groups.belongsToMany(models.User, {
      through: 'GroupUsers',
      as: 'users',
      foreignKey: 'GroupId'
    });
  };
  return Groups;
};