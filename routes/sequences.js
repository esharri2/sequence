const router = require("express").Router();
const controller = require("../controllers/sequenceController");

//match /api
router.route("/saved").get((req, res) => {
    controller.getSequences(req.session.user.userId, res)
}
);

router.route("/save").post((req, res) => {
    controller.saveSequence(req.session.user.userId, req.body.sequence, res);
});

router.route("/update").post((req, res) => {
    controller.updateSequence(req.body.id, req.body.sequence, res);
});

router.route("/sequence/:id").get((req, res) => {
    controller.getSequence(req.params.id, res);
});


module.exports = router;
