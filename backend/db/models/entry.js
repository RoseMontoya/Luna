'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {

    static associate(models) {
      // define association here
      Entry.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Entry.belongsTo(models.Icon, {
        foreignKey: 'iconId'
      })
    }
  }
  Entry.init({
    datetime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isAfter: {
          args: '1999-12-31',
          msg: 'Date must be after the year 1999'
        },
        isBeforeCurrentDate(value) {
          if (new Date(value) > new Date()) {
            throw new Error('The date cannot be in the future.')
          }
        },
        isDate: true
      }
    },
    overallMood: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    iconId: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      references: {
        model: 'Icons'
      },
      onUpdate: 'CASCADE',
      validate: {
        min: 1,
        max: 5
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
    },
    note: {
      type: DataTypes.STRING(255),
      validate: {
        len: [0, 255]
      }
    }
  }, {
    sequelize,
    modelName: 'Entry',
  });
  return Entry;
};
