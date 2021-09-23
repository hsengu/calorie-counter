const router = require('express').Router();
<<<<<<< HEAD

const postRoutes = require('./post-routes.js');
=======
const postRoutes = require('./post-routes');
>>>>>>> 80a806d0102d93f1ffca6298761c46f1cb22677b
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');

router.use('/myinfo', userRoutes);
router.use('/tracking', postRoutes);
<<<<<<< HEAD

module.exports = router; 
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');

router.use('/users', userRoutes);
=======
>>>>>>> 80a806d0102d93f1ffca6298761c46f1cb22677b
router.use('/photo', photoRoutes);

module.exports = router;
