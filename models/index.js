const User = require('./User');
const Post = require('./Post');
const LikeButton = require('./LikeButton');

// User can create many posts 
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

// Post was created by X = User 
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

// User belongs to many Fweets (post.js), and Fweets(post.js) belong to many Users
User.belongsToMany(Post, {
    through: LikeButton,
    as: 'liked_posts',
    foreignKey: 'user_id'
  });
  
  Post.belongsToMany(User, {
    through: LikeButton,
    as: 'liked-posts',
    foreignKey: 'post_id'
  });

  LikeButton.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  LikeButton.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(LikeButton, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(LikeButton, {
    foreignKey: 'post_id'
  });
  

module.exports = { User, Post, LikeButton };