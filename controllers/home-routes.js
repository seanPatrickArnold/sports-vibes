const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Vote, PostCorrelation } = require('../models');

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    limit: 7,
    order: [
        ['id', 'DESC']
    ],
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',

    ]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts: posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
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
        include: [
          {
            model: Vote,
            attributes: ['user_id', 'post_correlation_id']
          },
          {
            model: Post,
            attributes: [
              [sequelize.literal('(SELECT type_image FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'type_image'],
              [sequelize.literal('(SELECT type_audio FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'type_audio'],
              [sequelize.literal('(SELECT post_url FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'post_url'],
              [sequelize.literal('(SELECT title FROM post WHERE post.id = post_correlations.correlated_post_id)'), 'title']
            ]
          }
        ]
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

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      // res.json({
      //   post: {
      //     ...post,
      //     loggedIn: req.session.loggedIn
      //   },
      //   loggedIn: req.session.loggedIn
      // });
      res.render('single-post', {
          post: {
            ...post,
            loggedIn: req.session.loggedIn
          },
          loggedIn: req.session.loggedIn
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/database', () => {
  sequelize.query('SELECT * FROM user')
    .then(function (rows) {
      console.log(JSON.stringify(rows));
    });
});

module.exports = router;
