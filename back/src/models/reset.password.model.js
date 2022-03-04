'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class ResetPassword extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  ResetPassword.init({

    /** Id */
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      get(){
        return this.getDataValue('id');
      },
      set(value){
        if(!this.getDataValue('id')){
          this.setDataValue('id', crypto.randomUUID());
        }
        return;
      },
    },

    /** Refresh token */
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "token must be not NULL"
        },
        notEmpty:{
          msg: "token must be not empty"
        },
      },
    },

    /** User id */
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
      allowNull: false,
      validate: {
        notNull: {
          msg: "user id must be not NULL"
        },
        notEmpty:{
          msg: "user id must be not empty"
        },
      },
    },

    /** Email */
    email: {
        type: DataTypes.STRING(255) ,
        allowNull: false,
        validate: {
          notNull: {
            msg: "email must be not NULL"
          },
          notEmpty:{
            msg: "email must be not empty"
          },
          isEmail:{
            msg: "email is not valid"
          },
        },
        get(){
          return this.getDataValue('email');
        },
        set(value){
          this.setDataValue('email', value.replace(/ /g, ''))
        }
      },
    
    /** Expire at */
    expiresAt:{
      type: DataTypes.DATE,
      field: 'expires_at',
      allowNull: false,
      validate: {
        notNull: {
          msg: "expiresAt must be not NULL"
        },
        notEmpty:{
          msg: "expiresAt must be not empty"
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'ResetPassword',
    updatedAt: false,
    createdAt: false,
    underscored: true
  });

  return ResetPassword;
};