const nodemailer = require("nodemailer");

module.exports = async (enroll) => {
    const {
        id,
        type,
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
        scoreReport,
        emailList,
        tutoringMails,
        academicSvsMails,
        relationsMails,
    } = enroll;

    const transporter = nodemailer.createTransport({
        host: "mail.refinityedu.org",
        port: 465,
        auth: {
            user: process.env.ENROLL_MAIL,
            pass: process.env.ENROLL_PASS,
        },
    });

    const emailHtml = `
    <h3>new enroll request</h3>
    <h4>enroll info</h4>
    <ul>
        <li>id: ${id}</li>
        <li>type: ${type}</li>
        <li>created on: ${new Date(createdAt)}</li>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>status: ${status}</li>
        <li>grade: ${grade}</li>
        <li>geoLocation: ${geoLocation}</li>
        <li>timezone: ${timezone}</li>
        <li>service: ${service}</li>
        <li>professional interests: ${profInterests}</li>
        <li>fun fact: ${funFact}</li>
        <li>score report: ${scoreReport ? scoreReport : "/"}</li>
        <li>subscribed to email list: ${emailList}</li>
        <li>subscibed to tutoring emails: ${tutoringMails}</li>
        <li>subscribed to academic/Svs emails: ${academicSvsMails}</li>
        <li>subscribed to relations emails: ${relationsMails}</li>
    </ul>
    `;

    const mailOptions = {
        from: process.env.ENROLL_MAIL,
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
