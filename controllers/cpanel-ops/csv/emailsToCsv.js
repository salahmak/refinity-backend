const mongoose = require("mongoose");
const json2csv = require("json2csv").Parser;
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = async (req, res) => {
    //all, emails-list, academic-mails, relations-mails, tutoring-mails
    const { filter = "emails" } = req.query;

    const valid = ["emails", "email-lists", "academic-mails", "relations-mails", "tutoring-mails"];
    if (!valid.includes(filter)) return res.status(400).json("please provide a valide filter");

    try {
        const options = { header: true, fields: ["id", "email"] };
        const emails = await mongoose.model(filter).find({}, "-_id -__v").lean();

        const time = moment().format("YYYY-MM-DD-hh:mm:ss");
        const filePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "csv-exports",
            `emails-${filter === "emails" ? "all" : filter}-${time}.csv`
        );
        const json2CsvParser = new json2csv(options);
        const csvData = json2CsvParser.parse(emails);

        fs.writeFile(filePath, csvData, (err) => {
            if (err) return res.status(400).json({ msg: "error while writing file" });
            console.log("writing is done");
        });

        const fileRs = fs.createReadStream(filePath);

        fileRs.on("end", () => {
            fs.unlink(filePath, () => {
                console.log("file deleted");
            });
        });
        fileRs.pipe(res);

        return res.attachment(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).json("there has been an error while getting the emails");
    }
};
