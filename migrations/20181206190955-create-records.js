'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Records', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            lat: {
                type: Sequelize.DECIMAL(11,8)
            },
            lng: {
                type: Sequelize.DECIMAL(12,8)
            },
            entr:{
                type: Sequelize.INTEGER
            },
            exits: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            VehicleId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: 'Vehicles',
                    key: 'id'
                }
            },


        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Records');
    }
};