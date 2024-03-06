const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  post: 587,
  secure: false,
  auth: {
    user: "datxomcity2@gmail.com", // generated ethereal user
    pass: "htyorbyfwpazvlvp",
  },
});

module.exports = transporter;
