const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const {
  setTokenCookie,
  requireAuth,
  handleValidationErrors,
} = require("../../utils");
const { User, Entry, EntryActivity, EntryLevel } = require("../../db/models");
const userDefaults = require("../../utils/newUserDefaults");
const { check } = require("express-validator");

const router = express.Router();

// Validate Signup Middleware
const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .isLength({ max: 30 })
    .withMessage("Name cannot be longer than 30 characters."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .isLength({ max: 75 })
    .withMessage("Name cannot be longer than 75 characters."),
  check("email")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const first =
    firstName.slice(0, 1).toUpperCase() + firstName.slice(1).toLowerCase();

  // Check if User exist
  const existingUser = await User.findOne({
    where: { email: email },
  });
  if (existingUser) {
    const err = new Error("User already exists");
    err.title = "User already exists";
    err.status = 500;
    err.errors = { email: "User with that email already exists" };
    return next(err);
  }

  // Create new user
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    firstName: first,
    lastName,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  setTokenCookie(res, safeUser);
  await userDefaults(user.id);

  return res.json({
    user: safeUser,
  });
});

// Get all of a user entries
router.get("/:userId/entries", requireAuth, async (req, res, next) => {
  const { userId } = req.params;
  const entries = await Entry.findAll({
    where: {
      userId: userId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [EntryLevel, EntryActivity],
    order: [["datetime", "DESC"]],
  });

  return res.json(entries);
});

// Get all entries for a user that match the current date
router.get("/:userId/today", requireAuth, async (req, res, next) => {
  const { userId } = req.params;

  const entry = await Entry.findAll({
    where: {
      userId: userId,
      datetime: {
        [Op.gte]: new Date().toDateString(),
      },
    },
    include: [EntryLevel, EntryActivity],
  });

  return res.json(entry);
});

module.exports = router;
