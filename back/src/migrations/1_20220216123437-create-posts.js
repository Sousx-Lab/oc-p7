'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36).BINARY,
        defaultValue: 'UUIDV4',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        _autoGenerated: 'undefined',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        _autoGenerated: 'undefined',
      },
      user_id: {
        type: Sequelize.CHAR(36).BINARY,
        allowNull: false,
        name: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts');
  },
};
