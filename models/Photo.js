const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// sets up the photo table in the database to store photos
class Photo extends Model {};

Photo.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cloud_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_url:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'post',
            key: 'id'
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'photo'
});

module.exports = Photo;