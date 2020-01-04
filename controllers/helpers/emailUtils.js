const nodemailer = require("nodemailer");
// const nodeoutlook = require("nodejs-nodemailer-outlook");

module.exports = {
  getTransporter() {
    // TODO add in dev vs prod options here.
    var transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3"
      },
      auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_EMAIL_PW
      }
    });
    return transporter;
  }
};
