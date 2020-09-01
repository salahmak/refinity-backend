const sendEnrollEmail = require("./types/enrollMail.js");
const sendContactEmail = require("./types/contactMail.js");
const sendAcceptEmail = require("./types/acceptEnroll.js");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

module.exports = async (body, type) => {
    if (type === "enroll") {
        return await sendEnrollEmail(body);
    } else if (type === "contact") {
        return await sendContactEmail(body);
    } else if (type === "accept") {
        return await sendAcceptEmail(body);
    }
};
