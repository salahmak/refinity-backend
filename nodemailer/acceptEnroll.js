const nodemailer = require("nodemailer");

module.exports = async (enroll) => {
    const { name, email, grade } = enroll;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    const emailHtml = `
    <h3>new enroll request</h3>
    <h4>enroll info</h4>
    <ul>
        <li>name: ${name}</li>
        <li>email: ${email}</li>

    </ul>
    `;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Enrollment request",
        html: emailHtml,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        console.log(err.stack);
    }
};
