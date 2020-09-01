const nodemailer = require("nodemailer");

module.exports = async (message) => {
    const { id, name, email, body } = message;

    const transporter = nodemailer.createTransport({
        host: "mail.refinityedu.org",
        port: 465,
        auth: {
            user: process.env.CONTACT_MAIL,
            pass: process.env.CONTACT_PASS,
        },
    });

    const emailHtml = `
    <h3>New contact request</h3>
    <ul>
        <li>id: ${id}</li>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>body: ${body}</li>
    </ul>
    `;

    const mailOptions = {
        from: process.env.CONTACT_MAIL,
        to: process.env.CONTACT_MAIL,
        subject: "Contact Request",
        html: emailHtml,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        console.log(err.stack);
    }
};
