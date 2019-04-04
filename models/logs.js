'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define('Logs', {
    text: DataTypes.STRING
  }, {});
  Logs.associate = function(models) {
    // associations can be defined here
  };
  return Logs;
};