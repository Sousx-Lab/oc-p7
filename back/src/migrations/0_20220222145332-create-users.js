'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36).BINARY,
        defaultValue: 'UUIDV4',
        field: 'id',
      },
      firstName: {
        type: Sequelize.STRING(64),
        field: 'firstname',
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(64),
        field: 'lastname',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        field: 'email',
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'password',
      },
      profilePicture: {
        type: Sequelize.STRING(255),
        field: 'profile_picture',
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING(128),
        field: 'bio',
        allowNull: true,
      },
      isActive: {
        type: Sequelize.TINYINT(1),
        field: 'is_active',
        defaultValue: '1',
        allowNull: false,
      },
      roles: {
        type: Sequelize.JSON,
        defaultValue: '',
        allowNull: false,
        field: 'roles',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        _autoGenerated: 'undefined',
        field: 'created_at',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        _autoGenerated: 'undefined',
        field: 'updated_at',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
