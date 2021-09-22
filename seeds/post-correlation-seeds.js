const { PostCorrelation } = require('../models');

const postCorrelationData = [
  {
    post_id: 1,
    correlated_post_id: 2,
    user_id: 1
  },
  {
    post_id: 2,
    correlated_post_id: 3,
    user_id: 2
  },
  {
    post_id: 3,
    correlated_post_id: 2,
    user_id: 2
  },
  {
    post_id: 3,
    correlated_post_id: 7,
    user_id: 5
  }
];

const seedPostCorrelations = () => PostCorrelation.bulkCreate(postCorrelationData);

module.exports = seedPostCorrelations;
