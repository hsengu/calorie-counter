const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/signup', (req, res) => {
    res.render('create');
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

module.exports = router;