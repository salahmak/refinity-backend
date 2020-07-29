const mongoose = require("mongoose");

module.exports = async (req, res) => {
    const { type } = req.query;

    const valid =
        type !== "email-lists" ||
        type !== "academic-mails" ||
        type !== "relations-mails" ||
        type !== "tutoring-mails";

    if (!valid || type === undefined || type === null)
        return res.status(400).json({
            status: "failure",
            msg: "please provide a valid emails type",
        });

    try {
        const emailsDocs = await mongoose.model(type).find();
        const emailsArr = emailsDocs.map((doc) => doc.email);
        res.json(emailsArr);
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while fetching the emails",
        });
    }
};
