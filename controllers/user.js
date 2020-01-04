const db = require("../models");

module.exports = {
  getAuthenticatedUser: function(req, res) {
    if (!req.user || !req.query.email) {
      res.send(false);
    } else {
      db.User.findOne({ email: req.query.email })
        .populate({
          path: "homes",
          match: { isDefault: true },
          select: "_id name"
        })
        .then(user => {
          res.json(user);
        })
        .catch(err => res.status(422).json(err));
    }
  }
};
