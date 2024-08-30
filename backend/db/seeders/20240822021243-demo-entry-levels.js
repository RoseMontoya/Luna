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
  },
  {
    "entryId": 1,
    "levelId": 2,
    "rating": 8,
  },
  {
    "entryId": 1,
    "levelId": 3,
    "rating": 5,
  },
  {
    "entryId": 1,
    "levelId": 4,
    "rating": 9,
  },
  {
    "entryId": 1,
    "levelId": 5,
    "rating": 8,
  },
  {
    "entryId": 2,
    "levelId": 1,
    "rating": 5
  },
  {
    "entryId": 2,
    "levelId": 2,
    "rating": 6,
  },
  {
    "entryId": 2,
    "levelId": 3,
    "rating": 9,
  },
  {
    "entryId": 2,
    "levelId": 4,
    "rating": 7,
  },
  {
    "entryId": 2,
    "levelId": 5,
    "rating": 8,
  },
  {
    "entryId": 3,
    "levelId": 1,
    "rating": 8,
  },
  {
    "entryId": 3,
    "levelId": 2,
    "rating": 8,
  },
  {
    "entryId": 3,
    "levelId": 3,
    "rating": 5,
  },
  {
    "entryId": 3,
    "levelId": 4,
    "rating": 8,
  },
  {
    "entryId": 3,
    "levelId": 5,
    "rating": 6,
  },
  {
    "entryId": 4,
    "levelId": 1,
    "rating": 9,
  },
  {
    "entryId": 4,
    "levelId": 2,
    "rating": 8,
  },
  {
    "entryId": 4,
    "levelId": 3,
    "rating": 4,
  },
  {
    "entryId": 4,
    "levelId": 4,
    "rating": 9,
  },
  {
    "entryId": 4,
    "levelId": 5,
    "rating": 9,
  },
  {
    "entryId": 5,
    "levelId": 1,
    "rating": 7,
  },
  {
    "entryId":5,
    "levelId": 2,
    "rating": 4,
  },
  {
    "entryId":5,
    "levelId": 3,
    "rating": 5,
  },
  {
    "entryId":5,
    "levelId": 4,
    "rating": 4,
  },
  {
    "entryId":5,
    "levelId": 5,
    "rating": 8,
  }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await EntryLevel.bulkCreate( demoEntryLevels, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EntryLevels';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      entryId: { [Op.in]: [1, 2, 3, 4, 5 ] }
    }, {});
  }
};
