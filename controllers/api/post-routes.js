const router = require('express').Router();
const Post = require('../../models/Post');

router.get('/', (req, res) => {
    Post.findAll()
});


module.exports = router;