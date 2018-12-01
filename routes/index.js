const path = require("path");
const router = require("express").Router();
const userAction = require("./sequences.js");
const userManagement = require("./users.js");

router.use("/api", userAction);
router.use("/api", userManagement);

router.use("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/service-worker.js"));
  });

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

module.exports = router;
