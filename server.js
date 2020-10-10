require("dotenv").config();

//Public modules
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

//Private modules
const routes = require("./routes");
const db = require("./models");
const bcryptUtil = require("./controllers/helpers/bcryptUtil");

//Set up db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sequence", {
  useNewUrlParser: true,
});
mongoose.set("debug", false);

// Set up app
const app = express();

app.use(helmet());
app.use(cookieParser(process.env.RANDOM_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up rate limiter

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", true);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 200,
});

//  apply to all requests
app.use(limiter);

// Set up sessions
app.use(
  session({
    genid: function (req) {
      return require("uuid/v1")();
    },
    secret: process.env.RANDOM_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport and Route setup
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);

// Configure the local strategy for use by Passport.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      db.User.findOne({ email: email }, async function (err, user) {
        // Hash password that was entered

        if (err) {
          return done(err);
        }

        if (!user) {
          //TODO pass this msg to controller
          console.log("No user with that email!");
          return done(null, false);
        }

        const passwordCheck = await bcryptUtil.checkPassword(
          password,
          user.password
        );

        if (!passwordCheck) {
          //TODO pass this msg to controller
          console.log("Wrong password!");
          return done(null, false);
        }
        console.log(`${user.email} is logged in!`);
        return done(null, user);
      });
    }
  )
);

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  console.log("SERIALIZE user: ", user);
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  console.log("DESERIALIZE user: ", id);
  db.User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Server running at ${PORT}`);
});
