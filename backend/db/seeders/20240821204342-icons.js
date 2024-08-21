'use strict';

const { Icon } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const icons = [
  {
    "name": "FaRegFaceSmileBeam",
    "description": "A very happy face"
  },
  {
    "name": "FaRegFaceSmile",
    "description": "Happy face"
  },
  {
    "name": "FaRegFaceMeh",
    "description": "Neutral face"
  },
  {
    "name": "FaRegFaceFrown",
    "description": "Sad face"
  },
  {
    "name": "FaRegFaceSadTear",
    "description": "Sad face with tear"
  },
  {
    "name": "FaAngellist",
    "description": "Peace sign"
  },
  {
    "name": "FaBanSmoking",
    "description": "No Smoking"
  },
  {
    "name": "FaBasketball",
    "description": "Basketball"
  },
  {
    "name": "FaBed",
    "description": "person lying in bed"
  },
  {
    "name": "FaBook",
    "description": 'closed book'
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
