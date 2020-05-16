'use strict';
const generateTags = require('../helpers/generateTags');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends sequelize.Sequelize.Model { }

  Recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    story: DataTypes.STRING,
    serving: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    cooking_duration: DataTypes.STRING,
    steps: DataTypes.ARRAY(DataTypes.STRING),
    thumbnail: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    hooks: {
      beforeCreate: (Recipe, options) => {
        Recipe.tags = generateTags(Recipe.title);
      }
    },
    sequelize,
    modelName: 'Recipe'
  })

  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User)
  };
  return Recipe;
};