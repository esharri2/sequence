const router = require("express").Router();
const controller = require("../controllers/sequenceController");



//match /api
router.route("/test").get((req, res) => res.json({ test: "test" }));

router.route("/save").post((req, res) => {
    controller.saveSequence();
});


module.exports = router;
