'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  Token.init({

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
    user_id: {
      type: DataTypes.UUID,
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
    /** Expire at */
    expires_at:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "expires_at must be not NULL"
        },
        notEmpty:{
          msg: "expires_at must be not empty"
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Token',
    updatedAt: false,
    createdAt: false,
    underscored: true
  });
  return Token;
};