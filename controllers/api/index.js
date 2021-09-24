const router = require("express").Router();

<<<<<<< HEAD
const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
=======
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const correlationRoutes = require('./correlation-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/correlations', correlationRoutes);
>>>>>>> 1e25833793c5bd0f6551b88f010216eea881447c

module.exports = router;
