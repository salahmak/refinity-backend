const nodemailer = require("nodemailer");

module.exports = async (enroll, accessToken) => {
    const { name, email, grade, type } = enroll;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken,
        },
    });

    const emailHtml = `
    <p>
    Hello ${name},

Thank you for expressing interest in joining Refinity. We are delighted to inform you that you are accepted and are officially a ${
        type === "member" ? "member" : "tutor"
    }. If you’d like to join Refinity’s community center in order to meet new people, here is an invite link: <a href="https://discord.gg/pWFE9gF">https://discord.gg/pWFE9gF</a>

You will be assigned work through Asuna, an app. A director will contact you with more information regarding that.

Regards,
Refinity
</p>
    `;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Enrollment request update",
        html: emailHtml,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        console.log(err.stack);
    }
};
