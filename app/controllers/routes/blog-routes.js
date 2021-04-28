const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const { findByPk } = require('../../models/Post');
// TODO const auth = require('../../utils/auth');

// /blog

// Read all blog posts
router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Create blog post
router.post('/submit', async (req, res) => {
    try {
        req.session.username = 'EddieHendrix'; // TODO: remove this line after login route implemented
        const userData = await User.findOne({ 
            where: {
                username: req.session.username
            }, 
            attributes: ['id']
        });
        const user = userData.get({ plain: true });

        const newPost = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                userId: user.id
            }, 
            {
            returning: true
        });

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    
});

// Update blog post
router.put('/:id', async (req, res) => {
    try {
        await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            { 
                where: {
                    id: req.params.id
                }
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Delete a post by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Read all post comments
router.get('/:id/comments', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        
        if (!postData) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const post = postData.get({ plain: true });

        const commentsData = await Comment.findAll({
            where: {
                post_id: req.params.id
            }
        });

        if (commentsData.length === 0) {
            post.comments = [];
            res.json(post);
        }

        const comments = commentsData.map((comment) => comment.get({ plain: true }));
        post.comments = comments;
        res.json(post);        
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Create a comment on a blog post
router.post('/:id/comments', async (req, res) => {
    try {
        req.session.username = 'EddieHendrix'; // TODO: remove this line after login route implemented

        const userData = await User.findOne({ 
            where: {
                username: req.session.username
            }, 
            attributes: ['id']
        });
        const user = userData.get({ plain: true });

        const newCommentData = await Comment.create(
            {
            content: req.body.content,
            postId: req.params.id,
            userId: user.id,
            },
            {
                returning: true
            }
        );
        
        const newComment = newCommentData.get({ plain: true });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({error: err });
    }
});

// Update a comment on a blog post
router.put('/:id/comments', async (req, res) => {
    try {
        await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.body.commentId
                }
            }
        );
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Delete a comment on a blog post
router.delete('/:id/comments', async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                id: req.body.commentId
            }
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;