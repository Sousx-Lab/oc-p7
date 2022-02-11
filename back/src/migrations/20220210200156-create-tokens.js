'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36).BINARY,
        defaultValue: 'UUIDV4',
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.CHAR(36).BINARY,
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tokens');
  },
};
