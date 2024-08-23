const express = require('express')
const { requireAuth, authorization } = require('../../utils/auth');
const { User, Entry } = require('../../db/models');
const { notFound } = require('../../utils/helper');

const router = express.Router()

router.get('/', async (req, res) => {
    return res.json({'message': 'made here'})
}
)

router.get('/:entryId', requireAuth, async (req, res, next) => {
    const {entryId} = req.params
    // console.log("asdfadf",entryId)

    const entry = await Entry.findByPk(entryId)

    if (!entry) return next(notFound('Entry'))

    // console.log('userId', entry.userId)
    if (req.user.id !== entry.userId) return next(authorization(req, entry.userId))

    return res.json(entry)
})

module.exports = router
