const User = require('./User');
const Post = require('./Post')

// User can create many posts 
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

// Post was created by X = User 
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Post };