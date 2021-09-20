const { Vote } = require('../models');

const votedata = [
  {
    user_id: 9,
    post_correlation_id: 1
  },
  {
    user_id: 8,
    post_correlation_id: 1
  }
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;
