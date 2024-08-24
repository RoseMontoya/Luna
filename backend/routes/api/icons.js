const express =require('express')
const { Icon } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { notFound } = require('../../utils/helper');

const router = express.Router()

router.get('/', requireAuth, async (req, res, next) => {
    const icons = await Icon.findAll()

    if (!icons) return next(notFound('Icons'))
    res.json(icons)
})

router.get('/mood', requireAuth, async (req, res, next) => {
    const moodIcons = await Icon.findAll({
        where: {
            id: {
                [Op.lte]: 5
            }
        }
    })

    if (!moodIcons) return next(notFound('Icons'))

    return res.json(moodIcons)
})

module.exports = router
