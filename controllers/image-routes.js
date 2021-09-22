const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User } = require("../models");

router.get("/", (req, res) => {
  res.render("");
});

router.post("/", (req, res) => {
  let postUrl;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  // name of the input file is postUrl
  postUrl = req.files.postUrl;
  uploadPath = __dirname + "/uploads/" + postUrl.name;
  console.log(postUrl);

  // Use mv() to place file on the server
  postUrl.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

module.exports = router;
