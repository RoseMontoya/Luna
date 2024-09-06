const { Level, Activity } = require("../db/models");

async function userDefaults(userId) {
  await Level.bulkCreate([
    {
      name: "Happiness",
      color: "#CD117C",
      userId: userId,
    },
    {
      name: "Energy",
      color: "#FFEA00",
      userId: userId,
    },
    {
      name: "Stress",
      color: "#CD113B",
      userId: userId,
    },
    {
      name: "Focus",
      color: "#FFA900",
      userId: userId,
    },
    {
      name: "Motivation",
      color: "#52006A",
      userId: userId,
    },
  ]);

  await Activity.bulkCreate([
    {
      name: "Meditate",
      iconId: 20,
      userId: userId,
    },
    {
      name: "Slept Well",
      iconId: 30,
      userId: userId,
    },
    {
      name: "Read a Book",
      iconId: 34,
      userId: userId,
    },
    {
      name: "Ate fruit",
      iconId: 21,
      userId: userId,
    },
    {
      name: "Relaxing Bath",
      iconId: 29,
      userId: userId,
    },
    {
      name: "Met water goal",
      iconId: 62,
      userId: userId,
    },
    {
      name: "Studied",
      iconId: 36,
      userId: userId,
    },
    {
      name: "Planning",
      iconId: 42,
      userId: userId,
    },
    {
      name: "Camping",
      iconId: 44,
      userId: userId,
    },
  ]);
}

module.exports = userDefaults;
