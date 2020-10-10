const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/auth");

router.post(
  "/login",
  passport.authenticate("local", function (error, user, info) {
    // this will execute in any case, even if a passport strategy will find an error
    // log everything to console
    console.log(error);
    console.log(user);
    console.log(info);

    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      next();
    }

    res.status(401).send(info);
  }),
  controller.logIn
);
router.get("/logout", controller.logOut);
router.post("/signup", controller.signUp);
router.post("/changepassword", controller.changePassword);
router.put("/requestpasswordreset", controller.requestPasswordReset);
router.get("/delete", controller.deleteAccount);
router.get("/check", controller.checkAuthentication);

module.exports = router;
