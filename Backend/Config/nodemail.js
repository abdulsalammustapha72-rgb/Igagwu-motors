process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 587,

    secure: false,
    
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;