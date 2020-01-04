const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.getAuthenticatedUser);

module.exports = router;
