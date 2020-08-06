const Enrollments = require("../../../models/enrollments/enrollment.js");
const AcademicMail = require("../../../models/emails/academic-mail.js");
const EmailList = require("../../../models/emails/email-list.js");
const RelationsMail = require("../../../models/emails/relations-mail.js");
const TutoringMail = require("../../../models/emails/tutoring-mail.js");
const Email = require("../../../models/emails/email.js");
const Admin = require("../../../models/auth/admin.js");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        const enroll = await Enrollments.findOneAndDelete({ id });

        if (!enroll)
            return res.status(400).json({
                status: "failure",
                msg: "enrollment doesn't exist or has already been deleted",
            });

        if (enroll.status === "accepted") {
            await Admin.findOneAndUpdate({ id: req.user.id }, { $inc: { deletedEnrolls: 1 } }).lean();

            await Email.findOneAndDelete({ id: enroll.id });

            if (enroll.emailList) {
                await EmailList.findOneAndDelete({ id: enroll.id });
            }

            if (enroll.tutoringMails) {
                await TutoringMail.findOneAndDelete({ id: enroll.id });
            }

            if (enroll.academicSvsMails) {
                await AcademicMail.findOneAndDelete({ id: enroll.id });
            }

            if (enroll.relationsMails) {
                await RelationsMail.findOneAndDelete({ id: enroll.id });
            }
        }

        res.json({
            status: "success",
            msg: "enrollment has been deleted",
            enroll,
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while deleting the enrollment",
        });
    }
};
