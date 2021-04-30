const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.render('home', { posts });
    } catch (err) {
        res.status(500).send({ error: 'something blew up' });
    }
    
});

module.exports = router;