const router = require('express').Router();
<<<<<<< HEAD
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');

router.use('/myinfo', userRoutes);
router.use('/tracking', postRoutes);
=======
const userRoutes = require('./user-routes');
const photoRoutes = require('./photo-routes');

router.use('/users', userRoutes);
>>>>>>> 71ef411fe62bbc74bbac3c0e141d750291ab8bb2
router.use('/photo', photoRoutes);

module.exports = router;
