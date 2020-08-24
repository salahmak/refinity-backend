const { nanoid } = require("nanoid");
const { validateEnroll } = require("../../validation/validation.js");
const sendEnrollEmail = require("../../nodemailer/enrollMail.js");
const Enrollment = require("../../models/enrollments/enrollment.js");
const moment = require("moment");
const formidable = require("formidable");
const fs = require("fs");
const { Storage } = require("megajs");

module.exports = async (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    const time = moment();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
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
            emailList,
            tutoringMails,
            academicSvsMails,
            relationsMails,
        } = fields;

        //UPLOAD FILE HERE

        let enrollForm = {
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
            scoreReport: "",
            emailList: emailList == "true" ? true : false,
            tutoringMails: tutoringMails == "true" ? true : false,
            academicSvsMails: academicSvsMails == "true" ? true : false,
            relationsMails: relationsMails == "true" ? true : false,
        };

        const resume = async () => {
            try {
                //validating the received object
                const { error } = validateEnroll(fields);
                if (error) return res.status(400).json(error.details[0].message);

                //!    UNCOMMENT THIS
                // const student = await Enrollment.findOne({ email }).lean();
                // if (student)
                //     return res.status(400).json({ status: "failure", msg: "student already exists" });

                //storing the enrollment in the enrollments collection
                const enrollment = new Enrollment(enrollForm);
                await enrollment.save();

                //!  UNCOMMENT THIS
                const emailInfo = await sendEnrollEmail(enrollForm);
                console.log(!!emailInfo ? "email sent" : "email not sent");

                res.json({
                    status: "success",
                    msg: "your enrollment has been successfully submitted",
                    enrollForm,
                });
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    status: "failure",
                    msg: "there has been an error while submitting your enrollment",
                });
            }
        };

        try {
            if (type === "tutor") {
                let storage = new Storage(
                    { email: process.env.MEGA_EMAIL, password: process.env.MEGA_PASS },
                    (err) => {
                        if (err) return res.status(500).json({ msg: "error while uploading file-1-" });
                        storage.upload(
                            files.scoreReport.name,
                            fs.createReadStream(files.scoreReport.path),
                            (err, uploadedFile) => {
                                if (err)
                                    return res
                                        .status(500)
                                        .json({ msg: "error while uploading file-2-" });
                                uploadedFile.link((err, url) => {
                                    enrollForm = { ...enrollForm, scoreReport: url };
                                    resume();
                                });
                            }
                        );
                    }
                );
            } else {
                resume();
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({
                status: "failure",
                msg: "there has been an error while submitting your enrollment",
            });
        }
    });
};
