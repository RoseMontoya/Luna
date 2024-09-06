const express = require("express");
const { Icon } = require("../../db/models");
const { requireAuth, notFound } = require("../../utils");

const router = express.Router();

// Get all Icons
router.get("/", requireAuth, async (_req, res, next) => {
  const icons = await Icon.findAll();

  if (!icons) return next(notFound("Icons"));
  res.json(icons);
});

module.exports = router;
