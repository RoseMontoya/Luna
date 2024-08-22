'use strict';

const { Level } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoLevels = [
  {
    "name": "Happiness",
    "color": "#F0A8D0",
    "userId": 1,
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Level.bulkCreate(demoLevels, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Levels';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
