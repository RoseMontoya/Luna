'use strict';

const { Icon } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const icons = [
  { // 1
    "name": "FaRegFaceSmileBeam",
    "description": "A very happy face"
  },
  { //2
    "name": "FaRegFaceSmile",
    "description": "Happy face"
  },
  { // 3
    "name": "FaRegFaceMeh",
    "description": "Neutral face"
  },
  { // 4
    "name": "FaRegFaceFrown",
    "description": "Sad face"
  },
  { // 5
    "name": "FaRegFaceSadTear",
    "description": "Sad face with tear"
  },
  { // 6
    "name": "FaAngellist",
    "description": "Peace sign"
  },
  { // 7
    "name": "FaBanSmoking",
    "description": "No Smoking"
  },
  { // 8
    "name": "FaBasketball",
    "description": "Basketball"
  },
  { // 9
    "name": "FaBed",
    "description": "person lying in bed"
  },
  { // 10
    "name": "FaBook",
    "description": 'closed book'
  },
  { // 11
    "name": "FaAppleWhole",
    "description": 'Apple'
  },
  { // 12
    "name": "FaAtom",
    "description": 'Atom'
  },
  { // 13
    "name": "FaAward",
    "description": 'Award'
  },
  { // 14
    "name": "FaBath",
    "description": 'Bath tub'
  },
  { // 15
    "name": "FaBicycle",
    "description": 'Bicycle'
  },
  { // 16
    "name": "FaBottleWater",
    "description": 'Water bottle'
  },
  { // 17
    "name": "FaBrain",
    "description": 'Brain'
  },
  { // 18
    "name": "FaBroom",
    "description": 'Broom'
  },
  { // 19
    "name": "FaBriefcase",
    "description": 'Briefcase'
  },
  { // 20
    "name": "FaBrush",
    "description": 'Brush'
  },
  { // 21
    "name": "FaCalculator",
    "description": 'Calculator'
  },
  { // 22
    "name": "FaCalendarDays",
    "description": 'Calender'
  },
  { // 23
    "name": "FaCamera",
    "description": 'Camera'
  },
  { // 24
    "name": "FaCampground",
    "description": 'Campground'
  },
  { // 25
    "name": "FaCandyCane",
    "description": 'Candy cane'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Icon.bulkCreate(icons, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Icons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        "FaAngellist",
        "FaBanSmoking",
        "FaBasketball",
        "FaBed",
        "FaBook",
        "FaRegFaceSmileBeam",
        "FaRegFaceSmile",
        "FaRegFaceMeh",
        "FaRegFaceFrown",
        "FaRegFaceSadTear"
      ] }
    }, {});
  }
};
