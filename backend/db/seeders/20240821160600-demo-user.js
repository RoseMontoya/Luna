'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoUsers = [
  {
    "firstName": "Bonnibel",
    "lastName": "Bubblegum",
    "email": "bonnibel.bubblegum@candykindgom.com",
    "hashedPassword": bcrypt.hashSync("sweetscience123")
  },
  {
    "firstName": "Dorian",
    "lastName": "Pavus",
    "email": "dorian.pavus@tevinter.imperium",
    hashedPassword: bcrypt.hashSync("magisterial123")
  },
  {
    "firstName": "Hermione",
    "lastName": "Granger",
    "email": "hermione.granger@hogwarts.edu",
    "hashedPassword": bcrypt.hashSync("leviosa321")
  },
  {
    "firstName": "Leslie",
    "lastName": "Knope",
    "email": "leslie.knope@pawnee.gov",
    "hashedPassword": bcrypt.hashSync("wafflesrule456")
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(demoUsers, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      email: { [Op.in]: [
        "bonnibel.bubblegum@candykindgom.com",
        "hermione.granger@hogwarts.edu",
        "leslie.knope@pawnee.gov",
        "dorian.pavus@tevinter.imperium",
      ] }
    }, {});
  }
};
