const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {};

Photo.init({
    imageName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    cloudImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageId: {
        type: DataTypes.STRING
    },
    post_date: {
        type: DataTypes.DATE,
        default: Date.now
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