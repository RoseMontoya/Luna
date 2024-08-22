'use strict';

const { Activity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const activities = [
  {
    "name": "Meditate",
    "color": "#F0A8D0",
    "iconId": 6,
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
