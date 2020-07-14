const { nanoid } = require("nanoid");
const { validateEnroll } = require("../validation/validation.js");
const sendEnrollEmail = require("../nodemailer/enrollMail.js");
const Enrollment = require("../models/enrollments/enrollment.js");
const AcademicMail = require("../models/emails/academic-mail.js");
const EmailList = require("../models/emails/email-list.js");
const RelationsMail = require("../models/emails/relations-mail.js");
const TutoringMail = require("../models/emails/tutoring-mail.js");

module.exports = async (req, res) => {
    const {
        name,
        email,
        grade,
        geoLocation,
        timezone,
        service,
        profInterests,
        funFact,
        emailList,
        tutoringMails,
        academicSvsMails,
        relationsMails,
    } = req.body;

    const enrollForm = {
        name,
        email,
        grade,
        status: "pending",
        geoLocation,
        timezone,
        service,
        profInterests,
        funFact,
        emailList,
        tutoringMails,
        academicSvsMails,
        relationsMails,
    };

    try {
        //validating the received object
        const { error } = validateEnroll(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const student = await Enrollment.findOne({ email });
        if (student)
            return res
                .status(400)
                .json({ status: "failure", msg: "student already exists" });

        //storing the enrollment in the enrollments collection
        const enrollment = new Enrollment(enrollForm);
        await enrollment.save();
        //await enrollsColl.insertOne(enrollForm);

        //storing the email in other collections by checking the booleans
        if (emailList) {
            const emailList = new EmailList({ id: enrollForm.id, email });
            await emailList.save();
        }

        if (tutoringMails) {
            const tutoringMail = new TutoringMail({ id: enrollForm.id, email });
            await tutoringMail.save();
        }

        if (academicSvsMails) {
            const academicMail = new AcademicMail({ id: enrollForm.id, email });
            await academicMail.save();
        }

        if (relationsMails) {
            const relationsMail = new RelationsMail({
                id: enrollForm.id,
                email,
            });
            await relationsMail.save();
        }

        const emailInfo = await sendEnrollEmail(enrollForm);
        console.log(emailInfo);

        res.json({
            status: "success",
            msg: "your enrollment has been successfully submitted",
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: "there has been an error while submitting your enrollment",
        });
    }
};
