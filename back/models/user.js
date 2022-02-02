'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    
    /** ID */
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    /** FirstName */
    firstname: {
      type: DataTypes.STRING(64) ,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Firstname must not be NULL"
        },
        notEmpty:{
          msg: "FirstName must not be empty"
        } 
      }
    },

    /** LastName */
    lastname: {
      type: DataTypes.STRING(64) ,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lastname must not be NULL"
        },
        notEmpty:{
          msg: "LastName must not be empty"
        } 
      }
    },

    /** Email */
    email: {
      type: DataTypes.STRING(255) ,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email must not be NULL"
        },
        isEmail:{
          args: true,
          msg: "Address email is not valid"
        },
        notEmpty:{
          msg: "Email must not be empty"
        } 
      }
    },

    /** Password */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email must not be NULL"
        },
        notEmpty:{
          msg: "Password must not be empty"
        }
      },
    },
  
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};