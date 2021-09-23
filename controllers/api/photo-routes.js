const router = require('express').Router();
const Photo = require('../../models/Photo');
const cloudinary = require('../../config/cloudinaryConfig');

router.get('/upload', (req, res) => {
    res.render('photos');
});

module.exports = router;