'use strict';
module.exports = (sequelize, DataTypes) => {
    const Records = sequelize.define('Records', {
        lat: DataTypes.DECIMAL(11,8),
        lng: DataTypes.DECIMAL(12,8),
        entr: DataTypes.INTEGER,
        exits: DataTypes.INTEGER,
    });
    Records.associate = function (models) {
        models.Records.belongsTo(models.Vehicles);
        models.Records.belongsToMany(models.CountingNodes, {through: 'CountingNodeRecords'});
    };
    return Records;
};