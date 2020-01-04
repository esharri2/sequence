const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/auth");

router.post("/login", passport.authenticate("local", {}), controller.logIn);
router.get("/logout", controller.logOut);
router.post("/signup", controller.signUp);
router.post("/changepassword", controller.changePassword);
router.put("/requestpasswordreset", controller.requestPasswordReset);
router.get("/delete", controller.deleteAccount);

module.exports = router;
