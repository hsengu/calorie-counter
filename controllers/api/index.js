const router = require('express').Router();

const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes');

router.use('/myinfo', userRoutes);
router.use('/tracking', postRoutes);

module.exports = router; 