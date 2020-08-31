const sendEnrollEmail = require("./types/enrollMail.js");
const sendContactEmail = require("./types/contactMail.js");
const sendAcceptEmail = require("./types/acceptEnroll.js");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

module.exports = async (body, type) => {
    const myOAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    myOAuth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });

    const myAccessToken = myOAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL, //your gmail account you used to set the project up in google cloud console"
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: myAccessToken, //access token variable we defined earlier
        },
    });

    if (type === "enroll") {
        return await sendEnrollEmail(body, myAccessToken);
    } else if (type === "contact") {
        return await sendContactEmail(body, myAccessToken);
    } else if (type === "accept") {
        return await sendAcceptEmail(body, myAccessToken);
    }
};
