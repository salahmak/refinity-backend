const nodemailer = require("nodemailer");

module.exports = async (enroll) => {
    const {
        id,
        createdAt,
        name,
        email,
        grade,
        status,
        geoLocation,
        timezone,
        service,
        profInterests,
        funFact,
        emailList,
        tutoringMails,
        academicSvsMails,
        relationsMails,
    } = enroll;

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
        <li>id: ${id}</li>
        <li>created on: ${new Date(createdAt)}</li>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>status: ${status}</li>
        <li>grade: ${grade}</li>
        <li>geoLocation: ${geoLocation}</li>
        <li>timezone: ${timezone}</li>
        <li>service: ${service}</li>
        <li>profInterests: ${profInterests}</li>
        <li>funFact: ${funFact}</li>
        <li>subscribed to email list: ${emailList}</li>
        <li>subscibed to tutoring emails: ${tutoringMails}</li>
        <li>subscribed to academic/Svs emails: ${academicSvsMails}</li>
        <li>subscribed to relations emails: ${relationsMails}</li>
    </ul>
    `;

    const mailOptions = {
        from: email,
        to: process.env.ADMIN_MAIL,
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
