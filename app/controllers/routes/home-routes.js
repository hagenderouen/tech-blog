const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: { model: User }
        });
        const posts = postsData.map((post) => post.get({ plain: true }));
        
        res.render('posts', { 
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    } catch (err) {
        res.status(500).send({ error: err });
    }
    
});

router.get('/post/:id', async (req, res) => {
    try {
        const foundPostData = await Post.findByPk(req.params.id, {
            order: [
                [Comment, 'createdAt', 'DESC']
            ],
            include: [
                { model: User },
                { model: Comment,
                    include: { model: User }
                }
            ]
        });
        const foundPost = foundPostData.get({ plain: true });
        console.log(foundPost);
        res.render('post-comments', {
            post: foundPost,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;