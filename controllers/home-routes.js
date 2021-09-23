const router = require('express').Router();

router.get('/', (req, res) => {

});

router.get('/upload', (req, res) => {
    res.render('upload');
});

module.exports = router;