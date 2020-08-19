const express = require('express');
const router = express.Router();
// https://express-validator.github.io/docs/
const { body, check, validationResult } = require('express-validator/check');

// @route   POST api/users
// @desc    Register Users
// @access  Public

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'Mininum 6 characters').isLength({ min: 6 }),
    check('email', 'email is required yo').isEmail()
], (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status('400').send(errors)
        res.status(400).json({ errors: errors.array(), smthelse: { lol: 1 } })
    }
    res.status('200').send('User route');
})

module.exports = router