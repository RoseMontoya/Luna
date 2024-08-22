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
    color: {
      type: DataTypes.STRING,
      defaultValue: "#126E82",
      validate: {
        is: {
          args: [
            /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,  // Hex color codes
            /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/ // RGB color codes
          ],
          msg: 'Invalid color format. Must be a valid hex or RGB color code.'
        }
      }
    },
    iconId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Icons'
      },
      onUpdate: 'CASCADE',
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
  });
  return Activity;
};
