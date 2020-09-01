const nodemailer = require("nodemailer");

module.exports = async (enroll) => {
    const { name, email, grade, type } = enroll;

    const transporter = nodemailer.createTransport({
        host: "mail.refinityedu.org",
        port: 465,
        auth: {
            user: process.env.ENROLL_MAIL,
            pass: process.env.ENROLL_PASS,
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
        from: process.env.ENROLL_MAIL,
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
