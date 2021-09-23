const router = require('express').Router();
const cloudinary = require('../../config/cloudinaryConfig');
const multer = require('multer');
const fs = require('fs');
const { route } = require('..');
const { Post, Photo } = require('../../models');
const withAuth = require('../../utils/auth');
const upload = multer({ dest: 'uploads/' });


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'foods',
            'calories',
            'created_at'
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

router.get('/:id', (req, res) => {
    Post.findOne({
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
    }).then(dbPostData => {
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', /*[withAuth, */upload.single('photo')/*]*/, (req, res) => {
    Post.create({
        foods: req.body.foods,
        calories: req.body.calories,
        user_id: req.body.user_id,
    }).then(async dbPostData => {
        if(req.file) {
            const upload = await cloudinary.uploader.upload(
                req.file.path,
                (err, res) => {
                    if (err) console.error(err);
                    fs.unlink(req.file.path, err => {
                        if(err)
                            console.log(err);
                        else
                            console.log(`${req.file.path} removed from server storage.`)
                    });
                    return res;
                }
            );

            await Photo.create({
                cloud_id: upload.public_id,
                image_url: upload.url,
                post_id: dbPostData.id
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        };
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.put('/:id', /*[withAuth, */upload.single('photo')/*]*/, async (req, res) => {
    const deletePhoto = await Photo.findOne({
        where: {
            post_id: req.params.id
        },
        attributes: ['cloud_id']
    });

    console.log(deletePhoto);

    Post.update(
        {
            foods: req.body.foods,
            calories: req.body.calories
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(async dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        if(req.file) {
            const upload = await cloudinary.uploader.upload(
                req.file.path,
                (err, res) => {
                    if (err) console.error(err);
                    fs.unlink(req.file.path, err => {
                        if(err)
                            console.log(err);
                        else
                            console.log(`${req.file.path} removed from server storage.`)
                    });
                    return res;
                }
            ).then(async () => {
                const delPhoto = await cloudinary.uploader.destroy(deletePhoto.cloud_id, (err, res) => {
                    if(err)
                        console.log(err);
                    console.log(`${deletePhoto.cloud_id} removed from cloudinary. ${delPhoto}`);
                });
                return res;
            });

            await Photo.update(
                {
                    cloud_id: upload.public_id,
                    image_url: upload.url
                },
                {
                where: {
                    post_id: req.params.id
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', /*withAuth,*/ async (req, res) => {
    const deletePhoto = await Photo.findOne({
        where: {
            post_id: req.params.id
        },
        attributes: ['cloud_id']
    });

    console.log(JSON.stringify(deletePhoto));

    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(async dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const delPhoto = await cloudinary.uploader.destroy(deletePhoto.cloud_id, (err, res) => {
            if(err)
                console.log(err);
            console.log(`${deletePhoto.cloud_id} removed from cloudinary. ${delPhoto}`);
            return res;
        });
        console.log(delPhoto);
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;