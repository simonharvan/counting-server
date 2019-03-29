'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicles', {
        name: DataTypes.STRING,
        licencePlate: DataTypes.STRING,
        lastLat:  DataTypes.DECIMAL(11, 8),
        lastLng: DataTypes.DECIMAL(12, 8),
        type: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
    }, {});
    Vehicle.associate = function (models) {
        models.Vehicles.belongsTo(models.Users);
    };
    return Vehicle;
};