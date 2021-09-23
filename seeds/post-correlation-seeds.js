const { PostCorrelation } = require('../models');

const postCorrelationData = [
  {
    post_id: 1,
    correlated_post_id: 2,
    user_id: 1
  }
];

const seedPostCorrelations = () => PostCorrelation.bulkCreate(postCorrelationData);

module.exports = seedPostCorrelations;
