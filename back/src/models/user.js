'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

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
        return this.getDataValue('id') || null;
      },
    },

    /** FirstName */
    firstname: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstname must be not NULL"
        },
        notEmpty:{
          msg: "firstName must be not empty"
        },
      },
      get(){
        return this.getDataValue('firstname') || null;
      },
      set(value){
        this.setDataValue('firstname', value.replace(/ /g, ''))
      }
    },

    /** LastName */
    lastname: {
      type: DataTypes.STRING(64) ,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastname must be not NULL"
        },
        notEmpty:{
          msg: "lastName must be not empty"
        },
      },
      get(){
        return this.getDataValue('lastname') || null;
      },
      set(value){
        this.setDataValue('lastname', value.replace(/ /g, ''))
      }
    },

    /** Email */
    email: {
      type: DataTypes.STRING(255) ,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "email must be not NULL"
        },
        notEmpty:{
          msg: "email must be not empty"
        },
      },
      get(){
        return this.getDataValue('email').replace(/ /g, '') || null;;
      },
    },
    /** Password */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password must be not NULL"
        },
        notEmpty:{
          msg: "password must be not empty"
        },
      },
      get(){
        return this.getDataValue('password') || null;
      },
      set(value){
        this.setDataValue('password', value.toString().replace(/ /g, ''))
      }
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