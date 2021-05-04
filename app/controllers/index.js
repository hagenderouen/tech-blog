const router = require('express').Router();
const apiRoutes = require('./routes/api');
const homeRoutes = require('./routes/home-routes');
const userRoutes = require('./routes/user-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;