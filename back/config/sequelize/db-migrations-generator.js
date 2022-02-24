#!/usr/bin/env node

const fs = require('fs');
const models = require('../../src/models');

for (const model in models) {
  const tableName = models[model].tableName;

  let defaultValue = '';
  let onUpdate = '';
  let type = '';
  let template = `'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('${tableName}', {\n`;

  const attributes = models[model].tableAttributes;

  for (const column in attributes) {
    delete attributes[column].Model;
    delete attributes[column].fieldName;
    delete attributes[column]._modelAttribute;
    delete attributes[column].get;
    delete attributes[column].set;
    delete attributes[column].validate;
    template += `      ${column}: {\n`;

    if (attributes[column].defaultValue) {
      if (
        JSON.stringify(attributes[column].defaultValue)
          .toString()
          .match(/NOW/i) ||
        JSON.stringify(attributes[column].defaultValue)
          .toString()
          .match(/CURRENT_TIMESTAMP/i)
      ) {
        defaultValue = "Sequelize.literal('CURRENT_TIMESTAMP')";
      } else {
        defaultValue = attributes[column].defaultValue.toString();
      }
    }

    if (attributes[column].onUpdate) {
      if (
        JSON.stringify(attributes[column].onUpdate).toString().match(/NOW/i) ||
        JSON.stringify(attributes[column].onUpdate)
          .toString()
          .match(/CURRENT_TIMESTAMP/i)
      ) {
        defaultValue = "Sequelize.literal('CURRENT_TIMESTAMP')";
        onUpdate = "Sequelize.literal('CURRENT_TIMESTAMP')";
      }
    }

    if (attributes[column].type) {
      let dataType = attributes[column].type.toString();
      dataType = dataType.replace('DATETIME', 'DATE');
      dataType = dataType.replace('VARCHAR', 'STRING');
      dataType = dataType.split(' ').join('.');
      type = `Sequelize.${dataType}`;
    }

    for (const property in attributes[column]) {
      if (property.toString().match(/^_/i)) {
        delete attributes[column][property];
      }
      if (property === 'type') {
        template += `        type: ${type},\n`;
      } else if (property === 'defaultValue') {
        if (column === 'createdAt') {
          template += `        defaultValue: ${defaultValue},\n`;
        } else {
          template += `        defaultValue: '${attributes[column].defaultValue}',\n`;
        }
      } else if (property === 'onUpdate') {
        template += `        defaultValue: ${defaultValue},\n`;
        template += `        onUpdate: ${onUpdate},\n`;
      } else {
        if (typeof attributes[column][property] === 'object') {
          template += `        ${property}: {\n`;
          for (const p in attributes[column][property]) {
            if (typeof attributes[column][property][p] === 'object') {
              template += `          ${p}: {\n`;
              for (const sp in attributes[column][property][p]) {
                template += `            ${sp}: '${attributes[column][property][p][sp]}',\n`;
              }
              template += '          },\n';
            } else {
              if (typeof attributes[column][property][p] === 'boolean') {
                template += `          ${p}: ${attributes[column][property][p]},\n`;
              } else {
                template += `          ${p}: '${attributes[column][property][p]}',\n`;
              }
            }
          }
          template += '        },\n';
        } else {
          if (typeof attributes[column][property] === 'boolean') {
            template += `        ${property}: ${attributes[column][property]},\n`;
          } else {
            template += `        ${property}: '${attributes[column][property]}',\n`;
          }
        }
      }
    }
    template += '      },\n';
  }

  template += `    });
  },\n
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('${tableName}');
  },
};\n`;

  if (models[model].tableName !== undefined) {
    const now = new Date();
    try {
      fs.writeFileSync(
        `${__dirname} + '/../../src/migrations/${now.toISOString().replace(/[^\d]/g, '').slice(0, -3)}-create-${models[model].tableName}.js`,
        template,
      );
    } catch (error) {
        console.log(error.message)
    }
    
  }
}
