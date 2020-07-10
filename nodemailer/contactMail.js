const nodemailer = require("nodemailer");

module.exports = async (enroll) => {
    const { id, name, email, topic, body } = enroll;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    const emailHtml = `
    <h3>New contact request</h3>
    <ul>
        <li>id: ${id}</li>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>topic: ${topic}</li>
        <li>body: ${body}</li>
    </ul>
    `;

    const mailOptions = {
        from: email,
        to: process.env.ADMIN_MAIL,
        subject: "Contact",
        html: emailHtml,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        console.log(err.stack);
    }
};
