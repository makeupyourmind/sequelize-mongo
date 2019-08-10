'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupUsers = sequelize.define('GroupUsers', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    GroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'id'
      }
    }
  }, {});
  GroupUsers.associate = function(models) {
    // associations can be defined here
  };
  return GroupUsers;
};