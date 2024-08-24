const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
// const {Entry} = require('../../db/models')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Entry, Level } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validate Signup Middleware
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true})
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true})
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password is required'),
    handleValidationErrors
];



// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, firstName, lastName} = req.body;

    // Check if User exist
    const existingUser = await User.findOne({
        where:  { email: email }
    });
    if (existingUser) {
        const err = new Error('User already exists');
        err.title = 'User already exists'
        err.status = 500;
        err.errors = { email: 'User with that email already exists'};
        return next(err);
    }

    // Create new user
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, firstName, lastName, hashedPassword });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
})

router.get('/:userId/entries', requireAuth, async (req, res, next) => {
    const { userId } = req.params
    const entries = await Entry.findAll({
        where: {
            userId: userId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [Level],
        order: [['datetime', 'DESC']]
    })

    return res.json(entries)

})

router.get('/:userId/today', requireAuth, async (req, res, next) => {
    const { userId } = req.params

    const entry = await Entry.findAll({
        where: {
            userId: userId,
            datetime: {
                [Op.gte] : new Date().toDateString()
            }
        },
        include: [Level]
    })

    return res.json(entry)
})



module.exports = router;
