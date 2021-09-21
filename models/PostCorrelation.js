const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PostCorrelation extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_correlation_id: body.post_correlation_id

    }).then(() => {
      // return PostCorrelation.findOne({
      //   where: {
      //     user_id: body.user_id,
      //     post_id: body.post_id,
      //     correlated_post_id: body.post_correlation_id
      //   },
      //   attributes: [
      //     'id',
      //     [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_correlation.id = vote.post_correlation_id)'), 'vote_count']
      //   ]
      // });
      return;
    });
  }
}

PostCorrelation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    correlated_post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post_correlation'
  }
);

module.exports = PostCorrelation;
