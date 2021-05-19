const router = require('express').Router();
const { Post, User } = require('../../models');
const auth = require('../../utils/auth');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/posts', auth, async (req, res) => {

    let userPosts = [];

    try {

        const foundUser = await User.findOne({
            where: {
              username: req.session.username
            }
          });
      
        const foundUserPostsData = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                userId: foundUser.id
            },
            include: { model: User }
        });

        if (foundUserPostsData) {
            userPosts = foundUserPostsData.map((post) => post.get({ plain: true }));
        }

        res.render('posts', {
            posts: userPosts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

module.exports = router;