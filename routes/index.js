const path = require("path");
const router = require("express").Router();
const userAction = require("./sequences.js");
const userManagement = require("./users.js");

//TODO testing - remove
router.use("/", (req, res, next) => {
    // console.log("-------------------------------------------");
    // console.log(req.headers);
    // console.log("-------------------------------------------DERP");
    // console.log(req.session.cookie)
    next();
})

router.use("/api", userAction);
router.use("/api", userManagement);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

module.exports = router;
