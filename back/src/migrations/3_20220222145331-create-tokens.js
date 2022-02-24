'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36).BINARY,
        defaultValue: 'UUIDV4',
        field: 'id',
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'token',
      },
      userId: {
        type: Sequelize.CHAR(36).BINARY,
        field: 'user_id',
        allowNull: false,
      },
      expiresAt: {
        type: Sequelize.DATE,
        field: 'expires_at',
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tokens');
  },
};
