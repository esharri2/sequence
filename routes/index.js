const path = require("path");
const router = require("express").Router();
const userAction = require("./sequences.js");
const userManagement = require("./users.js");

router.use("/api", userAction);
router.use("/api", userManagement);

module.exports = router;
