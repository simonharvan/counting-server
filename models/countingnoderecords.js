'use strict';
module.exports = (sequelize, DataTypes) => {
    const CountingNodeRecords = sequelize.define('CountingNodeRecords', {}, {timestamps: false});
    CountingNodeRecords.associate = function (models) {
        CountingNodeRecords.belongsTo(models.Records);
        CountingNodeRecords.belongsTo(models.CountingNodes);
    };
    return CountingNodeRecords;
};