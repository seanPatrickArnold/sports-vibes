const router = require("express").Router();
const { PostCorrelation, Post, Vote } = require("../../models");

router.get("/", (req, res) => {
  PostCorrelation.findAll()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // check the session
  if (req.session) {
    PostCorrelation.create({
      post_correlation_id: req.body.post_correlation_id,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  PostCorrelation.create({
    
  })


});

router.put("/upvote", (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    PostCorrelation.upvote(
      { ...req.body, user_id: req.session.user_id },
      { Vote }
    )
      .then((updatedVoteData) => res.json(updatedVoteData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.delete("/:id", (req, res) => {
  PostCorrelation.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "No post correlation found with this id!" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
