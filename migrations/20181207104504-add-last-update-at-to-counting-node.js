'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('CountingNodes', "lastUpdatedAt", {
                allowNull: true,
                type: Sequelize.DATE
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('CountingNodes', "lastUpdatedAt");
    }
};
