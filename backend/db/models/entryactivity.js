'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntryActivity extends Model {

    static associate(models) {
      // define association here
      // EntryActivity.belongsTo(models.Entry, {
      //   foreignKey: 'entryId'
      // })
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
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'EntryActivity',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'createdAt']
      }
    }
  });
  return EntryActivity;
};
