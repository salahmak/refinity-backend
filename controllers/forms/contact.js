const { nanoid } = require("nanoid");
const { validateContact } = require("../../validation/validation.js");
const sendEmail = require("../../nodemailer/sendEmail.js");
const Contact = require("../../models/contact/contactForm.js");

module.exports = async (req, res) => {
    const { name, email, body } = req.body;

    const message = {
        id: nanoid(),
        name,
        email,
        body,
    };

    try {
        const { error } = validateContact(req.body);
        if (error) return res.status(400).json({ status: "failure", msg: error.details[0].message });

        const contact = new Contact(message);
        await contact.save();

        const emailInfo = await sendEmail(message, "contact");
        console.log(emailInfo);

        res.json({
            status: "success",
            msg:
                "Thank you for contacting us! We will do our best to respond within 24-72 business hours",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            msg: "there was an error while submitting your message",
        });
    }
};
