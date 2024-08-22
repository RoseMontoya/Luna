'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntryActivity extends Model {

    static associate(models) {
      // define association here
    }
  }
  EntryActivity.init({
    entryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Entries'
      },
      onDelete: 'CASCADE'
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Activities'
      }
    },
  }, {
    sequelize,
    modelName: 'EntryActivity',
  });
  return EntryActivity;
};
