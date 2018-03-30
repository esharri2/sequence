const router = require("express").Router();

//match /api
router.route("/test").get((req, res) => res.json({ test: "test" }));

module.exports = router;
