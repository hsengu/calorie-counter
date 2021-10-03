const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

// sets up the post table in the database to store users posts
class Post extends Model {
    // Method to extend the Post model to add a Photo to the table row
    static async addPhoto(data, file, models) {
        const upload = await cloudinary.uploader.upload(file.path, (err, res) => {              // Uploads the photo to cloudinary
            if (err)
                console.error(err);
            fs.unlink(file.path, err => {                 // Removes the copy of the of the photo that's stored on the server
                if (err)
                    console.log(err);
                else
                    console.log(`${file.path} removed from server storage.`)                
            });
            return res;
        });

        return models.Photo.create({                    // Creates a row in the Photo table with the results returned by cloudinary uploader and post id from the Post table
            cloud_id: upload.public_id,
            image_url: upload.url,
            post_id: data.id
        }).then(() => {
            return Post.findOne({                   // Return the newly created Post row
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

    // Method to extend the Post model to update a Post's Photo
    static async updatePhoto(data, file, models) {             
        const deletePhoto = await models.Photo.findOne({            // Gets the existing Photo for the Post to be deleted later
            where: {
                post_id: data.id
            },
            attributes: ['cloud_id']
        });

        const upload = await cloudinary.uploader.upload(file.path, (err, res) => {          // Uploads the new Photo to cloudinary
            if (err)
                console.error(err);
            fs.unlink(file.path, err => {           // Deletes the new photo from the server
                if (err)
                    console.log(err);
                else
                    console.log(`${file.path} removed from server storage.`)
            });
            return res;
        }).then(async res => {
            await cloudinary.uploader.destroy(deletePhoto.cloud_id, (err, res) => {             // Deletes the old Photo from cloudinary
                if (err)
                    console.log(err);
                else 
                    console.log(`${deletePhoto.cloud_id} removed from cloudinary.`);
            });
            return res;
        });

        return await models.Photo.update(               // Updates the Photo table row with the new Photo data
            {
                cloud_id: upload.public_id,
                image_url: upload.url
            },
            {
                where: {
                    post_id: data.id
                }
            }).then(() => {
                return Post.findOne({               // Returns the updated Post row
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

    // Method to extend Post model to delete a Photo from a Post
    static async deletePhoto(id, models) {
        return await models.Photo.findOne({         //Find the photo in the Photo table
            where: {
                post_id: id
            },
            attributes: ['cloud_id'],
            raw: true
        }).then(async dbPhotoData => {
            if (!dbPhotoData) {
                return null;
            } else {
                return await cloudinary.uploader.destroy(dbPhotoData.cloud_id, (err, res) => {          // Delete the photo from cloudinary
                    if (err)
                        console.log(err);
                    console.log(`${dbPhotoData.cloud_id} removed from cloudinary.`);
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