const { nanoid } = require("nanoid");
const { validateContact } = require("../validation/validation.js");
const sendContactEmail = require("../nodemailer/contactMail.js");

module.exports = async (req, res, db) => {
    const { name, email, topic, body } = req.body;

    const message = {
        id: nanoid(),
        name,
        email,
        topic,
        body,
    };

    const contactColl = db.collection("contact");

    try {
        const { error } = validateContact(req.body);
        if (error)
            return res
                .status(400)
                .json({ status: "failure", msg: error.details[0].message });

        await contactColl.insertOne(message);

        const emailInfo = await sendContactEmail(message);
        console.log(emailInfo);

        res.json({
            status: "success",
            msg: "your message has been sucessfully submited to the admins",
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while submitting your message",
        });
    }
};
