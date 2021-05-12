const router = require('express').Router();
const { Post, Comment, User } = require('../../../models');
const auth = require('../../../utils/auth');

// /api

// Read all post comments
// /api/comments?postId=1
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.query.postId);
        
        if (!postData) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const post = postData.get({ plain: true });

        const commentsData = await Comment.findAll({
            where: {
                postId: req.query.postId
            }
        });

        const comments = commentsData.map((comment) => comment.get({ plain: true }));
        res.json(comments);        
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a comment
// /api/comments?postId=1
router.post('/', auth, async (req, res) => {
    try {

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
            post_id: req.query.postId,
            user_id: user.id,
            }
        );
        
        res.status(201).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a comment by id
// /api/comments/1
router.put('/:id', auth, async (req, res) => {
    try {
        // find comment
        const foundCommentData = await Comment.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User
            }
        });

        if (!foundCommentData) {
            return res.status(404);
        }

        console.log(foundCommentData);
        const foundComment = foundCommentData.get({ plain: true });
        // if user matches comment owner, update comment
        if (foundComment.user.username !== req.session.username) {
            return res.status(401);
        }

        const newComment = await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json(newComment.get({ plain: true }));
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment on a blog post
router.delete('/:id', async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;