const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/email");

router.post("/contactform", controller.contactForm);

module.exports = router;
