'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Vehicles', 'type', {
                allowNull: true,
                type: Sequelize.STRING
            }),
            queryInterface.addColumn('Vehicles', 'capacity', {
                allowNull: true,
                type: Sequelize.INTEGER
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        Promise.all([
            queryInterface.removeColumn('Vehicles', 'type'),
            queryInterface.removeColumn('Vehicles', 'capacity')
        ]);

    }
};
