const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {
  static addCorrelation(body, models) {
    return Post.findOne({
    where: {
      post_url: body.correlated_post_url
    },
    attributes: [
      'id'
    ]
    }).then((data) => {
      return models.PostCorrelation.create({
        correlated_post_id: data.id,
        post_id: body.post_id,
        user_id: body.user_id
      })
      .then(() => { return })
      .catch(err => {
        window.alert(err.sqlMessage);
      });
    });
  };
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isURL: true
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
    modelName: 'post'
  }
);

module.exports = Post;
