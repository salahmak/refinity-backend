const { nanoid } = require("nanoid");
const { validateEnroll } = require("../../validation/validation.js");
const sendEnrollEmail = require("../../nodemailer/enrollMail.js");
const Enrollment = require("../../models/enrollments/enrollment.js");

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
        id: nanoid(),
        date: new Date(),
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
