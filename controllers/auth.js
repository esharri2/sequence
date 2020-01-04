const db = require("../models");
const crypto = require("crypto");

const emailUtils = require("./helpers/emailUtils");

module.exports = {
  signUp: async (req, res) => {
    const currentEmail = req.user ? req.user.email : null;
    const { email, password, isDemo } = req.body;
    // Update username and password if user already is on a demo account
    if (isDemo) {
      const user = await db.User.findOne({ email: currentEmail });
      console.log("user is...");
      console.log(user);
      user.email = email;
      user.password = password;
      user
        .save()
        .then(user => {
          res.json(user);
        })
        .catch(err => res.status(422).json(err));
    } else {
      db.User.create({ email, password })
        .then(user => res.json(user.email))
        .catch(err => {
          console.error(err);
          res.status(422).json(err);
        });
    }
  },

  logIn: function(req, res) {
    console.log(req.user);
    if (req.user) {
      db.User.findOne({ email: req.user.email })
        .then(user => res.json(user))
        .catch(error => {
          res.status(422).json(err);
        });
    } else {
      console.error("There was an error logging in.");
      res.status(401).json(new Error());
    }
  },

  logOut: function(req, res) {
    req.logout();
    return res.json(req.user);
  },

  changePassword: function(req, res) {
    const { newPassword, token } = req.body;
    if (!token) {
      if (!req.user) {
        res.status(403).json({ error: "You are not signed in." });
      } else {
        db.User.findOneAndUpdate(
          { email: req.user.email },
          { password: newPassword },
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
          user.password = newPassword;
          user.save(err => {
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

  requestPasswordReset: function(req, res) {
    const email = req.body.email;
    console.log(email);
    db.User.findOne({ email }, (error, user) => {
      if (!user) {
        res.status(422).json({ message: "There is no user with that email." });
      } else {
        const token = crypto.randomBytes(16).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(err => {
          if (err) {
            // TODO send generic error?
          } else {
            var transporter = emailUtils.getTransporter();
            console.log(transporter);
            var mailOptions = {
              from: process.env.TRANSPORTER_EMAIL,
              to: email,
              subject: `Password recovery for sequence`,
              html: `
              <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
              <p>Please click on the following link, or paste this into your browser to complete the process: ${process.env.ORIGIN}/ResetPassword/${token}</p>          
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
              `
            };
            transporter.sendMail(mailOptions, function(error, info) {
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

  deleteAccount: async function(req, res) {
    const email = req.user.email;
    console.log(email);
    // todo bail if null
    const userData = await db.User.findOne({ email })
      .select("_id email")
      .lean()
      .populate({
        path: "homes",
        select: "_id name ",
        populate: {
          path: "items",
          select: "_id name",
          populate: {
            path: "tasks",
            select: "_id name",
            populate: {
              path: "instances",
              select: "_id"
            }
          }
        }
      });

    const homeIds = [];
    const itemIds = [];
    const taskIds = [];
    const instanceIds = [];

    // Fill ID arrays for each model
    for (let home of userData.homes) {
      homeIds.push(home._id);
      for (let item of home.items) {
        itemIds.push(item._id);
        for (let task of item.tasks) {
          taskIds.push(task._id);
          for (let instance of task.instances) {
            instanceIds.push(instance._id);
          }
        }
      }
    }

    console.log(homeIds);
    console.log(itemIds);
    console.log(taskIds);
    console.log(instanceIds);

    let deletedData;

    try {
      deletedData = await Promise.all([
        db.User.deleteOne({ email }),
        db.Home.deleteMany({ _id: homeIds }),
        db.Item.deleteMany({ _id: itemIds }),
        db.Task.deleteMany({ _id: taskIds }),
        db.Instance.deleteMany({ _id: instanceIds })
      ]);
    } catch (error) {
      res.send({ error: error });
    }

    console.log(deletedData);

    res.send({
      done: "done"
    });
  }
};
