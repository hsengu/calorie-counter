const router = require('express').Router();
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/photo', photoRoutes);
router.use('/post', postRoutes);

module.exports = router;
