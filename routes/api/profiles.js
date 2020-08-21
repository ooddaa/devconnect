const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // https://mongoosejs.com/docs/populate.html
        const profile = 
            await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);
        
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profiles
// @desc    Create or Update user profile
// @access  Private
router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Please add your skills').not().isEmpty(),
]], async (req, res) => {

    // Check for body errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { 
        // user, // users don't specify themselves explicitly, they pass their JWT aka 'result of registration'
        company, 
        website, 
        location,
        status,
        skills,
        bio,
        githubusername,
        // experience,
        // education,
        // social,
        // date
        youtube,
        twitter,
        facebook,
        instagram,
        linkedin
    } = req.body;

    // Build profileFields object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(sk => sk.trim());
    }
    // return res.status(200).json({ msg: 'All ok', skills: profileFields.skills })

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    // Make sure this user has a Register Profile
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update 
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true }
            );

            return res.status(200).json({ msg: 'Profile has been updated', profile });
        }

        // Create new Profile
        profile = new Profile(profileFields);
        
        // !WRITE! to database
        await profile.save();

        return res.status(200).json({ msg: 'New profile saved', profile });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router