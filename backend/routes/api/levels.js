const express = require("express");
const {
  requireAuth,
  authorization,
  notFound,
  handleValidationErrors,
} = require("../../utils");
const { User, Level } = require("../../db/models");
const { check } = require("express-validator");

const router = express.Router();

// Validation for creating or editing a level
const validateLevel = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name.")
    .isLength({ min: 2, max: 15 })
    .withMessage("Level name must between 2 and 15 characters.")
    .custom(async (value, req) => {
      // Check if user already has a level under that name
      if (value) {
        const level = await Level.findOne({
          where: {
            name: value,
            userId: req.req.user.id,
          },
        });
        if (
          (req.req.method === "POST" && level) ||
          (req.req.method === "PUT" && level?.id !== req.req.body?.id)
        ) {
          if (level) {
            throw new Error("Level with this name already exists.");
          }
        }
      }
      return true;
    }),
  handleValidationErrors,
];

// Get all levels for a user
router.get("/", requireAuth, async (req, res, next) => {
  const { user } = req;

  const levels = await Level.findAll({
    where: {
      userId: user.id,
    },
  });

  // ! Check if levels exists (rethink this. if a user has no levels, does it trigger this?)
  if (!levels) return next(notFound("Levels"));

  return res.json(levels);
});

// Create a new level
router.post("/", requireAuth, validateLevel, async (req, res, next) => {
  const { name } = req.body;

  const user = await User.findByPk(req.user.id, {
    include: [Level],
  });
  // check if user exists
  if (!user) return next(notFound('User'))

  const level = await user.createLevel({ name: name });

  return res.status(201).json(level);
});

// Edit a level by level Id
router.put("/:levelId", requireAuth, validateLevel, async (req, res, next) => {
  const { id, name } = req.body;

  const level = await Level.findByPk(id);

  // Check if level exists
  if (!level) return next(notFound("Level"));
  // check if level belongs to user
  if (req.user.id !== level.userId)
    return next(authorization(req, level.userId));

  await level.update({ name });
  return res.json(level);
});

// Delete a level by level id
router.delete("/:levelId", requireAuth, async (req, res, next) => {
  const { levelId } = req.params;

  const level = await Level.findByPk(levelId);

  // Check if level exists
  if (!level) return next(notFound("Level"));
  // Check if level belongs to user
  if (req.user.id !== level.userId)
    return next(authorization(req, level.userId));

  await level.destroy();

  return res.json({ message: "Successful" });
});

module.exports = router;
