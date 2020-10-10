const express = require("express");
const router = require("express").Router();
const cors = require("cors");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const emailRoutes = require("./email");
const sequenceRoutes = require("./sequence");

const isCorsAllowed = (origin, req) => {
  const environment = express().get("env");
  if (environment === "development") {
    return true;
  } else {
    return (
      origin === process.env.ORIGIN ||
      (!origin && req.query.apikey === process.env.API_KEY)
    );
  }
};

const corsOptions = function (req, callback) {
  console.log("TEST");
  console.log(req.headers.cookie);

  const options = { credentials: true };
  options.origin = isCorsAllowed(req.header("Origin"), req);
  if (!options.origin) {
    callback(new Error("Not allowed by CORS"));
  } else {
    callback(null, options); // callback expects two parameters: error and options
  }
};

router.all("*", cors(corsOptions));

router.use("/auth", authRoutes);
router.use("/sequence", sequenceRoutes);
router.use("/user", userRoutes);
router.use("/email", emailRoutes);

module.exports = router;
