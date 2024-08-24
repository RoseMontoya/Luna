const express = require('express')
const { requireAuth, authorization } = require('../../utils/auth');
const { Activity } = require('../../db/models');
const { notFound } = require('../../utils/helper');

const router = express.Router()

router.get('/', requireAuth, async(req, res, next) => {
    const { user } = req

    const activities = await Activity.findAll({
        where: {
            userId: user.id
        }
    })

    if (!activities) return next(notFound('Activities'))

    return res.json(activities)
})


module.exports = router
