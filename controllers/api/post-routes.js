<<<<<<< HEAD
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Vote } = require("../../models");
const withAuth = require("../../utils/auth");
=======
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote, PostCorrelation } = require('../../models');
const withAuth = require('../../utils/auth');
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: [
<<<<<<< HEAD
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
=======
      'id',
      'post_url',
      'title',
      'created_at'
    ]
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c
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
<<<<<<< HEAD
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
=======
      'id',
      'post_url',
      'title',
      'created_at',
      'type_image',
      'type_audio'
    ],
    include: [
      {
        model: PostCorrelation,
        attributes: [
          'id',
          'correlated_post_id',
          [sequelize.literal('(SELECT IFNULL(COUNT(*),0) FROM vote WHERE post_correlations.id = vote.post_correlation_id)'), 'voteCount']
        ],
        include: {
          model: Post,
          attributes: [
            [sequelize.literal('(SELECT type_image FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'type_image'],
            [sequelize.literal('(SELECT type_audio FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'type_audio'],
            [sequelize.literal('(SELECT post_url FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'post_url'],
            [sequelize.literal('(SELECT title FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'title']
          ]
        }
      },
      {
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c
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
<<<<<<< HEAD
=======
    type_image: req.body.type_image,
    type_audio: req.body.type_audio
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

<<<<<<< HEAD
router.put("/upvote", (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, User })
      .then((updatedVoteData) => res.json(updatedVoteData))
      .catch((err) => {
=======
router.post('/addCorrelation', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.addCorrelation({ ...req.body, user_id: req.session.user_id }, { PostCorrelation })
      .then(data => res.json(data))
      .catch(err => {
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c
        console.log(err);
        res.status(500).json(err);
      });
  }
});

<<<<<<< HEAD
router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
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

router.delete("/:id", withAuth, (req, res) => {
=======
router.delete('/:id', withAuth, (req, res) => {
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c
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
