'use strict';
module.exports = (sequelize, DataTypes) => {
    const CountingNodes = sequelize.define('CountingNodes', {
        state: DataTypes.STRING,
        lastCount: DataTypes.INTEGER,
        lastUpdatedAt: DataTypes.DATE,
    });
    CountingNodes.associate = function (models) {
        models.CountingNodes.belongsTo(models.Vehicles);

        models.CountingNodes.belongsToMany(models.Records, {through: 'CountingNodeRecords'});
    };
    return CountingNodes;
};