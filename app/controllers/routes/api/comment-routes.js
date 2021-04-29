const router = require('express').Router();
const { Post, Comment, User } = require('../../../models');
// TODO const auth = require('../../utils/auth');

// /api

// Read all post comments
// /api/comments?postId=1
router.get('/comments', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.query.postId);
        
        if (!postData) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const post = postData.get({ plain: true });

        const commentsData = await Comment.findAll({
            where: {
                post_id: req.query.postId
            }
        });

        const comments = commentsData.map((comment) => comment.get({ plain: true }));
        res.json(comments);        
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