'use strict';

const { Level } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoLevels = [
  // Bonnibel
  { // 1
    "name": "Happiness",
    "color": "#CD117C",
    "userId": 1,
  },
  { // 2
    "name": "Energy",
    "color": "#FFEA00",
    "userId": 1,
  },
  { // 3
    "name": "Stress",
    "color": "#CD113B",
    "userId": 1,
  },
  { // 4
    "name": "Focus",
    "color": "#FFA900",
    "userId": 1,
  },
  { //5
    "name": "Motivation",
    "color": "#52006A",
    "userId": 1,
  },
  // Leslie
  { // 6
    "name": "Happiness",
    "color": "#CD117C",
    "userId": 4,
  },
  { // 7
    "name": "Energy",
    "color": "#FFEA00",
    "userId": 4,
  },
  { // 8
    "name": "Stress",
    "color": "#CD113B",
    "userId": 4,
  },
  { // 9
    "name": "Focus",
    "color": "#FFA900",
    "userId": 4,
  },
  { // 10
    "name": "Motivation",
    "color": "#52006A",
    "userId": 4,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Level.bulkCreate(demoLevels, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Levels';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
