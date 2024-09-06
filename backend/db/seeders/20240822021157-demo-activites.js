'use strict';

const { Activity } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const activities = [
  { // 1
    "name": "Meditate",
    "iconId": 20, // FaAngellist
    "userId": 1,
  },
  { // 2
    "name": "Basketball",
    "iconId": 28, // FaBasketball
    "userId": 1,
  },
  { // 3
    "name": "Slept Well",
    "iconId": 30, // FaBed
    "userId": 1,
  },
  { // 4
    "name": "Read a Book",
    "iconId": 34, // FaBook
    "userId": 1,
  },
  { // 5
    "name": "Ate fruit",
    "iconId": 21, // FaAppleWhole
    "userId": 1,
  },
  { // 6
    "name": "Cleaned",
    "iconId": 38, // FaBroom
    "userId": 1,
  },
  { // 7
    "name": "Relaxing Bath",
    "iconId": 29, // FaBath
    "userId": 1,
  },
  { // 8
    "name": "Bicycle ride",
    "iconId": 31, // FaBicycle
    "userId": 1,
  },
  { // 9
    "name": "Met water goal",
    "iconId": 62, // FaBottleWater
    "userId": 1,
  },
  { // 10
    "name": "Studied",
    "iconId": 36, // FaBrain
    "userId": 1,
  },
  { // 11
    "name": "Work",
    "iconId": 37, // FaBriefcase
    "userId": 1,
  },
  { // 12
    "name": "Bills",
    "iconId": 41, // FaCalculator
    "userId": 1,
  },
  { // 13
    "name": "Planning",
    "iconId": 42, // FaCalendarDays
    "userId": 1,
  },
  { // 14
    "name": "Photography",
    "iconId": 43, // FaCamera
    "userId": 1,
  },
  { // 15
    "name": "Camping",
    "iconId": 44, // FaCampground
    "userId": 1,
  },
  { // 45
    "name": "Had sweets",
    "iconId": 25, // FaCandyCane
    "userId": 1,
  },
  { // 17
    "name": "Meditate",
    "iconId": 20, // FaAngellist
    "userId": 4,
  },
  { // 18
    "name": "Basketball",
    "iconId": 28, // FaBasketball
    "userId": 4,
  },
  { // 19
    "name": "Slept Well",
    "iconId": 30, // FaBed
    "userId": 4,
  },
  { // 20
    "name": "Read a Book",
    "iconId": 34, // FaBook
    "userId": 4,
  },
  { // 21
    "name": "Cleaned",
    "iconId": 38, // FaBroom
    "userId": 4,
  },
  { // 22
    "name": "Relaxing Bath",
    "iconId": 29, // FaBath
    "userId": 4,
  },
  { // 23
    "name": "Bicycle ride",
    "iconId": 31, // FaBicycle
    "userId": 4,
  },
  { // 24
    "name": "Met water goal",
    "iconId": 62, // FaBottleWater
    "userId": 4,
  },
  { // 26
    "name": "Work",
    "iconId": 37, // FaBriefcase
    "userId": 4,
  },
  { // 27
    "name": "Bills",
    "iconId": 41, // FaCalculator
    "userId": 4,
  },
  { // 28
    "name": "Planning",
    "iconId": 42, // FaCalendarDays
    "userId": 4,
  },
  { // 29
    "name": "Camping",
    "iconId": 44, // FaCampground
    "userId": 4,
  },
  { // 30
    "name": "Had sweets",
    "iconId": 45, // FaCandyCane
    "userId": 4,
  },
  { // 31
    "name": "Attend City Council Meeting",
    "iconId": 48, // FaGavel
    "userId": 4
  },
  { // 32
    "name": "Waffles!!",
    "iconId": 73, // FaMugHot
    "userId": 4
  },
  { // 33
    "name": "Host Breakfast Club",
    "iconId": 70, // FaKitchenSet
    "userId": 4
  },
  { // 34
    "name": "Draft Legislation",
    "iconId": 50, // FaPenFancy
    "userId": 4
  },
  { // 35
    "name": "Parks!",
    "iconId": 55, // FaTree
    "userId": 4
  },
  { // 36
    "name": "Support Local Business",
    "iconId": 78, // FaShop
    "userId": 4
  },
  { // 37
    "name": "Brainstorm New Ideas",
    "iconId": 71, // FaLightbulb
    "userId": 4
  },
  { // 38
    "name": "Meet with Ron",
    "iconId": 79, // FaHammer
    "userId": 4
  },
  { // 39
    "name": "Galentine's Day",
    "iconId": 80, // FaHeart
    "userId": 4
  },
  { // 40
    "name": "Write Thank You Notes",
    "iconId": 81, // FaEnvelope
    "userId": 4
  },
  { // 41
    "name": "Visit Eagleton",
    "iconId": 82, // FaPoop
    "userId": 4
  },
  { // 42
    "name": "Host Fundraiser",
    "iconId": 52, // FaRegHandshake
    "userId": 4
  },
  { // 43
    "name": "Traveling",
    "iconId": 53, // FaSuitcaseRolling
    "userId": 4
  },
  { // 44
    "name": "Ann!!",
    "iconId": 61, // FaUserNurse
    "userId": 4
  },
  { // 45
    "name": "Model UN",
    "iconId": 63, // FaBuildingUn
    "userId": 4
  },
  { // 46
    "name": "Pawnee Goddesses Meeting",
    "iconId": 57, //FaVestPatches
    "userId": 4
  },
  { // 47
    "name": "Award Ceremony",
    "iconId": 23, // FaAward
    "userId": 4
  },
  { // 48
    "name": "Pawnee Little League game",
    "iconId": 26, // FaBaseballBatBall
    "userId": 4
  },
  { // 49
    "name": "Bowling",
    "iconId": 35, // FaBowlingBall
    "userId": 4
  },
  { // 50
    "name": "Movie night at townhall",
    "iconId": 46, // FaFilm
    "userId": 4
  },
  { // 51
    "name": "Gift planning",
    "iconId": 49, // FaGift
    "userId": 4
  },
  { // 52
    "name": "Townhall meeting",
    "iconId": 51, // FaPeopleGroup
    "userId": 4
  },
  { // 53
    "name":'Volunteer',
    'iconId': 60, // FaHandHoldingHeart
    'userId': 4
  },
  { // 54
    "name":'Party planning',
    'iconId': 64, // FaCakeCandles
    'userId': 4
  },
  { // 55
    "name":'Powerpoint',
    'iconId': 65, // FaFilePowerpoint
    'userId': 4
  },
  { // 56
    "name":'Scrapbooking',
    'iconId': 68, // FaImages
    'userId': 4
  },
  { // 57
    "name":'Hosted Event',
    'iconId': 77, // FaRegClipboard
    'userId': 4
  },
  {
    "name": "Time with Ben",
    'iconId': 13, // FaRegFaceGrinHearts
    'userId': 4
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
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4 ] }
    }, {});
  }
};
