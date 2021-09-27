const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Photo } = require('../models');
const withAuth = require('../utils/auth');

// Route to load calorie tracking data
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id','foods','calories','created_at'],
        include: [
            {
                model: Photo,
                attributes: ['id', 'cloud_id', 'image_url']
            },
            {
                model: User,
                attributes: ['caloriegoal']
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('tracking', { posts, loggedIn: true });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// API route to edit a single Post
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','foods','calories','created_at'
        ],
        include: [
            {
                model: Photo,
                attributes: ['id', 'cloud_id', 'image_url']
            },
            {
                model: User,
                attributes: ['caloriegoal']
            }
        ]
    }).then(dbPostData => {
        const post = dbPostData.get({ plain: true });

        res.render('tracking', {
            post,
            loggedIn: true
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;