const router = require('express').Router();
const { User, Post } = require('../../../models');
const auth = require('../../../utils/auth');

// /api/users

// Create a user
// /api/users/
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
    
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.username = req.body.username;
          res.status(200).end();
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

// Login a user
// /api/users/login
router.post('/login', async (req, res) => {

    try {
        const dbUserData = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
    
        if (!dbUserData) {
          res
            .status(400)
            .json({ error: 'Incorrect email or password. Please try again!' });
          return;
        }
    
        const validPassword = await dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ error: 'Incorrect email or password. Please try again!' });
          return;
        }

        const user = dbUserData.get({ plain: true });
    
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.username = user.username;
          res.status(204).json({ message: 'Success!'});
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

// Logout a user
// /api/users/logout
router.post('/logout', auth, async (req, res) => {
        req.session.destroy(() => {
          res.status(204).end();
        });
});

// Delete a user by id
// /api/users/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a user by id
router.put('/:id', async (req, res) => {
    try {
        await User.update({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user posts
// /api/users/posts
router.get('/posts', auth, async (req, res) => {

  try {
    const foundUser = await User.findOne({
      where: {
        username: req.session.username
      }
    });

    const foundUserPostsData = await Post.findAll({
      where: {
        userId: foundUser.id
      }
    });

    const foundUserPosts = foundUserPostsData.map((post) => post.get({ plain: true }));
    res.json(foundUserPosts);
  } catch (err) {
    res.status(500).json({ error: err});
  }

});

module.exports = router;


