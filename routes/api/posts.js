const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');
const { remove } = require('../../models/User');

// @route   POST api/posts
// @desc    Create new posts
// @access  Public
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // const user = await User.findOne({ _id: req.user.id }).select('-password');
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        return res.json(post);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // sort by most recent.
        return res.json(posts);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
})

// @route   GET api/posts
// @desc    Get post by post_id
// @access  Private
router.get('/by_post/:post_id', auth, async (req, res) => {
    try {
        // users can search other users posts 
        const posts = await Post.find({ _id: req.params.post_id });

        if (!posts.length) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        return res.json(posts);
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(500).json({ msg: 'Post not found' });
        }
        return res.status(500).json({ msg: error.message });
    }
})

// @route   GET api/posts
// @desc    Get posts by user
// @access  Private
router.get('/by_user/:user_id', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.user_id }).sort({ date: -1 }); // sort by most recent.
        return res.json(posts);
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(500).json({ msg: 'Post not found' });
        }
        return res.status(500).json({ msg: error.message });
    }
})

// @route   DELETE api/posts
// @desc    Delete post by its id
// @access  Private
router.delete('/delete/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(500).json({ msg: 'Post not found' });
        }
        // users cannot delete other users posts
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove();
        return res.json({ msg: `Post ${req.params.post_id} was deleted` });
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(500).json({ msg: 'Post not found' });
        }
        return res.status(500).json({ msg: error.message });
    }
})

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // if (!post) {
        //     // Not good, better to throw
        //     throw new Error()
        //     // return res.status(500).json({ msg: 'Post not found' });
        // }

        // user cannot like his own post...
        // if (post.user.toString() === req.user.id) {
        //     return res.status(400).json({ msg: "Users cannot add likes to their own posts" });
        // }

        // Has this user already liked this post?
        const { likes } = post;
        if (likes.map(user => user.user).includes(req.user.id)) {
            return res.status(400).json({ msg: "One like per post" });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        return res.json(post.likes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: [{ msg: error.message }] });
    }
})

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // if (!post) {
        //     return res.status(500).json({ msg: 'Post not found' });
        // }

        // user cannot unlike his own post...
        // if (post.user.toString() === req.user.id) {
        //     return res.status(400).json({ msg: "Users cannot remove likes to their own posts" });
        // }

        // Has this user already liked this post?
        const { likes } = post;
        if (likes.map(user => user.user).includes(req.user.id)) {
            // filter out likes by this user
            post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);
            await post.save();
            return res.json(post.likes);
        }

        return res.status(400).json({ msg: 'Post has not yet been liked' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: [{ msg: error.message }] });
    }
})

// @route   POST api/posts/comment/:post_id
// @desc    Post a comment
// @access  Private
router.post('/comment/:post_id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const post = await Post.findById(req.params.post_id);
        const user = await User.findById(req.user.id).select('-password');

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();

        return res.json(post);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
})

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment by post_id
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(500).json({ msg: 'Post not found' });
        }

        // Does comment exist?
        const { comments } = post;
        const removeIndex =
            comments.map(comment => comment._id)
                .indexOf(req.params.comment_id);

        if (removeIndex !== -1) {
            comments.splice(removeIndex, 1);
            await post.save();
            return res.json({ msg: "Comment removed", comments: post.comments });
        } else {
            return res.status(400).json({ msg: "No such comment" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
})

module.exports = router