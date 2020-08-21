const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // we added decoded user at token verification to req.user in auth middleware
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
    check('password', 'Password is required').exists(),
    check('email', 'email is required yo').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials'); // this produces no UnhandledPromiseRejectionWarnings
        }

        // make sure password match


        // jsonwebtoken
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            user: {
                id: user.id,
            }
        }
        const secret = config.get('jwtSecret');
        jwt.sign(payload, secret, { expiresIn: 36*1e10 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

        // res.status(200).send('User registered');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    

    
})

module.exports = router