const router = require('express').Router();
const Post = require('../../models/Post');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'date',
            'food',
            'calories'
        ]
    }).then(dbPostData => {
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'date', 'food', 'calories'],
    }).then(dbPostData => {
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;