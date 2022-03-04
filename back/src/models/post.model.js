'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');
const mime = require('mime-types');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment}) {
      this.belongsTo(User,{
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
          name: 'post_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
    updateCountLikes(){
      this.likes = this.getDataValue('usersLiked').length.toString();
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
      type: DataTypes.TEXT(),
      allowNull: true,
      validate: {
        ifMediaNull(value){
          if(null === this.getDataValue('media') && null === value){
            throw new Error('Please add a text, or picture or video to post');
          }
        }
      }
    },
    
    /** Media filename */
    media:{
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
      },
      get(){
        const media = this.getDataValue('media')
        return  media ? mediaHost + media : media;
      }
    },

    /** Media type (image / video...) */
    mediaType: {
      type: DataTypes.VIRTUAL,
      get(){
        if(!this.getDataValue('media')){
          return this.getDataValue('media')
        }
        return mime.lookup(this.getDataValue('media'))?.split('/')[0];
      },
      set(value){
        return;
      }
    },

    /** User liked list */
    usersLiked:{
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
      field: 'users_liked'
    },

    /** likes count this usersLiked array */
    likes: {
      type: DataTypes.STRING(255),
      defaultValue: '0'
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