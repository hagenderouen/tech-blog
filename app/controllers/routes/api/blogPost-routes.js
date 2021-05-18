const router = require('express').Router();
const { Post, User, Comment } = require('../../../models');
const auth = require('../../../utils/auth');

// Read all blog posts
// GET /api/posts
router.get('/', async (req, res) => {

    try {
        
        const postsData = await Post.findAll({
            include: Comment
        });
        
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// Create a blog post
// /api/posts/
router.post('/', auth, async (req, res) => {
    try {
        
        const userData = await User.findOne({ 
            where: {
                username: req.session.username
            }, 
            attributes: ['id']
        });

        const newPost = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: userData.id
            }, 
            {
            returning: true
        });
        console.log(newPost);
        res.status(201).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

// Update a blog post by id
// /api/posts/:id
router.put('/:id', async (req, res) => {
    try {

        const foundPost = await Post.findByPk(req.params.id);

        if (!foundPost) {
            return res.status(404).json({ error: 'Post not found'});
        }
        
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
// /api/posts/:id
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



module.exports = router;