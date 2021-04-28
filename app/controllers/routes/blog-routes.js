const router = require('express').Router();
const { Post } = require('../../models');
// TODO: Auth middleware

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
    // TODO
});

// Update blog post
router.put('/:id', async (req, res) => {
    // TODO
});

// Delete a post by id
router.delete('/:id', (req, res) => {
    TODO
});

// Read blog post by id including comments
router.get(':id/comments', async (req, res) => {
    // TODO
});

// Create a comment on a blog post
router.post(':id/comments', async (req, res) => {
    // TODO
});

// Update a comment on a blog post
router.put(':id/comments', async (req, res) => {
    // TODO
});

// Delete a comment on a blog post
router.delete(':id/comments', async (req, res) => {
    // TODO
});

module.exports = router;