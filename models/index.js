const User = require('./User');
const Photo = require('./Photo');
const Post = require('./Post');

// create associations
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });
Post.hasOne(Photo, { foreignKey: 'post_id' });
Photo.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = { User, Post, Photo };