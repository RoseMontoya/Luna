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
  },
{entryId: 27, activityId: 20},
{entryId: 27, activityId: 21},
{entryId: 27, activityId: 22},
{entryId: 27, activityId: 29},
{entryId: 27, activityId: 36},
{entryId: 27, activityId: 57},
{entryId: 31, activityId: 21},
{entryId: 31, activityId: 25},
{entryId: 31, activityId: 27},
{entryId: 31, activityId: 30},
{entryId: 31, activityId: 33},
{entryId: 31, activityId: 35},
{entryId: 31, activityId: 37},
{entryId: 31, activityId: 43},
{entryId: 31, activityId: 46},
{entryId: 28, activityId: 19},
{entryId: 28, activityId: 25},
{entryId: 28, activityId: 31},
{entryId: 28, activityId: 34},
{entryId: 28, activityId: 36},
{entryId: 28, activityId: 43},
{entryId: 28, activityId: 52},
{entryId: 28, activityId: 56},
{entryId: 29, activityId: 25},
{entryId: 29, activityId: 27},
{entryId: 29, activityId: 33},
{entryId: 29, activityId: 36},
{entryId: 29, activityId: 37},
{entryId: 26, activityId: 25},
{entryId: 26, activityId: 29},
{entryId: 26, activityId: 37},
{entryId: 26, activityId: 43},
{entryId: 26, activityId: 57},
{entryId: 32, activityId: 29},
{entryId: 32, activityId: 36},
{entryId: 32, activityId: 39},
{entryId: 32, activityId: 50},
{entryId: 32, activityId: 54},
{entryId: 32, activityId: 55},
{entryId: 32, activityId: 57},
{entryId: 25, activityId: 25},
{entryId: 25, activityId: 27},
{entryId: 25, activityId: 29},
{entryId: 25, activityId: 31},
{entryId: 25, activityId: 35},
{entryId: 25, activityId: 37},
{entryId: 25, activityId: 39},
{entryId: 25, activityId: 43},
{entryId: 25, activityId: 46},
{entryId: 25, activityId: 50},
{entryId: 24, activityId: 21},
{entryId: 24, activityId: 25},
{entryId: 24, activityId: 27},
{entryId: 24, activityId: 31},
{entryId: 24, activityId: 34},
{entryId: 24, activityId: 36},
{entryId: 24, activityId: 37},
{entryId: 22, activityId: 19},
{entryId: 22, activityId: 25},
{entryId: 22, activityId: 27},
{entryId: 22, activityId: 31},
{entryId: 22, activityId: 33},
{entryId: 22, activityId: 37},
{entryId: 22, activityId: 52},
{entryId: 22, activityId: 54},
{entryId: 23, activityId: 20},
{entryId: 23, activityId: 22},
{entryId: 23, activityId: 25},
{entryId: 23, activityId: 26},
{entryId: 23, activityId: 29},
{entryId: 23, activityId: 36},
{entryId: 23, activityId: 43},
{entryId: 23, activityId: 50},
{entryId: 23, activityId: 51},
{entryId: 23, activityId: 55},
{entryId: 30, activityId: 25},
{entryId: 30, activityId: 27},
{entryId: 30, activityId: 30},
{entryId: 30, activityId: 35},
{entryId: 30, activityId: 36},
{entryId: 30, activityId: 37},
{entryId: 30, activityId: 43},
{entryId: 21, activityId: 34},
{entryId: 21, activityId: 35},
{entryId: 21, activityId: 36},
{entryId: 21, activityId: 37},
{entryId: 21, activityId: 39},
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
      entryId: { [Op.in]: [1, 2, 3, 4, 5, 27, 31, 28, 29, 26, 32, 25, 24, 22, 23, 30, 21] }
    }, {});
  }
};
