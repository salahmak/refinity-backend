const Enrollments = require("../../../models/enrollments/enrollment.js");

module.exports = async (req, res) => {
    const { string = "", filter = "name" } = req.query;

    try {
        const enrolls = await Enrollments.find({ [filter]: string });
        const count = enrolls.length;

        res.json({
            list: enrolls,
            count,
        });
    } catch (err) {
        res.status(500).json("there has been an error while getting the enrollments");
    }
};
