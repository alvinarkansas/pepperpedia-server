'use strict';
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
    serving: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Serving cannot be empty'
        }
      }
    },
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    cooking_duration: DataTypes.STRING,
    steps: DataTypes.ARRAY(DataTypes.STRING),
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe'
  })

  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User)
  };
  return Recipe;
};