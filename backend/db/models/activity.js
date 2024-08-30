'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {

    static associate(models) {
      // define association here
      Activity.belongsTo(models.User, {
        foreignKey: "userId"
      })

      Activity.belongsTo(models.Icon, {
        foreignKey: 'iconId'
      })

      Activity.belongsToMany(models.Entry, {
        through: models.EntryActivity,
        foreignKey: 'activityId',
        otherKey: 'entryId'
      })
    }
  }
  Activity.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    iconId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Icons'
      },
      onUpdate: 'CASCADE',
      // onDelete: 'SET NULL'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
    },
    deactivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Activity',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'name'],
        name:'idx_user_activity'
      }
    ],
    defaultScope: {
      attributes: {
        exclude: ['createdAt', "updatedAt"]
      }
    }
  });
  return Activity;
};
