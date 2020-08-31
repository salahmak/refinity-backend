const nodemailer = require("nodemailer");

module.exports = async (message, accessToken) => {
    const { id, name, email, body } = message;

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
    <h3>New contact request</h3>
    <ul>
        <li>id: ${id}</li>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>body: ${body}</li>
    </ul>
    `;

    const mailOptions = {
        from: process.env.EMAIL,
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
