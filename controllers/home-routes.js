const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/signin', (req, res) => {
    res.render('sign-in', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/upload', (req, res) => {
    res.render('upload', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;