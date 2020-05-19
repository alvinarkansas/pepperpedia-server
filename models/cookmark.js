'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cookmark extends sequelize.Sequelize.Model {}

  Cookmark.init({
    UserId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cookmark'
  })

  Cookmark.associate = function(models) {
    Cookmark.belongsTo(models.User);
    Cookmark.belongsTo(models.Recipe);
  };
  return Cookmark;
};