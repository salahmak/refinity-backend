const { nanoid } = require("nanoid");
const { validateEnroll } = require("../../validation/validation.js");
const sendEnrollEmail = require("../../nodemailer/enrollMail.js");
const Enrollment = require("../../models/enrollments/enrollment.js");
const moment = require("moment");

module.exports = async (req, res) => {
    const time = moment();
    const {
        type,
        name,
        email,
        grade,
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
    } = req.body;

    const enrollForm = {
        id: nanoid(),
        date: time.format("MM-DD-YYYY"),
        createdAt: time.valueOf(),
        accept_date: null,
        acceptedAt: null,
        type,
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        grade,
        status: "pending",
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
    };

    try {
        //validating the received object
        const { error } = validateEnroll(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        //!    UNCOMMENT THIS
        // const student = await Enrollment.findOne({ email }).lean();
        // if (student)
        //     return res.status(400).json({ status: "failure", msg: "student already exists" });

        //storing the enrollment in the enrollments collection
        const enrollment = new Enrollment(enrollForm);
        await enrollment.save();

        //!  UNCOMMENT THIS
        // const emailInfo = await sendEnrollEmail(enrollForm);
        // console.log(emailInfo);

        res.json({
            status: "success",
            msg: "your enrollment has been successfully submitted",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "failure",
            msg: "there has been an error while submitting your enrollment",
        });
    }
};
