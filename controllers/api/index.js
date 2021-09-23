const router = require('express').Router();
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');

router.use('/myinfo', userRoutes);
router.use('/tracking', postRoutes);
router.use('/photo', photoRoutes);

module.exports = router;
