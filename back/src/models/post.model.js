'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User,{
        foreignKey:
          {
          allowNull: false,
          name: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
    

  }
  Post.init({

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

    /** Content */
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "content must be not NULL"
        },
        notEmpty:{
          msg: "content must be not empty"
        },
      },
    },
    
    /** Expire at */
    published_at:{
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    underscored: true
  });

  return Post;
};