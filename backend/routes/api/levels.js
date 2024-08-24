const express = require('express')
const { requireAuth, authorization } = require('../../utils/auth');
const { User, Entry, Level } = require('../../db/models');
const { notFound } = require('../../utils/helper');

const router = express.Router()

router.get('/', requireAuth, async (req, res, next) =>{
    const {user} = req

    const levels = await Level.findAll({
        where: {
            userId : user.id
        }
    })

    if (!levels) return next(notFound('Levels'))

    return res.json(levels)
})


module.exports = router
