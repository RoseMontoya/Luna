'use strict';

const { Icon } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const icons = [
  { // 1
    "name": 'FaRegFaceLaughBeam',
    'description': "Laugh beam face"
  },
  { // 2
    'name': 'FaRegFaceLaugh',
    "description": 'Laugh face'
  },
  // 3
  {
    "name": "FaRegFaceSmileBeam",
    "description": "A very happy face icon"
  },
  // 4
  {
    "name": "FaRegFaceSmile",
    "description": "Happy face icon"
  },
  // 5
  {
    "name": "FaRegFaceMeh",
    "description": "Neutral face icon"
  },
  // 6
  {
    "name": "FaRegFaceFrown",
    "description": "Sad face icon"
  },
  // 7
  {
    "name": "FaRegFaceSadTear",
    "description": "Sad face with tear icon"
  },
  // 8
  {
    "name": "FaRegFaceSadCry",
    "description": "Sad cry face icon"
  },
    // 9
    {
      "name": "FaRegFaceAngry",
      "description": "Angry face icon"
    },
    // 10
    {
      "name": "FaRegFaceDizzy",
      "description": "Dizzy face icon"
    },
    // 11
    {
      "name": "FaRegFaceFlushed",
      "description": "Flushed, wide-eyed face icon"
    },
    // 12
    {
      "name": "FaRegFaceGrimace",
      "description": "Grimace face icon"
    },
    // 13
    {
      "name": "FaRegFaceGrinHearts",
      "description": "Heart eyes face icon"
    },
    // 14
    {
      "name": "FaRegFaceGrinSquint",
      "description": "Grin squint face icon"
    },
    // 15
    {
      "name": "FaRegFaceGrinStars",
      "description": "Grin stars face icon"
    },
    // 16
    {
      "name": "FaRegFaceGrinTongueSquint",
      "description": "Grin tongue squint face icon"
    },
    // 17
    {
      "name": "FaRegFaceRollingEyes",
      "description": "Rolling eyes face icon"
    },
    // 18
    {
      "name": "FaRegFaceSurprise",
      "description": "Surprise face icon"
    },
    // 19
    {
      "name": "FaRegFaceTired",
      "description": "Tired face icon"
    },
    // 20
    {
      "name": "FaAngellist",
      "description": "Peace sign icon"
    },
    // 21
    {
      "name": "FaAppleWhole",
      "description": "Apple icon"
    },
    // 22
    {
      "name": "FaAtom",
      "description": "Atom icon"
    },
    // 23
    {
      "name": "FaAward",
      "description": "Award icon"
    },
    // 24
    {
      "name": "FaBanSmoking",
      "description": "No Smoking icon"
    },
    // 25
    {
      "name": "FaBandage",
      "description": "Bandage icon"
    },
    // 26
    {
      "name": "FaBaseballBatBall",
      "description": "Baseball Bat icon"
    },
    // 27
    {
      "name": "FaBasketShopping",
      "description": "Shopping Basket icon"
    },
    // 28
    {
      "name": "FaBasketball",
      "description": "Basketball icon"
    },
    // 29
    {
      "name": "FaBath",
      "description": "Bath tub icon"
    },
    // 30
    {
      "name": "FaBed",
      "description": "Person lying in bed icon"
    },
    // 31
    {
      "name": "FaBicycle",
      "description": "Bicycle icon"
    },
    // 32
    {
      "name": "FaBlender",
      "description": "Blender icon"
    },
    // 33
    {
      "name": "FaBong",
      "description": "Bong icon"
    },
    // 34
    {
      "name": "FaBook",
      "description": "Closed book icon"
    },
    // 35
    {
      "name": "FaBowlingBall",
      "description": "Bowling ball icon"
    },
    // 36
    {
      "name": "FaBrain",
      "description": "Brain icon"
    },
    // 37
    {
      "name": "FaBriefcase",
      "description": "Briefcase icon"
    },
    // 38
    {
      "name": "FaBroom",
      "description": "Broom icon"
    },
    // 39
    {
      "name": "FaPaintbrush",
      "description": "Painbrush icon"
    },
    // 40
    {
      "name": "FaBuildingColumns",
      "description": "Building with columns icon"
    },
    // 41
    {
      "name": "FaCalculator",
      "description": "Calculator icon"
    },
    // 42
    {
      "name": "FaCalendarDays",
      "description": "Calendar icon"
    },
    // 43
    {
      "name": "FaCamera",
      "description": "Camera icon"
    },
    // 44
    {
      "name": "FaCampground",
      "description": "Campground icon"
    },
    // 45
    {
      "name": "FaCandyCane",
      "description": "Candy cane icon"
    },
    // 46
    {
      "name": "FaFilm",
      "description": "Film icon"
    },
    // 47
    {
      "name": "FaFolder",
      "description": "Folder icon"
    },
    // 48
    {
      "name": "FaGavel",
      "description": "Gavel icon"
    },
    // 49
    {
      "name": "FaGift",
      "description": "Gift icon"
    },
    // 50
    {
      "name": "FaPenFancy",
      "description": "Fancy Pen icon"
    },
    // 51
    {
      "name": "FaPeopleGroup",
      "description": "Group of people icon"
    },
    // 52
    {
      "name": "FaRegHandshake",
      "description": "Handshake icon"
    },
    // 53
    {
      "name": "FaSuitcaseRolling",
      "description": "Suitcase icon"
    },
    // 54
    {
      "name": "FaSun",
      "description": "Sun icon"
    },
    // 55
    {
      "name": "FaTree",
      "description": "Tree icon"
    },
    // 56
    {
      "name": "FaVest",
      "description": "Vest icon"
    },
    // 57
    {
      "name": "FaVestPatches",
      "description": "Vest with patches icon"
    },
    // 58
    {
      "name": "FaWineGlass",
      "description": "Wine glass icon"
    },
    { // 59
      "name": "FaPersonWalking",
      "description": 'person walking icon'
    },
    { // 60
      "name": 'FaHandHoldingHeart',
      'description': 'hand holding heart icon'
    },
    { // 61
      "name": 'FaUserNurse',
      "description": 'nurse icon'
    },
    { // 62
      "name": 'FaBottleWater',
      "description": "Bottle of water icon"
    },
    { // 63
      "name": "FaBuildingUn",
      "description": "UN Building icon"
    },
    { // 64
      "name": 'FaCakeCandles',
      "description": 'birthday cake icon'
    },
    { // 65
      "name": "FaFilePowerpoint",
      "description": "powerpoint icon"
    },
    { // 66
      "name": "FaHotdog",
      "description": "Hotdog icon"
    },
    { // 67
      "name": "FaInbox",
      "description": "Inbox icon"
    },
    { // 68
      "name": "FaImages",
      "description": 'Images icon'
    },
    { // 69
      "name": "FaNewspaper",
      "description": 'Newspaper icon'
    },
    { // 70
      "name": "FaKitchenSet",
      "description": 'Kitchen set icon'
    },
    { // 71
      "name": "FaLightbulb",
      "description": "lightbulb icon"
    },
    { //72
      "name": "FaMonument",
      "description": "monument icon"
    },
    { // 73
      "name": "FaMugHot",
      "description": 'Steaming mug icon'
    },
    { // 74
      "name": "FaPhone",
      "description": "Phone icon"
    },
    { // 75
      "name": "FaPizzaSlice",
      "description": "FaPizzaSlice"
    },
    { // 76
      "name": 'FaQ',
      "description": "Q icon"
    },
    { // 77
      "name": 'FaRegClipboard',
      "description": 'Clipboard icon'
    },
    { // 78
      "name": "FaShop",
      "description":'Shop icon'
    },
    { // 79
      "name": "FaHammer",
      "description": 'Hammer icon'
    },
    { // 80
      "name": "FaHeart",
      "description": 'Heart icon'
    },
    { // 81
      "name": "FaEnvelope",
      "description": 'Envelope icon'
    },
    { // 82
      "name": "FaPoop",
      "description": "Poop icon"
    }

]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Icon.bulkCreate(icons, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Icons';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        "FaAngellist", "FaAppleWhole", "FaAtom", "FaAward", "FaBanSmoking",
        "FaBandage", "FaBaseballBatBall", "FaBasketShopping", "FaBasketball",
        "FaBath", "FaBicycle", "FaBlender", "FaBong", "FaBook", "FaBottleWater",
        "FaBowlingBall", "FaBrain", "FaBriefcase", "FaBroom", "FaPaintbrush",
        "FaBuildingColumns", "FaCalculator", "FaCalendarDays", "FaCamera",
        "FaCampground", "FaCandyCane", "FaFilm", "FaFolder", "FaGavel",
        "FaGift", "FaPenFancy", "FaPeopleGroup", "FaRegFaceAngry",
        "FaRegFaceDizzy", "FaRegFaceFlushed", "FaRegFaceFrown",
        "FaRegFaceGrimace", "FaRegFaceGrinHearts", "FaRegFaceGrinSquint",
        "FaRegFaceGrinStars", "FaRegFaceGrinTongueSquint", "FaRegFaceKissBeam",
        "FaRegFaceMeh", "FaRegFaceRollingEyes", "FaRegFaceSadCry",
        "FaRegFaceSadTear", "FaRegFaceSmile", "FaRegFaceSmileBeam",
        "FaRegFaceSurprise", "FaRegFaceTired", "FaRegHandshake",
        "FaSuitcaseRolling", "FaSun", "FaTree", "FaVest", "FaVestPatches",
        "FaWineGlass", "FaBed", "FaPersonWalking", "FaHandHoldingHeart", "FaUserNurse", 'FaBuildingUn', "FaCakeCandles", "FaFilePowerpoint", "FaHotdog", "FaInbox","FaLightbulb", "FaKitchenSet", "FaImages", 'FaMonument', "FaMugHot", 'FaPhone', "FaPizzaSlice", "FaQ", "FaShop", "FaHeart", "FaHammer", "FaEnvelope", "FaPoop"
      ] }
    }, {});
  }
};
