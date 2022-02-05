'use strict';
const { Model } = require('sequelize');
const { isValidPassword, isEmail } = require('../middlewares/validator/validator');

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
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      get(){
        return this.getDataValue('id') ?? null;
      },
    },

    /** FirstName */
    firstname: {
      type: DataTypes.STRING(64) ,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Firstname must be not NULL"
        },
        notEmpty:{
          msg: "FirstName must be not empty"
        } 
      },
      get(){
        return this.getDataValue('firstname') ?? null;
      },
    },

    /** LastName */
    lastname: {
      type: DataTypes.STRING(64) ,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lastname must be not NULL"
        },
        notEmpty:{
          msg: "LastName must be not empty"
        } 
      },
      get(){
        return this.getDataValue('lastname') ?? null;
      },
    },

    /** Email */
    email: {
      type: DataTypes.STRING(255) ,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email must be not NULL"
        },
        notEmpty:{
          msg: "Email must be not empty"
        },
        validateEmail(value){
          isEmail(value);
        },
      },
      get(){
        return this.getDataValue('email') ?? null;
      },
    },

    /** Password */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password must be not NULL"
        },
        notEmpty:{
          msg: "Password must be not empty"
        },
        validatePassword(value){
          isValidPassword(value);
        }
      },
      get(){
        return this.getDataValue('password') ?? null;
      },
    },
    
    roles:{
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
      get(){
        return ['ROLE_USER', ...this.getDataValue('roles')]
      },
      set(value){
        this.setDataValue('roles', value)
      }
    },
    
  },
   
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};