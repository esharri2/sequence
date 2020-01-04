const emailUtils = require("./helpers/emailUtils");

const buildMessage = (name, email, message) =>
  /*template*/
  `<p>FROM: ${name || "NO NAME GIVEN"}</p>
  <p>REPLY_TO: ${email || "NO EMAIL GIVEN"}</p>
  <hr/>
  <p>${message || "NO MESSAGE GIVEN"}</p>
  `;

module.exports = {
  contactForm: function(req, res) {
    var transporter = emailUtils.getTransporter();

    var mailOptions = {
      from: req.body.email,
      to: process.env.ADMIN_EMAIL,
      subject: `sequence: Email from contact form from ${req.body.name ||
        "UNKNOWN"}`,
      html: buildMessage(req.body.name, req.body.email, req.body.message)
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(info.response);
        res.send("Email sent: " + info.response);
      }
    });
  }
};
