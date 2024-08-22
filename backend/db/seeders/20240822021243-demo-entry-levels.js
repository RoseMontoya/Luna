'use strict';

const { EntryLevel } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoEntryLevels = [
  {
    "entryId": 1,
    "levelId": 1,
    "rating": 8,
  }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await EntryLevel.bulkCreate( demoEntryLevels, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EntryActivities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      entryId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
