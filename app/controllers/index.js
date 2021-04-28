const router = require('express').Router();
const userRoutes = require('./routes/user-routes');
const blogRoutes = require('./routes/blog-routes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;