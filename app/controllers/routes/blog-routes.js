const router = require('express').Router();
const { Post } = require('../../models');
// TODO: Auth middleware

// /blog

// Read all blog posts
router.get('/', async (req, res) => {
    // TODO
});

// Create blog post
router.post('/submit', auth, async (req, res) => {
    // TODO
});

// Update blog post
router.put('/:id', auth, async (req, res) => {
    // TODO
});

// Delete a post by id
router.delete('/:id', auth, (req, res) => {
    TODO
});

// Read blog post by id including comments
router.get('/comments/:id', async (req, res) => {
    // TODO
});

// Create a comment on a blog post
router.post('/comments/:id', auth, async (req, res) => {
    // TODO
});

// Update a comment on a blog post
router.post('/comments/:id', auth, async (req, res) => {
    // TODO
});

// Delete a comment on a blog post
router.delete('/comments/:id', auth, async (req, res) => {
    // TODO
});

module.exports = router;