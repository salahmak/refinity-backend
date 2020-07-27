const Enrollments = require("../../../models/enrollments/enrollment.js");
const AcademicMail = require("../../../models/emails/academic-mail.js");
const EmailList = require("../../../models/emails/email-list.js");
const RelationsMail = require("../../../models/emails/relations-mail.js");
const TutoringMail = require("../../../models/emails/tutoring-mail.js");

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        const enroll = await Enrollments.findOne({ id });
        if (!enroll) {
            return res.status(400).json({
                msg: "enrollment has been deleted or doesn't exist",
            });
        }

        if (enroll.status === "accepted") {
            return res.status(400).json({
                msg: "enrollment is already accepted",
            });
        }

        await enroll.updateOne({ status: "accepted" });
        //todo send email to the person

        if (enroll.emailList) {
            const emailList = new EmailList({
                id: enroll.id,
                email: enroll.email,
            });
            await emailList.save();
        }

        if (enroll.tutoringMails) {
            const tutoringMail = new TutoringMail({
                id: enroll.id,
                email: enroll.email,
            });
            await tutoringMail.save();
        }

        if (enroll.academicSvsMails) {
            const academicMail = new AcademicMail({
                id: enroll.id,
                email: enroll.email,
            });
            await academicMail.save();
        }

        if (enroll.relationsMails) {
            const relationsMail = new RelationsMail({
                id: enroll.id,
                email: enroll.email,
            });
            await relationsMail.save();
        }

        res.json({
            status: "success",
            msg: "enrollment has been accepted successfully",
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({
            status: "failure",
            msg: "there was an error while accepting the enrollment",
        });
    }
};
