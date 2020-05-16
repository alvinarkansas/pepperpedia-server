'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'bio', Sequelize.STRING, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'bio')
  }
};
