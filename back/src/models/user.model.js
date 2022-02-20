'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      this.hasMany(Post, {
        foreignKey:{
          allowNull: false,
          name: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
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
        return this.getDataValue('id');
      },
      set(value){
        if(!this.getDataValue('id')){
          this.setDataValue('id', crypto.randomUUID());
        }
        return;
      }
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
        return this.getDataValue('firstname').replace(/ /g, '');
      },
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
        return this.getDataValue('lastname').replace(/ /g, '');
      },
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
        isEmail:{
          msg: "email is not valid"
        },
      },
      get(){
        return this.getDataValue('email').replace(/ /g, '');
      },
    },

    /** Password */
    password: {
      type: DataTypes.STRING(255),
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
        return this.getDataValue('password').replace(/ /g, '');
      },
    },

    /** Profile picture */
    profile_picture:{
      type: DataTypes.STRING(255),
      allowNull: true,
      get(){
        return this.getDataValue('profile_picture')?.replace(/ /g, '') || null;
      }
    },

    /** Roles[]*/
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
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    underscored: true,
  });

  return User;
};