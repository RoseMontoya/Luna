const express = require('express')
const { requireAuth, authorization } = require('../../utils/auth');
const { User, Entry } = require('../../db/models');
const { notFound } = require('../../utils/helper');

const router = express.Router()

router.get('/:userId', requireAuth, async(req, res, next) => {
    const { userId } = req.params

    const activities = await Activity.findAll({
        where: {
            userId: userId
        }
    })

    if (!activities) return next(notFound('Activities'))

    return res.json(activities)
})


module.exports = router
