const express = require('express');
const router = express.Router();
const gravitar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/users/all
// @desc    Get all users
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.send(users);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
})

// @route   POST api/users
// @desc    Register Users
// @access  Public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'Mininum 6 characters').isLength({ min: 6 }),
    check('email', 'email is required yo').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    // User registration
    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (user) {
            throw new Error('User already exists'); // this produces no UnhandledPromiseRejectionWarnings
        }

        // Get user's gravitar
        // https://www.npmjs.com/package/gravatar
        const avatar = gravitar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // Compose new user
        user = new User({
            name,
            email,
            avatar,
            password
        })

        // Encrypt and set user password
        const salt = await bcrypt.genSalt(11);
        user.password = await bcrypt.hash(password, salt);

        // !WRITE! Save user to DB
        await user.save();

        // Return jsonwebtoken
        // https://jwt.io/
        // https://github.com/auth0/node-jsonwebtoken
        // https://auth0.com/learn/json-web-tokens

        const payload = {
            user: {
                id: user.id,
            }
        }

        const secret = config.get('jwtSecret');
        jwt.sign(payload, secret, { expiresIn: 36 * 1e10 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

        // res.status(200).send('User registered');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

module.exports = router