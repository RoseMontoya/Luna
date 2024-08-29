'use strict';

// const {Level, Activity} = require('./')

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

      Entry.belongsToMany(models.Activity, {
        through: models.EntryActivity,
        foreignKey: 'entryId',
        otherKey: 'activityId'
      })

      Entry.belongsToMany(models.Level, {
        through: models.EntryLevel,
        foreignKey: 'entryId',
        otherKey: "levelId"
      })

      Entry.hasMany(models.EntryActivity,{
        foreignKey: 'entryId'
      })

      Entry.hasMany(models.EntryLevel, {
        foreignKey: 'entryId'
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
    mood: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    overallMood: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    iconId: {
      type: DataTypes.INTEGER,
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
    defaultScope: {
      attributes: {
        exclude: ['updateAt', 'createAt']
      },
      // include: [
      //   {
      //     model: sequelize.models.EntryActivity,
      //     attributes: {
      //       exclude: ['updatedAt', 'createdAt', 'userId']
      //     }
      //   },
      //   {
      //     model: sequelize.models.EntryLevel,
      //     attributes: {
      //       exclude: ['updateAt', 'createdAt']
      //     }
      //   }
      // ]
    }
  });

  // const { Activity, Level } = sequelize.models


  // Entry.addScope('defaultScope', {
  //   attributes: {
  //     exclude: ['updateAt', 'createAt']
  //   },
  //   include: [
  //     {
  //       model: Activity,
  //       attributes: {
  //         exclude: ['updatedAt', 'createdAt', 'userId']
  //       }
  //     },
  //     {
  //       model: Level,
  //       attributes: {
  //         exclude: ['updateAt', 'createdAt']
  //       }
  //     }
  //   ]
  // }, { override: true });

  return Entry;
};
