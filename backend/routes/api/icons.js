const express =require('express')
const { Icon } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
    const icons = await Icon.findAll()
    res.json(icons)
})

module.exports = router
