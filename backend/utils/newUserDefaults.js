const { Level, Activity} = require('../db/models')

async function userDefaults (userId) {
    await Level.bulkCreate([{
        "name": "Happiness",
        "color": "#CD117C",
        "userId": userId,
      },
      {
        "name": "Energy",
        "color": "#FFEA00",
        "userId": userId,
      },
      {
        "name": "Stress",
        "color": "#CD113B",
        "userId": userId,
      },
      {
        "name": "Focus",
        "color": "#FFA900",
        "userId": userId,
      },
      {
        "name": "Motivation",
        "color": "#52006A",
        "userId": userId,
      },])

    await Activity.bulkCreate([
        {
          "name": "Meditate",
          "iconId": 6,
          "userId": userId,
        },
        {
          "name": "Slept Well",
          "iconId": 9,
          "userId": userId,
        },
        {
          "name": "Read a Book",
          "iconId": 10,
          "userId": userId,
        },
        {
          "name": "Ate fruit",
          "iconId": 11,
          "userId": userId,
        },
        {
          "name": "Relaxing Bath",
          "iconId": 14,
          "userId": userId,
        },
        {
          "name": "Met water goal",
          "iconId": 16,
          "userId": userId,
        },
        {
          "name": "Studied",
          "iconId": 17,
          "userId": userId,
        },
        {
          "name": "Planning",
          "iconId": 22,
          "userId": userId,
        },
        {
          "name": "Camping",
          "iconId": 24,
          "userId": userId,
        },

      ])
}

module.exports = userDefaults
