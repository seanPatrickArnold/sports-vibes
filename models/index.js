// import all models
const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');
const PostCorrelation = require('./PostCorrelation');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(PostCorrelation, {
  through: Vote,
  as: 'voted_correlations',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

PostCorrelation.belongsToMany(User, {
  through: Vote,
  as: 'voted_correlations',
  foreignKey: 'post_correlation_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(PostCorrelation, {
  foreignKey: 'post_correlation_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

PostCorrelation.hasMany(Vote, {
  foreignKey: 'post_correlation_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

PostCorrelation.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(PostCorrelation, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(PostCorrelation, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, PostCorrelation };
