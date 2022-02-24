'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Post}) {
      this.belongsTo(User,{
        foreignKey:{
          allowNull: false,
          name: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(Post,{
        foreignKey:{
            allowNull: false,
            name: 'post_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      })
    }
  }
  Comment.init({

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
      }
    },

    /** Media */
    media:{
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    /** Content */
    content: {
      type: DataTypes.TEXT(),
      allowNull: true,
      validate:{
        oneOfTwoNotNull(value){
          if(value === null && this.media === null){
            throw new Error("comment can't be null unless media not null")
          }
        }
      }
    }

  },
  {
    sequelize,
    modelName: 'Comment',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    underscored: true
  });

  return Comment;
};