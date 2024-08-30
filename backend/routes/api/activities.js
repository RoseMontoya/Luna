const express = require('express')
const { requireAuth, authorization } = require('../../utils/auth');
const { Activity, User } = require('../../db/models');
const { notFound, titleCase } = require('../../utils/helper');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');

const router = express.Router()

const validateActivity = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Please name this activity.')
        .isLength({ min: 2, max: 25 })
        .withMessage('Activity name must be between 2-25 characters.'),
    check('name')
        .custom(async (value, req) => {
            if (value) {
                const activity = await Activity.findOne({
                    where: {
                        name: value,
                        userId: req.req.user.id
                    }
                })
                if ((req.req.method === "POST" && activity) ||
                (req.req.method === "PUT" && activity?.id !== req.req.body?.id)) {
                    if (activity) {
                        throw new Error('Activity with this name already exists.')
                    }
                }
            }
            return true
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
    const {name, iconId} = req.body
    const user = await User.findByPk(req.user.id)
    const activity = await user.createActivity({userId: user.id, name, iconId})
    return res.status(201).json(activity)
})

router.put('/:activityId', requireAuth, validateActivity, async (req, res, next) => {
    const { name, iconId, id} = req.body

    const act = await Activity.findByPk(id)

    if (!act) return next(notFound('Activity'))
    if (act.userId !== req.user.id) return next(authorization(req, act.userId))

    await act.update({name, iconId})

    return res.json(act)
})

router.delete('/:activityId', requireAuth, async (req, res, next) => {
    const { activityId } = req.params

    const act = await Activity.findByPk(activityId)

    if (!act) return next(notFound('Activity'))
    if (act.userId !== req.user.id) return next(authorization(req, act.userId))

    await act.destroy()

    return res.json({message: 'Successful'})
})

module.exports = router
