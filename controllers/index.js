const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const trackingRoutes = require('./tracking-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/tracking', trackingRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;