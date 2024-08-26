const express = require('express')
const { requireAuth, authorization } = require('../../utils/auth');
const { Activity, User } = require('../../db/models');
const { notFound } = require('../../utils/helper');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');

const router = express.Router()

const validateActivity = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Please name this activity.'),
    check('name')
        .custom(async value => {
            console.log('value', value)
            const activity = await Activity.findOne({
                where: {
                    name: value
                }
            })
            console.log('are we here?!?!', activity)
            if (activity) {
                throw new Error('Activity with this name already exists.')
            } else return true
        }),
    check('iconId')
        .exists({checkFalsy: true})
        .withMessage('Please chose an icon to represent this activity.'),
    handleValidationErrors
]

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

router.post('/', requireAuth, validateActivity, async (req, res, next) => {
    console.log('INSIDE OF ROUTE')
    const {name, iconId} = req.body
    const user = await User.findByPk(req.user.id)
    const activity = await user.createActivity({userId: user.id, name, iconId})
    return res.status(201).json(activity)
})


module.exports = router
