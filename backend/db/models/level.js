"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      // define association here
      Level.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Level.belongsToMany(models.Entry, {
         through: models.EntryLevel,
         foreignKey: 'levelId',
         otherKey: 'entryId'
      })
    }
  }
  Level.init(
    {
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
    },
    {
      sequelize,
      modelName: "Level",
      indexes: [
        {
          unique: true,
          fields: ['userId', 'name'],
          name:'idx_user_level'
        }
      ],
      defaultScope: {
        attributes: {
          exclude: ['createdAt',
            'createdAt', 'userId'
          ]
        }
      }
    }
  );
  return Level;
};
