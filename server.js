const express = require('express');
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

const session = require('express-session');

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sequence";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());


// const uuidv1 = require('uuid/v1');
app.use(session({
  genid: function (req) {
    return require('uuid/v1')();
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static("client/dist"));

app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}!`))