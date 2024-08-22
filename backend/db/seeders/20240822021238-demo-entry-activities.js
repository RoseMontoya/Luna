'use strict';

const { EntryActivity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoEntryActivities = [
  {
    "entryId": 1,
    "activitiesId": 1
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await EntryActivity.bulkCreate(demoEntryActivities, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EntryActivities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      entryId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
