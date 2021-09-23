const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedPostCorrelations = require('./post-correlation-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedPostCorrelations();
  console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();

module.exports = seedAll
