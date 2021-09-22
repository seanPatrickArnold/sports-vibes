const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PostCorrelation extends Model {
  static upvote(body, models) {
    return PostCorrelation.findOne({
      where: {
        post_id: body.post_id,
        correlated_post_id: body.correlated_post_id
      },
      attributes: [
        'id'
      ]
    })
    .then((data) => {
      console.log(data.id);
      return models.Vote.create({
        user_id: body.user_id,
        post_correlation_id: data.id
      })
    })
    .then(() => {
      return;
    });
  };
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
    uniqueKeys: {
      Items_unique: {
          fields: ['post_id', 'correlated_post_id']
      }
    },
    modelName: 'post_correlation'
  }
);

module.exports = PostCorrelation;
