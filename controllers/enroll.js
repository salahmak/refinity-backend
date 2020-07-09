const { nanoid } = require("nanoid");
const { validateEnroll } = require("../validation/validation.js");

module.exports = async (req, res, db) => {
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
    };

    const enrollsColl = db.collection("enrollments");
    const emailListColl = db.collection("emails-list");
    const tutoringMailsColl = db.collection("tutoring-mails");
    const academicMailsColl = db.collection("acedemic-mails");
    const relationsMailsColl = db.collection("relations-mails");

    try {
        //validating the received object
        const { error } = validateEnroll(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const student = await enrollsColl.findOne({ email });
        if (student)
            return res
                .status(400)
                .json({ status: "failure", msg: "student already exists" });

        //storing the enrollment in the enrollments collection
        await enrollsColl.insertOne(enrollForm);

        //storing the email in other collections by checking the booleans
        if (emailList)
            await emailListColl.insertOne({ id: enrollForm.id, email });

        if (tutoringMails)
            await tutoringMailsColl.insertOne({ id: enrollForm.id, email });

        if (academicSvsMails)
            await academicMailsColl.insertOne({ id: enrollForm.id, email });

        if (relationsMails)
            await relationsMailsColl.insertOne({ id: enrollForm.id, email });

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
