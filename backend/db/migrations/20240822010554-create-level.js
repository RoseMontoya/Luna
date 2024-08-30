'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Levels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: "#126E82"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      deactivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
    options.tableName = 'Levels'
    await queryInterface.addIndex(
      options,
      ['userId', 'name'],
      {
        unique: true,
        name: 'idx_user_level'
      }
    )
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Levels'
    await queryInterface.removeIndex(options, 'idx_user_level')
    return await queryInterface.dropTable(options);
  }
};
