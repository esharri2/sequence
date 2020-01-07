const express = require("express");
const router = express.Router();
const controller = require("../controllers/sequence");

router.post("/", controller.saveSequence);
router.get("/", controller.getSequence);

module.exports = router;
