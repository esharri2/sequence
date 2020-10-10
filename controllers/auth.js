const db = require("../models");
const crypto = require("crypto");
const emailUtils = require("./helpers/emailUtils");
const bcryptUtil = require("./helpers/bcryptUtil");

module.exports = {
  checkAuthentication: function (req, res) {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json(false);
    }
  },

  signUp: async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcryptUtil.hashPassword(password);
    db.User.create({ email, password: hashedPassword })
      .then((user) => res.json(user.email))
      .catch((err) => {
        console.error(err);
        res.status(401).json(err);
      });
  },

  logIn: function (req, res) {
    if (req.user) {
      console.log("logging in");
      console.log("req user is ", req.user);
      db.User.findOne({ email: req.user.email })
        .populate("sequences")
        .then((user) => {
          const userData = {
            email: user.email,
            hasSequences: user.sequences.length > 0 ? true : false,
          };
          console.log("DERPPPP");
          console.log(res.headers);
          return res.json(userData);
        })
        .catch((error) => {
          res.status(422).json(err);
        });
    } else {
      console.error("There was an error logging in.");
      res.status(401).json(new Error());
    }
  },

  logOut: function (req, res) {
    req.logout();
    return res.json(req.user);
  },

  changePassword: async function (req, res) {
    const { newPassword, token } = req.body;
    const hashedPassword = await bcryptUtil.hashPassword(newPassword);

    if (!token) {
      if (!req.user) {
        res.status(403).json({ error: "You are not signed in." });
      } else {
        db.User.findOneAndUpdate(
          { email: req.user.email },
          { password: hashedPassword },
          (error, user) => {
            if (error) {
              res.status(422).json({ error: "Whoops. Something is wrong." });
            } else {
              res.sendStatus(200);
            }
          }
        );
      }
      //check if logged in
      //change req.user pw
    } else {
      db.User.findOne({ resetPasswordToken: token }, (error, user) => {
        if (Date.now() > new Date(user.resetPasswordExpires).getTime()) {
          res
            .status(422)
            .json({ error: "Your password reset window as expired." });
        } else {
          user.password = hashedPassword;
          user.save((err) => {
            if (err) {
              res.status(422).json({ error: "Whoops. Something is wrong." });
            } else {
              res.sendStatus(200);
            }
          });
        }
      });
    }
  },

  requestPasswordReset: function (req, res) {
    const email = req.body.email;
    db.User.findOne({ email }, (error, user) => {
      if (!user) {
        res.status(422).json({ message: "There is no user with that email." });
      } else {
        const token = crypto.randomBytes(16).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save((err) => {
          if (err) {
            // TODO send generic error?
          } else {
            var transporter = emailUtils.getTransporter();
            var mailOptions = {
              from: process.env.TRANSPORTER_EMAIL,
              to: email,
              subject: `Vois password recovery`,
              html: `
              <p>You are receiving this because you (or someone else) have requested the reset of the password for your Vois account.</p>
              <p>Please click on the following link, or paste this into your browser to complete the process: ${process.env.ORIGIN}/reset-password/${token}</p>          
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
              `,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.error(error);
                res.send(error);
              } else {
                res.send("Email sent: " + info.response);
              }
            });
          }
        });
      }
    });
  },

  deleteAccount: async function (req, res) {
    const email = req.user.email;
    // todo bail if null
    // TODO rewrite for sequences
    const userData = await db.User.findOne({ email })
      .select("_id email")
      .lean()
      .populate({
        path: "sequences",
      });

    const sequenceIds = [];

    for (let sequence of userData.sequences) {
      sequenceIds.push(sequence._id);
    }

    let deletedData;

    try {
      deletedData = await Promise.all([
        db.User.deleteOne({ email }),
        db.Sequence.deleteMany({ _id: sequenceIds }),
      ]);
      res.send(true);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
};
