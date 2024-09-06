const express = require("express");
const {
  requireAuth,
  authorization,
  notFound,
  handleValidationErrors,
} = require("../../utils");
const {
  Entry,
  Level,
  EntryActivity,
  EntryLevel,
  Activity,
} = require("../../db/models");
const { check } = require("express-validator");

const router = express.Router();

// Validation for creating and editing an entry
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

// Get an entry by entry Id
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

// Create a new entry
router.post("/", requireAuth, validateEntry, async (req, res, next) => {
  const { user } = req;

  const { datetime, mood, overallMood, iconId, note, levels, activities } =
    req.body;

  // Create Entry
  const entry = await Entry.create({
    userId: user.id,
    datetime,
    mood,
    overallMood,
    iconId,
    note,
  });

  // Create Levels for entry
  const newLvls = await EntryLevel.bulkCreate(
    levels.map((level) => ({ ...level, entryId: entry.id }))
  );

  // Create activities for entry
  const newacts = await EntryActivity.bulkCreate(
    activities.map((activity) => ({ activityId: activity, entryId: entry.id }))
  );

  // Compile new entry to return
  const newEntry = await Entry.findByPk(entry.id, {
    include: [EntryLevel, EntryActivity],
  });

  res.status(201).json(newEntry);
});

// Edit an entry by id
router.put("/:entryId", requireAuth, validateEntry, async (req, res, next) => {
  const { datetime, mood, overallMood, iconId, note, levels, activities } =
    req.body;
  const { entryId } = req.params;
  const userId = req.user.id;

  const entry = await Entry.findByPk(entryId, {
    include: [Level, Activity],
  });

  // Check if entry exists
  if (!entry) return next(notFound("Entry"));
  // Check if entry belongs to user
  if (entry.userId !== req.user.id)
    return next(authorization(req, entry.userId));

  // Update Entry
  await entry.update({
    datetime,
    mood,
    overallMood,
    iconId,
    note,
  });

  // Get id's from the old entry activities
  const oldActs = entry.Activities;
  const oldActsIds = new Set(
    oldActs.map((act) => {
      return act.id;
    })
  );
  // Get id's for the new entry activities
  const newActsId = new Set(activities);

  // Look at new activity ids and find ones that are not in the old activity ids
  const actsToAdd = [...newActsId].filter((act) => !oldActsIds.has(act));
  // Look at old activities id and find ones that are not in the new activity ids
  const actsToDelete = [...oldActsIds].filter((act) => !newActsId.has(act));

  // console.log('oldActs', oldActs)
  // console.log('oldActsIds', oldActsIds)
  // console.log('newActsIds',newActsId)
  // console.log('acts to add',actsToAdd)
  // console.log('acts to delete', actsToDelete)

  // Add new activities to entry
  await EntryActivity.bulkCreate(
    actsToAdd.map((act) => ({
      userId: userId,
      activityId: act,
      entryId: entry.id,
    }))
  );

  // Delete activities that were removed
  await Promise.all(
    oldActs.map((act) => {
      if (actsToDelete.includes(act.id)) {
        entry.removeActivity(act);
      }
    })
  );

  // Flatten old levels to easily find level by id and the associated rating
  const levelsObj = {};
  entry.Levels.forEach((level) => {
    levelsObj[level.id] = level.EntryLevel?.rating;
  });

  // Format new levels to easily find level by id  and the associated rating
  const newLvls = {};
  levels.forEach((level) => {
    newLvls[level.levelId] = level.rating;
  });

  // Grab all of the old levels id
  const oldLvlsIds = entry.Levels.map((lvl) => lvl.id);

  // Find any levels that no longer attached to entry
  const lvlToDelete = [...oldLvlsIds].filter((lvl) => !newLvls[lvl]);

  // Remove levels no longer in use from entry
  await Promise.all(lvlToDelete.map((lvlId) => entry.removeLevel(lvlId)));

  // Add or update level if new level rating does not match old level rating
  await Promise.all(
    levels.map((level) => {
      if (level.rating !== levelsObj[level.levelId]) {
        return entry.addLevel(level.levelId, {
          through: { rating: level.rating, userId: userId },
        });
      }
      return Promise.resolve();
    })
  );

  // Compile entry data to return
  const updatedEntry = await Entry.findByPk(entryId, {
    include: [EntryLevel, EntryActivity],
  });

  return res.json(updatedEntry);
});


// Delete an entry by id
router.delete("/:entryId", requireAuth, async (req, res, next) => {
  const { entryId } = req.params;

  const entry = await Entry.findByPk(entryId);

  // Check if entry exists
  if (!entry) return next(notFound("Entry"));
  // Check if entry belongs to user
  if (entry.userId !== req.user.id)
    return next(authorization(req, entry.userId));

  await entry.destroy();

  return res.json({ message: "Success" });
});

module.exports = router;
