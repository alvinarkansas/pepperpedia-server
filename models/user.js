'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name cannot be empty'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last name cannot be empty'
        }
      }
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password should at least have 6 characters'
        }
      }
    },
    profile_picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        User.password = hashPassword(User.password);
      }
    },
    sequelize,
    modelName: 'User'
  })
  User.associate = function(models) {
    User.hasMany(models.Recipe)
    User.hasMany(models.Cookmark)
    // User.belongsToMany(models.Recipe, { through: 'Cookmark' })
  };
  return User;
};