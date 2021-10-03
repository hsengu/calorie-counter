const router = require('express').Router();
const { route } = require('..');
const { Post, Photo } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// route to gather all users posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id','foods','calories','created_at'],
        include: [
            {
                model: Photo,
                attributes: ['id', 'cloud_id', 'image_url']
            }
        ]
    }).then(dbPostData => {
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to find a specific post by id
router.get('/:id', (req, res) => {
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
            }
        ]
    }).then(dbPostData => {
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// route to create a post
router.post('/', [withAuth, upload.single('photo')], (req, res) => {
    Post.create({
        foods: req.body.foods,
        calories: req.body.calories,
        user_id: req.session.user_id,
    }).then(async dbPostData => {
        if(req.file) {
            dbPostData = await Post.addPhoto({ ...dbPostData.dataValues }, {...req.file }, { Photo });          // Creates a row in the Photo table and connects the new Photo row to the new Post
        } else {
            dbPostData = await Post.findOne({               // Gets the newly created Post row
                where: {
                    id: dbPostData.id
                },
                attributes: ['id', 'foods', 'calories', 'created_at'],
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'cloud_id', 'image_url']
                    }
                ]
            });
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// route to update a specific post
router.put('/:id', [withAuth, upload.single('photo')], async (req, res) => {
    Post.update(
        {
            foods: req.body.foods,
            calories: req.body.calories
        },
        {
            where: {
                id: req.params.id,
            }
        }
    ).then(async dbPostData => {
        dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'foods', 'calories', 'created_at'],
            include: [
                {
                    model: Photo,
                    attributes: ['id', 'cloud_id', 'image_url']
                }
            ],
            raw: true
        });
        return dbPostData;
    }).then(async dbPostData => {               // When the Post row is updated attempt to update the associated Photo
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        if(req.file && dbPostData) {            // If there is a new Photo and the Post exists, update the existing Photo
            dbPostData = await Post.updatePhoto({ ...dbPostData }, { ...req.file }, { Photo });
        } else if (req.file) {                  // Else create a new Photo and attach it to the Post
            dbPostData = await Post.addPhoto({ ...dbPostData }, { ...req.file }, { Photo });
        }

        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    await Post.deletePhoto(req.params.id, { Photo }).then(() => {
        Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        }).catch(err => {
            if(err)
                console.log(err);
                res.status(500).json(err);
        })
    });
});

module.exports = router;