'use strict';

const { Activity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const activities = [
  { // 1
    "name": "Meditate",
    "color": "#F0A8D0",
    "iconId": 6,
    "userId": 1,
  },
  { // 2
    "name": "Basketball",
    "color": "#F0A8D0",
    "iconId": 8,
    "userId": 1,
  },
  { // 3
    "name": "Slept Well",
    "color": "#F0A8D0",
    "iconId": 9,
    "userId": 1,
  },
  { // 4
    "name": "Read a Book",
    "color": "#F0A8D0",
    "iconId": 10,
    "userId": 1,
  },
  { // 5
    "name": "Ate fruit",
    "color": "#F0A8D0",
    "iconId": 11,
    "userId": 1,
  },
  { // 6
    "name": "Science experiment",
    "color": "#F0A8D0",
    "iconId": 12,
    "userId": 1,
  },
  { // 7
    "name": "Relaxing Bath",
    "color": "#F0A8D0",
    "iconId": 14,
    "userId": 1,
  },
  { // 8
    "name": "Bicycle ride",
    "color": "#F0A8D0",
    "iconId": 15,
    "userId": 1,
  },
  { // 9
    "name": "Met water goal",
    "color": "#F0A8D0",
    "iconId": 16,
    "userId": 1,
  },
  { // 10
    "name": "Studied",
    "color": "#F0A8D0",
    "iconId": 17,
    "userId": 1,
  },
  { // 11
    "name": "Business meeting",
    "color": "#F0A8D0",
    "iconId": 19,
    "userId": 1,
  },
  { // 12
    "name": "Mathematics",
    "color": "#F0A8D0",
    "iconId": 21,
    "userId": 1,
  },
  { // 13
    "name": "Planning",
    "color": "#F0A8D0",
    "iconId": 22,
    "userId": 1,
  },
  { // 14
    "name": "Surveillance",
    "color": "#F0A8D0",
    "iconId": 23,
    "userId": 1,
  },
  { // 15
    "name": "Camping",
    "color": "#F0A8D0",
    "iconId": 24,
    "userId": 1,
  },
  { // 16
    "name": "Meeting with Candy Citizens",
    "color": "#F0A8D0",
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
