const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  if (req.session) {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_url',
        'title'
      ],
      include: {
        model: User,
        attributes: ['username']
      }
      
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
   }
});

  router.get('/edit/:id', withAuth, (req, res) => {
    console.log(req.params.id);
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
          'id',
          'post_url',
          'title'
        ]
    })
        .then(dbPostData => {
        if (!dbPostData) {
          res.render('edit-post');
        }
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;