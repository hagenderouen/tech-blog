const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');


User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);

module.exports = { User, Post, Comment };

