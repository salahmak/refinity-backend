const Enrollments = require("../../../models/enrollments/enrollment");
const json2csv = require("json2csv").Parser;
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = async (req, res) => {
    const { filter = "all" } = req.query;

    const valid = ["all", "pending", "accepted"];
    if (!valid.includes(filter)) return res.status(400).json({ msg: "please provide a valide filter" });

    try {
        const options = {
            header: true,
            fields: [
                "id",
                "status",
                "date",
                "createdAt",
                "accept_date",
                "acceptedAt",
                "name",
                "email",
                "grade",
                "geoLocation",
                "timezone",
                "service",
                "profInterests",
                "funFact",
                "emailList",
                "tutoringMails",
                "relationsMails",
                "academicSvsMails",
            ],
        };
        let enrolls;

        if (filter === "all") {
            enrolls = await Enrollments.find({}, "-_id -__v").lean();
        } else {
            enrolls = await Enrollments.find({ status: filter }, "-_id -__v").lean();
        }
        const time = moment().format("YYYY-MM-DD-hhmmss");
        const filePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "csv-exports",
            `csv-${filter}-${time}.csv`
        );
        const json2CsvParser = new json2csv(options);
        const csvData = json2CsvParser.parse(enrolls);

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
        res.status(500).json({ msg: "there was an error while getting the enrollments" });
    }
};
