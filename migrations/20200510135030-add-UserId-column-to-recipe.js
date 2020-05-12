'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Recipes', 'UserId', Sequelize.INTEGER, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recipes', 'UserId')
  }
};
