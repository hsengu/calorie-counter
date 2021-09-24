const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/signin', (req, res) => {
    res.render('sign-in');
});

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/upload', (req, res) => {
    res.render('upload');
});

module.exports = router;