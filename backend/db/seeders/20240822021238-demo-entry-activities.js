'use strict';

const { EntryActivity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoEntryActivities = [
  {
    "entryId": 1,
    "activityId": 1
  },
  {
    "entryId": 1,
    "activityId": 3
  },
  {
    "entryId": 1,
    "activityId": 6
  },
  {
    "entryId": 2,
    "activityId": 4
  },
  {
    "entryId": 2,
    "activityId": 5
  },
  {
    "entryId": 2,
    "activityId": 11
  },
  {
    "entryId": 2,
    "activityId": 12
  },
  {
    "entryId": 3,
    "activityId": 1
  },
  {
    "entryId": 3,
    "activityId": 5
  },
  {
    "entryId": 3,
    "activityId": 8
  },
  {
    "entryId": 3,
    "activityId": 9
  },
  {
    "entryId": 3,
    "activityId": 12
  },
  {
    "entryId": 4,
    "activityId": 16
  },
  {
    "entryId": 4,
    "activityId": 6
  },
  {
    "entryId": 4,
    "activityId": 13
  },
  {
    "entryId": 4,
    "activityId": 2
  },
  {
    "entryId": 5,
    "activityId": 7
  },
  {
    "entryId": 5,
    "activityId": 11
  },
  {
    "entryId": 5,
    "activityId": 13
  },
  {
    "entryId": 5,
    "activityId": 14
  },
  {
    "entryId": 5,
    "activityId": 16
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
    return await queryInterface.bulkDelete(options, {
      entryId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
