'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Recipes', 'tags', Sequelize.ARRAY(Sequelize.STRING), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recipes', 'tags')
  }
};
