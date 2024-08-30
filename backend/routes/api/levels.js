const express = require("express");
const { requireAuth, authorization } = require("../../utils/auth");
const { User, Entry, Level } = require("../../db/models");
const { notFound, titleCase } = require("../../utils/helper");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLevel = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name.")
    .isLength({ min: 2, max: 15})
    .withMessage('Level name must between 2 and 15 characters.')
    .custom(async (value, req) => {
      if (value) {
        console.log('req', req.req.user.id)
        const level = await Level.findOne({
          where: {
            name: value, //.toLowerCase(),
            userId: req.req.user.id
          },
        });
        // console.log('level', level.id, 'body id', req.req.body, 'res', level?.id !== req.req.body?.id)
        // console.log('method', req.req.method)
        console.log('total if', (req.req.method === "POST" && level) ||
        (req.req.method === "PUT" && level?.id !== req.req.body?.id))
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
    handleValidationErrors
];

router.get("/", requireAuth, async (req, res, next) => {
  const { user } = req;

  const levels = await Level.findAll({
    where: {
      userId: user.id,
    },
  });

  if (!levels) return next(notFound("Levels"));

  return res.json(levels);
});

router.post("/", requireAuth, validateLevel, async (req, res) => {
    const {name} = req.body

    const user = await User.findByPk(req.user.id, {
        include: [Level]
    })

    const level = await user.createLevel({name: name})

    return res.status(201).json(level)
});

router.put('/:levelId', requireAuth, validateLevel, async (req, res, next) => {
    const { id, name } = req.body

    const level  = await Level.findByPk(id)

    if (!level) return next(notFound('Level'))
    if (req.user.id !== level.userId) return next(authorization(req, level.userId))

    await level.update({name})
    return res.json(level)
})

router.delete('/:levelId', requireAuth, async (req, res, next) => {
    const { levelId } = req.params

    const level = await Level.findByPk(levelId)

    if (!level) return next(notFound('Level'))
    if (req.user.id !== level.userId) return next(authorization(req, level.userId))

    await level.destroy()

    return res.json({ message: 'Successful'})
})

module.exports = router;
