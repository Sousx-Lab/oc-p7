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
    static associate({Post, Comment}) {
      this.hasMany(Post, {
        foreignKey:{
          allowNull: false,
          name: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(Comment, {
        foreignKey:{
          allowNull: false,
          name: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
    getProfilePictureName(){
      return this.getDataValue('profilePicture')
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
    firstName: {
      type: DataTypes.STRING(64),
      field: 'firstname',
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
        return this.getDataValue('firstName');
      },
      set(value){
        this.setDataValue('firstName', value.replace(/ /g, ''));
      }
    },

    /** LastName */
    lastName: {
      type: DataTypes.STRING(64) ,
      field: 'lastname',
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
        return this.getDataValue('lastName');
      },
      set(value){
        this.setDataValue('lastName', value.replace(/ /g, ''));
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
    profilePicture:{
      type: DataTypes.STRING(255),
      field: 'profile_picture',
      allowNull: true,
      get(){
        const picture = this.getDataValue('profilePicture')
        return picture ? mediaHost + picture: picture
      }
    },
    
    /** Biographie */
    bio: {
      type: DataTypes.STRING(128) ,
      field: 'bio',
      allowNull: true,
      validate: {
        max: {
          msg: "Biographie must not exceed 128 characters"
        },
      },
      get(){
        return this.getDataValue('bio');
      },
      set(value){
        if(value){
          this.setDataValue('bio', value);
        }
        
      }
    },

    /** Is active */
    isActive:{
      type: DataTypes.BOOLEAN,
      field: 'is_active',
      defaultValue: 1,
      allowNull: false,
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
    underscored: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });
  
  return User;
};