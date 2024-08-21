'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   User.hasMany(models.Spot, {
    //     foreignKey: 'ownerId',
    //     onDelete: 'CASCADE'
    //   })

    }
  }
  User.init({

  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      len: [2, 30]
    }
  },
  lastName: {
    type: DataTypes.STRING(75),
    allowNull: false,
    validate: {
      len: [2, 75]
    }
  },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 256]
      }
  },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
  },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    }
  });
  return User;
};
