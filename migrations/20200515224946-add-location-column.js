'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'location', Sequelize.STRING, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'location')
  }
};
