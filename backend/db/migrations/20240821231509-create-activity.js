'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      iconId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Icons'
        },
        onUpdate: 'CASCADE',
        // onDelete: "SET NULL"
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
    options.tableName = 'Activities'
    await queryInterface.addIndex(options,
      ['userId', 'name'],
      {
        unique: true,
        name: 'idx_user_activity'
      }
    )
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Activities'
    await queryInterface.removeIndex(options, 'idx_user_activity')
    return await queryInterface.dropTable(options);
  }
};
