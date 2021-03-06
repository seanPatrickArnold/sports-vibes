const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote, PostCorrelation } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: ["id", "post_url", "title", "created_at"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      "type_image",
      "type_audio",
    ],
    include: [
      {
        model: PostCorrelation,
        separate: true,
        limit: 4,
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "correlated_post_id",
          [
            sequelize.literal(
              "(SELECT IFNULL(COUNT(*),0) FROM vote WHERE post_correlations.id = vote.post_correlation_id)"
            ),
            "voteCount",
          ],
        ],
        include: {
          model: Post,
          attributes: [
            [
              sequelize.literal(
                "(SELECT type_image FROM post WHERE post.id = post_correlations.correlated_post_id)"
              ),
              "type_image",
            ],
            [
              sequelize.literal(
                "(SELECT type_audio FROM post WHERE post.id = post_correlations.correlated_post_id)"
              ),
              "type_audio",
            ],
            [
              sequelize.literal(
                "(SELECT post_url FROM post WHERE post.id = post_correlations.correlated_post_id)"
              ),
              "post_url",
            ],
            [
              sequelize.literal(
                "(SELECT title FROM post WHERE post.id = post_correlations.correlated_post_id)"
              ),
              "title",
            ],
          ],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
    type_image: req.body.type_image,
    type_audio: req.body.type_audio,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.post("/addCorrelation", (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.addCorrelation(
      { ...req.body, user_id: req.session.user_id },
      { PostCorrelation }
    )
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
