'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntryLevel extends Model {
    static associate(models) {
      // define association here
    }
  }
  EntryLevel.init({
    entryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Entries"
      },
      onDelete: 'CASCADE'

    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Levels'
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
  }, {
    sequelize,
    modelName: 'EntryLevel',
    defaultScope: {
      attributes: {
        exclude: ['createtAt', 'updatedAt', 'userId']
      }
    }
  });
  return EntryLevel;
};
