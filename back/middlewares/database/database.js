'use strict';
const Sequelize = require("sequelize");
const config = require('../../config/config');
const env = process.env.NODE_ENV || 'dev'

module.exports = {
    connect: async function() {
        const sequelize = new Sequelize(process.env[config[env].use_env_variable], config[env]);
        try {
            await sequelize.authenticate();
            console.log(`Connection to database has been established successfully.`);
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
}