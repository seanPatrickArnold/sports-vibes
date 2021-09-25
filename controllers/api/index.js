const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");
const correlationRoutes = require("./correlation-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/correlations", correlationRoutes);

module.exports = router;
