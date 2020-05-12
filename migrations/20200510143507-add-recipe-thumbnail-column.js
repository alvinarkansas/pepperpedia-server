'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Recipes', 'thumbnail', Sequelize.STRING, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recipes', 'thumbnail')
  }
};
