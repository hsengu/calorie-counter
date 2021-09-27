const router = require('express').Router();

router.get('/', (req, res) => {
    if(!req.session.loggedIn)
        res.render('home', {
            loggedIn: req.session.loggedIn
        });
    else
        res.render('progress', {
            loggedIn: req.session.loggedIn
        });
});

router.get('/signin', (req, res) => {
    if(!req.session.loggedIn)
        res.render('sign-in', {
            loggedIn: req.session.loggedIn
        });
    else
        res.render('progress', {
            loggedIn: req.session.loggedIn
        });
});

router.get('/register', (req, res) => {
    if(req.session.loggedIn)
        res.render('register', {
            loggedIn: req.session.loggedIn
        });
    else
        res.render('progress', {
            loggedIn: req.session.loggedIn
        });
});

router.get('/progress', (req, res) => {
    if(req.session.loggedIn)
        res.render('progress', {
            loggedIn: req.session.loggedIn
        });
    else
        res.render('sign-in');
});

router.get('/upload', (req, res) => {
    res.render('upload', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;