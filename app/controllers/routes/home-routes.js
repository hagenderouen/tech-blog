const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render('home', { 
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    } catch (err) {
        res.status(500).send({ error: 'something blew up' });
    }
    
});

module.exports = router;