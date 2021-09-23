const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
class Post extends Model {
    static async addPhoto(data, file, models) {
        const upload = await cloudinary.uploader.upload(file.path, (err, res) => {
            if (err)
                console.error(err);
            fs.unlink(file.path, err => {
                if (err)
                    console.log(err);
                else
                    console.log(`${file.path} removed from server storage.`)
            });
            return res;
        });

        return models.Photo.create({
            cloud_id: upload.public_id,
            image_url: upload.url,
            post_id: data.id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: data.id
                },
                attributes: ['id', 'foods', 'calories', 'created_at'],
                include: [
                    {
                        model: models.Photo,
                        attributes: ['id', 'cloud_id', 'image_url']
                    }
                ]
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    };

    static async updatePhoto(data, file, models) {
        const deletePhoto = await models.Photo.findOne({
            where: {
                post_id: data.id
            },
            attributes: ['cloud_id']
        });

        const upload = await cloudinary.uploader.upload(req.file.path, (err, res) => {
            if (err)
                console.error(err);
            fs.unlink(file.path, err => {
                if (err)
                    console.log(err);
                else
                    console.log(`${file.path} removed from server storage.`)
            });
            return res;
        }).then(async () => {
            const delPhoto = await cloudinary.uploader.destroy(deletePhoto.cloud_id, (err, res) => {
                if (err)
                    console.log(err);
                console.log(`${deletePhoto.cloud_id} removed from cloudinary. ${delPhoto}`);
            });
            return res;
        });

        return models.Photo.update(
            {
                cloud_id: upload.public_id,
                image_url: upload.url
            },
            {
                where: {
                    post_id: req.params.id
                }
            }).then(() => {
                return Post.findOne({
                    where: {
                        id: data.id
                    },
                    attributes: ['id', 'foods', 'calories', 'created_at'],
                    include: [
                        {
                            model: models.Photo,
                            attributes: ['id', 'cloud_id', 'image_url']
                        }
                    ]
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    };

    static async deletePhoto(id, models) {
        return await models.Photo.findOne({
            where: {
                post_id: id
            },
            attributes: ['cloud_id']
        }).then(async dbPhotoData => {
            if (!dbPhotoData) {
                return null;
            } else {
                return delPhoto = await cloudinary.uploader.destroy(deletePhoto.cloud_id, (err, res) => {
                    if (err)
                        console.log(err);
                    console.log(`${deletePhoto.cloud_id} removed from cloudinary. ${delPhoto}`);
                    return res;
                });
            }
        });
    };
};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        foods: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        },
        user_id: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;