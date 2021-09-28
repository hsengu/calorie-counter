const router = require('express').Router();
const { route } = require('..');
const { Post, Photo } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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

router.post('/', [withAuth, upload.single('photo')], (req, res) => {
    Post.create({
        foods: req.body.foods,
        calories: req.body.calories,
        user_id: req.session.user_id,
    }).then(async dbPostData => {
        console.log(dbPostData.dataValues);
        if(req.file) {
            dbPostData = await Post.addPhoto({ ...dbPostData.dataValues }, {...req.file }, { Photo });
        } else {
            dbPostData = await Post.findOne({
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
            ]
        });
        return dbPostData.dataValues;
    }).then(async dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        console.log(dbPostData);
        if(req.file && dbPostData) {
            dbPostData = await Post.updatePhoto({ ...dbPostData }, { ...req.file }, { Photo });
        } else if (req.file) {
            dbPostData = await Post.addPhoto({ ...dbPostData }, { ...req.file }, { Photo });
        }

        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, async (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(async dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        let result;
        result = await Post.deletePhoto({ ...req.params.id }, { Photo });
        res.json(result ? result : dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;