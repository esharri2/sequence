const express = require('express');
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
require('dotenv').config()

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost/sequence";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(session({
  genid: function (req) {
    return require('uuid/v1')();
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
  store: new MongoStore({mongooseConnection: mongoose.connection})  
}))

app.use(express.static("client/dist"));

app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}!`))