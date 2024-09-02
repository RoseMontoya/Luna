'use strict';

const { Activity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const activities = [
  { // 1
    "name": "Meditate",
    "iconId": 18,
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
  },
  { // 17
    "name": "Meditate",
    "iconId": 20,
    "userId": 4,
  },
  { // 18
    "name": "Basketball",
    "iconId": 26,
    "userId": 4,
  },
  { // 19
    "name": "Slept Well",
    "iconId": 30,
    "userId": 4,
  },
  { // 20
    "name": "Read a Book",
    "iconId": 34,
    "userId": 4,
  },
  { // 21
    "name": "Cleaned",
    "iconId": 38,
    "userId": 4,
  },
  { // 22
    "name": "Relaxing Bath",
    "iconId": 29,
    "userId": 4,
  },
  { // 23
    "name": "Bicycle ride",
    "iconId": 31,
    "userId": 4,
  },
  { // 24
    "name": "Met water goal",
    "iconId": 26,
    "userId": 4,
  },
  { // 26
    "name": "Work",
    "iconId": 37,
    "userId": 4,
  },
  { // 27
    "name": "Bills",
    "iconId": 41,
    "userId": 4,
  },
  { // 28
    "name": "Planning",
    "iconId": 42,
    "userId": 4,
  },
  { // 29
    "name": "Camping",
    "iconId": 44,
    "userId": 4,
  },
  { // 30
    "name": "Had sweets",
    "iconId": 45,
    "userId": 4,
  },
  { // 31
    "name": "Attend City Council Meeting",
    "iconId": 48,
    "userId": 4
  },
  { // 32
    "name": "Waffles!!",
    "iconId": 73,
    "userId": 4
  },
  { // 33
    "name": "Host Breakfast Club",
    "iconId": 70,
    "userId": 4
  },
  { // 34
    "name": "Draft Legislation",
    "iconId": 50,
    "userId": 4
  },
  { // 35
    "name": "Parks!",
    "iconId": 55,
    "userId": 4
  },
  { // 36
    "name": "Support Local Business",
    "iconId": 78,
    "userId": 4
  },
  { // 37
    "name": "Brainstorm New Ideas",
    "iconId": 71,
    "userId": 4
  },
  { // 38
    "name": "Meet with Ron",
    "iconId": 79,
    "userId": 4
  },
  { // 39
    "name": "Galentine's Day",
    "iconId": 80,
    "userId": 4
  },
  { // 40
    "name": "Write Thank You Notes",
    "iconId": 81,
    "userId": 4
  },
  { // 41
    "name": "Visit Eagleton",
    "iconId": 82,
    "userId": 4
  },
  { // 42
    "name": "Host Fundraiser",
    "iconId": 25,
    "userId": 4
  },
  { // 43
    "name": "Traveling",
    "iconId": 53,
    "userId": 4
  },
  { // 44
    "name": "Ann!!",
    "iconId": 61,
    "userId": 4
  },
  { // 45
    "name": "Model UN",
    "iconId": 63,
    "userId": 4
  },
  { // 46
    "name": "Pawnee Goddesses Meeting",
    "iconId": 57,
    "userId": 4
  },
  { // 47
    "name": "Award Ceremony",
    "iconId": 23,
    "userId": 4
  },
  { // 48
    "name": "Pawnee Little League game",
    "iconId": 26,
    "userId": 4
  },
  { // 49
    "name": "Bowling",
    "iconId": 35,
    "userId": 4
  },
  { // 50
    "name": "Movie night at townhall",
    "iconId": 46,
    "userId": 4
  },
  { // 51
    "name": "Gift planning",
    "iconId": 49,
    "userId": 4
  },
  { // 52
    "name": "Townhall meeting",
    "iconId": 51,
    "userId": 4
  },
  { // 53
    "name":'Volunteer',
    'iconId': 56,
    'userId': 4
  },
  { // 54
    "name":'Party planning',
    'iconId': 64,
    'userId': 4
  },
  { // 55
    "name":'Powerpoint',
    'iconId': 65,
    'userId': 4
  },
  { // 56
    "name":'Scrapbooking',
    'iconId': 56,
    'userId': 4
  },
  { // 57
    "name":'Hosted Event',
    'iconId': 77,
    'userId': 4
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Activity.bulkCreate(activities, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Activities';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
