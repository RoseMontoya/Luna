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
  },

{entryId: 27, levelId: 6, rating: 10},
{entryId: 27, levelId: 10, rating: 7},
{entryId: 27, levelId: 7, rating: 7},
{entryId: 27, levelId: 9, rating: 7},
{entryId: 27, levelId: 8, rating: 5},
{entryId: 31, levelId: 6, rating: 8},
{entryId: 31, levelId: 10, rating: 6},
{entryId: 31, levelId: 7, rating: 5},
{entryId: 31, levelId: 8, rating: 4},
{entryId: 31, levelId: 9, rating: 6},
{entryId: 28, levelId: 6, rating: 9} ,
{entryId: 28, levelId: 7, rating: 10},
{entryId: 28, levelId: 10, rating: 10},
{entryId: 28, levelId: 8, rating: 6},
{entryId: 28, levelId: 9, rating: 8},
{entryId: 29, levelId: 6, rating: 9 },
{entryId: 29, levelId: 10, rating: 9 },
{entryId: 29, levelId: 7, rating: 8 },
{entryId: 29, levelId: 9, rating: 8 },
{entryId: 29, levelId: 8, rating: 6 },
{entryId: 26, levelId: 6, rating: 10},
{entryId: 26, levelId: 8, rating: 5},
{entryId: 26, levelId: 7, rating: 10},
{entryId: 26, levelId: 10, rating: 10},
{entryId: 26, levelId: 9, rating: 10},
{entryId: 32, levelId: 7, rating: 4},
{entryId: 32, levelId: 6, rating: 10},
{entryId: 32, levelId: 8, rating: 5},
{entryId: 32, levelId: 10, rating: 4},
{entryId: 32, levelId: 9, rating: 4},
{entryId: 25, levelId: 6, rating: 10},
{entryId: 25, levelId: 7, rating: 10},
{entryId: 25, levelId: 10, rating: 9},
{entryId: 25, levelId: 9, rating: 8},
{entryId: 25, levelId: 8, rating: 7},
{entryId: 24, levelId: 6, rating: 8},
{entryId: 24, levelId: 7, rating: 8},
{entryId: 24, levelId: 9, rating: 8},
{entryId: 24, levelId: 10, rating: 8},
{entryId: 24, levelId: 8, rating: 8},
{entryId: 22, levelId: 6, rating: 10},
{entryId: 22, levelId: 10, rating: 7},
{entryId: 22, levelId: 7, rating: 10},
{entryId: 22, levelId: 8, rating: 5},
{entryId: 22, levelId: 9, rating: 6},
{entryId: 23, levelId: 8, rating: 4},
{entryId: 23, levelId: 9, rating: 5},
{entryId: 23, levelId: 10, rating: 5},
{entryId: 23, levelId: 6, rating: 9},
{entryId: 23, levelId: 7, rating: 7},
{entryId: 30, levelId: 6, rating: 9},
{entryId: 30, levelId: 10, rating: 6},
{entryId: 30, levelId: 7, rating: 8},
{entryId: 30, levelId: 8, rating: 4},
{entryId: 30, levelId: 9, rating: 7},
{entryId: 21, levelId: 6, rating: 8},
{entryId: 21, levelId: 8, rating: 6},
{entryId: 21, levelId: 9, rating: 8},
{entryId: 21, levelId: 10, rating: 8},
{entryId: 21, levelId: 7, rating: 8},
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
      entryId: { [Op.in]: [1, 2, 3, 4, 5, 27, 31, 28, 29, 26, 32, 25, 24, 22, 23, 30, 21] }
    }, {});
  }
};
