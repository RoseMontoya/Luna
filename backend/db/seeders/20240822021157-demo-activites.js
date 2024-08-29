'use strict';

const { Activity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const activities = [
  { // 1
    "name": "Meditate",
    "iconId": 6,
    "userId": 1,
  },
  { // 2
    "name": "Basketball",
    "iconId": 8,
    "userId": 1,
  },
  { // 3
    "name": "Slept Well",
    "iconId": 9,
    "userId": 1,
  },
  { // 4
    "name": "Read a Book",
    "iconId": 10,
    "userId": 1,
  },
  { // 5
    "name": "Ate fruit",
    "iconId": 11,
    "userId": 1,
  },
  { // 6
    "name": "Cleaned",
    "iconId": 18,
    "userId": 1,
  },
  { // 7
    "name": "Relaxing Bath",
    "iconId": 14,
    "userId": 1,
  },
  { // 8
    "name": "Bicycle ride",
    "iconId": 15,
    "userId": 1,
  },
  { // 9
    "name": "Met water goal",
    "iconId": 16,
    "userId": 1,
  },
  { // 10
    "name": "Studied",
    "iconId": 17,
    "userId": 1,
  },
  { // 11
    "name": "Work",
    "iconId": 19,
    "userId": 1,
  },
  { // 12
    "name": "Bills",
    "iconId": 21,
    "userId": 1,
  },
  { // 13
    "name": "Planning",
    "iconId": 22,
    "userId": 1,
  },
  { // 14
    "name": "Photography",
    "iconId": 23,
    "userId": 1,
  },
  { // 15
    "name": "Camping",
    "iconId": 24,
    "userId": 1,
  },
  { // 16
    "name": "Had sweets",
    "iconId": 25,
    "userId": 1,
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Activity.bulkCreate(activities, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Activities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
