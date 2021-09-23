const router = require('express').Router();

const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes');

router.use('/myinfo', userRoutes);
router.use('/tracking', postRoutes);

module.exports = router; 
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');

router.use('/users', userRoutes);
router.use('/photo', photoRoutes);

module.exports = router;
