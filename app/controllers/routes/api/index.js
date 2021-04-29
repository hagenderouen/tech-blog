const router = require('express').Router();
const blogPostRoutes = require('./blogPost-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

router.use('/posts', blogPostRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;