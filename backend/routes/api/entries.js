const express = require("express");
const { requireAuth, authorization } = require("../../utils/auth");
const {
  User,
  Entry,
  Level,
  EntryActivity,
  EntryLevel,
  Activity,
} = require("../../db/models");
const { notFound } = require("../../utils/helper");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateEntry = [
  check("datetime")
    .exists({ checkFalsy: true })
    .withMessage("Date is required."),
  check("datetime").custom((value) => {
    const entryDate = new Date(value);
    const current = new Date();

    if (entryDate >= current) {
      throw new Error("Entry date cannot be in the future.");
    } else return true;
  }),
  check("datetime")
    .isAfter("1999-12-31")
    .withMessage("Date cannot be before the year 2000."),
  check("mood")
    .exists({ checkFalsy: true })
    .withMessage("Please give a word to describe how you are feeling."),
  check("mood")
    .isLength({ max: 20 })
    .withMessage("Cannot be longer than 20 characters."),
  check("overallMood")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 10 })
    .withMessage("Please choose a number between 1-10."),
  check("iconId")
    .exists({ checkFalsy: true })
    .withMessage("Please choose an icon."),
  check("note")
    .optional({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage(
      "If you choose to leave a note, it must be longer than 10 characters."
    )
    .isLength({ max: 255 })
    .withMessage("Note cannot be longer than 255 characters."),
  handleValidationErrors,
];

router.get("/", async (req, res) => {
  return res.json({ message: "made here" });
});

router.get("/:entryId/activities", requireAuth, async (req, res, next) => {
  const { entryId } = req.params;

  const activities = await EntryActivity.findAll({
    where: {
      entryId: entryId,
    },
  });
});

router.get("/:entryId", requireAuth, async (req, res, next) => {
  const { entryId } = req.params;

  const entry = await Entry.findByPk(entryId, {
    include: [EntryLevel, EntryActivity],
  });

  if (!entry) return next(notFound("Entry"));

  if (req.user.id !== entry.userId)
    return next(authorization(req, entry.userId));

  return res.json(entry);
});

router.post("/", requireAuth, validateEntry, async (req, res, next) => {
  const { user } = req;
  const { datetime, mood, overallMood, iconId, note, levels, activities } =
    req.body;

  const entry = await Entry.create({
    userId: user.id,
    datetime,
    mood,
    overallMood,
    iconId,
    note,
  });

  const newLvls = await EntryLevel.bulkCreate(
    levels.map((level) => ({ ...level, entryId: entry.id }))
  );

  const newacts = await EntryActivity.bulkCreate(
    activities.map((activity) => ({ activityId: activity, entryId: entry.id }))
  );

  const newEntry = await Entry.findByPk(entry.id, {
    include: [EntryLevel, EntryActivity],
  });

  res.status(201).json(newEntry);
});

router.put("/:entryId", requireAuth, validateEntry, async (req, res, next) => {
  const { datetime, mood, overallMood, iconId, note, levels, activities } =
    req.body;
  const { entryId } = req.params;

  const entry = await Entry.findByPk(entryId, {
    include: [Level, Activity],
  });

  if (!entry) return next(notFound("Entry"));
  if (entry.userId !== req.user.id)
    return next(authorization(req, entry.userId));

  await entry.update({
    datetime,
    mood,
    overallMood,
    iconId,
    note,
  });
  // console.log('entry', entry.EntryActivities)

  const oldActs = entry.Activities;
  const oldActsIds = new Set(
    oldActs.map((act) => {
      return act.id;
    })
  );
  const newActsId = new Set(activities);

  const actsToAdd = [...newActsId].filter((act) => !oldActsIds.has(act));
  const actsToDelete = [...oldActsIds].filter((act) => !newActsId.has(act));

  await EntryActivity.bulkCreate(
    actsToAdd.map((act) => ({ activityId: act, entryId: entry.id }))
  );

  await Promise.all(
    oldActs.map((act) => {
      if (actsToDelete.includes(act.id)) {
        entry.removeActivity(act);
      }
    })
  );

  const levelsObj = {};
  levels.forEach((level) => {
    levelsObj[level.levelId] = level.rating;
  });
  console.log("obj", levelsObj);

  await Promise.all(
    entry.Levels.map((level) => {
      if (level.rating !== levelsObj[level.id]) {
        return entry.addLevel(level, {
          through: { rating: levelsObj[level.id] },
        });
      }
      return Promise.resolve();
    })
  );

  const updatedEntry = await Entry.findByPk(entryId, {
    include: [EntryLevel, EntryActivity],
  });

  return res.json(updatedEntry);
});

router.delete("/:entryId", requireAuth, async (req, res, next) => {
  const { entryId } = req.params;

  const entry = await Entry.findByPk(entryId);

  if (!entry) return next(notFound("Entry"));
  if (entry.userId !== req.user.id)
    return next(authorization(req, entry.userId));

  await entry.destroy();

  return res.json({ message: "Success" });
});

module.exports = router;
