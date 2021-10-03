const router = require('express').Router();
const sequelize = require('../config/connection');
const Op = require('sequelize').Op;
const { Post, User, Photo } = require('../models');
const withAuth = require('../utils/auth');

// Route to load calorie tracking data
router.get('/', withAuth, (req, res) => {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const TODAY_END = new Date().setHours(23, 59, 59, 999);
    Post.findAll({                          // Get all Posts for the logged in user only for the current day
        where: {
            user_id: req.session.user_id,
            created_at: { 
                [Op.gt]: TODAY_START,
                [Op.lt]: TODAY_END
            }
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
    Post.findOne({                                      // Get a single post
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